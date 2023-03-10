<script setup>
import Banner from "@/components/Banner.vue";

</script>

<template>

<footer>
    <div class="container">
        <div class="row">
            <div class="col-md-5 col-12">
                <!-- <Banner /> -->
            </div>

            <div class="col-12 col-md-3 col-lg-2 offset-0 offset-lg-2 mt-5 mt-md-0">
                <div class="footer_link_label">{{ $t("footer.contacts") }}</div>
                <RouterLink to="/business_inquiries" class="footer_link">{{ $t("footer.business_inquiries") }}</RouterLink>
                <RouterLink to="/support" class="footer_link">{{ $t("footer.support") }}</RouterLink>
            </div>
            <div class="col-12 col-md-4 col-lg-3 mt-5 mt-md-0">
                <div class="footer_link_label">{{ $t("footer.documents") }}</div>
                <RouterLink to="/terms" class="footer_link">{{ $t("footer.terms_and_conditions") }}</RouterLink>
                <RouterLink to="/privacy" class="footer_link">{{ $t("footer.privacy") }}</RouterLink>
                <RouterLink to="/aml" class="footer_link">{{ $t("footer.aml") }}</RouterLink>
            </div>
            <div class="offset-0 col-12 offset-md-8 col-md-4 offset-lg-9 col-lg-3 mt-5 mt-md-0 copyright">© 2023 NAME</div>
        </div>
    </div>
</footer>

</template>

<style lang="scss" scoped>

footer {
    // margin-top: 60px;
    margin-top: auto;
    padding: 32px 0;
    background-color: #fff;
}

.banner {
    margin-top: 0;
}

.footer_link {
    display: block;
    color: #70748D;
    text-decoration: none;
    font-size: 14px;
    &:not(:last-child) {
        margin-bottom: 16px;
    }

    &:hover {
        opacity: .8;
    }
}

.footer_link_label {
    font-weight: 500;
    color: #70748D;
    font-size: 16px;
    margin-bottom: 24px;
}

.copyright {
    font-weight: 500;
    font-size: 14px;
    color: #70748D;
    margin-top: 24px;
}

</style>