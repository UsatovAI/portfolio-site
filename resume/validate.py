#!/usr/bin/env python3
"""Проверка вёрстки резюме: компилирует .tex и валидирует результат.

Использование: python3 resume/validate.py [файлы.tex ...]
Без аргументов проверяет все .tex в каталоге resume/.

Кириллица не компилируется без texlive-lang-cyrillic, поэтому перед
прогоном каждая кириллическая буква заменяется на 'a', а T2A/babel/cmap
выкидываются: ширины близки, а вёрстку (число страниц, переносы, поля)
это позволяет мерить численно.
"""
import os, re, subprocess, sys, tempfile

CYR = re.compile('[\u0400-\u04ff]')
PKGS = ['\\usepackage[T2A]{fontenc}', '\\usepackage[utf8]{inputenc}',
        '\\usepackage{cmap}', '\\usepackage[russian, english]{babel}']
FILL_WARN = 95.0          # строка, занявшая больше — рискует перенестись
PAGE_BOTTOM_WARN = 762.0  # ниже — текст почти упирается в край листа


def compile_ascii(tex_path, workdir):
    src = open(tex_path, encoding='utf-8').read()
    for p in PKGS:
        src = src.replace(p, '')
    stem = os.path.splitext(os.path.basename(tex_path))[0]
    out = os.path.join(workdir, stem + '.tex')
    open(out, 'w', encoding='utf-8').write(CYR.sub('a', src))
    r = subprocess.run(['pdflatex', '-interaction=nonstopmode', out],
                       cwd=workdir, capture_output=True, text=True)
    pdf = os.path.join(workdir, stem + '.pdf')
    log = os.path.join(workdir, stem + '.log')
    if not os.path.exists(pdf):
        return None, None, r.stdout
    return pdf, open(log, encoding='utf-8', errors='replace').read(), None


def lines_of(pdf):
    xml = subprocess.run(['pdftotext', '-bbox-layout', pdf, '-'],
                         capture_output=True, text=True).stdout
    pages = re.findall(r'<page width="[\d.]+" height="[\d.]+">(.*?)</page>', xml, re.S)
    out = []
    for body in pages:
        page = []
        for m in re.finditer(r'<line xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)"[^>]*>(.*?)</line>',
                             body, re.S):
            text = ' '.join(re.findall(r'>([^<]+)</word>', m.group(4)))
            if text.strip() and text.strip() not in ('\u2219', '\u2022'):
                page.append((float(m.group(2)), float(m.group(1)), float(m.group(3)), text))
        out.append(sorted(page))
    return out


def check(tex_path):
    problems, notes = [], []
    src = open(tex_path, encoding='utf-8').read()

    if re.search(r'(?<!-)--(?!-)', re.sub(r'^\s*%.*$', '', src, flags=re.M)):
        problems.append('двойное тире в тексте (признак ИИ)')

    with tempfile.TemporaryDirectory() as wd:
        pdf, log, err = compile_ascii(tex_path, wd)
        if pdf is None:
            problems.append('не компилируется:\n' + (err or '')[-1500:])
            return problems, notes
        if 'Overfull \\vbox' in log:
            problems.append('Overfull \\vbox (текст не влезает по высоте)')
        pages = lines_of(pdf)
        notes.append('страниц: %d' % len(pages))
        if len(pages) != 1:
            problems.append('страниц %d, должна быть 1' % len(pages))

        flat = [l for pg in pages for l in pg]
        right = max(l[2] for l in flat)

        # строка-продолжение: предыдущая дотянулась почти до правого края и
        # начинается с того же отступа, то есть абзац перенёсся
        # у подзаголовка справа на той же строке стоит дата - значит это не перенос
        alone = [sum(1 for o in flat if abs(o[0] - l[0]) < 2) == 1 for l in flat]
        cont = [False] * len(flat)
        for i in range(1, len(flat)):
            prev, cur = flat[i - 1], flat[i]
            cont[i] = (prev[2] > right - 60 and abs(cur[1] - prev[1]) < 2
                       and cur[0] - prev[0] < 16 and alone[i])

        # осиротевший хвост переноса: продолжение занимает меньше 45% ширины
        ragged = [flat[i][3] for i in range(len(flat))
                  if cont[i] and (flat[i][2] - flat[i][1]) < (right - 55) * 0.45]
        if ragged:
            problems.append('рваные строки (%d): %s' % (len(ragged), '; '.join(ragged)[:120]))

        # на грани переноса: только строки, которые пока умещаются целиком
        risky = [(100 * (b - a) / (right - a), t) for i, (_, a, b, t) in enumerate(flat)
                 if a < 100 and not (i + 1 < len(flat) and cont[i + 1])]
        fill = max(risky)
        notes.append('максимальное заполнение строки: %.1f%%' % fill[0])
        if fill[0] > FILL_WARN:
            problems.append('строка на %.1f%% ширины, кириллица шире ASCII и может перенести её: %s'
                            % (fill[0], fill[1][:70]))

        bottom = max(l[0] for l in pages[0])
        notes.append('низ текста: %.1fpt' % bottom)
        if bottom > PAGE_BOTTOM_WARN:
            problems.append('текст доходит до %.1fpt, нижнее поле почти нулевое' % bottom)

    # число буллетов в каждом блоке (только тело документа, не преамбула)
    body = src.split(r'\begin{document}')[-1]
    pairs = []
    for chunk in re.split(r'\\resumeSubheading', body)[1:]:
        head = re.sub(r'\\ulhref\{[^{}]*\}\{([^{}]*)\}', r'\1', chunk[:300])
        head = head.split('}{')[0]
        label = re.sub(r'\\[a-zA-Z]+|[{}\[\]$|]', '', head).strip()
        pairs.append((label[:26] or '?', len(re.findall(r'\\resumeItem\{', chunk))))
    notes.append('буллетов по блокам: ' + ', '.join('%s=%d' % p for p in pairs))

    orphans = [n for n, c in pairs if c == 0 and 'ВШЭ' not in n]
    if orphans:
        problems.append('блоки без буллетов (P1-3, запись-сирота): ' + ', '.join(orphans))

    # WORKF-73 P1-1: Опыт -> Навыки -> Проекты -> Образование
    order = [m.group(1) for m in re.finditer(r'\\section\{([^}]*)\}', body)]
    want = ['Опыт', 'Навыки', 'Проекты', 'Образование']
    got = [x for x in want if x in order]
    if [x for x in order if x in want] != got or order.index('Образование') < order.index('Опыт'):
        problems.append('порядок секций %s, WORKF-73 P1-1 требует Опыт -> Навыки -> Проекты -> Образование'
                        % ' -> '.join(order))

    # WORKF-73 P1-5: самопонижение и контакт
    for w in ('средне', 'базово', 'начальный уровень', 'базовый уровень'):
        if w in src.lower():
            problems.append('градация уровня в навыках (P1-5): «%s»' % w)
    if 't.me/' not in src and 'Telegram' not in src:
        problems.append('нет Telegram (P1-5) - основной канал связи в РФ')

    # WORKF-73 P1-2: доля буллетов с измеримым эффектом
    items = re.findall(r'\\resumeItem\{[^{}]*\}\{(.+)\}', body)
    measured = [i for i in items if re.search(r'\d', i)]
    notes.append('буллетов с числом: %d из %d' % (len(measured), len(items)))
    if items and len(measured) * 3 < len(items):
        problems.append('меньше трети буллетов содержат число (P1-2: считаешь артефакты, а не эффект)')
    return problems, notes


def main(argv):
    here = os.path.dirname(os.path.abspath(__file__))
    files = argv[1:] or sorted(os.path.join(here, f) for f in os.listdir(here) if f.endswith('.tex'))
    bad = 0
    for f in files:
        problems, notes = check(f)
        print('=== %s' % os.path.basename(f))
        for n in notes:
            print('    %s' % n)
        for p in problems:
            print('  ! %s' % p)
        print('    %s' % ('ПРОБЛЕМ НЕТ' if not problems else 'ПРОБЛЕМ: %d' % len(problems)))
        bad += len(problems)
    return 1 if bad else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv))
