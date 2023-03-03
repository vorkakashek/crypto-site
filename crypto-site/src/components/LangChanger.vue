<script setup>

import { ref } from 'vue'
import { useLangSwitcher } from "@/stores/store"
// import { useI18n } from "vue-i18n";
// const { t } = useI18n();

const store = useLangSwitcher()

let open = ref(false)

const importPhoto = () => {
    console.log(`${store.lang}`)
    return new URL(`/src/assets/${store.lang}.svg`, import.meta.url).href
}

</script>

<template>
    <div class="lang_switcher" :tabindex="0" @blur="open = false">
        <div class="selected" :class="{ open: open }" @click="open = !open">
            <app-icon :name="store.lang" class="flag" />
            {{ store.lang }}
            <app-icon name="chevron-down" class="chevron" />
        </div>
        <div class="items" :class="{ selectHide: !open }">
            <div class="option" v-for="el in $i18n.availableLocales" :value="el"
                @click="store.setLang(el), store.lang = el, open = false" :class="{ disabled: el === store.lang }">
                {{ el }}
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.lang_switcher {
    position: relative;
    width: fit-content;
    text-align: left;
    outline: none;
    margin-left: auto;

    .selected {
        border-radius: 6px;
        display: flex;
        align-items: center;
        color: var(--main_tint_1);
        text-transform: uppercase;
        font-weight: 700;
        font-size: 12px;
        padding: 8px 4px 8px 8px;
        cursor: pointer;
        user-select: none;

        > svg {
            margin-right: 4px;

            &.flag {
                border-radius: 100%;
                border: 1px solid var(--bg);
            }
        }

        &.open {
            background-color: var(--hover_bg);
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;

            .chevron {
                transform: rotate(180deg);
            }
        }

        &:hover {
            background-color: var(--hover_bg);
        }
    }

    .items {
        color: #fff;
        border-radius: 0px 0px 6px 6px;
        overflow: hidden;
        position: absolute;
        background-color: var(--main_tint_1);
        left: 0;
        right: 0;
        z-index: 1;

        >* {
            color: #fff;
            padding: .5rem 1rem;
            text-align: center;
            cursor: pointer;
            user-select: none;
            text-transform: uppercase;
            font-weight: 500;
            font-size: 12px;
            color: var(--hover_bg);

            &:hover {
                background-color: var(--main_tint_2);
            }
        }
    }
}

.option {
    &.disabled {
        // color: var(--main_tint_1);
        background-color: var(--main_tint_2);
        color: var(--main_tint_1);
        user-select: none;
        pointer-events: none;
    }
}

.selectHide {
    display: none;
}
</style>