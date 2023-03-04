<script setup>
import { ref, onMounted } from 'vue'
import { useUser } from "@/stores/store"
import { useModal } from "@/stores/store"
import LangChanger from "@/components/LangChanger.vue";
import ModalConstructor from '@/components/Modal/ModalConstructor.vue'

// let modal = ref()

// onMounted(() => {
//   modal.value.show()
// })


const store = useUser(),
    modalStore = useModal()


let logged = ref(true),
    profile_id = ref('368-231-521')

let logout = () => {
    logged.value = false
}

let show_area = ref(false)

</script>


<template>
    <ModalConstructor />
    <nav>
        <div class="container">
            <router-link to="/">
                <!-- <img src="@/assets/Logo.svg" alt=""> -->
                <app-icon name="logo" class="logo" />
            </router-link>
            <LangChanger />
            <div class="area_login" v-if="!store.loggedIn" :class="{ show: show_area }">
                <button type="button" class="btn_sign_up" @click="modalStore.show(), modalStore.setTab(1)">{{ $t("main.sign_up") }}</button>
                <hr>
                <button type="button" class="btn_sign_in" @click="modalStore.show(), modalStore.setTab(0)">{{ $t("main.sign_in") }}</button>
            </div>

            <div class="area_profile" v-if="store.loggedIn" :class="{ show: show_area }">
                <div class="profile_id">
                    <span>{{ $t("main.profile_id_label") }}: </span> {{ profile_id }}
                </div>
                <hr>
                <button type="button" class="log_out" @click="store.setLoggedIn(false)">
                    <app-icon name="logout" />
                </button>
            </div>

            <button type="button" class="user_mob" @click="show_area = !show_area" :class="{ active: show_area }">
                <app-icon name="user" size="34" />
            </button>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
#form_error {
    color: var(--red)
}

.logo {
    width: 111px;
    display: block;
    height: 32px;
}

nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    height: 56px;
    display: flex;
    align-items: center;
    z-index: 999;
}

.container {
    width: 100%;
    display: flex;
    align-items: center;
}

.user_mob {
    background: transparent;
    border: none;
    display: none;
    padding: 0;

    @include r (h) {
        display: block;
    }

    .icon {
        transition: all .2s cubic-bezier(0.455, 0.03, 0.515, 0.955);
    }

    &.active {
        .icon {
            transform: scale(.8);
        }
    }
}

.area_ {
    &login {
        display: flex;
        align-items: center;
    }

    &profile {
        display: flex;
        align-items: center;

        >button,
        .profile_id {
            margin: 0 16px;
        }
    }
}

[class*="area_"] {
    hr {
        display: block;
        width: 2px;
        height: 16px;
        background-color: var(--light);
        background-color: #d5d7db;
        opacity: .5;
        border: none;
        border-radius: 100px;
    }

    @include r (h) {
        position: absolute;
        top: 100%;
        width: 100%;
        background-color: rgba(255, 255, 255, 0.85);
        backdrop-filter: blur(16px);
        left: 0;
        padding: 8px 0;
        display: none;

        &.show {
            display: flex;
        }
    }
}

[class*="btn_sign_"] {
    background-color: transparent;
    border: none;
    font-weight: 700;
    color: #000D28;
    opacity: .5;
    letter-spacing: 0;
    margin: 0 16px;
    padding: 0;
    font-size: 14px;

    &:hover {
        opacity: 1;
    }
}


.log_out {
    margin: 0;
    margin-right: 0 !important;
    border-radius: 12px;
    height: 38px;
    width: 38px;
    outline: none;
    border: none;
    background-color: transparent;
    border: 1px solid var(--hover_bg);
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: var(--hover_bg);
    }

    @include r (h) {
        margin-right: 8px !important;
        border-color: #70748D;
    }
}

.profile_id {
    font-weight: 700;
    color: var(--light);
    font-size: 14px;
    display: flex;
    align-items: center;

    span {
        font-weight: 400;
        margin-right: 8px;
    }

    @include r (h) {}
}
</style> 