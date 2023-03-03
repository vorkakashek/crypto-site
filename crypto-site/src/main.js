
import { createPinia } from "pinia"
import { createApp, watch } from "vue"
import { createI18n } from 'vue-i18n'
import { useLangSwitcher } from '@/stores/store'
import * as Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import VueApexCharts from "vue3-apexcharts";


import App from "./App.vue"
import router from "./router"

import AppIcon from "./components/AppIcon.vue";

import "./assets/main.css"

const content = {
    ru: {
        main: {
            search_placeholder: "Поисковой запрос",
            search_tip_list: ["Майнинг выгодно", "Майнинг 2023", "Monero криптовалюта"],
            error_warn: "Не закрывайте страницу, чтобы продолжать майнить",
            profile_id_label: "Ваш ID",
            sign_in: "Логин",
            sign_up: "Регистрация",
            day: 'день',
            miner_statistics_label: 'Прибл. награда',
            miner_statistics_label_session: 'За сессию',
            miner_statistics_label_time: 'За все время',
            miner_balance: "Ваш баланс",
            miner_power: "Мощность майнинга",
            msg_let_sing_up_1: "Зарегистрируйтесь",
            msg_let_sing_up_2: ", чтобы начать выводить средства",
        },
        banner: {
            title: "Установи расширение",
            desc: "из Chrome Web Store на свой компьютер и увеличить скорость майнинга в 3 раза",
            button: "Установить",
        },
        miner: {
            start: "Старт",
            stop: "Стоп",
            withdraw: "Вывод",
            approx: "Примерно",
            min_withdraw: "Мин. сумма вывода",
            speed: "Хэшей / сек",
            button: "Больше скорости",
        },
        history: {
            label: "Ваши транзакции",
        }
    },
    en: {
        main: {
            search_placeholder: "Search request",
            search_tip_list: ["Mining good", "Mining 2023", "Monero cryptocurrency"],
            error_warn: "Don't close the page, to continue mining",
            profile_id_label: 'Your ID',
            sign_in: "Sign In",
            sign_up: "Sign Up",
            day: 'day',
            miner_statistics_label: 'Miner statistics',
            miner_statistics_label_session: 'For session',
            miner_statistics_label_time: 'For all time',
            miner_balance: "Your balance",
            miner_power: "Miner power",
            msg_let_sing_up_1: "Sign up",
            msg_let_sing_up_2: ", to start mining up",
        },
        banner: {
            title: "Install extension",
            desc: "from the Chrome Web Store to your computer and increase your mining speed by 3 times",
            button: "Install",
        },
        miner: {
            start: "Start",
            stop: "Stop",
            withdraw: "Withdraw",
            approx: "Approximately",
            min_withdraw: "Minimum withdraw",
            speed: "Hash / sec",
            button: "More speeds",
        },
        history: {
            label: "Your transactions",
        }
    }
}

const i18n = createI18n({
    globalInjection: true,
    global: true,
    legacy: false,
    locale: 'ru',
    fallbackLocale: 'en',
    availableLocales: ["ru", "en"],
    messages: content,
})

const app = createApp(App)

app.use(createPinia())
    .use(router)
    .use(VueAxios, axios)
    .use(i18n)
    .use(VueApexCharts)
    .component('app-icon', AppIcon)
    .component('VueSlider', VueSlider)
    .mount("#app")

const langSwitcher = useLangSwitcher()
i18n.global.locale.value = langSwitcher.lang

watch(() => langSwitcher.lang, (locale) => {
    i18n.global.locale.value = langSwitcher.lang
    console.log('✨ Language changed: ' + langSwitcher.lang)
})