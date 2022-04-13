import unhandled from "electron-unhandled"
import { openNewGitHubIssue } from "electron-util"

export const setupErrorHandling = () => {
  unhandled({
    reportButton: error => {
      openNewGitHubIssue({
        user: "Lehoczky",
        repo: "apro-scrape",
        body: `\`\`\`\n${error.stack}\n\`\`\`\n\n`,
      })
    },
  })
}

export const logError = error => {
  unhandled.logError(error)
}
