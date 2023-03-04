<script setup>

import { ref, computed, onMounted } from 'vue'
import { useI18n } from "vue-i18n"
import Panel from '@/components/Panel.vue'
import Label from "@/components/Label.vue"
import Table from "@/components/Table.vue"

const { tm } = useI18n()

let tab_current = ref(0),
    online = ref(86312)

let tab_handler = (el) => {
    console.log(el)
}


let table_1 = computed({
    get: () => {
        return {
            rows: [
                tm('statistics.header_1'),
                ["588-588-543", "0.000000057832", "0.000000057832", "0.000000057832"],
                ["588-588-543", "0.000000057832", "0.000000057832", "0.000000057832"],
                ["588-588-543", "0.000000057832", "0.000000057832", "0.000000057832"],
                ["588-588-543", "0.000000057832", "0.000000057832", "0.000000057832"],
                ["588-588-543", "0.000000057832", "0.000000057832", "0.000000057832"],
                ["588-588-543", "0.000000057832", "0.000000057832", "0.000000057832"],
                ["588-588-543", "0.000000057832", "0.000000057832", "0.000000057832"],
            ]
        }
    },
    set: (value) => {
        return value
    }
})

let table_2 = computed({
    get: () => {
        return {
            rows: [
                tm('statistics.header_2'),
                ["588-588-543", "0.000000057832", "02/24/2023", "14:35"],
                ["5843", "0.07832", "02/24/2023", "14:35"],
                ["588-588-543", "0.000000057832", "02/24/2023", "14:35"],
                ["588-588-543", "0.000000057832", "02/24/2023", "14:35"],
                ["588-588-543", "0.000000057832", "02/24/2023", "14:35"],
                ["588-588-543", "0.000000057832", "02/24/2023", "14:35"],
                ["588-588-543", "0.000000057832", "02/24/2023", "14:35"],
            ]
        }
    },
    set: (value) => {
        return value
    }
})

</script>

<template>
    <Panel>
        <template #content>
            <Label :label='$t("statistics.label")' icon="statistics" />
            <div class="statistics_online"><span>{{ $t("statistics.online") }}: </span>{{ online }}</div>
            <div class="tab_group">
                <div class="tab_list">
                    <label :class="[{ active: index === tab_current }, 'tab_item']"
                        v-for="(tab_name, index) in $tm('statistics.tab_names')">
                        <input type="radio" :value="index" v-model="tab_current">
                        {{ tab_name }}
                    </label>
                </div>
                <div class="tab_content" v-if="tab_current === 0">
                    <Table :data="table_1" />
                </div>
                <div class="tab_content tab_content_fixes" v-if="tab_current === 1">
                    <Table :data="table_2" />
                </div>
            </div>
        </template>
    </Panel>
</template>

<style lang="scss" scoped>
.statistics_online {
    font-size: 26px;
    font-weight: 700;
    color: var(--blue);
    letter-spacing: .02rem;
    margin-bottom: 24px;

    span {
        text-transform: uppercase;
        font-weight: 700;
        color: #70748D;
        font-size: 12px;
        letter-spacing: .04rem;
    }
}

.tab_list {
    display: flex;
    border-radius: 16px;
    border: 1px solid #E8E8E8;
    overflow: hidden;
    margin-bottom: 16px;
}

.tab_item {
    flex: 1 0;
    padding: 16px;
    text-align: center;
    font-size: 14px;
    font-weight: 700;
    color: #70748D;
    opacity: .7;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    input {
        display: none;
    }

    &.active {
        background-color: var(--blue);
        color: #fff;
        opacity: 1;
    }

    @include r (md) {
        font-size: 12px;
        padding: 8px 12px;
    }

}


:deep(.tab_content) {
    overflow: auto;

    &.tab_content_fixes {
        .table_cell {
            @include r (h) {
                &:nth-child(3) {
                    max-width: 80px;
                }
                &:nth-child(4) {
                    max-width: 40px;
                }
            }
        }
    }
}

.table {
    min-width: fit-content;
    width: 100%;
}

:deep(.table) {
    @include r (h) {
        .table_cell {
            &:first-child {
                max-width: 94px;
            }
            &:nth-child(2), &:nth-child(3), &:nth-child(4) {
                max-width: 120px;
            }
        }
    }
}
</style>