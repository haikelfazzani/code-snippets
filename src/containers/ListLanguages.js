import React, { useContext } from 'react';
import GlobalContext from '../state/GlobalContext';
import getIconAndColor from '../util/getIconAndColor';
import { withRouter } from 'react-router-dom';

function ListLanguages (props) {

  const { globalState } = useContext(GlobalContext);

  const onSelectLang = (val) => {
    if(val !== 'all') props.history.push('/' + val);
  }

  return (
    <ul className="list-langs mb-5 flipInX">

      {globalState.languages && globalState.languages.map((lang, i) =>
        <li
          className="text-center"
          key={lang + i}
          onClick={() => { onSelectLang(lang) }}
        >

          <i className={"fs-40 mb-1 " + getIconAndColor(lang)
            + (globalState.currentLang === lang ? "bg-main" : "")}>
          </i>

          <div>{lang}</div>
        </li>)}
    </ul>
  );
}

export default withRouter(ListLanguages);