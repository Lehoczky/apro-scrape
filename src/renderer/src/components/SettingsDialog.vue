<template>
  <Dialog>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Settings</DialogTitle>
        <DialogDescription>
          You can change application settings here
        </DialogDescription>
      </DialogHeader>

      <form id="settings-form" class="w-full space-y-6">
        <div class="space-y-4">
          <FormField v-slot="{ value, handleChange }" name="darkMode">
            <FormItem
              class="flex flex-row items-center justify-between gap-6 rounded-lg border p-4"
            >
              <div class="space-y-0.5">
                <FormLabel class="text-base">Dark Mode</FormLabel>
                <FormDescription>
                  Whether to use the dark theme
                </FormDescription>
              </div>
              <FormControl>
                <Switch :checked="value" @update:checked="handleChange" />
              </FormControl>
            </FormItem>
          </FormField>

          <FormField v-slot="{ value, handleChange }" name="alwaysOnTop">
            <FormItem
              class="flex flex-row items-center justify-between gap-6 rounded-lg border p-4"
            >
              <div class="space-y-0.5">
                <FormLabel class="text-base">Always on top</FormLabel>
                <FormDescription>
                  Sets whether the window should show always on top of other
                  windows.
                </FormDescription>
              </div>
              <FormControl>
                <Switch :checked="value" @update:checked="handleChange" />
              </FormControl>
            </FormItem>
          </FormField>
        </div>
      </form>

      <DialogFooter>
        <DialogClose>
          <Button>Done</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod"
import { useForm } from "vee-validate"
import { watch } from "vue"
import * as z from "zod"

import { useSettings } from "../composables/useSettings"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "./ui/form"
import { Switch } from "./ui/switch"

const { isDark, isAlwaysOnTop } = useSettings()

const schema = toTypedSchema(
  z.object({
    darkMode: z.boolean(),
    alwaysOnTop: z.boolean(),
  }),
)

const form = useForm({
  validationSchema: schema,
  initialValues: {
    darkMode: isDark.value,
    alwaysOnTop: isAlwaysOnTop.value,
  },
})

watch(
  () => form.values.darkMode,
  (darkMode) => (isDark.value = !!darkMode),
)

watch(
  () => form.values.alwaysOnTop,
  (alwaysOnTop) => {
    if (alwaysOnTop) {
      window.api.enableAlwaysOnTop()
      isAlwaysOnTop.value = true
    } else {
      window.api.disableAlwaysOnTop()
      isAlwaysOnTop.value = false
    }
  },
)
</script>
