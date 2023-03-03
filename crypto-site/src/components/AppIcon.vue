<template>
    <component :is="component" class="icon" :width="size" :height="size" />
</template>

<script>
import { shallowRef, watch, defineAsyncComponent } from "vue";
export default {
    props: {
        name: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            required: false, 
            default: "20",
        },
    },
    setup(props) {
        const component = shallowRef(null);
        watch(
            () => props.name,
            () => {
                component.value = defineAsyncComponent(() =>
                    import(
                        `../assets/icons/${props.name}.svg`
                    )
                );
            },
            { immediate: true }
        );
        return { component };
    },
};
</script>

<style lang="scss" scoped>
.icon {
    fill: var(--blue-dark);
}
</style>