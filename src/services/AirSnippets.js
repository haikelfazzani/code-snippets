import axios from 'axios';
const BASE_URL = 'https://api.airtable.com/v0/app9FBp8ae6NjnfqH/t_snippets';

export default class AirSnippets {

  static async createSnippet ({ title, description, code, image, tags, external_link, language }) {
    try {
      let resp = await axios({
        url: BASE_URL,
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + process.env.REACT_APP_AIRTABLE,
          'Content-Type': 'application/json'
        },
        data: {
          fields: {
            code,
            image,
            tags,
            description,
            title,
            external_link,
            language
          }
        }
      });
      return resp.data;
    } catch (error) {
      return null;
    }
  }

  static async getSnippet (snippetId) {
    try {
      let resp = await axios(BASE_URL + '/' + snippetId, {
        headers: {
          'Authorization': 'Bearer ' + process.env.REACT_APP_AIRTABLE
        }
      });
      return resp.data;
    } catch (error) {
      return null;
    }
  }

  static async getSnippets () {
    try {
      let resp = await axios(BASE_URL + '?maxRecords=13', {
        headers: {
          'Authorization': 'Bearer ' + process.env.REACT_APP_AIRTABLE
        }
      });
      return resp.data.records;
    } catch (error) {
      return null;
    }
  }

  static async searchSnippets (searchQuery) {
    searchQuery = searchQuery.toLowerCase();

    try {
      let resp = await axios(BASE_URL, {
        headers: {
          'Authorization': 'Bearer ' + process.env.REACT_APP_AIRTABLE
        }
      });

      return resp.data.records.filter(rs => rs.fields.title.toLowerCase().includes(searchQuery));
    } catch (error) {
      return null;
    }
  }

  static async searchSnippetsByLangs (language) {
    try {
      let resp = await axios(BASE_URL, {
        headers: {
          'Authorization': 'Bearer ' + process.env.REACT_APP_AIRTABLE
        }
      });

      return resp.data.records.filter(rs => rs.fields.language === language);
    } catch (error) {
      return null;
    }
  }
}