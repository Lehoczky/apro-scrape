<script setup lang="ts">
import { Separator, type SeparatorProps } from "reka-ui"
import { computed, type HTMLAttributes } from "vue"

import { cn } from "@/renderer/src/utils/cn"

const props = defineProps<
  SeparatorProps & { class?: HTMLAttributes["class"] }
>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <Separator
    v-bind="delegatedProps"
    :class="
      cn(
        'shrink-0 bg-border',
        props.orientation === 'vertical' ? 'h-full w-px' : 'h-px w-full',
        props.class,
      )
    "
  />
</template>
