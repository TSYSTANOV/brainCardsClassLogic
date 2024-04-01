import { CATEGORIES_component } from "./categories.js";
import { app_root, header_root } from "./constanta.js";
import { EDIT_component } from "./editCategory.js";

class Header {
  render() {
    const container = document.createElement("div");
    container.className = "container header__container";
    container.innerHTML = `
        <h2 class="header__subtitle">Категории</h2>
        <button class="header__btn">Добавить категорию</button>
        `;
    const logoLink = document.createElement("a");
    logoLink.className = "header__logo-link";
    logoLink.innerHTML = `<img
        class="header__logo"
        src="img/logo.svg"
        alt="Логотип сервиса Brain Cards"
      />`;
    logoLink.addEventListener("click", () => {
      this.changeTitle("Категории");
      app_root.innerHTML = "";
      CATEGORIES_component.render();
    });
    container.prepend(logoLink);
    header_root.append(container);
    this.addListener(container);
  }
  addListener(HTMLelement) {
    HTMLelement.addEventListener("click", () => {
      if (!event.target.classList.contains("header__btn")) {
        return;
      }
      CATEGORIES_component.removeCategories();
      EDIT_component.renderNewCategory();
      this.changeTitle("Добавление новой категории");
    });
  }
  changeTitle(title) {
    document.querySelector(".header__subtitle").textContent = title;
  }
}

const HEADER_component = new Header();
export { HEADER_component };
