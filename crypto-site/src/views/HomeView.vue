<script setup>

import Search from "@/components/Search.vue";
import Error from "@/components/Error.vue";
import Banner from "@/components/Banner.vue";
import Miner from "@/components/Miner.vue";
import History from "@/components/History.vue";

</script>

<template>
  <main>
    <div class="container">
      <!-- <div>{{ $t("message.hello") }}</div>
        <div>язык: {{ $i18n.locale }}</div> -->
      <Search />
      <Error />
      <Banner type="horizontal" />
      <div class="row">
        <div class="col-12 col-lg-2">
          <Banner type="vertical" />
        </div>
        <div class="col-12 col-xl-8">
          <Miner />
        </div>
        <div class="col-12 col-lg-2">
          <Banner type="vertical" />
        </div>
      </div>
      <Banner type="horizontal" />
      <History />
    </div>
  </main>
</template>

<style lang="scss">
main {
  margin-top: 56px;
}</style>
