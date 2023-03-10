<script setup>
import { ref, computed, watch, onBeforeUnmount, onMounted } from "vue";
import { useRouter, useRoute } from 'vue-router'
import Panel from "@/components/Panel.vue";
import Label from "@/components/Label.vue";
import PluginBanner from "@/components/PluginBanner.vue";
import { useUser, useModal, useStore } from "@/stores/store";
import axios from "redaxios";

const storeUser = useUser(),
  storeModal = useModal(),
  store = useStore()

let miner_started = ref(false),
  miner_power = ref("Medium"),
  data = ref(["Low", "Medium", "Heavy"])

let radialBar_options = {
  // colors: ["0278F6"],
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      hollow: {
        size: "60%",
      },
      track: {
        background: "#E3E4E9",
        startAngle: -90,
        endAngle: 90,
      },
      dataLabels: {
        name: {
          show: false,
        },
        value: {
          fontSize: "30px",
          show: true,
          formatter: function (val) {
            return;
          },
        },
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      type: "horizontal",
      shadeIntensity: 0,
      // gradientFromColors: ["#000"],
      // gradientToColors: ["#01CAC4"],
      stops: [0, 100],
    },
  },
  stroke: {
    lineCap: "butt",
  },
  labels: ["Progress"],
}

let randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let radialBar_options2 = {
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      hollow: {
        size: "60%",
      },
      track: {
        background: "transparent",
      },
      dataLabels: {
        enabled: false,
        name: {
          fontSize: "16px",
          color: undefined,
          offsetY: 120,
        },
        value: {
          offsetY: 76,
          fontSize: "22px",
          color: undefined,
          formatter: function (val) {
            return;
            // return val + "%";
          },
        },
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      shadeIntensity: 0.15,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 30, 65, 91],
    },
  },
  stroke: {
    dashArray: 2,
  },
  labels: [""],
}

let radialBar_options3 = {
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      hollow: {
        size: "60%",
      },
      track: {
        background: "transparent",
      },
      dataLabels: {
        enabled: false,
        name: {
          fontSize: "16px",
          color: undefined,
          offsetY: 120,
        },
        value: {
          offsetY: 76,
          fontSize: "22px",
          color: undefined,
          formatter: function (val) {
            return;
            // return val + "%";
          },
        },
      },
    },
  },
  fill: {
    type: "horizontal",
    colors: ["#E8E8E8"],
    // gradient: {
    //     shade: "#333",
    //     shadeIntensity: .15,
    //     inverseColors: false,
    //     stops: [0, 30, 65, 91]
    // },
  },
  stroke: {
    dashArray: 2,
  },
  labels: [""],
}

let speed_val = ref(0),
  tickInterval = ref(null),
  speed_percent = ref(0)

watch(miner_power, () => {
  if (miner_started.value) {
    tick()
  }
})

let speed_val_computed = computed(() => miner_started.value ? speed_val.value : 0)
let radialBar_series = computed(() => [miner_started.value ? speed_percent.value : 0]) // скорость в процентах

let radialBar_series_full = [100];

onMounted(() => {
  if (window.location.href.includes("?play=on")) {
    axios.get('?play=on')
      .finally(() => {
        startMining()
      })
  }
})

let startMining = () => {
  if (!miner_started.value) {
    axios
      .post(`${store.domain}/api/v1/user/mining/start`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.data.success) {
          miner_started.value = true;
          tick();
          tickInterval.value = setInterval(tick, 10000);
        }
      });
  } else {
    tick();
    clearInterval(tickInterval.value);
    axios
      .post(`${store.domain}/api/v1/user/mining/stop`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.data.success) {
          miner_started.value = false;
        }
      })
  }
}

let tick = () => {
  let power = ref("mid")
  switch (miner_power.value) {
    case "Low":
      power.value = "low"
      break
    case "Medium":
      power.value = "mid"
      break
    case "Heavy":
      power.value = "high"
      break
    default:
      power.value = "mid"
      break
  }
  // console.log(power)
  axios
    .post(
      `${store.domain}/api/v1/user/mining/tick`,
      {
        speed: power.value,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((res) => {
      let mining = res.data.user.mining
      let speed = res.data.speed

      speed_val.value = speed.hashes_per_sec
      speed_percent.value = speed.percent

      storeUser.setUserXmr({
        session: mining.balance_session.xmr,
        total: mining.balance_total.xmr,
        current: mining.balance_current.xmr,
        profit: res.data.near_profit_day.xmr,
      })
      storeUser.setUserUsd({
        session: mining.balance_session.usd,
        total: mining.balance_total.usd,
        current: mining.balance_current.usd,
        profit: res.data.near_profit_day.usd,
      })
    })
}

onBeforeUnmount(() => {
  clearInterval(tickInterval.value)
  if (miner_started.value) {
    startMining()
  }
})
</script>

<template>
  <div class="row miner_area">
    <div class="col-12 col-lg-7 order-2 order-lg-1">
      <div class="row miner">
        <div class="col-12 col-sm-5 order-2 order-sm-1 d-flex d-sm-block flex-wrap">
          <div class="miner_statistics">
            <div class="label">{{ $t("main.miner_statistics_label") }}</div>
            <div class="miner_statistics_val">
              <span>{{ storeUser.userXmr.profit }}</span> XMR / {{ $t("main.day") }}
            </div>
            <div class="miner_statistics_val small">
              = {{ storeUser.userUsd.profit }} USD / {{ $t("main.day") }}
            </div>
          </div>
          <div class="miner_statistics">
            <div class="label">
              {{ $t("main.miner_statistics_label_session") }}
            </div>
            <div class="miner_statistics_val blue">
              <span>{{ storeUser.userXmr.session }}</span> XMR
            </div>
            <div class="miner_statistics_val small">
              = {{ storeUser.userUsd.session }} USD
            </div>
          </div>
          <div class="miner_statistics">
            <div class="label">
              {{ $t("main.miner_statistics_label_time") }}
            </div>
            <div class="miner_statistics_val blue">
              <span>{{ storeUser.userXmr.total }}</span> XMR
            </div>
            <div class="miner_statistics_val small">
              = {{ storeUser.userUsd.total }} USD
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-7 order-1 order-sm-2">
          <div class="miner_speed_outer">
            <div class="miner_speed_area">
              <div class="miner_speed_value">
                {{ speed_val_computed }} <span>{{ $t("miner.speed") }}</span>
              </div>
              <div class="miner_speed_filled">
                <apexchart height="360px" type="radialBar" :options="radialBar_options" :series="radialBar_series" />
              </div>
              <div class="miner_speed_dashed">
                <apexchart height="260px" type="radialBar" :options="radialBar_options2" :series="radialBar_series" />
              </div>
              <div class="miner_speed_dashed disabled">
                <apexchart height="260px" type="radialBar" :options="radialBar_options3"
                  :series="radialBar_series_full" />
              </div>
            </div>
            <a href="#" class="ext_btn">{{ $t("miner.button") }} <app-icon name="rocket" /></a>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 col-lg-5 order-3 order-lg-2">
      <PluginBanner />
    </div>
    <div class="col-12 order-1 order-lg-3">
      <Panel>
        <template #content>
          <div class="row miner_main">
            <Label :label="$t('main.miner_balance')" icon="wallet" />
            <div class="col-12 col-md-4 order-2 order-md-1">
              <div class="miner_actions">
                <button class="miner_button filled" type="button" @click="startMining">
                  <template v-if="!miner_started">
                    <app-icon name="start" />
                    {{ $t("miner.start") }}
                  </template>
                  <template v-else>
                    <app-icon name="pause" />
                    {{ $t("miner.stop") }}
                  </template>
                </button>
                <button class="miner_button outlined" type="button"
                  @click="storeUser.loggedIn ? storeModal.show('payout') : storeModal.show('login'), storeModal.setTab(1)">
                  <app-icon name="circle-multiple" />
                  {{ $t("miner.withdraw") }}
                </button>
                <div class="msg_let_sing_up" v-if="!storeUser.loggedIn">
                  <button @click="storeModal.show('login'), storeModal.setTab(1)">{{ $t("main.msg_let_sing_up_1")
                  }}</button>{{ $t("main.msg_let_sing_up_2") }}
                </div>
              </div>
            </div>

            <div class="col-12 col-md-8 order-1 order-md-2">
              <div :class="[{ active: miner_started }, 'miner_balance']">
                {{ storeUser.userXmr.current }} <app-icon name="monero" size="28" />
              </div>
              <div class="miner_balance_info">
                {{ $t("miner.approx") }}:
                <span>{{ storeUser.userUsd.current }} USD</span>
              </div>
              <div class="miner_balance_info">
                {{ $t("miner.min_withdraw") }}:
                <span> 0.0001 XMR </span>
              </div>
            </div>
          </div>

          <div class="row miner_power">
            <div class="col-12 col-md-4">
              <Label :label="$t('main.miner_power')" icon="power" />
            </div>
            <div class="col-12 col-md-8">
              <vue-slider v-model="miner_power" :marks="true" :data="data" :included="true" :absorb="true" :dotSize="24"
                :height="10" :lazy="true" tooltip="none"></vue-slider>
            </div>
          </div>
        </template>
      </Panel>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.miner {
  margin-top: 24px;
}

.miner_area {
  // margin-top: 24px;
}

.ext_btn {
  border-radius: 8px;
  background-color: #13406d;
  padding: 12px 24px;
  color: #fff;
  text-decoration: none;
  border: none;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  position: relative;
  z-index: 6;
  font-size: 12px;

  .icon {
    margin-left: 8px;
  }

  &:hover {
    // opacity: .9;
    background-color: var(--blue);
  }
}

.miner_speed_area {
  height: 200px;
  width: 278px;
  position: relative;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  user-select: none;
  pointer-events: none;

  &:after {
    content: "";
    display: block;
    z-index: 1;
    position: absolute;
    width: 125px;
    height: 80px;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    background-size: contain;
    background-image: url("@/assets/images/speed_semi-circle.svg");
    background-repeat: no-repeat;
    background-position: center;
  }
}

.miner_speed_outer {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.miner_speed_value {
  position: absolute;
  z-index: 3;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  color: #42454b;

  span {
    display: block;
    font-size: 12px;
    font-weight: 700;
    color: #c0c2d4;
  }
}

.miner_speed_dashed {
  position: absolute;
  // bottom: 0;
  // left: 50%;
  top: 50%;
  transform: translateY(-50px);
  // transform: translate(-50%, -50%);

  &:not(.disabled) {
    z-index: 1;
  }
}

.miner_actions {
  @include r(md) {
    margin-top: 16px;
  }
}

.miner_power {
  display: flex;
  align-items: center;
  margin-top: 24px;

  .panel_label {
    margin-bottom: 0;
  }
}

.miner_statistics {
  &:not(:last-child) {
    margin-bottom: 16px;
  }

  &:first-child {
    margin-bottom: 24px;
  }

  .label {
    font-size: 12px;
    font-weight: 500;
    color: var(--main_tint_2);
    margin-bottom: 8px;
  }

  @include r(h) {
    flex: 1 1 0;
    margin-top: 16px;

    &:first-child {
      min-width: 100%;
      margin-bottom: 0;
    }
  }
}

.miner_statistics {
  &:first-child {
    .miner_statistics_val {
      >span {
        font-size: 13px;
      }
    }
  }
}

.miner_statistics_val {
  font-size: 13px;
  font-weight: 700;

  &.small {
    font-size: 12px;
    color: var(--main_tint_2);
    opacity: 0.5;
    margin-top: 4px;
  }

  &.blue {
    font-size: 12px;
    color: var(--blue);
    font-weight: 400;

    span {
      color: var(--blue);
      font-weight: 700;
    }
  }
}

.miner_balance {
  font-size: 40px;
  letter-spacing: 0.04rem;
  font-weight: 700;
  opacity: 0.5;
  margin-bottom: 16px;

  @include r(md) {
    text-align: center;
    font-size: 28px;

    .icon {
      width: 20px;
      height: 20px;
    }
  }

  &.active {
    opacity: 1;
    color: var(--blue);

    .icon {
      fill: var(--blue);
    }
  }
}

.miner_balance_info {
  margin-bottom: 8px;
  font-size: 14px;
  color: #c0c2d4;

  span {
    font-weight: 700;
  }

  @include r(md) {
    text-align: center;
  }
}

.miner_button {
  border-radius: 8px;
  width: 100%;
  padding: 14px 24px;
  outline: none;
  border: none;
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 52px;

  &.filled {
    background: linear-gradient(93.49deg, #01cac4 -19.41%, #0278f6 116.58%),
      #d9d9d9;

    &:hover {
      opacity: 0.8;
    }
  }

  &.outlined {
    border: 2px solid var(--blue);
    color: var(--blue);

    .icon {
      fill: var(--blue);
    }

    &:hover {
      background-color: var(--blue);
      color: #fff;

      .icon {
        fill: #fff;
      }
    }
  }

  .icon {
    margin-right: 8px;
  }

  &:not(:last-child) {
    margin-bottom: 16px;

    @include r(md) {
      margin-bottom: 8px;
    }
  }
}

.msg_let_sing_up {
  text-align: center;
  opacity: 0.5;
  margin-top: -8px;
  font-size: 13px;

  button {
    display: inline;
    font-weight: 700;
    background: unset;
    border: none;
    outline: none;
    padding: 0;
    font-size: 13px;
  }

  &:hover {
    opacity: 1;
  }

  @include r(md) {
    margin-top: 0px;
  }
}

.vue-slider {
  margin-bottom: 8px;
}

:deep(.vue-slider-dot-handle) {
  border: 8px solid var(--blue);
  box-shadow: unset;
}

:deep(.vue-slider-process) {
  background: linear-gradient(92.98deg, #01cac4 2.48%, #0278f6 97.52%), #d9d9d9;
}

:deep(.vue-slider-mark) {
  cursor: pointer;

  .vue-slider-mark-label {
    font-weight: 700;
    font-size: 12px;
    color: var(--main_tint_2);
  }

  &:first-child {
    .vue-slider-mark-label {
      transform: translateX(0px);
    }
  }

  &:last-child {
    .vue-slider-mark-label {
      transform: translateX(-100%);
    }
  }
}
</style>
