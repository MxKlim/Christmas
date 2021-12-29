import './initPage.scss'
import selectPage from '../../page/header/header'

const start:HTMLElement = document.querySelector('.start-game');
start.addEventListener('click', (e)=>{
    selectPage(e)
})
export {start};