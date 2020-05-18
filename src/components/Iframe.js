import React from 'react';

const BASE_URL = "https://codepen.io/haikelfazzani-the-bold/embed/";
const CUSTOM_STYLE = "?height=565&theme-id=dark&default-tab=result";

const CODE_BOX = 'https://codesandbox.io/embed/';
const CUSTOM_STYLE_CODE_BOX = '?autoresize=1&fontsize=14&hidenavigation=1&theme=dark';

export default function Iframe ({ src, embedName = "codepen" }) {
  return (<>

    <iframe
      src={
        (embedName === 'leetcode' || embedName === 'trinket')
          ? src : embedName === 'codepen'
            ? BASE_URL + src + CUSTOM_STYLE
            : CODE_BOX + src + CUSTOM_STYLE_CODE_BOX
      }
      height="565"
      style={{ width: "100%", fontSize: "16px" }}
      scrolling="no"
      title="haikel fazzani"
      frameBorder="no"
      allowtransparency="true"
      allowFullScreen={true}>
    </iframe>
  </>);
}