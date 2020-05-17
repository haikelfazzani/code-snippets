export default function writeContent (html, css, js) {

  return new Promise(async (resolve, reject) => {

    let content = getContent(html, css, js);
    resolve(content);

    await handleConsole();
  });
};

function getContent (htmlValue, cssValue, jsValue) {
  return `<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>code snippets</title>
 
    <style>${cssValue}</style>
    
  </head>
  <body>     
    ${htmlValue}    
    <script type="text/javascript" defer>${jsValue}</script>
  </body>
</html>`
}

function handleConsole () {

  return new Promise((resolve, reject) => {
    let iframe = document.getElementById('js-console');
    let iframeErrors = false;

    // handle errors
    iframe.contentWindow.onerror = (message, file, line, col, error) => {
      iframeErrors = true;
      iframe.contentWindow.parent.postMessage(`(${line}:${col}) -> ${error}`);
      reject(iframeErrors);
    };

    // get console outputs as string
    handleConsoleOutput(iframe, result => {
      iframeErrors = false;
      iframe.contentWindow.parent.postMessage(result);
      resolve(iframeErrors);
    });

  });
}


function handleConsoleOutput (iframe, resolve) {
  let logMessages = [];

  iframe.contentWindow.console.log = function () {
    logMessages.push.apply(logMessages, arguments);

    let b = logMessages.map(v => {
      if (v.toString() === '[object Map]' || v.toString() === '[object Set]') {
        let arr = [...v];
        v = v.toString() + ` (${arr.length}) ` + JSON.stringify(arr, null, 2);
      }
      if (v.toString() === '[object Object]') {
        v = v.toString() + ' ' + JSON.stringify(v, null, 2);
      }
      if (Array.isArray(v)) {
        v = `Array (${v.length}) ` + JSON.stringify(v, null, 2);
      }
      return v
    });

    resolve(b.join('\n'));
  };
}