import axios from 'axios';

const BASE_URL = 'https://ws.audioscrobbler.com/2.0/';
const API_KEY = `api_key=${process.env.LAST_FM_API_KEY}&format=json`;

export default class LastFmService {

  static async getTopArtists () {
    let url = `${BASE_URL}?method=chart.gettopartists&${API_KEY}&limit=10`;
    let resp = await axios.get(url);
    let data = await resp.data.artists.artist;
    return data;
  }

  static async getTopTracks() {
    let url = `${BASE_URL}?method=chart.gettoptracks&${API_KEY}&limit=10`;
    let resp = await axios.get(url);
    let data = await resp.data.tracks.track;
    return data;
  }

  static async getArtistInfo (artistName) {
    artistName = encodeURIComponent(artistName);

    let url = `${BASE_URL}?method=artist.getinfo&artist=${artistName}&${API_KEY}`;
    let resp = await axios.get(url);
    let data = await resp.data.artist;
    return data;
  }

  static async getTrackInfo(artistName, trackName) {
    artistName = encodeURIComponent(artistName);
    trackName = encodeURIComponent(trackName);

    let url = `${BASE_URL}?method=track.getInfo&${API_KEY}&artist=${artistName}&track=${trackName}`;
    let resp = await axios.get(url);
    let data = await resp.data.track;
    return data;
  }
}