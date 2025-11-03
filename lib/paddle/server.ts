// Paddle Server-side API client
const PADDLE_API_KEY = process.env.PADDLE_API_KEY || "apikey_01k483wa89jeqjdf6b84bqzq9a"
const PADDLE_API_URL =
  process.env.NODE_ENV === "production" ? "https://api.paddle.com" : "https://sandbox-api.paddle.com"

interface PaddlePrice {
  id: string
  product_id: string
  description: string
  unit_price: {
    amount: string
    currency_code: string
  }
  billing_cycle?: {
    interval: string
    frequency: number
  }
}

interface PaddleTransaction {
  id: string
  status: string
  customer_id: string
  items: Array<{
    price_id: string
    quantity: number
  }>
  checkout: {
    url: string
  }
}

export class PaddleClient {
  private apiKey: string
  private apiUrl: string

  constructor() {
    this.apiKey = PADDLE_API_KEY
    this.apiUrl = PADDLE_API_URL
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${this.apiUrl}${endpoint}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Paddle API Error: ${JSON.stringify(error)}`)
    }

    return response.json()
  }

  async createTransaction(data: {
    items: Array<{ price_id: string; quantity: number }>
    customer_id?: string
    customer_email?: string
    custom_data?: Record<string, any>
    return_url?: string
  }): Promise<PaddleTransaction> {
    return this.request("/transactions", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async getTransaction(transactionId: string): Promise<PaddleTransaction> {
    return this.request(`/transactions/${transactionId}`)
  }

  async createCustomer(data: { email: string; name?: string }) {
    return this.request("/customers", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async getCustomer(customerId: string) {
    return this.request(`/customers/${customerId}`)
  }

  async getSubscription(subscriptionId: string) {
    return this.request(`/subscriptions/${subscriptionId}`)
  }

  async cancelSubscription(subscriptionId: string) {
    return this.request(`/subscriptions/${subscriptionId}/cancel`, {
      method: "POST",
    })
  }

  async updateSubscription(subscriptionId: string, data: { price_id?: string }) {
    return this.request(`/subscriptions/${subscriptionId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    })
  }

  verifyWebhook(signature: string, body: string): boolean {
    // Paddle webhook verification
    // In production, implement proper signature verification using Paddle's webhook secret
    // For now, we'll accept all webhooks in development
    if (process.env.NODE_ENV === "development") {
      return true
    }

    // TODO: Implement proper webhook signature verification
    // See: https://developer.paddle.com/webhooks/signature-verification
    return true
  }
}

export const paddleClient = new PaddleClient()
