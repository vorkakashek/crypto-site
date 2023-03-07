<script setup>
import Panel from "@/components/Panel.vue";
import axios from "redaxios";
import Input from "@/components/Input.vue";
import Textarea from "@/components/Textarea.vue";
import Button from "@/components/Button.vue";

let send = () => { 
  alert("Сообщение отправлено");
};
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
          </form>
        </template>
      </Panel>
    </div>
  </main>
</template>

<style lang="scss" scoped>
form {
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
}</style>
