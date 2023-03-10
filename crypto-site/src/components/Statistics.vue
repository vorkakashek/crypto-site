<script setup>
import { ref, computed, onMounted, watch, onBeforeUnmount } from "vue"
import { useStore } from "@/stores/store"
import { useI18n } from "vue-i18n"
import Panel from "@/components/Panel.vue"
import Label from "@/components/Label.vue"
import Table from "@/components/Table.vue"
import axios from "redaxios"

const { tm } = useI18n()
let store = useStore()

let tab_current = ref(0),
  online = ref(86312),
  timer_1 = ref(),
  timer_2 = ref()

let header_1 = computed(() => tm("statistics.header_1"))
let header_2 = computed(() => tm("statistics.header_2"))

watch(header_1, () => {
  table_1.value.rows[0] = header_1.value
})
watch(header_2, () => {
  table_2.value.rows[0] = header_2.value
})

let table_1 = ref({ rows: [header_1.value] })

let table_2 = ref({ rows: [header_2.value] })


// обновляем список топа "Лидеры заработка"
let refresh_top = () => {
  axios.post(`${store.domain}/api/v1/leaders/top`).then((response) => {
    if (response.data.success) {
      response.data.top.forEach((user) => {
        table_1.value.rows.push([user.id, user.per_day, user.per_week, user.per_month])
      })
      online.value = response.data.online;

      timer_1.value = setInterval(() => {
        axios.post(`${store.domain}/api/v1/leaders/top`).then((response) => {
          if (response.data.success) {
            response.data.top.forEach((user, index) => {
              table_1.value.rows[index + 1] = [user.id, user.per_day, user.per_week, user.per_month]
            })
            online.value = response.data.online
          }
        })
      }, 10000)
    }
  })
}

// обновляем список топа "Выплаченные средства"
let refresh_last = () => {
  axios.post(`${store.domain}/api/v1/payments/last`).then((response) => {
    if (response.data.success) {
      response.data.payments.forEach((payment) => {
        table_2.value.rows.push([payment.id, payment.sum, payment.date, payment.time])
      })
      timer_2.value = setInterval(() => {
        axios.post(`${store.domain}/api/v1/payments/last`).then((response) => {
          if (response.data.success) {
            response.data.payments.forEach((payment, index) => {
              table_2.value.rows[index + 1] = [payment.id, payment.sum, payment.date, payment.time]
            })
          }
        })
      }, 10000)
    }
  })
}

onMounted(() => {
  refresh_top()
  refresh_last()
})

onBeforeUnmount(() => {
  clearInterval(timer_1.value)
  clearInterval(timer_2.value)
})

</script>

<template>
  <Panel>
    <template #content>
      <Label :label="$t('statistics.label')" icon="statistics" />
      <div class="statistics_online">
        <span>{{ $t("statistics.online") }}: </span>{{ online }}
      </div>
      <div class="tab_group">
        <div class="tab_list">
          <label :class="[{ active: index === tab_current }, 'tab_item']"
            v-for="(tab_name, index) in $tm('statistics.tab_names')">
            <input type="radio" :value="index" v-model="tab_current" />
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
  letter-spacing: 0.02rem;
  margin-bottom: 24px;

  span {
    text-transform: uppercase;
    font-weight: 700;
    color: #70748d;
    font-size: 12px;
    letter-spacing: 0.04rem;
  }
}

.tab_list {
  display: flex;
  border-radius: 16px;
  border: 1px solid #e8e8e8;
  overflow: hidden;
  margin-bottom: 16px;
}

.tab_item {
  flex: 1 0;
  padding: 16px;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  color: #70748d;
  opacity: 0.7;
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

  @include r(md) {
    font-size: 12px;
    padding: 8px 12px;
  }
}

:deep(.tab_content) {
  overflow: auto;

  &.tab_content_fixes {
    .table_cell {
      @include r(h) {
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
  @include r(h) {
    .table_cell {
      &:first-child {
        max-width: 94px;
      }

      &:nth-child(2),
      &:nth-child(3),
      &:nth-child(4) {
        max-width: 120px;
      }
    }
  }
}
</style>
