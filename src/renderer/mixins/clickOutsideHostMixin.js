import ClickOutside from "vue-click-outside"

export default {
  directives: {
    ClickOutside,
  },
  mounted() {
    this.popupItem = this.$el
  },
}
