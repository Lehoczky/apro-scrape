<template>
  <Card>
    <CardContent class="pt-6">
      <form id="scrapingForm" @submit="onSubmit">
        <FormField
          v-slot="{ componentField }"
          name="url"
          :validate-on-model-update="false"
          :validate-on-blur="false"
          :validate-on-change="false"
          :validate-on-input="false"
        >
          <FormItem v-auto-animate>
            <FormLabel>URL to scrape</FormLabel>
            <FormControl>
              <Textarea type="text" v-bind="componentField" />
            </FormControl>
            <HelpText
              v-if="historyIsEmpty"
              @url-click="setAsCurrentUrl($event)"
            />
            <FormMessage />
          </FormItem>
        </FormField>
      </form>
    </CardContent>

    <CardFooter class="flex justify-end gap-4">
      <Dialog>
        <DialogTrigger as-child>
          <Button variant="outline" :disabled="scraping">
            <HistoryIcon class="mr-2 h-4 w-4" />
            <span>Search History</span>
          </Button>
        </DialogTrigger>
        <ScrapingFormHistoryDialog
          :history="history"
          @select="setAsCurrentUrl($event)"
        />
      </Dialog>

      <Button v-if="!scraping" class="w-24" type="submit" form="scrapingForm">
        Scrape
      </Button>
      <Button v-else class="w-24" loading variant="destructive" @click="onStop">
        <Loader2 class="mr-2 h-4 w-4 animate-spin" />
        <span>Stop</span>
      </Button>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import { vAutoAnimate } from "@formkit/auto-animate/vue"
import { HistoryIcon, Loader2 } from "lucide-vue-next"

import { Button } from "@/renderer/src/components/ui/button"
import { Dialog, DialogTrigger } from "@/renderer/src/components/ui/dialog"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/renderer/src/components/ui/form"
import { Textarea } from "@/renderer/src/components/ui/textarea"

import { useHistory } from "../composables/useHistory"
import { useScrapingForm } from "../composables/useScrapingFrom"
import HelpText from "./HelpText.vue"
import ScrapingFormHistoryDialog from "./ScrapingFormHistoryDialog.vue"
import { Card, CardContent, CardFooter } from "./ui/card"

const emit = defineEmits<{
  (submit: "submit", payload: string): void
  (event: "stop"): void
}>()

const scraping = ref(false)
const form = useScrapingForm()
const { history, loadSavedHistory, addToHistory, historyIsEmpty } = useHistory()

const onSubmit = form.handleSubmit(({ url }) => {
  scraping.value = true
  addToHistory(url)
  emit("submit", url)
})

function onStop(): void {
  scraping.value = false
  emit("stop")
}

function setAsCurrentUrl(link: string): void {
  if (!scraping.value) {
    form.resetForm()
    form.setFieldValue("url", link)
  }
}

loadSavedHistory()
</script>
