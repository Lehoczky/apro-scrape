<template>
  <div>
    <section v-for="(message, index) in messages" :key="index" class="row">
      <div class="card">
        <div class="card-content">
          <span class="card-title">{{ dateIntervalForMessage(message) }}</span>
          <message-list-table :items="message"></message-list-table>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import MessageListTable from "./MessageListTable.vue";

export default {
  name: "MessageList",
  components: {
    MessageListTable,
  },
  props: {
    messages: {
      type: Array,
      required: true,
    },
  },
  methods: {
    dateIntervalForMessage(message) {
      const lastDate = message[message.length - 1].updated;
      const firstDate = message[0].updated;
      return `${lastDate} - ${firstDate}`;
    },
  },
};
</script>
