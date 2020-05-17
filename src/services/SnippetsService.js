export default class SnippetsService {

  static async getSnippets () {
    let resp = await fetch('https://api.npoint.io/2704ef8189e7e722331f');
    let respJson = await resp.json();
    return respJson
  }

  static async getSnippetCode(snipCodeLink) {
    return await fetch(snipCodeLink).then(res => res.text());
  }
} 