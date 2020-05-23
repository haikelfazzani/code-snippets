const langColors = [
  { lang: 'all', color: 'secondary' },
  { lang: 'algorithms', color: 'pink' },
  { lang: 'javascript', color: 'yellow' },
  { lang: 'html5', color: 'danger' },
  { lang: 'css3', color: 'purple' },
  { lang: 'node-js', color: 'teal' },
  { lang: 'react', color: 'info' },
  { lang: 'python', color: 'primary' },
  { lang: 'c++', color: 'purple' }
];

function getIconAndColor (lang, textOrBg = 'bg-') {
  // icons: fab fa-lang
  let langIcon = 'fab fa-' + (
    lang === 'algorithms' ? 'pushed'
      : lang === 'javascript' ? 'js'
        : lang === 'all' ? 'buysellads'
          : lang === 'c++' ? 'cuttlefish'
            : lang
  );

  // get language color
  let color = langColors.find(l => l.lang === lang).color;

  // combine icon + color / in one css class
  return langIcon + " " + textOrBg + color;
}

export default getIconAndColor;