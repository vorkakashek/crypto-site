<script setup>

let props = defineProps({
    type: {
        type: String,
        required: false,
        default: 'button',
    },
    styled: {
        type: String,
        required: false,
        default: 'filled',
    },
    text: {
        type: String,
        required: true,
    }
})

</script>

<template>
    <button :type="type" :class="styled">{{ text }}</button>
</template>

<style lang="scss" scoped>
button {
    border-radius: 8px;
    width: 100%;
    padding: 14px 24px;
    outline: none;
    border: none;
    color: #fff;
    font-weight: 700;
    font-size: 14px;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 52px;

    &.filled {
        background: linear-gradient(93.49deg, #01CAC4 -19.41%, #0278F6 116.58%), #D9D9D9;

        &:hover {
            opacity: .8;
        }
    }

    &.outlined {
        border: 2px solid var(--blue);
        color: var(--blue);

        .icon {
            fill: var(--blue);
        }

        &:hover {
            background-color: var(--blue);
            color: #fff;

            .icon {
                fill: #fff;
            }
        }
    }

    .icon {
        margin-right: 8px;
    }

    &:not(:last-child) {
        margin-bottom: 16px;

        @include r (md) {
            margin-bottom: 8px;
        }
    }
}
</style>