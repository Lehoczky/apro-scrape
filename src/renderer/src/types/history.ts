import { z } from "zod"

const historyEntrySchema = z.object({
  url: z.string().url(),
  lastSearched: z.coerce.date(),
})
export type HistoryEntry = z.infer<typeof historyEntrySchema>

export function parseHistoryEntries(
  content: string | null | undefined,
): HistoryEntry[] {
  if (!content) {
    return []
  }

  return z
    .string()
    .transform((_, ctx) => {
      try {
        return JSON.parse(content)
      } catch (error) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "invalid json",
        })
        return z.never
      }
    })
    .pipe(z.array(historyEntrySchema))
    .parse(content)
}

export function getHistoryDetails(historyEntry: HistoryEntry) {
  const parsedURL = new URL(historyEntry.url)
  const searchParams = parsedURL.searchParams
  const searchParamsObject = Object.fromEntries(searchParams.entries())
  const definedSearchParams = pickByValues(searchParamsObject, isTruthy)
  return {
    title: parsedURL.pathname,
    searchParams: definedSearchParams,
  }
}

function pickByValues<T>(
  object: Record<string, T>,
  predicate: (value: T) => boolean,
) {
  const obj = {}
  for (const key in object) {
    if (predicate(object[key])) {
      obj[key] = object[key]
    }
  }
  return obj
}

function isTruthy(value: unknown) {
  return !!value
}
