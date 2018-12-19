import App from './js/main'
import data from './data'
import './css/index.scss'
console.log(data)
App.init({
    tabBtnNames: {
        "Items1": "家具",
        "Items2": "人物",
        "Items3": "猫",
        "Items4": "狗",
    },
    rotatable: false,
    scalable: false
})