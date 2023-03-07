<script setup>
import { ref, watch, computed } from "vue";
import { useModal } from "@/stores/store";
import { useUser } from "@/stores/store";
import axios from "redaxios";
import Panel from "@/components/Panel.vue";
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import Checkbox from "@/components/Checkbox.vue";

let store = useModal();
let storeUser = useUser();

let tab_current = computed({
  get: () => store.currentTab,
  set: (val) => {
    store.currentTab = val;
    return val;
  },
});

let form_error = ref(false),
  timer = ref(),
  restore_tab = ref(false),
  restore_tab_2 = ref(false);

let sign_in = (e) => {
  let email = document.getElementById("email_sign_in");
  let password = document.getElementById("password_sign_in");

  if (email.checkValidity() && password.checkValidity()) {
    axios
      .post("https://fatpockets.io/api/v1/login", {
        email: email.value,
        password: password.value,
      })
      .then((res) => {
        if (res.data.success) {
          console.log(res.data);
          storeUser.setLoggedIn(true);
          storeUser.setUserId(res.data.user.id);
          let mining = res.data.user.mining;
          storeUser.setUserXmr({
            session: mining.balance_session.xmr,
            total: mining.balance_total.xmr,
						profit: "0.00000000000",
          });
          storeUser.setUserUsd({
            session: mining.balance_session.usd,
            total: mining.balance_total.usd,
						profit: "0.00000000000",
          });
          localStorage.setItem("token", res.data.token);
          store.hide();
        }
      })
      .catch((err) => {
        alert("Пользователь не найден или произошла ошибка");
      });
  } else {
    form_error.value = true;
  }
};

let sign_up = (e) => {
  let email = document.getElementById("email_sign_up");
  let password = document.getElementById("password_sign_up");
  let check = document.getElementById("check_sign_up");
  if (
    email.checkValidity() &&
    password.checkValidity() &&
    check.checkValidity()
  ) {
    axios
      .post("https://fatpockets.io/api/v1/signup", {
        email: email.value,
        password: password.value,
      })
      .then((res) => {
        if (res.data.success) {
          storeUser.setLoggedIn(true);
          localStorage.setItem("token", res.data.token);
          storeUser.setUserId(res.data.user.id);
          let mining = res.data.user.mining;
          storeUser.setUserXmr({
            session: mining.balance_session.xmr,
            total: mining.balance_total.xmr,
            profit: "0.00000000000",
          });
          storeUser.setUserUsd({
            session: mining.balance_session.usd,
            total: mining.balance_total.usd,
            profit: "0.00000000000",
          });
          store.hide();
        }
      })
      .catch((err) => {
        alert("Регистрация не прошла, попробуйте позже");
      });
  } else {
    form_error.value = true;
  }
};

let restore = (e) => {
  let email = document.getElementById("email_restore");
  if (email.checkValidity()) {
    axios
      .post("https://fatpockets.io/api/v1/forget", {
        email: email.value,
      })
      .then((res) => {
        restore_tab.value = false;
        restore_tab_2.value = true;
        console.log(res.data);
      })
      .catch((err) => {
        alert("Пользователь не найден");
      });
  } else {
    form_error.value = true;
  }
};

let new_password = (e) => {
  let code = document.getElementById("code_restore");
  let password = document.getElementById("password_restore");
  if (code.checkValidity() && password.checkValidity()) {
    axios
      .post(`https://fatpockets.io/api/v1/restore/${code.value}`, {
        password: password.value,
      })
      .then((res) => {
        if (res.data.success) {
          alert(res.data.message);
          store.hide();
        }
      });
    // .catch((err) => {
    //   alert("Произошла ошибка");
    // });
  } else {
    form_error.value = true;
  }
};

watch(form_error, () => {
  if (form_error.value) {
    timer.value = setTimeout(() => {
      form_error.value = false;
    }, 5000);
  }
});

watch(tab_current, () => (form_error.value = false));
</script>

<template>
  <Panel>
    <template #content>
      <div class="tab_group">
        <div class="tab_list">
          <label
            :class="[{ active: index === tab_current }, 'tab_item']"
            v-for="(tab_name, index) in $tm('modal.tab_names')"
          >
            <input type="radio" :value="index" v-model="tab_current" />
            {{ tab_name }}
          </label>
        </div>
        <div
          class="tab_content"
          v-if="tab_current === 0 && !restore_tab && !restore_tab_2"
        >
          <form>
            <Input placeholder="e-mail" type="email" id="email_sign_in" />
            <Input
              minlength="6"
              placeholder="password"
              type="password"
              id="password_sign_in"
            />
            <div class="restore_pass" @click="restore_tab = true">
              {{ $t("modal.restore_msg") }}
            </div>
            <Button :text="$t('main.sign_in')" @click="sign_in" />
            <div id="form_error" v-if="form_error">{{ $t("modal.error") }}</div>
          </form>
        </div>

        <div class="tab_content" v-if="tab_current === 1">
          <form>
            <Input placeholder="e-mail" type="email" id="email_sign_up" />
            <Input
              minlength="6"
              placeholder="password"
              type="password"
              id="password_sign_up"
            />
            <Checkbox :text="$t('modal.terms')" id="check_sign_up" />
            <Button :text="$t('main.sign_up')" @click="sign_up" />
            <div id="form_error" v-if="form_error">{{ $t("modal.error") }}</div>
          </form>
        </div>

        <div class="tab_content" v-if="tab_current === 0 && restore_tab">
          <form>
            <Input placeholder="e-mail" type="email" id="email_restore" />
            <Button :text="$t('main.restore')" @click="restore" />
            <div id="form_error" v-if="form_error">{{ $t("modal.error") }}</div>
            <div class="restore_pass_back" @click="restore_tab = false">
              {{ $t("modal.back") }}
            </div>
          </form>
        </div>

        <div class="tab_content" v-if="tab_current === 0 && restore_tab_2">
          <form>
            <Input placeholder="code" id="code_restore" />
            <Input
              minlength="6"
              placeholder="password"
              type="password"
              id="password_restore"
            />
            <Button :text="$t('main.restore')" @click="new_password" />
            <div id="form_error" v-if="form_error">{{ $t("modal.error") }}</div>
            <div
              class="restore_pass_back"
              @click="
                () => {
                  restore_tab_2 = false;
                  restore_tab = true;
                }
              "
            >
              {{ $t("modal.back") }}
            </div>
          </form>
        </div>
      </div>
    </template>
  </Panel>
</template>

<style lang="scss" scoped>
.restore_pass,
.restore_pass_back {
  cursor: pointer;
  font-weight: 700;
  color: #70748d;
  font-size: 12px;
  letter-spacing: 0.02rem;
  display: inline-block;
  margin-bottom: 16px;

  &:hover {
    color: var(--blue);
  }
}

.restore_pass_back {
  text-align: center;
  display: block;
  margin-top: 24px;
  margin-bottom: 0;
}

#form_error {
  color: var(--error);
  font-weight: 700;
  text-align: center;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  font-size: 11px;
  opacity: 0.8;
}

.tab_content {
  margin-top: 32px;
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
