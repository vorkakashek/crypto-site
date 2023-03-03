<script setup>
import Panel from '@/components/Panel.vue'
import Label from "@/components/Label.vue";

</script>

<template>

<Panel>
    <template #content>
        <Label :label='$t("history.label")' icon="wallet" />
    </template>
</Panel>


</template>

<style lang="scss" scoped>

</style>