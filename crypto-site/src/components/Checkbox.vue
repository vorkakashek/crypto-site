<script setup>

import { ref, computed } from 'vue'

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

let checkbox = ref('')

</script>

<template>
    <div class="custom_input">
        <input type="checkbox" v-model="checkbox" :required="required">
        <i18n-t keypath="modal.terms" tag="p" scope="global">
            <RouterLink to="/terms">{{ $t('modal.tos') }}</RouterLink>
        </i18n-t>
    </div>
</template>

<style lang="scss" scoped></style>