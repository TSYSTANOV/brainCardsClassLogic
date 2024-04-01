import { CATEGORIES_component } from "./categories.js";
import { header_root } from "./constanta.js";
import { EDIT_component } from "./editCategory.js";

class Header{
    render(){
        const container = document.createElement('div')
        container.className = 'container header__container'
        container.innerHTML = `
        <a class="header__logo-link" href="#">
          <img
            class="header__logo"
            src="img/logo.svg"
            alt="Логотип сервиса Brain Cards"
          />
        </a>
        <h2 class="header__subtitle">Категории</h2>
        <button class="header__btn">Добавить категорию</button>
        `
        header_root.append(container)
        this.addListener(container)
    }
    addListener(HTMLelement){
        HTMLelement.addEventListener('click',()=>{
            if(!event.target.classList.contains('header__btn')){
                return
            }
            CATEGORIES_component.removeCategories()
            EDIT_component.renderNewCategory()
        })
    }
}

const HEADER_component = new Header()
export {HEADER_component}