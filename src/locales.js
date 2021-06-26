import * as Localization from 'expo-localization'
import i18n from 'i18n-js'

i18n.defaultLocale = 'en'
i18n.fallbacks = true

export const loadLocale = async () => {
    for (const locale of Localization.locales) {
        if (i18n.translations[locale.languageCode] !== null) {
            i18n.locale = Localization.locale;
            console.log(i18n.locale)
            switch (i18n.locale) {
                case 'ru-RU':
                    import('./locales/ru.json').then(ru => {
                        i18n.translations = { ru }
                    })
                    break
                case 'uk':
                    import('./locales/ru.json').then(ru => {
                        i18n.translations = { ru }
                    })
                    break
                case 'be':
                    import('./locales/ru.json').then(ru => {
                        i18n.translations = { ru }
                    })
                    break
                default:
                case 'en':
                    import('./locales/en.json').then(en => {
                        i18n.translations = { en }
                    })
                    break
            }
            break
        }
    }
}

export default i18n
