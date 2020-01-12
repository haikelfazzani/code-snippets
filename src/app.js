const BASE_URL = "https://api.lyrics.ovh";
const suggestions = document.querySelector('.suggestions');
var results = [];
var alert = document.getElementById('alert');
var errorMsg = "There were no results found.";

document.getElementById('search').addEventListener('keyup', async (e) => {
  let searchValue = e.target.value;

  if (searchValue && searchValue.length > 1) {
    try {
      // title, preview (audio), artist.name, artist.picture, album.title
      const resp = await axios.get(BASE_URL + '/suggest/' + encodeURIComponent(searchValue));
      const response = await resp.data;

      results = response.data.filter((v, i) => i <= 5);
      await createListSuggestion(results);
      suggestions.style.display = 'block';
      getLyric();

    } catch (error) {
      if (error) {
        alert.textContent = JSON.stringify(errorMsg);
      }
    }
  }

  async function createListSuggestion (results) {
    suggestions.innerHTML = '';
    await results.forEach(result => {
      suggestions.innerHTML += `<li class="suggest" data-id="${result.title}-${result.artist.name}">
        <div>
          <h4 class="m0">${result.title} - ${result.artist.name}</h4>
          <small class="cl-gray">${result.album.title}</small>
        </div>
        <audio src="${result.preview}" controls></audio>
      </li>`;
    });
  }

  function getLyric () {
    if (results && results.length > 0) {
      let suggest = document.querySelectorAll('.suggest');
      suggest.forEach(s => {
        s.addEventListener('click', async () => { await createLyric(s) });
      });
    }
  }

  async function createLyric (s) {
    try {
      suggestions.style.display = 'none';
      let song = s.getAttribute('data-id').split('-');

      const response = await axios.get(`${BASE_URL}/v1/${song[1]}/${song[0]}`);
      const resp = await response.data;

      document.getElementById('lyrics').innerHTML = `
      <h3><span class="mr-20">${song[0]} - ${song[1]}</span> <button id="btn-copy">copy</button></h3>
      <textarea class="lyric p0">${resp.lyrics}</textarea>`;


      var btnCopy = document.getElementById('btn-copy');
      if (btnCopy) {
        btnCopy.addEventListener('click', () => {
          btnCopy.textContent = 'copied';
          copyToClipboard(document.querySelector('.lyric'));

          setTimeout(() => {
            btnCopy.textContent = 'copy';
          }, 3000);
        });
      }

    } catch (err) {
      if (err) {
        alert.textContent = JSON.stringify(errorMsg);
      }
    }
  }

  function copyToClipboard (textarea) {
    textarea.select();
    document.execCommand('copy');
  };
});