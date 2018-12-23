import App from './js/main'
import './css/index.scss'

App.init({
    tabBtnNames: {
        "background": "背景",
        "Items1": "家具",
        "Items2": "人物",
        "Items3": "猫",
        "Items4": "狗",
    },
    backgroundSetable: true,
    backgroundGroupName: 'background',
    rotatable: false,
    scalable: false
})