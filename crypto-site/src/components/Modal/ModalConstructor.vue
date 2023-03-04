<script setup>
import { ref } from 'vue'
import ModalLogin from '@/components/Modal/ModalLogin.vue'
import { useI18n } from "vue-i18n"

const { tm } = useI18n()

const visible = ref(false)
const emits = defineEmits(["show"]);

let show = () => {
    visible.value = true
    document.querySelector('body').style.overflow = "hidden"
}

defineExpose({
    show,
})

let hide = () => {
    visible.value = false
    document.querySelector('body').removeAttribute("style")
}



</script>

<template>
    <Teleport to="#modal">
        <Transition name="nested" appear>
            <div class="modal_constructor" v-if="visible">
                <div class="container">
                    <div class="modal">
                        <div class="modal_content">
                            <app-icon class="modal_close" name="close_2" size="24" @click="hide()" />
                            <ModalLogin />
                        </div>
                    </div>
                </div>
                <div class="modal_overlay" @click="hide()"></div>
            </div>
        </Transition>
    </Teleport>
</template>

<style lang="scss" scoped>
.modal {
    height: 100%;
    display: flex;
    align-items: center;
    margin-top: 120px;
}

.modal_content {
    width: 100%;
    margin: 0 auto;
    position: relative;

    .panel {
        margin-top: 0;
    }
}

.icon.modal_close {
    fill: var(--blue);
    position: absolute;
    right: 0;
    bottom: 100%;
    margin-bottom: 8px;
    cursor: pointer;

    &:hover {
        opacity: .8;
    }
}

.modal_constructor {
    position: fixed;
    z-index: 9999;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;

    .container {
        width: 400px;
    }
}

.modal_overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: -1;
    background-color: rgba(210, 213, 226, 0.4);
    backdrop-filter: blur(8px);
    // cursor: pointer;
}

.nested-enter-active,
.nested-leave-active {
    transition: all 0.3s ease-in-out;
}

/* delay leave of parent element */
.nested-leave-active {
    transition-delay: 0.1s;
}

.nested-enter-from,
.nested-leave-to {
    // transform: translateY(30px);
    opacity: 0;
}


/* we can also transition nested elements using nested selectors */
.nested-enter-active .inner,
.nested-leave-active .inner {
    transition: all 0.3s ease;
}

.nested-enter-from .inner,
.nested-leave-to .inner {
    opacity: 0.001;
}

.nested-enter-from .panel,
.nested-leave-to .panel {
    transition: all 0.3s ease;
    transform: translateY(30px);
}
</style>