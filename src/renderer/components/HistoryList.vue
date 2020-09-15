<template>
  <transition name="fade-from-top">
    <div class="row collection">
      <a
        v-for="link in history"
        :key="link"
        class="collection-item small-font waves-effect waves-teal"
        @click="$emit('select', link)"
      >{{link}}</a>
    </div>
  </transition>
</template>

<script>
export default {
  name: "HistoryList",
  props: {
    history: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.small-font {
  font-size: 12px;
}

.fade-from-top-enter-active {
  animation: fade-from-top 0.1s;
}

.fade-from-top-leave-active {
  animation: fade-from-top 0.1s reverse;
}

@keyframes fade-from-top {
  0% {
    transform: translateY(-50px);
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
