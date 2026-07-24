'use client'

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'

// Telegram WebApp types (subset)
interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
  is_premium?: boolean
  photo_url?: string
}

interface TelegramWebApp {
  initData: string
  initDataUnsafe: {
    query_id?: string
    user?: TelegramUser
    auth_date?: number
    hash?: string
  }
  version: string
  platform: string
  colorScheme: 'light' | 'dark'
  isExpanded: boolean
  viewportHeight: number
  viewportStableHeight: number
  headerColor: string
  backgroundColor: string
  ready: () => void
  expand: () => void
  close: () => void
  MainButton: {
    text: string
    color: string
    textColor: string
    isVisible: boolean
    isActive: boolean
    show: () => void
    hide: () => void
    onClick: (cb: () => void) => void
    offClick: (cb: () => void) => void
    setText: (text: string) => void
    enable: () => void
    disable: () => void
  }
  BackButton: {
    isVisible: boolean
    show: () => void
    hide: () => void
    onClick: (cb: () => void) => void
    offClick: (cb: () => void) => void
  }
  HapticFeedback: {
    impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void
    notificationOccurred: (type: 'error' | 'success' | 'warning') => void
    selectionChanged: () => void
  }
  safeAreaInset: { top: number; bottom: number; left: number; right: number }
  contentSafeAreaInset: { top: number; bottom: number; left: number; right: number }
}

interface TelegramContextType {
  /** Whether we are inside a Telegram Mini App */
  isTelegramApp: boolean
  /** Whether the Telegram SDK is fully ready */
  isReady: boolean
  /** The raw Telegram WebApp object */
  webApp: TelegramWebApp | null
  /** Verified Telegram user data (from initDataUnsafe — NOT trusted for auth) */
  user: TelegramUser | null
  /** Raw initData string for backend HMAC verification */
  initData: string | null
  /** Viewport height (dynamic) */
  viewportHeight: number
  /** Safe area insets */
  safeAreaInset: { top: number; bottom: number; left: number; right: number }
  /** Show the Telegram BackButton */
  showBackButton: (onBack: () => void) => void
  /** Hide the Telegram BackButton */
  hideBackButton: () => void
  /** Show the MainButton with text */
  showMainButton: (text: string, onClick: () => void) => void
  /** Hide the MainButton */
  hideMainButton: () => void
  /** Trigger haptic feedback */
  haptic: TelegramWebApp['HapticFeedback'] | null
}

const TelegramContext = createContext<TelegramContextType>({
  isTelegramApp: false,
  isReady: false,
  webApp: null,
  user: null,
  initData: null,
  viewportHeight: 0,
  safeAreaInset: { top: 0, bottom: 0, left: 0, right: 0 },
  showBackButton: () => {},
  hideBackButton: () => {},
  showMainButton: () => {},
  hideMainButton: () => {},
  haptic: null,
})

export function TelegramProvider({ children }: { children: React.ReactNode }) {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [viewportHeight, setViewportHeight] = useState(0)
  const [backCallback, setBackCallback] = useState<(() => void) | null>(null)
  const [mainCallback, setMainCallback] = useState<(() => void) | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const tg = (window as any).Telegram?.WebApp as TelegramWebApp | undefined
    if (!tg) return

    setWebApp(tg)
    setViewportHeight(tg.viewportStableHeight || tg.viewportHeight || window.innerHeight)

    // Signal Telegram that we are ready
    tg.ready()
    tg.expand()
    setIsReady(true)

    // Do NOT override Retenix brand colors with Telegram theme
    // tg.setHeaderColor / tg.setBackgroundColor — intentionally not used
  }, [])

  const showBackButton = useCallback((onBack: () => void) => {
    if (!webApp) return
    if (backCallback) webApp.BackButton.offClick(backCallback)
    setBackCallback(() => onBack)
    webApp.BackButton.onClick(onBack)
    webApp.BackButton.show()
  }, [webApp, backCallback])

  const hideBackButton = useCallback(() => {
    if (!webApp) return
    if (backCallback) webApp.BackButton.offClick(backCallback)
    setBackCallback(null)
    webApp.BackButton.hide()
  }, [webApp, backCallback])

  const showMainButton = useCallback((text: string, onClick: () => void) => {
    if (!webApp) return
    if (mainCallback) webApp.MainButton.offClick(mainCallback)
    setMainCallback(() => onClick)
    webApp.MainButton.setText(text)
    webApp.MainButton.onClick(onClick)
    webApp.MainButton.show()
    webApp.MainButton.enable()
  }, [webApp, mainCallback])

  const hideMainButton = useCallback(() => {
    if (!webApp) return
    if (mainCallback) webApp.MainButton.offClick(mainCallback)
    setMainCallback(null)
    webApp.MainButton.hide()
  }, [webApp, mainCallback])

  const isTelegramApp = !!webApp
  const user = webApp?.initDataUnsafe?.user ?? null
  const initData = webApp?.initData ?? null
  const safeAreaInset = webApp?.safeAreaInset ?? { top: 0, bottom: 0, left: 0, right: 0 }
  const haptic = webApp?.HapticFeedback ?? null

  return (
    <TelegramContext.Provider
      value={{
        isTelegramApp,
        isReady,
        webApp,
        user,
        initData,
        viewportHeight,
        safeAreaInset,
        showBackButton,
        hideBackButton,
        showMainButton,
        hideMainButton,
        haptic,
      }}
    >
      {children}
    </TelegramContext.Provider>
  )
}

/**
 * Hook to access Telegram Mini App context.
 * 
 * IMPORTANT: The `user` object from this hook is NOT authenticated.
 * For auth, send `initData` to the backend for HMAC verification.
 */
export function useTelegram() {
  return useContext(TelegramContext)
}
