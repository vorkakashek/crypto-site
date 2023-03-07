import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useLangSwitcher = defineStore("langSwitcher", {
  state: () => ({
    lang: useStorage("lang", "ru"),
  }),
  actions: {
    setLang(lang) {
      this.lang = lang;
    },
  },
});

export const useUser = defineStore("user", {
  state: () => ({
    loggedIn: useStorage("loggedIn", false),
    userId: useStorage("userId", null),
    userXmr: {
      session: useStorage("userXmr.session", "0"),
      total: useStorage("userXmr.total", "0"),
      profit: useStorage("userXmr.profit", "0"),
    },
    userUsd: {
      session: useStorage("userUsd.session", "0"),
      total: useStorage("userUsd.total", "0"),
      profit: useStorage("userUsd.profit", "0"),
    },
  }),
  actions: {
    setLoggedIn(loggedIn) {
      this.loggedIn = loggedIn;
    },
    setUserId(userId) {
      this.userId = userId;
    },
    getUserId() {
      return this.userId;
    },
    removeUserId() {
      this.userId = null;
    },
    setUserUsd(data) {
      this.userUsd.session = String(data.session);
      this.userUsd.total = String(data.total);
      this.userUsd.profit = String(data.profit);
    },
    setUserXmr(data) {
      this.userXmr.session = String(data.session);
      this.userXmr.total = String(data.total);
      this.userXmr.profit = String(data.profit);
    },
  },
});

export const useModal = defineStore("modal", {
  state: () => ({
    visible: false,
    currentTab: 0,
    type: "login",
  }),
  actions: {
    show(type) {
      this.visible = true;
      this.type = type;
      document.querySelector("html").style.overflow = "hidden";
    },
    hide() {
      this.visible = false;
      document.querySelector("html").removeAttribute("style");
    },
    setTab(tab) {
      this.currentTab = tab;
    },
  },
});
