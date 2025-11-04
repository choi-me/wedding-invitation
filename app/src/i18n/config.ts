import { createI18n } from 'vue-i18n'
import ko from './locales/ko.json'
import zh from './locales/zh.json'

export type TranslationKey = keyof typeof ko

export const languages = {
	ko: '한국어',
	zh: 'Chinese',
}
export type Language = keyof typeof languages

// Type-define 'ko' as the master schema for the resource
export type MessageSchema = typeof ko

export const translations = { ko, zh } as const

const getUserLocale = () => {
	const lang = navigator.language.slice(0, 2) as Language
	return Object.keys(languages).includes(lang) ? lang : 'ko'
}
export const userLocale = getUserLocale()

export const i18n = createI18n<[MessageSchema], Language, false>({
	legacy: false,
	locale: userLocale,
	messages: {
		ko,
		zh,
	},
	warnHtmlMessage: false,
})
