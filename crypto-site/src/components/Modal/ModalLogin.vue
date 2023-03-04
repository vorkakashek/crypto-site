<script setup>
import { ref } from 'vue'
import Panel from "@/components/Panel.vue"
import Input from "@/components/Input.vue"
import Checkbox from "@/components/Checkbox.vue"

let tab_current = ref(0)


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
                <div class="tab_content" v-if="tab_current === 0">
                    <form>
                        <Input placeholder="e-mail" type="email" />
                        <Input placeholder="password" type="password" />
                        <Checkbox :text="$t('modal.terms')"/>
                    </form>
                </div>
                <div class="tab_content" v-if="tab_current === 1">
                    <div>reg</div>
                </div>
            </div>
        </template>
    </Panel>
</template>

<style lang="scss" scoped>

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