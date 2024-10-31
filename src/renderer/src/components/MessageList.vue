<script setup lang="ts">
import { vAutoAnimate } from "@formkit/auto-animate"
import type { PropType } from "vue"

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
          class="flex flex-col border-b border-border py-4 xs:flex-row xs:items-center xs:py-2"
        >
          <div class="flex-1 px-0 xs:px-4">
            <div class="flex items-center gap-4">
              <a :href="item.url" target="_blank">
                <img
                  :src="item.imageSrc"
                  class="aspect-[4/3] w-[80px] rounded-md object-cover"
                  alt=""
                />
              </a>

              <a
                :href="item.url"
                class="underline decoration-transparent underline-offset-2 transition-colors duration-200 [overflow-wrap:break-word] [word-break:break-word] hover:decoration-current"
                target="_blank"
                >{{ item.title }}</a
              >
            </div>
          </div>
          <div
            class="mt-2 flex justify-between border-0 text-sm leading-5 xs:mt-0 xs:w-[140px] xs:flex-col xs:justify-normal xs:border-l xs:border-border xs:text-center xs:text-base"
          >
            <div class="font-semibold text-primary">
              {{ item.price }}
            </div>
            <div>
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
