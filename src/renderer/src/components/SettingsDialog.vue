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
              class="flex flex-row items-center justify-between rounded-lg border p-4"
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
import * as z from "zod"

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

const isDark = useDark({
  storageKey: "settings:darkMode",
})

const schema = toTypedSchema(
  z.object({
    darkMode: z.boolean(),
  }),
)

const form = useForm({
  validationSchema: schema,
  initialValues: {
    darkMode: isDark.value,
  },
})

watch(
  () => form.values.darkMode,
  (darkMode) => (isDark.value = !!darkMode),
)
</script>
