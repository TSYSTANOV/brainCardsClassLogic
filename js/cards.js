import { CATEGORIES_component } from "./categories.js"
import { app_root } from "./constanta.js"
class Cards{
    render(id){
        console.log(id)
        const section = document.createElement('section')
        section.className = 'card section-offset'
        const container = document.createElement('div')
        container.className = 'container card__container'
        const btnReturn = document.createElement('button')
        btnReturn.className = 'card__return'
        btnReturn.setAttribute('aria-label', 'Возврат к категориям')
        btnReturn.addEventListener('click',()=>{
            app_root.innerHTML = ''
            CATEGORIES_component.render()
        })

        //   <button class="card__item">
        //     <span class="card__front">улыбка</span>
        //     <span class="card__back">smile</span>
        //   </button>

        container.append(btnReturn)
        section.append(container)
        app_root.append(section)
    }
}

const CARD_component = new Cards()
export {CARD_component}