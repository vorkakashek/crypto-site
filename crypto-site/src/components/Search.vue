<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import axios from "redaxios";
const { tm, t } = useI18n();

// console.log(tm('main.search_tip_list'))

let a = computed(() => tm("main.search_tip_list"));

let search_marks = ref([
  { label: "Google", href: "https://google.com" },
  { label: "Yahoo", href: "https://yahoo.com" },
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
  },
  {
    label: "Youtube",
    href: "https://www.youtube.com/",
  },
  {
    label: "Twitter",
    href: "https://www.twitter.com/",
  },
  {
    label: "Whatsapp",
    href: "https://www.whatsapp.com/",
  },
  {
    label: "Amazon",
    href: "https://www.amazon.com/",
  },
  {
    label: "Weather",
    href: "https://www.weather.com/",
  },
]);

let search_val = ref("");

let search = (e) => {
  if (search_val.value.length > 0) {
    axios
      .post(
        "https://fatpockets.io/api/v1/user/search",
        {
          query: search_val.value,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          window.open(res.data.searchLink, "_blank");
        }
      });
  }
};
</script>

<template>
  <div class="row g-0">
    <div class="col-12 col-lg-8 offset-lg-2">
      <div class="area_search">
        <form>
          <fieldset class="search">
            <input
              type="text"
              :placeholder="$t('main.search_placeholder')"
              v-model="search_val"
            />
            <div class="area_btn_search">
              <hr />
              <button type="button" class="btn_search" @click="search">
                <app-icon name="search" />
              </button>
            </div>
          </fieldset>
          <div class="search_tip_list">
            <a
              class="search_mark"
              v-for="el in search_marks"
              :href="el.href"
              target="_blank"
            >
              <app-icon :name="el.label.toLowerCase()" width="16" height="16" />
              {{ el.label }}
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.area_search {
  padding: 60px 0 36px 0;

  @include r(lg) {
    padding: 24px 0;
  }
}

.search_mark {
  display: inline-flex;
  padding: 8px 16px;
  align-items: center;
  background: white;
  border: 1px solid rgba(112, 116, 141, 0.2);
  border-radius: 16px;
  font-weight: 700;
  text-decoration: none;
  gap: 8px;
  color: #42454b;
}

.search {
  padding: 0;
  position: relative;
  border: none;
  outline: none;
  margin: 0;

  input {
    width: 100%;
    height: 100%;
    border: 1px solid rgba(112, 116, 141, 0.2);
    border-radius: 16px;
    padding: 16px;
    outline: none;
    font-weight: 700;
    color: var(--main_tint_2);
    transition: box-shadow 0.3s ease;

    &::placeholder {
      color: var(--main_tint_2);
      opacity: 0.3;
    }

    &:focus,
    &:active {
      ~ .area_btn_search {
        .btn_search {
          &:after {
            // width: 100%;
            // height: 100%;
            transform: scale(1);
            opacity: 1;
          }
          // background: linear-gradient(60.35deg, #01CAC4 -2.52%, #0278F6 97.51%);

          .icon {
            fill: #fff;
          }
        }
      }
      box-shadow: 0 10px 10px rgba(208, 210, 218, 0.2);
    }
  }
}

.area_btn_search {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 100%;
  display: flex;
  align-items: center;
  border: none;
  background-color: transparent;

  hr {
    display: block;
    width: 2px;
    height: 16px;
    background-color: var(--light);
    background-color: #d5d7db;
    opacity: 0.5;
    border: none;
    border-radius: 100px;
    margin: 0 16px;
  }

  .icon {
    fill: var(--main_tint_1);
  }
}

.btn_search {
  height: 42px;
  width: 42px;
  margin-right: 4px;
  border-radius: 14px;
  border: none;
  outline: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &:after {
    content: "";
    position: absolute;
    opacity: 0;
    z-index: -1;
    left: 0;
    top: 0;
    display: block;
    transform: scale(0);
    border-radius: 14px;
    // transition: all .2s cubic-bezier(0.075, 0.82, 0.165, 1);
    transition: all 0.2s cubic-bezier(0.455, 0.03, 0.515, 0.955);
    width: 100%;
    height: 100%;
    background: linear-gradient(60.35deg, #01cac4 -2.52%, #0278f6 97.51%);
  }

  &:hover {
    // background: linear-gradient(60.35deg, #01CAC4 -2.52%, #0278F6 97.51%);
    opacity: 0.8;
    &:after {
      transform: scale(1);
      opacity: 1;
    }
    .icon {
      fill: #fff;
    }
  }
}

.search_tip_list {
  margin-top: 8px;
  margin-left: 8px;
  font-weight: 500;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  span {
    margin-right: 16px;
    opacity: 0.5;
    cursor: pointer;
    font-size: 12px;

    &:hover {
      opacity: 1;
    }
  }
}
</style>
