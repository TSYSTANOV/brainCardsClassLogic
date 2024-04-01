import { app_root } from "./constanta.js";
import { API_component } from "./api.js";
import { EDIT_component } from "./editCategory.js";
import { CARD_component } from "./cards.js";
import { HEADER_component } from "./header.js";

class Categories {
  async render() {
    const dataCards = await API_component.fetchCategories();
    const section = document.createElement("section");
    section.className = "category section-offset";
    const container = document.createElement("div");
    container.className = "container";

    const categoryList = document.createElement("ul");
    categoryList.className = "category__list";

    const categoryItems = dataCards.map((item) => {
      const li = document.createElement("li");
      li.className = "category__item";
      li.dataset.id = `${item.id}`;

      const btnCard = document.createElement("button");
      btnCard.className = "category__card";
      btnCard.innerHTML = `
            <span class="category__title">${item.title}</span>
            <span class="category__pairs">${item.length} пар</span>`;

      btnCard.addEventListener("click", () => {
        this.removeCategories();
        HEADER_component.changeTitle("Карточки");
        CARD_component.render(event.target.closest(`[data-id]`).dataset.id);
      });
      const btnEdit = document.createElement("button");
      btnEdit.className = "category__btn category__edit";
      btnEdit.setAttribute("aria-label", "редактировать");
      btnEdit.addEventListener("click", () => {
        this.removeCategories();
        HEADER_component.changeTitle("Изменение категории");
        EDIT_component.renderNewCategory(item.id);
      });
      const btnDel = document.createElement("button");
      btnDel.className = "category__btn category__del";
      btnDel.setAttribute("aria-label", "удалить");
      btnDel.addEventListener("click", () => {
        const title =
          event.target.parentNode.querySelector(".category__title").textContent;
        if (confirm(`Вы действительно хотите удалить категорию - ${title} ?`)) {
          API_component.fetchDeleteCategory(event.target.parentNode.dataset.id);
          setTimeout(() => {
            app_root.innerHTML = "";
            CATEGORIES_component.render();
          }, 1000);
        }
      });
      li.append(btnCard, btnEdit, btnDel);
      return li;
    });

    categoryList.append(...categoryItems);
    container.append(categoryList);
    section.append(container);
    app_root.append(section);
  }
  removeCategories() {
    app_root.innerHTML = "";
  }
}

const CATEGORIES_component = new Categories();
export { CATEGORIES_component };
