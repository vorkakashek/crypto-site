<script setup>
import { ref, computed } from "vue";

let props = defineProps({
  placeholder: {
    type: String,
    required: false,
    default: "",
  },
  id: {
    type: String,
    required: false,
  },
});

let input = ref("");
</script>

<template>
  <label class="custom_input">
    <textarea
      v-model="input"
      :id="props.id"
      :class="{ filled: input.length > 0 }"
    >
    </textarea>
    <div class="input_label">{{ placeholder }}</div>
  </label>
</template>

<style lang="scss" scoped>
.custom_input {
  position: relative;
  display: block;
  margin-bottom: 24px;
  height: 100%;

  textarea {
    height: 100%;
    width: 100%;
    min-height: 150px;
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
  bottom: calc(100% - 25px);
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
