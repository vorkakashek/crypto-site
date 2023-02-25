<script setup>
import { ref } from 'vue'
import LangChanger from "@/components/LangChanger.vue";

let logged = ref(true)
let profile_id = ref('368-231-521')



</script>


<template>
    <nav>
        <div class="content">
            <router-link to="/">
                <img src="@/assets/Logo.svg" alt="">
            </router-link>
            <LangChanger />
            <div class="area_login" v-if="!logged">
                <button type="buton">Регистрация</button>
                <button type="buton">Логин</button>
            </div>

            <div class="area_profile" v-if="logged">
                <div class="profile_id">
                    <span>Ваш ID: </span> {{ profile_id }}
                </div>
                <button type="button" class="log_out" @click="logout">Выйти</button>
                <button type="button" class="user_mob">
                    <img src="@/assets/user.svg" alt="">
                </button>
            </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    height: 56px;
    display: flex;
    align-items: center;
}

.content {
    width: 100%;
    display: flex;
    align-items: center;
}

.user_mob {
    background: transparent;
    border: none;
    display: none;
}

.area_ {
    margin: 0 -16px;
    margin-left: 16px;

    &login {}

    &profile {
        display: flex;
        align-items: center;

        >* {
            margin: 0 16px;
        }
    }
}

.profile_id {
    font-weight: 700;
    color: var(--light);
    span {
        font-weight: 400;
    }
}
</style> 