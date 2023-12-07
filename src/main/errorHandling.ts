import unhandled from "electron-unhandled"
import { openNewGitHubIssue } from "electron-util"

export function setupErrorHandling() {
  unhandled({
    reportButton: (error) => {
      openNewGitHubIssue({
        user: "Lehoczky",
        repo: "apro-scrape",
        body: `\`\`\`\n${error.stack}\n\`\`\`\n\n`,
      })
    },
  })
}

export function logError(error: Error) {
  unhandled.logError(error)
}
