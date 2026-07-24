import crypto from 'crypto'

/**
 * Telegram Mini App initData HMAC verification.
 * 
 * Per official Telegram Mini Apps docs:
 * 1. Parse initData into key-value pairs
 * 2. Sort params alphabetically (excluding 'hash')
 * 3. Build data_check_string with \n separators
 * 4. secret_key = HMAC_SHA256("WebAppData", BOT_TOKEN)
 * 5. computed_hash = HEX(HMAC_SHA256(secret_key, data_check_string))
 * 6. Compare computed hash with provided hash
 * 
 * @see https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
 */
export function verifyTelegramInitData(
  initData: string,
  botToken: string,
  maxAgeSeconds: number = 300 // 5 minutes freshness window
): { valid: boolean; user: TelegramInitUser | null; error?: string } {
  try {
    const params = new URLSearchParams(initData)
    const hash = params.get('hash')

    if (!hash) {
      return { valid: false, user: null, error: 'Missing hash parameter' }
    }

    // Validate auth_date freshness
    const authDateStr = params.get('auth_date')
    if (!authDateStr) {
      return { valid: false, user: null, error: 'Missing auth_date parameter' }
    }

    const authDate = parseInt(authDateStr, 10)
    const now = Math.floor(Date.now() / 1000)

    if (isNaN(authDate) || now - authDate > maxAgeSeconds) {
      return { valid: false, user: null, error: 'Stale auth_date: authentication payload expired' }
    }

    // Build data_check_string: sort all params except 'hash', join with \n
    params.delete('hash')
    const sortedEntries = Array.from(params.entries())
      .sort(([a], [b]) => a.localeCompare(b))
    const dataCheckString = sortedEntries
      .map(([key, value]) => `${key}=${value}`)
      .join('\n')

    // Compute HMAC
    const secretKey = crypto
      .createHmac('sha256', 'WebAppData')
      .update(botToken)
      .digest()

    const computedHash = crypto
      .createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex')

    // Constant-time comparison
    if (!crypto.timingSafeEqual(Buffer.from(computedHash, 'hex'), Buffer.from(hash, 'hex'))) {
      return { valid: false, user: null, error: 'Invalid hash: HMAC verification failed' }
    }

    // Extract user
    const userStr = params.get('user')
    let user: TelegramInitUser | null = null
    if (userStr) {
      try {
        user = JSON.parse(decodeURIComponent(userStr))
      } catch {
        user = JSON.parse(userStr)
      }
    }

    return { valid: true, user }
  } catch (err: any) {
    return { valid: false, user: null, error: `Verification error: ${err.message}` }
  }
}

/**
 * Hash a token using SHA-256 for secure storage.
 * Link tokens are stored hashed — never raw.
 */
export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex')
}

/**
 * Generate a cryptographically random link token.
 */
export function generateLinkToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

/**
 * Verify Telegram webhook secret header.
 */
export function verifyWebhookSecret(
  requestSecret: string | null,
  expectedSecret: string
): boolean {
  if (!requestSecret || !expectedSecret) return false
  return crypto.timingSafeEqual(
    Buffer.from(requestSecret),
    Buffer.from(expectedSecret)
  )
}

// Type for Telegram user from initData
export interface TelegramInitUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
  is_premium?: boolean
  photo_url?: string
}
