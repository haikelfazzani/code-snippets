import axios from 'axios';
const BASE_URL = "https://api.lyrics.ovh";

export default class LyricService {

  static async getLyric (artistName, songName) {
    let url = `${BASE_URL}/v1/${encodeURIComponent(artistName)}/${encodeURIComponent(songName)}`;
    const response = await axios.get(url);
    let resp = await response.data;
    return resp;
  }

  static async searchLyric (songName) {
    const resp = await axios.get(BASE_URL + '/suggest/' + encodeURIComponent(songName));
    let response = await resp.data.data;
    if (response && response.length > 12) {
      response = response.slice(0, 12);
    }
    return response;
  }

  static async getDetails (param) {
    const forwardProxy = 'https://open-rest.now.sh/api/proxy?key=40a02041-34b4-4ece-9d6c-a895ca0004f6&url='
    const resp = await axios.get(forwardProxy + 'https://api.deezer.com/search?q=' + param);
    let response = await resp.data.data;
    if (response && response.length > 12) {
      response = response.slice(0, 12);
    }
    return response;
  }
}