export class Page {
  constructor(app, template) {
    this.app = app;
    this.template = template;
  }
  render() {
    this.app.rootElement.innerHTML = this.template;
    this.setup(this.app.rootElement);
  }
  setup() {}
  gp(page) {
    window.location.hash = page;
    this.app.rootElement.classList.remove("visible");
    setTimeout(() => {
      this.app.pages[page].render();
      this.app.rootElement.classList.add("visible");
    }, 500)
  }
}