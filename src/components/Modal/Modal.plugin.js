export const ModalPlugin = {
  install(Vue, options) {
    this.event = new Vue();

    Vue.prototype.$modal = {
      show(modalName, params = {}) {
        ModalPlugin.event.$emit("show", modalName, params);
      },
      hide(modalName) {
        ModalPlugin.event.$emit("hide", modalName);
      },
      $event: this.event
    };
  }
};
