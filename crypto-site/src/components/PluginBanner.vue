<script setup>

let props = defineProps({
    id: {
        type: Number,
        required: false,
        default: 0,
    }
})

let banner_id = 1

</script>

<template>
    <div :class="[`banner_id_${banner_id}`, 'plugin_banner']">
        <img src="@/assets/images/coins.png" alt="" class="banner_hero_image" />
        <div class="banner_content">
            <div class="banner_title">{{ $t("banner.title") }} <br /> <span>MinerPC</span></div>
            <div class="banner_desc">{{ $t("banner.desc") }}</div>
            <a href="#" class="banner_button">
                <span>{{ $t("banner.button") }}</span>
                <app-icon name="download" size="18" />
            </a>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.plugin_banner {
    width: 100%;
    height: 223px;
    border-radius: 16px;
    padding: 16px;
    position: relative;
    background-image: url("@/assets/images/banner_bg.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    margin-top: 24px;
}

.banner_content {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.banner_id_ {
    &1 {
        background-color: #292626;
        color: #F4F5FA;

        .banner_hero_image {
            bottom: 0;
            right: -25px;
        }

        .banner_button {
            background-color: var(--error);

            &:after {
                background-color: var(--error);
            }
        }
    }
}

.banner_title {
    font-size: 18px;
    line-height: 1.2;

    span {
        font-size: 24px;
        font-weight: 700;
    }
}

.banner_desc {
    font-size: 14px;
    line-height: 1.6;
    letter-spacing: .02rem;
    margin-top: 8px;
    position: relative;
    z-index: 2;
    max-width: 360px;
    padding-right: 46px;
    margin-bottom: auto;
}

.banner_hero_image {
    position: absolute;
    z-index: 1;
}

.banner_button {
    padding: 14px 24px;
    border-radius: 8px;
    font-weight: 700;
    color: #F4F5FA;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: max-content;
    margin-top: 16px;
    text-decoration: none;
    position: relative;
    z-index: 1;
    >* {
        position: relative;
        z-index: 2;
    }

    .icon {
        margin-left: 8px;
    }

    &:after {
        content: '';
        position: absolute;
        z-index: 0;
        filter: blur(20px);
        height: 80%;
        width: 100%;
        left: 0;
        top: 16px;
        user-select: none;
        pointer-events: none;
        opacity: .7;
        transition: all .2s ease-in-out;
    }

    &:hover {
        &:after {
            top: 0;
            filter: blur(0px);
            opacity: 0;
        }
    }
}
</style>