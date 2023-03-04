
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
            min_withdraw: "Мин. сумма вывода",
            button: "Вывести средства",
            header: ["Дата", "Сумма, XMR", "Статус"],
        },
        statistics: {
            label: "Статистика системы",
            tab_names: ["Лидеры заработка", "Выплаченнные средства"],
            header_1: ["ID", "Сегодня, XMR", "За неделю, XMR", "За месяц, XMR"],
            header_2: ["ID", "Сумма, XMR", "Дата", "Время"],
            online: "Онлайн",
        },
        status: {
            progress: "В процессе",
            error: "Ошибка",
            success: "Выполнено",
        },
        footer: {
            contacts: "Контакты",
            business_inquiries: "Бизнес-запросы",
            support: "Поддержка",
            documents: "Документы",
            terms_and_conditions: "Условия использования",
            privacy: "Политика конфиденциальности",
            aml: "AML и CTF политика"
        },
        modal: {
            tab_names: ["Логин", "Регистрация"],
            terms: "Я подтверждаю, что ознакомлен(-а) с {0}, и, что я достиг совершеннолетия и не являюсь гражданином США.",
            tos: "Пользовательским соглашением",
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
            min_withdraw: "Minimum withdraw",
            button: "Withdraw",
            header: ["Date", "Summary, XMR", "Status"],
        },
        statistics: {
            label: "System statistics",
            tab_names: ["Top performers", "Paid out"],
            header_1: ["ID", "Today, XMR", "The week, XMR", "The month, XMR"],
            header_2: ["ID", "Amount, XMR", "Date", "Time"],
            online: "Online",
        },
        status: {
            progress: "In progress",
            error: "Error",
            success: "Success",
        },
        footer: {
            contacts: "Contacts",
            business_inquiries: "Business inquiries",
            support: "Support",
            documents: "Documents",
            terms_and_conditions: "Terms and conditions",
            privacy: "Privacy & Cokies Policy",
            aml: "AML & CTF Policy",
        },
        modal: {
            tab_names: ["Login", "Registration"],
            terms: `I confirm that I have read, accepted and agreed to all {0}, that I am of legal age, and I am not specified as a US person.`,
            tos: "Terms of Use",
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