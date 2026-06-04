/** Runs before paint to avoid theme flash */
export default function ThemeScript() {
  const script = `(function(){try{var t=localStorage.getItem('skh-theme');var l=localStorage.getItem('skh-locale');var theme=t==='dark'?'dark':'light';document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme;if(l==='hi')document.documentElement.lang='hi';}catch(e){document.documentElement.dataset.theme='light';}})();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
