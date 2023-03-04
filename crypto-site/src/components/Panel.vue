<script setup>

</script>

<template>
    <div class="panel">
        <slot name="content">
        </slot>
    </div>
</template>

<style lang="scss" scoped>
.panel {
    background-color: #fff;
    border-radius: 16px;
    margin-top: 24px;
    padding: 16px;

    @include r (h) {
        padding: 16px 12px;
    }
}

</style>