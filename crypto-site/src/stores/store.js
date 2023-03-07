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
