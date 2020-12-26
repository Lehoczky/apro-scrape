<template>
  <div>
    <section v-for="(message, index) in messages" :key="index">
      <div class="section-title">{{ dateIntervalForMessage(message) }}</div>
      <ul class="list-unstyled">
        <li v-for="item in message" :key="item.url" class="item">
          <div class="title">
            <h1>
              <a :href="item.url" @click.prevent="openExternal(item.url)">{{
                item.title
              }}</a>
            </h1>
          </div>
          <div class="info">
            <div class="price">{{ item.price }}</div>
            <div class="location">{{ item.location }}</div>
            <div class="updated">{{ item.updated }}</div>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { shell } from "electron";

export default {
  name: "MessageList",
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
    openExternal(url) {
      shell.openExternal(url);
    },
  },
};
</script>

<style scoped>
.section-title {
  font-weight: 500;
  font-size: 1.25rem;
  text-transform: capitalize;
  color: #bc1013;
  padding: 1rem;
  line-height: 1.5rem;
  margin: 0;
  border-bottom: solid 1px #d5d4cb;
}

.section-title:not(:first-child) {
  margin-top: 2rem;
}

.item {
  border-bottom: solid 1px #ddd;
  padding: 0.5rem 0;
  margin: 0;
  display: flex;
  align-items: center;
  position: relative;
}

.title {
  flex: 1;
  padding: 0 1rem;
}

.title > h1 {
  word-break: break-word;
  overflow-wrap: break-word;
  margin: 0;
  font-size: 1rem;
}

.title > h1 > a {
  color: #333;
}

.info {
  width: 140px;
  text-align: center;
  border-left: solid 1px #ddd;
  padding: 0 0.125rem;
  flex: none;
}

.price,
.location,
.updated {
  line-height: 1.25rem;
}

.price {
  color: #bc1013;
  font-weight: 500;
  font-size: 1rem;
}

.updated {
  color: #999;
}
</style>
