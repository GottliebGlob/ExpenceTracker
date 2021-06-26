import i18n from "../locales";

export const getRightTextValue = (value) => {
    switch (value) {
        case 'RU': {
            return i18n.t("money.ru")
            break
        }
        case 'US': {
            return i18n.t("money.us")
            break
        }
        case 'EU': {
            return i18n.t("money.eu")
            break
        }
        case 'UA': {
            return i18n.t("money.ua")
            break
        }
        default: return ''
    }
}

export const getRightSignValue = (value) => {
    switch (value) {
        case 'RU': {
            return "\u20BD"
            break
        }
        case 'US': {
            return "\u0024"
            break
        }
        case 'EU': {
            return "\u20AC"
            break
        }
        case 'UA': {
            return "\u20B4"
            break
        }
        default: return ''
    }
}

