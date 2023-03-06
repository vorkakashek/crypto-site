<script setup>
import { ref, computed } from "vue";

let props = defineProps({
  type: {
    type: String,
    required: false,
    default: "text",
  },
  placeholder: {
    type: String,
    required: false,
    default: "",
  },
  minlength: {
    type: String,
    required: false,
    default: "",
  },
  id: {
    type: String,
    required: false,
  },
});

let input = ref(""),
  pass_show = ref(false);

let type_computed = computed(() => {
  if (props.type == "password") {
    return pass_show.value ? "text" : "password";
  } else {
    return props.type;
  }
});
</script>

<template>
  <label class="custom_input">
    <div
      :class="[{ active: pass_show }, 'password_controller']"
      v-if="type === 'password'"
      @click="pass_show = !pass_show"
    >
      <app-icon name="eye-off" size="18" v-if="!pass_show" />
      <app-icon name="eye-on" size="18" v-else />
    </div>
    <input
      :type="type_computed"
      v-model="input"
      :minlength="props.minlength"
      :id="props.id"
      :class="{ filled: input.length > 0, input_password: type === 'password' }"
      required
    />
    <div class="input_label">{{ placeholder }}</div>
  </label>
</template>

<style lang="scss" scoped>
.password_controller {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 16px;
  cursor: pointer;
  background-color: transparent;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover,
  &.active {
    background-color: var(--blue);
  }
}

.custom_input {
  position: relative;
  display: block;
  margin-bottom: 24px;

  input {
    width: 100%;
    padding: 16px;
    border: 1px solid #e8e8e8;
    border-radius: 16px;
    font-weight: 700;
    color: var(--main);
    outline: none;

    &:focus,
    &:active,
    &.filled {
      border-color: var(--blue);

      ~ .input_label {
        bottom: 100%;
        transform: translateY(-4px);
        // left: 0;
        font-size: 12px;
        color: var(--blue);
      }
    }

    &.input_password {
      padding-right: 48px;
    }
  }
}

.input_label {
  left: 16px;
  bottom: 50%;
  transform: translateY(50%);
  font-weight: 700;
  font-size: 14px;
  color: #c6c7d1;
  position: absolute;
  user-select: none;
  pointer-events: none;
  transition: all 0.3s ease;
}
</style>
