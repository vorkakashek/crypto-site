<script setup>
import { ref, watch, computed } from 'vue'
import { useModal } from "@/stores/store"
import { useUser } from "@/stores/store"

import Panel from "@/components/Panel.vue"
import Input from "@/components/Input.vue"
import Checkbox from "@/components/Checkbox.vue"
import Button from "@/components/Button.vue"


let store = useModal()
let storeUser = useUser()

let tab_current = computed({
    get: () => store.currentTab,
    set: (val) => {
        store.currentTab = val
        return val
    }
})

let form_error = ref(false),
    timer = ref(),
    restore_tab = ref(false)

let sign_in = (e) => {
    // form_error.value = true
    storeUser.setLoggedIn(true)
    store.hide()
}

let sign_up = (e) => {
    form_error.value = true
}

let restore = (e) => {
    form_error.value = true
}

watch(form_error, () => {
    if (form_error.value) {
        timer.value = setTimeout(() => {
            form_error.value = false
        }, 5000)
    }
})

watch(tab_current, () => form_error.value = false)

</script>

<template>
    <Panel>
        <template #content>
            <div class="tab_group">
                <div class="tab_list">
                    <label :class="[{ active: index === tab_current }, 'tab_item']"
                        v-for="(tab_name, index) in $tm('modal.tab_names')">
                        <input type="radio" :value="index" v-model="tab_current">
                        {{ tab_name }}
                    </label>
                </div>
                <div class="tab_content" v-if="tab_current === 0 && !restore_tab">
                    <form>
                        <Input placeholder="e-mail" type="email" />
                        <Input placeholder="password" type="password" />
                        <div class="restore_pass" @click="restore_tab = true">{{ $t("modal.restore_msg") }}</div>
                        <Button :text="$t('main.sign_in')" @click="sign_in" />
                        <div id="form_error" v-if="form_error">{{ $t("modal.error") }}</div>
                    </form>
                </div>
                <div class="tab_content" v-if="tab_current === 1">
                    <form>
                        <Input placeholder="e-mail" type="email" />
                        <Input placeholder="password" type="password" />
                        <Checkbox :text="$t('modal.terms')" />
                        <Button :text="$t('main.sign_up')" @click="sign_up" />
                        <div id="form_error" v-if="form_error">{{ $t("modal.error") }}</div>
                    </form>
                </div>
                <div class="tab_content" v-if="tab_current === 0 && restore_tab">
                    <form>
                        <Input placeholder="e-mail" type="email" />
                        <Button :text="$t('main.restore')" @click="restore" />
                        <div id="form_error" v-if="form_error">{{ $t("modal.error") }}</div>
                        <div class="restore_pass_back" @click="restore_tab = false">{{ $t("modal.back") }}</div>
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
    color: #70748D;
    font-size: 12px;
    letter-spacing: .02rem;
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
    letter-spacing: .1rem;
    text-transform: uppercase;
    font-size: 11px;
    opacity: .8;
}

.tab_content {
    margin-top: 32px;
}

.tab_list {
    display: flex;
    border-radius: 16px;
    border: 1px solid #E8E8E8;
    overflow: hidden;
    margin-bottom: 16px;
}

.tab_item {
    flex: 1 0;
    padding: 16px;
    text-align: center;
    font-size: 14px;
    font-weight: 700;
    color: #70748D;
    opacity: .7;
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

    @include r (md) {
        font-size: 12px;
        padding: 8px 12px;
    }

}
</style>