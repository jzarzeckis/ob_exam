import { get } from "axios";

class Page {
  constructor(app, template) {
    this.app = app;
    this.template = template;
  }
  render() {
    this.app.rootElement.innerHTML = this.template;
    this.setup(this.app.rootElement.innerHTML);
  }
  setup() {}
}

class Reg extends Page {
  setup(body) {

  }
}

class InitTest extends Page {

}

class ActionContract extends Page {

}

class Video extends Page {

}

class StatusPage extends Page {

}

export class App {
  constructor() {
    this.rootElement = document.getElementById("root")

    

  }

  init() {
    const pageKeys = [
      "reg",
      "init_test",
      "action_contract",
      "video",
      "status"
    ]

    return Promise.all(pageKeys.map(p => {
      return get(`templates/${p}.html`).then(data => {
        let instance;
        switch (p) {
          case "reg":
            instance = new Reg(this, data.data);
            break;
          case "init_test":
            instance = new InitTest(this, data.data);
            break;
          case "action_contract":
            instance = new ActionContract(this, data.data);
            break;
          case "video":
            instance = new Video(this, data.data);
            break;
          case "status":
            instance = new StatusPage(this, data.data);
            break;
          default:
            break;
        }

        return {
          key: p,
          instance: instance
        }
      });
    })).then(pages => {
      const res = {};
      for (let page of pages) {
        res[page.key] = page.instance;
      }

      this.pages = res;

      this.pages.reg.render();

      return res;
    });
  }
}
