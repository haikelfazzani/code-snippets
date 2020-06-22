export default function loadComments (snippetTitle) {


  /* - - - CONFIGURATION VARIABLES - - - */

  // make sure the id is yours
  window.gc_params = {
    graphcomment_id: 'haikel-fazzani',
    overlay: { "width": 480, "button": { "background": "#15314b", "color": "#ffffff" } },
  };

  /* - - - DON'T EDIT BELOW THIS LINE - - - */


  (function () {
    var gc = document.createElement('script'); gc.type = 'text/javascript'; gc.async = true;
    gc.src = 'https://graphcomment.com/js/integration.js?' + Math.round(Math.random() * 1e8);
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(gc);
  })();

}