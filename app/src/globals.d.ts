/**
 * you need to import the some interfaces
 */
import { DefineDateTimeFormat, DefineLocaleMessage, DefineNumberFormat } from 'vue-i18n'
import { MessageSchema } from './i18n'

declare global {
	interface Window {
		Kakao: any
		kakao: any
	}
}

declare module 'vue-i18n' {
	// define the locale messages schema
	export interface DefineLocaleMessage extends MessageSchema {}

	// define the datetime format schema
	export interface DefineDateTimeFormat {
		short: {
			hour: 'numeric'
			minute: 'numeric'
			second: 'numeric'
			timeZoneName: 'short'
			timezone: string
		}
	}

	// define the number format schema
	export interface DefineNumberFormat {
		currency: {
			style: 'currency'
			currencyDisplay: 'symbol'
			currency: string
		}
	}
}
