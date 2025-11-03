export type LogLevel = "info" | "warn" | "error" | "debug"

export interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  context?: Record<string, unknown>
  userId?: string
  errorId?: string
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === "development"

  private formatMessage(entry: LogEntry): string {
    return `[${entry.timestamp}] [${entry.level.toUpperCase()}] ${entry.message}${
      entry.errorId ? ` (ID: ${entry.errorId})` : ""
    }`
  }

  private log(level: LogLevel, message: string, context?: Record<string, unknown>) {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
    }

    const formattedMessage = this.formatMessage(entry)

    // Console logging
    switch (level) {
      case "error":
        console.error(formattedMessage, context)
        break
      case "warn":
        console.warn(formattedMessage, context)
        break
      case "debug":
        if (this.isDevelopment) {
          console.debug(formattedMessage, context)
        }
        break
      default:
        console.log(formattedMessage, context)
    }

    // In production, send to monitoring service (e.g., Sentry, LogRocket)
    if (!this.isDevelopment && level === "error") {
      this.sendToMonitoring(entry)
    }
  }

  private async sendToMonitoring(entry: LogEntry) {
    // Integrate with monitoring service
    // Example: Sentry.captureException(entry)
    try {
      // Send to external monitoring service
      await fetch("/api/monitoring/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      })
    } catch (error) {
      console.error("Failed to send log to monitoring service:", error)
    }
  }

  info(message: string, context?: Record<string, unknown>) {
    this.log("info", message, context)
  }

  warn(message: string, context?: Record<string, unknown>) {
    this.log("warn", message, context)
  }

  error(message: string, context?: Record<string, unknown>) {
    const errorId = `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    this.log("error", message, { ...context, errorId })
    return errorId
  }

  debug(message: string, context?: Record<string, unknown>) {
    this.log("debug", message, context)
  }
}

export const logger = new Logger()
