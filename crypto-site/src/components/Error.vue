<script setup>

import { ref } from 'vue'

let show = ref(true)

</script>

<template>
    <div class="error_area" v-if="show">
        <app-icon name="warn" size="32" />
        {{ $t("main.error_warn") }}
        <button type="button" @click="show = false">
            <app-icon name="close" />
        </button>
    </div>
</template>

<style lang="scss" scoped>

.error_area {
    background-color: #F4EDF1;
    display: flex;
    align-items: center;
    padding: 8px;
    border-radius: 16px;
    color: var(--error);
    font-weight: 700;
    margin-top: 24px;

    > .icon {
        margin-right: 12px;
    }
}

button {
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    outline: none;
    background-color: transparent;
    height: 32px;
    width: 32px;
    border-radius: 8px;

    &:hover {
        background-color: #e4d7de;
    }
}

</style>