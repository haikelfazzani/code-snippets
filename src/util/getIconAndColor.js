const langColors = [
  { lang: 'all', color: 'secondary' },
  { lang: 'algorithms', color: 'pink' },
  { lang: 'javascript', color: 'yellow' },
  { lang: 'html5', color: 'danger' },
  { lang: 'css3', color: 'purple' },
  { lang: 'go', color: 'primary' },
  { lang: 'react', color: 'info' },
  { lang: 'python', color: 'teal' },
  { lang: 'node-js', color: 'success' }
];

function getIconAndColor (lang, textOrBg = 'bg-') {
  try {
    // icons: fab fa-lang
    let langIcon = 'fab fa-' + (
      lang === 'algorithms' ? 'pushed'
        : lang === 'javascript' ? 'js'
          : lang === 'all' ? 'buysellads'
            : lang === 'go' ? 'google'
                : lang
    );

    // get language color
    let color = langColors.find(l => l.lang === lang).color;

    // combine icon + color / in one css class
    return langIcon + " " + textOrBg + color;
  } catch (error) {
    return "";
  }
}

export default getIconAndColor;