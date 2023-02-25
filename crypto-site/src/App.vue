<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navigation from "./components/Navigation.vue";
// import HelloWorld from "./components/HelloWorld.vue";

let data = [
  {
    id: '368-231-521',
    name: 'Петров Петр Петрович',
    transactions: [
      {
        date: '20.01.2022',
        summ: '100',
      }
    ]
  },
  {
    id: '123-553-000',
    name: 'Иванов Иван Иваныч',
    transactions: [
      {
        date: '20.01.2022',
        summ: '100',
      }
    ]
  },
]

</script>

<template>
  <Navigation />
  <!-- <header>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

      <div class="wrapper">
        <HelloWorld msg="You did it!" />

          <nav>
              <RouterLink to="/">Home</RouterLink>
              <RouterLink to="/about">About</RouterLink>
            </nav>
          </div>
        </header> -->

  <RouterView />
  <div class="div" >
    <div v-for="item in data">{{ item.transactions }}</div>
  </div>
</template>

<style lang="scss">
:root {
  --bg: #F4F5FA;
  --light: #808693;
}

* {
  box-sizing: border-box;
}

body,
html {
  background-color: var(--bg);
}

#app {
  display: block;
}

.content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 16px;
}

button {
  cursor: pointer;
}

.div {
  margin-top: 200px;
}
</style>
