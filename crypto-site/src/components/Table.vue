<script setup>

import { computed } from 'vue'

let props = defineProps({
    data: {
        type: Object,
        required: true,
    }
})

</script>

<template>
    <div class="table">
        <div class="table_content">
            <div class="table_row" v-for="row in data.rows">
                <div class="table_cell" v-for="cell in row">
                    <div v-if="(typeof cell) === 'string'">{{ cell }}</div>
                    <div v-else :class="['status', cell.status]">{{ $t(`status.${cell.status}`) }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.table {
    overflow: auto;

    >* {
        min-width: 360px;
    }
}

.table_row {
    display: flex;
    border-radius: 16px;
    padding: 8px 12px;

    &:nth-child(even) {
        background-color: #F8F8F8;
    }

    &:first-child {
        font-weight: 700;
        color: #70748D;
        font-size: 14px;
        margin-bottom: 8px;
    }
}

.table_cell {
    flex: 1 0;
    font-size: 13px;
    color: #70748D;
    display: flex;
    align-items: center;
    white-space: nowrap;
    // width: max-content;
    width: 140px;

    // min-width: 140px;
    &:not(:last-child) {
        padding-right: 12px;
    }

    &:first-child {
        font-weight: 700;
    }
}

.status {
    font-size: 8px;
    letter-spacing: .08rem;
    font-weight: 700;
    color: #fff;
    padding: 6px 12px;
    border-radius: 100px;
    text-transform: uppercase;
    display: inline-block;

    &.progress {
        background-color: #F5A13C;
    }

    &.error {
        background-color: #F15744;
    }

    &.success {
        background-color: #01CAC4;
    }
}</style>