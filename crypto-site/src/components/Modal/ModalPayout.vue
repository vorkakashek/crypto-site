<script setup>
import { ref, watch, computed } from "vue";
import { useModal } from "@/stores/store";
import { useUser } from "@/stores/store";
import axios from "redaxios";
import Panel from "@/components/Panel.vue";
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";

let store = useModal();
let storeUser = useUser();

let form_error = ref(false),
  timer = ref();

watch(form_error, () => {
  if (form_error.value) {
    timer.value = setTimeout(() => {
      form_error.value = false;
    }, 5000);
  }
});
</script>

<template>
  <Panel>
    <template #content>
      <div class="tab_group">
        <h3 class="tab_title">{{ $t("modal.withdraw") }}</h3>
        <div class="tab_content">
          <form>
            <Input placeholder="ID wallet" id="id_wallet" />
            <Input placeholder="sum" id="sum" />
            <Button :text="$t('history.button')" @click="withdraw" />
            <div id="form_error" v-if="form_error">{{ $t("modal.error") }}</div>
          </form>
        </div>
      </div>
    </template>
  </Panel>
</template>

<style lang="scss" scoped>
#form_error {
  color: var(--error);
  font-weight: 700;
  text-align: center;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  font-size: 11px;
  opacity: 0.8;
}

.tab_title {
  margin: 0;
}
.tab_content {
  margin-top: 24px;
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
</style>
