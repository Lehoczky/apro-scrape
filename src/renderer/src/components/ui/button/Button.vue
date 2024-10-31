<script setup lang="ts">
import { Primitive, type PrimitiveProps } from "radix-vue"
import type { HTMLAttributes } from "vue"

import { cn } from "@/renderer/src/utils/cn"

import { type ButtonVariants, buttonVariants } from "."

interface Props extends PrimitiveProps {
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
  variant: "default",
  size: "default",
  class: undefined,
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <slot />
  </Primitive>
</template>
