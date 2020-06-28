import { evalConsole } from "./console";
import axios from "axios";

export default class RunCode {

  static async run (language, editorVal) {

    switch (language) {
      case 'javascript':
        let jsresult = await evalConsole(editorVal);
        return jsresult

      case 'python':
        let presult = await evalConsole(editorVal);
        return presult

      case 'go':
        var bodyFormData = new FormData();
        bodyFormData.append('version', 2);
        bodyFormData.append('body', editorVal);
        bodyFormData.append('withVet', true);

        let goresult = await axios({
          url: 'https://play.golang.org/compile',
          method: 'POST',
          headers: { 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' },
          data: bodyFormData
        });

        return goresult.data.Errors || goresult.data.Events[0].Message

      default:
        break;
    }
  }

}