import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'


export const useLangSwitcher = defineStore('langSwitcher', {
    state: () => ({
        lang: useStorage('lang', 'ru'),
    }),
    actions: {
        setLang(lang) {
            this.lang = lang
        },
    }
})

export const useUser = defineStore('user', {
    state: () => ({
        loggedIn: useStorage('loggedIn', false),
    }),
    actions: {
        setLoggedIn(loggedIn) {
            this.loggedIn = loggedIn
        },
    }
})