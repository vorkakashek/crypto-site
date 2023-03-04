<script setup>
import { RouterView } from "vue-router"
import Navigation from "./components/Navigation.vue"
import Footer from "./components/Footer.vue"

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
  display: block;
}

button {
  cursor: pointer;
}

.div {
  margin-top: 200px;
}
</style>
