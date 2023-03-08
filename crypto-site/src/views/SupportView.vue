<script setup>
import { ref, watch } from "vue";
import Panel from "@/components/Panel.vue";
import axios from "redaxios";
import Input from "@/components/Input.vue";
import Textarea from "@/components/Textarea.vue";
import Button from "@/components/Button.vue";

let form_error = ref(false),
  form_text = ref(""),
  timer = ref();

let send = () => {
  let name = document.getElementById("support_name");
  let email = document.getElementById("support_email");
  let message = document.getElementById("support_message");
  console.log(name.value, email.value, message.value);
  if (
    name.checkValidity() &&
    email.checkValidity() &&
    message.checkValidity()
  ) {
    axios
      .post("https://fatpockets.io/api/v1/feedback", {
        name: name.value,
        email: email.value,
        message: message.value,
      })
      .then((res) => {
        if (res.data.success) {
          alert("Сообщение отправлено");
          name.value = "";
          email.value = "";
          message.value = "";
        }
      })
      .catch((err) => {
        console.log(err.data.errors.email[0]);
        form_error.value = true;
        if (err.data.errors.email[0]) {
          form_text.value = "modal.error_email";
        } else {
          form_text.value = "modal.error";
        }
      });
  } else {
    form_error.value = true;
    form_text.value = "modal.error";
  }
};

watch(form_error, (val) => {
  if (val) {
    timer.value = setTimeout(() => {
      form_error.value = false
    }, 3000)
  } else {
    clearTimeout(timer.value)
  }

})
</script>

<template>
  <main>
    <div class="container">
      <h1>{{ $t("support.h1") }}</h1>
      <Panel>
        <template #content>
          <h2>{{ $t("support.h2_1") }}</h2>
          <form>
            <Input :placeholder="$t('support.placeholder_name')" id="support_name" />
            <Input placeholder="e-mail" type="email" id="support_email" />
            <Textarea :placeholder="$t('support.placeholder_msg')" id="support_message" />
            <Button :text="$t('main.send')" @click="send" />
            <div id="form_error" v-if="form_error">{{ $t(form_text) }}</div>
          </form>
        </template>
      </Panel>
    </div>
  </main>
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
  bottom: -8px;
  position: absolute;
  left: 25%;
  transform: translate(-50%, 0);
  white-space: nowrap;
}

form {
  position: relative;
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas: "name message" "email message" "button message";

  label:nth-child(1) {
    grid-area: name;
    margin: 0;
  }

  label:nth-child(2) {
    grid-area: email;
    margin: 0;
  }

  label:nth-child(3) {
    grid-area: message;
    margin: 0;
  }

  button {
    grid-area: button;
  }
}

h2 {
  margin-top: 8px;
  margin-bottom: 32px;
}

@include r(sm) {
  form {
    display: flex;
    flex-direction: column;
  }

  #form_error {
    left: 50%;
  }
}
</style>
