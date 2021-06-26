import i18n from "./locales"
import * as Localization from 'expo-localization'

let names = []

if (Localization.locale === ('ru-RU' || 'uk' || 'be')) {
    names = [
        "Общие",
        "Платежи",
        "Внешний вид",
        "Образование",
        "Дом",
        "Хобби",
        "Семья",
        "Здоровье",
        "Транспорт",
        "Быт",
        "Животные",
        "Развлечения",
        "Еда",
        "Красота",
        "Подарки"]
}
else {
 names = [
     "general",
     "payments",
     "appearance",
     "education",
     "house",
     "hobby",
     "people",
     "health",
     "transport",
     "utility",
     "animals",
     "entertainment",
     "food",
     "beauty",
     "gifts"]
}



export const defaultColors = {
    white: '#fff',
    cats: {
        general: {color: '#000000', icon: "ios-cart", name: names[0] },
        payments: {color: '#4e342e', icon: "ios-wallet", name: names[1]},
        appearance: {color: '#4E0D3A', icon: "ios-shirt", name: names[2]},
        education: {color: '#1a237e', icon: "ios-school", name: names[3]},
        house: {color: '#1b5e20', icon: "ios-home", name: names[4]},
        hobby: {color: '#880e4f', icon: "ios-color-palette", name: names[5]},
        people: {color: '#01579b', icon: "ios-people", name: names[6]},
        health: {color: '#b71c1c', icon: "ios-pulse", name: names[7]},
        transport: {color: '#e65100', icon: "ios-car", name: names[8]},
        utility: {color: '#6D6E71', icon: "build", name: names[9]},
        animals: {color: '#F39629', icon: "paw", name: names[10]},
        entertainment: {color: '#64dd17', icon: "game-controller", name: names[11]},
        food: {color: '#fbc02d', icon: "ios-cafe", name: names[12]},
        beauty: {color: '#00DC7D', icon: "brush", name: names[13]},
        gifts: {color: '#64b5f6', icon: "ios-gift", name: names[14]},




    },


}

export const DarkTheme = {
    dark: true,
    colors: {
        confirm: '#008b00',
        error: '#b71c1c',
        dark: '#17181f',
        primary: '#0e1621',
        light: '#616161',
        text: '#c4cad0',
        white: '#fff',
        accent: '#282e3b',
        border: '#282e3b',
        background: '#17212b',
        headertext: '#dadada',
        sign: '#3e546a',
        icon: '#282e3b'

    },
};

export const LightTheme = {
    dark: false,
    colors: {
        confirm: '#008b00',
        error: '#B00020',
        dark: '#616161',
        primary: '#cfcfcf',
        text: '#000000',
        light: '#fff',
        white: '#fff',
        accent: '#eeeeee',
        border: '#cfcfcf',
        background: '#fff',
        headertext: '#fff',
        sign: '#000000',
        icon: '#fff'

    },
};
