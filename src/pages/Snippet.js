import React, { useEffect, useState } from 'react';
import Editor from '../components/Editor';
import { useParams } from 'react-router-dom';
import Card from '../components/Card';

export default function Snippet () {

  let { id } = useParams();
  const [snipData, setSnipData] = useState(null);
  const [snipCode, setSnipCode] = useState(null)

  useEffect(() => {

    let localSnippets = localStorage.getItem('js-snippets');
    let snip = JSON.parse(localSnippets).find(s => s.date === id);
    setSnipData(snip);

    fetch(snip.code).then(res => res.text()).then(resp => { setSnipCode(resp); });

  }, []);

  return (<div className="content py-5">

    {snipData && <Card snippet={snipData} />}

    {snipData
      && <div>
        {snipData.explanation && <p className="py-2">{snipData.explanation}</p>}
        {snipCode && <Editor
          value={snipCode}
          lang={snipData.language}
        />}
      </div>}
  </div>);
}