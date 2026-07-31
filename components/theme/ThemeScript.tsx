// Inline, render-blocking script that sets the `.dark` class on <html> before
// first paint, so there is no flash of the wrong theme. Reads a persisted choice
// from localStorage first, falls back to the OS/browser preference (default to
// system preference, per AGENT-45 spec) if nothing was saved yet.
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = stored ? stored === 'dark' : prefersDark;
    document.documentElement.classList.toggle('dark', isDark);
  } catch (e) {}
})();
`;

export function ThemeScript() {
  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />;
}
