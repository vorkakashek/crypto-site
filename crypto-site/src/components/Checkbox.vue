<script setup>

import { ref, computed } from 'vue'
import { useModal } from "@/stores/store"

const store = useModal()

let props = defineProps({
    text: {
        type: String,
        required: false,
        default: '',
    },
    required: {
        type: Boolean,
        required: false,
        default: true,
    }
})

let checkbox = ref(false)

</script>

<template>
    <label class="custom_input">
        <div :class="[{ checked: checkbox }, 'checkbox']">
            <input type="checkbox" v-model="checkbox" :required="required">
        </div>
        <i18n-t keypath="modal.terms" tag="p" scope="global">
            <RouterLink to="/terms" @click="store.hide()">{{ $t('modal.tos') }}</RouterLink>
        </i18n-t>
    </label>
</template>

<style lang="scss" scoped>
.custom_input {
    display: flex;
    align-items: flex-start;

    p {
        margin-top: 0;
        margin-left: 12px;
        font-size: 12px;
        letter-spacing: .02rem;
        line-height: 1.6;
    }

    a {
        color: var(--blue);
        font-weight: 700;
        margin: 0;
        font-size: 12px;
        letter-spacing: .02rem;
        line-height: 1.6;
    }

    input {
        opacity: 0;
        user-select: none;
        pointer-events: none;
    }
}

.checkbox {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 18px;
    height: 18px;
    cursor: pointer;
    border-radius: 4px;
    border: 1px solid var(--light);
    flex-shrink: 0;
    position: relative;

    &.checked {
        border-color: var(--blue);

        &:after {
            opacity: 1;
            transform: scale(1);
        }
    }

    &:after {
        content: '';
        position: absolute;
        display: block;
        width: 14px;
        height: 14px;
        border-radius: 4px;
        background-color: var(--blue);
        opacity: 0;
        transform: scale(0);
        transition: all .15s cubic-bezier(0.455, 0.03, 0.515, 0.955);
    }
}
</style>