<script setup>

import { ref } from 'vue'

let selected = ref('ru')

</script>

<template>
    <div class="lang_change">
        <select v-model="selected">
            <option value="ru">Ru</option>
            <option value="eng">Eng</option>
        </select>
    </div>
</template>

<style lang="scss">
.lang_change {
    margin-left: auto;
}
</style>