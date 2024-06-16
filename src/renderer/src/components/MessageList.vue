<template>
  <CardContent v-auto-animate>
    <section v-for="message in messages" :key="dateIntervalForMessage(message)">
      <div
        class="mt-6 border-b border-border p-4 text-xl font-semibold capitalize text-primary"
      >
        {{ dateIntervalForMessage(message) }}
      </div>
      <ul>
        <li
          v-for="item in message"
          :key="item.url"
          class="item border-b border-border"
        >
          <div class="title">
            <h1>
              <a :href="item.url" target="_blank">{{ item.title }}</a>
            </h1>
          </div>
          <div class="info border-l border-border">
            <div class="price font-semibold text-primary">
              {{ item.price }}
            </div>
            <div class="location">
              {{ item.location }}
            </div>
            <div class="updated text-muted-foreground">
              {{ item.updated }}
            </div>
          </div>
        </li>
      </ul>
    </section>
  </CardContent>
</template>

<script setup lang="ts">
import { vAutoAnimate } from "@formkit/auto-animate"

import type { SoldItem } from "@/shared"

import { CardContent } from "./ui/card"

defineProps({
  messages: {
    type: Array as PropType<SoldItem[][]>,
    required: true,
  },
})

function dateIntervalForMessage(message: SoldItem[]) {
  const lastDate = message[message.length - 1].updated
  const firstDate = message[0].updated
  return `${lastDate} - ${firstDate}`
}
</script>

<style scoped>
.item {
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
}

@media screen and (width <= 470px) {
  .item {
    padding: 1rem 0;
    flex-direction: column;
    align-items: unset;
  }
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

@media screen and (width <= 470px) {
  .title {
    padding: 0;
  }

  .title > h1 {
    font-size: 0.9rem;
  }
}

.info {
  width: 140px;
  text-align: center;
}

@media screen and (width <= 470px) {
  .info {
    width: unset;
    display: flex;
    text-align: unset;
    border: none;
    justify-content: space-between;
    margin-top: 0.5rem;
  }
}

.price,
.location,
.updated {
  line-height: 1.25rem;
}

@media screen and (width <= 470px) {
  .price,
  .location,
  .updated {
    font-size: 0.95rem;
  }
}
</style>
