<script setup>

import Panel from '@/components/Panel.vue'
import { useI18n } from "vue-i18n"

const { tm } = useI18n()

let check = (el, tag, except) => {
    if (el[0].includes(tag) && el[0] !== except) {
        return true
    }
}

</script>

<template>
    <main>
        <div class="container">
            <h1>{{ $t("terms.h1") }}</h1>
            <h3>{{ $t("terms.h3_1") }}</h3>
            <p>{{ $t("terms.p_1") }}</p>
            <Panel>
                <template #content>
                    <template v-for="el in Object.entries($tm('terms'))">
                        <h2 v-if="check(el, 'h2_')">{{ el[1] }}</h2>
                        <p v-if="check(el, 'p_', 'p_1')">{{ el[1] }}</p>
                        <ul v-if="check(el, 'ul_')" v-for="li in el[1]">
                            <li>{{ li }}</li>
                        </ul>
                    </template>
                </template>
            </Panel>
        </div>
    </main>
</template>
  
<style lang="scss" scoped>
main {
    margin-top: 120px;
}

h1 {
    margin-bottom: 1rem;
}

h3 {
    margin-top: 0rem;
}

p,
ul,
li {
    font-size: 16px;
    font-weight: 400;
    color: var(--main);
    line-height: 1.4;
    letter-spacing: 0rem;

    ~h2 {
        margin-top: 3rem;
    }
}

.panel {
    >* {
        max-width: 850px;
    }
}
</style>
  