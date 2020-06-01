//const schema = "https://bitbucket.org/haikel2090/javascript-snippets/src/7113b29490ea645ac57a3411efd0683047b1de7d/schema.json";

const BASE_URL = 'https://api.npoint.io/2704ef8189e7e722331f';

export default class SnippetsService {

  static async getSnippets () {
    let respJson;
    try {
      let resp = await fetch(BASE_URL);
      respJson = await resp.json();
    } catch (error) {
      let local = localStorage.getItem('js-snippets');
      respJson = local && local.length > 0 ? JSON.parse(local) : null;
    }
    return respJson;
  }

  static async getSnippetCode (snipCodeLink) {
    let resp = '';
    try {
      resp = await fetch(snipCodeLink).then(res => res.text())
    } catch (error) { }
    return resp;
  }

  // get from localstorage snippets / fallback call api
  static async searchSnippets (searchQuery) {
    let respJson = null;
    let local = localStorage.getItem('js-snippets');

    if (local) {
      respJson = JSON.parse(local);
    } else {
      let resp = await fetch(BASE_URL);
      respJson = await resp.json();
    }

    if (searchQuery && respJson && respJson.length > 0) {
      let q = respJson.filter(snip => snip.title.toLowerCase().includes(searchQuery));
      if (q && q.length > 0) {
        return q;
      }
    }

    return respJson;
  }

  static async searchSnippetsByLangs (searchQuery) {
    let respJson = null;
    let local = localStorage.getItem('js-snippets');

    if (local) {
      respJson = JSON.parse(local);
    } else {
      let resp = await fetch(BASE_URL);
      respJson = await resp.json();
    }

    if (searchQuery && respJson && respJson.length > 0) {
      let q = respJson.filter(snip => snip.language === searchQuery);
      if (q && q.length > 0) {
        return q;
      }
    }

    return respJson;
  }
} 