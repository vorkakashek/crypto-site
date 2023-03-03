<script setup>

let props = defineProps({
    type: {
        type: String,
        default: 'horizontal',
        required: false,
    }
})

</script>

<template>
    <div :class="[type, 'banner']"></div>
</template>

<style lang="scss" scoped>

.banner {
    background-color: #D2D5E0;
    border-radius: 4px;
    margin-top: 24px;

    &.horizontal {
        height: 148px;
        width: 100%;
    }

    &.vertical {
        height: 500px;
        width: 100%;

        @include r (lg) {
            display: none;
        }
    }
}

</style>