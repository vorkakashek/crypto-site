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
            <h1>{{ $t("business_inquiries.h1") }}</h1>
            <Panel>
                <template #content>
                    <h2>{{ $t("business_inquiries.h2_1") }}</h2>
                    <!-- <p>{{ $t("business_inquiries.p_1") }}</p> -->
                    <i18n-t keypath="business_inquiries.p_1" tag="p" scope="global">
                        <a href="mailto:business@eo.finance">business@eo.finance</a>
                    </i18n-t>
                    <h2>{{ $t("business_inquiries.h2_2") }}</h2>
                    <i18n-t keypath="business_inquiries.p_2" tag="p" scope="global">
                        <a href="mailto:listing@eo.finance">listing@eo.finance</a>
                    </i18n-t>
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

a {
    font-weight: 700;
    color: var(--blue);

    &:hover {
        opacity: .8;
    }
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
  