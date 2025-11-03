export const EMAIL_CONFIG = {
  host: process.env.EMAIL_HOST || "mail.privateemail.com",
  port: Number.parseInt(process.env.EMAIL_PORT || "465"),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER || "Info@wearejobpilot.com",
    pass: process.env.EMAIL_PASS || "",
  },
  from: {
    name: "JobPilot",
    address: "Info@wearejobpilot.com",
  },
  support: "kenneth_vreden@wearejobpilot.com",
}
