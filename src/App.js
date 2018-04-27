import { get } from "axios";

import { InitTest } from "./InitTest";

import { Page } from "./Page";
import { ActionContract } from "./ActionContract";

class Reg extends Page {
  setup(body) {
    let button = body.querySelector(".proceed");
    button.onclick = (e) => {
      e.preventDefault();
      this.gp("reg_data");
    }
  }
}

class RegData extends Page {
  setup(body) {
    let button = body.querySelector(".signin");

    button.onclick = (e) => {
      e.preventDefault();
      this.gp("init_test");
    }
  }
}

class Video extends Page {

}

class StatusPage extends Page {

}

export class App {
  constructor() {
    this.rootElement = document.getElementById("root");
  }

  init() {
    const pageKeys = [
      "reg",
      "reg_data",
      "init_test",
      "action_contract",
      "video",
      "status"
    ];

    return Promise.all(pageKeys.map(p => {
      return get(`templates/${p}.html`).then(data => {
        let instance;
        switch (p) {
          case "reg":
            instance = new Reg(this, data.data);
            break;
          case "reg_data":
            instance = new RegData(this, data.data);
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

      if (window.location.hash && this.pages[window.location.hash.slice(1)]) {
        this.pages[window.location.hash.slice(1)].render();
      } else {
        this.pages.reg.render();
      }
      this.rootElement.classList.add("visible");

      return res;
    });
  }
}
