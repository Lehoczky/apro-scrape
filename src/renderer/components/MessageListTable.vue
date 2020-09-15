<template>
  <table class="highlight">
    <tbody>
      <tr v-for="item in items" :key="item.url">
        <td>
          <a :href="item.url" @click.prevent="openExternal(item.url)">{{ item.title }}</a>
        </td>
        <td class="price">{{ item.price }}</td>
        <td class="location hide-on-small-only">{{ item.location }}</td>
        <td class="date hide-on-small-only">{{ item.updated }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { shell } from "electron";

export default {
  name: "MessageListTable",
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  methods: {
    openExternal(url) {
      shell.openExternal(url);
    },
  },
};
</script>

<style scoped>
.price,
.location {
  width: 100px;
}

.date {
  width: 90px;
}
</style>
