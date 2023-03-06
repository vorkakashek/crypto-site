<script setup>
import Panel from "@/components/Panel.vue";
import axios from "redaxios";
import Input from "@/components/Input.vue";
import Textarea from "@/components/Textarea.vue";
import Button from "@/components/Button.vue";

let send = () => {};
</script>

<template>
  <main>
    <div class="container">
      <h1>{{ $t("support.h1") }}</h1>
      <Panel>
        <template #content>
          <form>
            <Input placeholder="name" id="support_name" />
            <Input placeholder="e-mail" type="email" id="support_email" />
            <Textarea placeholder="Your message" id="support_message" />
            <Button :text="$t('support.send')" @click="send" />
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

@include r(sm) {
  form {
    display: flex;
    flex-direction: column;
  }
}
</style>
