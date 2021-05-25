

export const getRightTextValue = (value) => {
    switch (value) {
        case 'RU': {
            return "руб."
            break
        }
        case 'US': {
            return "дол."
            break
        }
        case 'EU': {
            return "евр."
            break
        }
        case 'UA': {
            return "грн."
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

