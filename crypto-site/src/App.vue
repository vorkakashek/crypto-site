<script setup>
import { onMounted } from 'vue'
import { RouterView } from "vue-router"
import { useUser } from "@/stores/store";
import axios from "redaxios";
import Navigation from "./components/Navigation.vue"
import Footer from "./components/Footer.vue"

let storeUser = useUser()

onMounted(() => {
  if (!localStorage.getItem("token")) {
    axios
      .post("https://fatpockets.io/api/v1/init")
      .then((res) => {
        if (res.data.success) {
          // console.log(res.data)
          storeUser.setUserId(res.data.user.id);
          let mining = res.data.user.mining;
          storeUser.setUserXmr({
            session: mining.balance_session.xmr,
            total: mining.balance_total.xmr,
            current: mining.balance_current.xmr,
            profit: "0.00000000000",
          });
          storeUser.setUserUsd({
            session: mining.balance_session.usd,
            total: mining.balance_total.usd,
            current: mining.balance_current.usd,
            profit: "0.00000000000",
          });
          localStorage.setItem("token", res.data.token);
        }
      })
      .catch((err) => {
        alert("Гостевой аккаунт не доступен, попробуйте зарегистрироваться или обновить страницу комбинацией клавиш Ctrl + F5")
        // console.log(err)
      });
  }
})


</script>

<template>
  <div id="modal"></div>
  <Navigation />
  <RouterView />
  <Footer />
</template>

<style lang="scss">
:root {
  --bg: #F4F5FA;
  --light: #808693;
  --main: #42454B;
  --main_tint_1: #ACACC8;
  --main_tint_2: #70748D;

  --blue: #037BF5;

  --hover_bg: #F6F6F6;

  --error: #F15744;
}

* {
  box-sizing: border-box;
  letter-spacing: .02rem;
  font-family: 'TT Norms Pro';
  font-size: 14px;

  @include r (sm) {
    font-size: 12px;
  }
}

* :not(svg *) {
  transition: .1s ease;
}

main {
  margin-bottom: 60px;
}

body,
html {
  background-color: var(--bg);
  margin: 0;
  color: var(--main);
  font-family: 'TT Norms Pro';
  overflow-y: auto;
  overflow-x: hidden;
}

#app {
  // display: block;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

button {
  cursor: pointer;
}

h1,
h2,
h3 {
  color: var(--main);
}

h1 {
  font-size: 36px;
  font-weight: 700;
}

h2 {
  font-size: 20px;
  font-weight: 700;
}

h3 {
  font-size: 20px;
  font-weight: 500;
}
</style>
