import { API_component } from "./api.js";
import { CATEGORIES_component } from "./categories.js";
import { app_root } from "./constanta.js";
import { HEADER_component } from "./header.js";

class EditCategory {
  async renderNewCategory(id) {
    let data = null;
    if (id) {
      data = await API_component.fetchCards(id);
    }
    const section = document.createElement("section");
    section.className = "edit section-offset";
    section.innerHTML = `  
        <div class="container edit__container">
        <h2
          class="edit__title"
          contenteditable="true"
          title="Можно редактировать"
        >${data ? data.title : "Введите новую категорию"}</h2>
        <table class="edit__table table">
          <thead>
            <tr>
              <th class="table__cell">main</th>
              <th class="table__cell">second</th>
              <th class="table__cell"></th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>`;
    const btnContainer = document.createElement("div");
    btnContainer.className = "edit__btn-wrapper";
    btnContainer.innerHTML = `
      <button class="edit__btn edit__add-row">Добавить пару</button>
          <button class="edit__btn edit__save" data-id="${data ? data.id : ""}">
            Сохранить категорию
          </button>
        <button class="edit__btn edit__cancel">Отмена</button>
      `;

    section.append(btnContainer);
    if (data) {
      const pairs = data.pairs.map((item) => {
        return this.renderCells(item);
      });
      section.querySelector("tbody").append(...pairs);
    } else {
      section.querySelector("tbody").append(this.renderCells());
    }
    app_root.append(section);
    this.addListener(btnContainer);
  }
  addListener(HTMLelement) {
    HTMLelement.addEventListener("click", () => {
      if (event.target.classList.contains("edit__cancel")) {
        app_root.innerHTML = "";
        CATEGORIES_component.render();
        HEADER_component.changeTitle("Категории");
      }
      if (event.target.classList.contains("edit__add-row")) {
        app_root.querySelector("tbody").append(this.renderCells());
      }
      if (event.target.classList.contains("edit__save")) {
        if (event.target.dataset.id.length !== 0) {
          const title = app_root
            .querySelector(".edit__title")
            .textContent.trim();
          const id = event.target.dataset.id;
          const pairs = this.mergeCells(app_root.querySelector("tbody"));
          const obj = { title, id, pairs };
          API_component.fetchEditCategory(id, obj);
        } else {
          const title = app_root
            .querySelector(".edit__title")
            .textContent.trim();
          const pairs = this.mergeCells(app_root.querySelector("tbody"));
          if (pairs) {
            const obj = { title, pairs };
            API_component.fetchCreateCategory(obj);
          } else {
            console.log("Заполните все данные");
          }
        }
        setTimeout(() => {
          HEADER_component.changeTitle("Категории");
          app_root.innerHTML = "";
          CATEGORIES_component.render();
        }, 1000);
      }
    });
  }
  renderCells(pairs) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td class="table__cell table__cell_one" contenteditable="true">${
              pairs ? pairs[0] : ""
            }</td>
            <td class="table__cell table__cell_two" contenteditable="true">${
              pairs ? pairs[1] : ""
            }</td>
        `;
    const td = document.createElement("td");
    td.className = "table__cell";
    const btnDel = document.createElement("button");
    btnDel.className = "table__del";
    btnDel.textContent = "x";
    btnDel.addEventListener("click", () => {
      tr.remove();
    });
    td.append(btnDel);
    tr.append(td);
    return tr;
  }
  mergeCells(HTMLelement) {
    let pairs = [];
    HTMLelement.querySelectorAll("tr").forEach((item) => {
      const first =
        item.children[0].textContent.length !== 0
          ? item.children[0].textContent
          : null;
      const second =
        item.children[1].textContent !== 0
          ? item.children[1].textContent
          : null;
      if (first && second) {
        pairs.push([first, second]);
      } else {
        pairs = null;
      }
    });
    return pairs;
  }
}

const EDIT_component = new EditCategory();
export { EDIT_component };
