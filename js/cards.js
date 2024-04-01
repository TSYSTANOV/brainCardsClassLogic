import { API_component } from "./api.js";
import { CATEGORIES_component } from "./categories.js";
import { app_root } from "./constanta.js";
import { HEADER_component } from "./header.js";
class Cards {
  activeCard = 0;
  async render(id) {
    console.log(id);
    const { pairs } = await API_component.fetchCards(id);

    const section = document.createElement("section");
    section.className = "card section-offset";
    const container = document.createElement("div");
    container.className = "container card__container";
    const btnReturn = document.createElement("button");
    btnReturn.className = "card__return";
    btnReturn.setAttribute("aria-label", "Возврат к категориям");
    btnReturn.addEventListener("click", () => {
      app_root.innerHTML = "";
      CATEGORIES_component.render();
      HEADER_component.changeTitle("Категории");
    });

    container.append(this.createCard(pairs));
    container.append(btnReturn);
    section.append(container);
    app_root.append(section);
  }
  createCard(pairs) {
    const btn = document.createElement("button");
    btn.className = "card__item";
    const front = document.createElement("span");
    front.className = "card__front";
    front.textContent = pairs[this.activeCard][0];
    const back = document.createElement("span");
    back.className = "card__back";
    back.textContent = pairs[this.activeCard][1];
    btn.append(front, back);
    btn.addEventListener("click", () => {
      if (btn.classList.contains("card__item_flipped")) {
        return;
      }
      let idTimeOut = null;
      let idTimeOut2 = null;
      this.activeCard += 1;

      btn.classList.add("card__item_flipped");
      idTimeOut = setTimeout(() => {
        btn.classList.remove("card__item_flipped");
        ///
        if (this.activeCard >= pairs.length) {
          this.activeCard = 0;
          front.textContent = "THE END";
          btn.style.pointerEvents = "none";
          clearTimeout(idTimeOut, idTimeOut2);
          setTimeout(() => {
            document.querySelector(".card__return").click();
          }, 1000);
          return;
        }
        ///
        front.textContent = pairs[this.activeCard][0];
        idTimeOut2 = setTimeout(() => {
          back.textContent = pairs[this.activeCard][1];
        }, 300);
      }, 1000);
    });

    return btn;
  }
}

const CARD_component = new Cards();
export { CARD_component };
