import React from 'react';

export default function Iframe ({ data }) {
  return (<>
    {console.log(data.fields.embed)}
    <iframe
      src={data.fields.embed}
      style={{ width: "97%", minHeight: "92vh", fontSize: "16px" }}
      scrolling="no"
      title={data.fields.title}
      frameBorder="no"
      allowtransparency="true"
      allowFullScreen={true}>
    </iframe></>);
}