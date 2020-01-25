const BASE_URL = "https://api.lyrics.ovh";
const suggestions = document.querySelector('.suggestions');
let lyricsElmnt = document.getElementById('lyrics');
var alert = document.querySelector('.alert-danger');
var spinnerEl = document.querySelector('.spinner-container');

var results = [];
lyricsElmnt.style.display = 'none';
spinnerEl.style.display = 'none';

document.getElementById('search').addEventListener('keyup', async (e) => {
  let searchValue = e.target.value;

  if (searchValue && searchValue.length > 1) {    
    try {
      // title, preview (audio), artist.name, artist.picture, album.title
      const resp = await axios.get(BASE_URL + '/suggest/' + encodeURIComponent(searchValue));
      const response = await resp.data;

      results = response.data.filter((v, i) => i <= 5);
      setTimeout(async () => {
        await createListSuggestions(results);        
      }, 200);

      setTimeout(() => {//when user choose the lyric
        suggestions.style.display = 'block';
        getLyric(); // attach and display the lyric to dom
      }, 300);

    } catch (error) {
      alert.style.display = 'block';
      alert.textContent = err ? 'There were no results found.' : '';
      setTimeout(() => { alert.style.display = 'none'; }, 5000);
    }
  }

  async function createListSuggestions (results) {
    spinnerEl.style.display = 'block';
    suggestions.innerHTML = '';
    spinnerEl.style.display = results ? 'none' : 'block';
    await results.forEach(result => {
      suggestions.innerHTML += `
      <li class="suggest list-group-item bg-dark d-flex justify-content-between" data-id="${result.title}-${result.artist.name}">
        <div>
          <h4 class="m-0">${result.title} - ${result.artist.name}</h4>
          <small>${result.album.title}</small>
        </div>
        <audio src="${result.preview}" controls></audio>
      </li>`;
    });
    spinnerEl.style.display = 'none';
  }

  function getLyric () {
    if (results && results.length > 0) {
      let suggest = document.querySelectorAll('.suggest');
      suggest.forEach(liLyric => {
        liLyric.addEventListener('click', async () => { await displayLyric(liLyric) });
      });
    }
    else {
      spinnerEl.style.display = 'block';
    }
  }

  async function displayLyric (liLyric) {
    try {
      suggestions.style.display = 'none';
      let song = liLyric.getAttribute('data-id').split('-');

      const response = await axios.get(`${BASE_URL}/v1/${song[1]}/${song[0]}`);
      const resp = await response.data;

      let album = results.find(res => res.title === song[0].trim()).album;
      lyricsElmnt.style.display = 'block';
      lyricsElmnt.innerHTML = `
      <h3 class="d-flex justify-content-between">
        <div class="d-flex flex-column bd-highlight mb-3">
          <span>${song[0]} - ${song[1]}</span> 
          <small>Album: ${album.title}</small>
        </div>
        <div>
          <button id="btn-listen" class="btn btn-dark">preview</button>
          <button id="btn-copy" class="btn btn-dark">copy</button>          
          <button id="btn-full" class="btn btn-dark">📺</button>     
        </div>
      </h3>
      <div class="row h-100 mb-5">
        <div class="col-md-9">
        <textarea class="lyric bg-dark w-100 h-100">${resp.lyrics}</textarea>      
        </div>
        <div class="col-md-3"><img src="${album.cover_medium}" alt="album cover" class="img-thumbnail" /></div>
      </div>`;

      var btnCopy = document.getElementById('btn-copy');
      copyToClipboard(btnCopy, document.querySelector('.lyric'));
      // play the extract audio (preview)
      let songAudio = results.find(res => res.title === song[0].trim()).preview;
      var btnLiten = document.getElementById('btn-listen');
      listenToPreview(btnLiten, songAudio);
      fullScreen(document.getElementById('btn-full'));

      spinnerEl.style.display = resp ? 'none' : 'block';

    } catch (err) {
      alert.style.display = 'block';
      alert.textContent = err ? 'There were no results found.' : '';
      setTimeout(() => { alert.style.display = 'none'; }, 5000);
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
      document.getElementById('header').style.display = isFullScreen ? 'none' : 'block';
      document.querySelector('.search-container').style.display = isFullScreen ? 'none' : 'block';
    });
  }
});