const BASE_URL = "https://api.lyrics.ovh";
const suggestions = document.querySelector('.suggestions');
var results = [];
var alert = document.getElementById('alert');

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
      setTimeout(() => {
        alert.textContent = err ? 'There were no results found.' : '';
      }, 300);
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

      let album = results.find(res => res.title === song[0].trim()).album;

      document.getElementById('lyrics').innerHTML = `
      <h3 class="disp-flex">
        <div class="flex-col">
          <span class="mr-20">${song[0]} - ${song[1]}</span> 
          <small>Album: ${album.title}</small>
        </div>
        <div>
          <button id="btn-listen">preview</button>
          <button id="btn-copy">copy</button>          
          <button id="btn-full">📺</button>     
        </div>
      </h3>
      <textarea class="lyric p0">${resp.lyrics}</textarea>      
      <img src="${album.cover_medium}" alt="album cover" />`;

      var btnCopy = document.getElementById('btn-copy');
      copyToClipboard(btnCopy, document.querySelector('.lyric'));
      // play the extract audio (preview)
      let songAudio = results.find(res => res.title === song[0].trim()).preview;
      var btnLiten = document.getElementById('btn-listen');
      listenToPreview(btnLiten, songAudio);
      fullScreen(document.getElementById('btn-full'));

    } catch (err) {
      setTimeout(() => {
        alert.textContent = err ? 'There were no results found.' : '';
      }, 300);
    }
  }

  function listenToPreview (btnLiten, songAudio) {
    if (songAudio && songAudio.length > 20) {
      const audio = document.getElementById('preview');
      audio.src = songAudio;
      btnLiten.addEventListener('click', () => {
        audio.paused ? (audio.play(), btnLiten.textContent = 'pause') : (audio.pause(), btnLiten.textContent = 'preview');
        audio.onended = () => {
          btnLiten.textContent = 'preview';
        }
      });
    }
  }

  function copyToClipboard (btnCopy, textarea) {
    if (btnCopy) {
      btnCopy.addEventListener('click', () => {
        btnCopy.textContent = 'copied';
        textarea.select();
        document.execCommand('copy');
        setTimeout(() => {
          btnCopy.textContent = 'copy';
        }, 3000);
      });
    }

  }

  function fullScreen (btnFullScreen) {
    var isFullScreen = false;
    btnFullScreen.addEventListener('click', () => {
      isFullScreen = isFullScreen ? false : true;
      document.querySelector('.header').style.display = isFullScreen ? 'none' : 'block';
      document.querySelector('.search-container').style.display = isFullScreen ? 'none' : 'block';
    });
  }
});