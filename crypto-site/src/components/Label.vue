<script setup>

let props = defineProps({
    label: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    }
})

</script>

<template>
    <div class="panel_label">
        <div class="panel_label_icon">
            <app-icon :name="icon" size="18" />
        </div>
        {{ label }}
    </div>
</template>

<style lang="scss" scoped>
.panel_label {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    color: #70748D;
    margin-bottom: 24px;

    @include r (lg) {
        font-size: 13px;
    }

    @include r (md) {
        margin-bottom: 16px;
    }
}

.panel_label_icon {
    width: 32px;
    height: 32px;
    border-radius: 12px;
    border: 1px solid #E3E4E9;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
    flex-shrink: 0;

    .icon {
        fill: var(--main_tint_2);
    }

    @include r (lg) {
        margin-right: 8px;
    }
}
</style>