<script setup>
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import Panel from "@/components/Panel.vue";
import Label from "@/components/Label.vue";
import Table from "@/components/Table.vue";
import axios from "redaxios";
import { useUser, useModal } from "@/stores/store";

const store = useUser(),
  modalStore = useModal();

const { tm } = useI18n();

let table = computed({
  get: () => {
    return {
      // columns: tm('history.header'),
      rows: [
        tm("history.header"),
        // ["02/24/2023", "0.000000057832", { status: "progress" }],
        // ["02/24/2023", "0.000000057832", { status: "error" }],
        // ["02/24/2023", "0.000000057832", { status: "success" }],
        // ["02/24/2023", "0.000000057832", { status: "success" }],
      ],
    };
  },
  set: (value) => {
    return value;
  },
});

onMounted(() => {
  axios
    .post("https://fatpockets.io/api/v1/user/payouts/list", null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      if (response.data.success) {
        response.data.payouts.forEach((payout) => {
          table.value.rows.push([
            [payout.date, payout.sum, { status: payout.status }],
          ]);
        });
      }
    });
});
</script>

<template>
  <Panel v-if="store.loggedIn">
    <template #content>
      <Label :label="$t('history.label')" icon="wallet" />
      <div class="row g-0">
        <div class="col-12 col-md-8">
          <Table :data="table" />
        </div>
        <div class="col-12 col-md-4">
          <div class="history_withdraw_area">
            <button
              class="miner_button outlined"
              type="button"
              @click="modalStore.show('payout')"
            >
              <app-icon name="circle-multiple" />
              {{ $t("history.button") }}
            </button>
            <div class="msg_withdraw">
              {{ $t("history.min_withdraw") }}: <span>0.0001 XMR</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Panel>
</template>

<style lang="scss" scoped>
:deep(.table_content) {
  @include r(h) {
    min-width: max-content;

    .table_cell {
      &:last-child {
        width: 80px;
      }

      &:first-child {
        max-width: 80px;
      }
    }
  }
}

.history_withdraw_area {
  display: flex;
  flex-direction: column;
  align-items: center;

  @include r(md) {
    margin-top: 24px;
  }
}

.msg_withdraw {
  font-size: 13px;
  opacity: 0.5;
  text-align: center;

  span {
    font-weight: 700;
    font-size: 13px;
  }
}

.miner_button {
  border-radius: 8px;
  padding: 14px 24px;
  outline: none;
  border: none;
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  background-color: transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 52px;
  margin-bottom: 16px;

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
}
</style>
