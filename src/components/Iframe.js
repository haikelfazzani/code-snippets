import React, { useEffect, useRef } from 'react';

export default function Iframe ({ data }) {

  let iframe = useRef()

  useEffect(() => {

    let iframeDoc = iframe.current.contentDocument;

    iframeDoc.open()
    iframeDoc.write(data)
    iframeDoc.close()

  }, [data]);

  return (
    <iframe
      ref={iframe}
      title="code snippets"
      frameBorder="no">
    </iframe>
  );
}