// Inline, render-blocking script that sets the `.dark` class on <html> before
// first paint, so there is no flash of the wrong theme. Reads a persisted choice
// from localStorage first and defaults to dark if nothing was saved yet.
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var isDark = stored ? stored === 'dark' : true;
    document.documentElement.classList.toggle('dark', isDark);
  } catch (e) {}
})();
`;

export function ThemeScript() {
  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />;
}
