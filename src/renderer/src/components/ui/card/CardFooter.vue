<template>
  <div :class="cn('flex items-center p-6 pt-0', props.class)">
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/renderer/src/utils/cn"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>
