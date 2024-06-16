import { toTypedSchema } from "@vee-validate/zod"
import { useForm } from "vee-validate"
import { z } from "zod"

export function useScrapingForm() {
  const formSchema = toTypedSchema(
    z.object({
      url: z
        .string()
        .min(1, "Please fill out this field")
        .url("Please provide a valid URL")
        .startsWith(
          "https://hardverapro.hu",
          "Please provide a link to hardverapro.hu",
        )
        .refine(async (value) => await window.api.validateUrl(value), {
          message: "The page does not exist, please check the URL",
        }),
    }),
  )

  return useForm({
    validationSchema: formSchema,
    initialValues: { url: "" },
  })
}
