//const schema = "https://bitbucket.org/haikel2090/javascript-snippets/src/7113b29490ea645ac57a3411efd0683047b1de7d/schema.json";

export default class SnippetsService {

  static async getSnippets () {
    let respJson;
    try {
      let resp = await fetch('https://api.npoint.io/2704ef8189e7e722331f');
      respJson = await resp.json();
    } catch (error) {
      let local = localStorage.getItem('js-snippets');
      respJson = JSON.parse(local);
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
} 