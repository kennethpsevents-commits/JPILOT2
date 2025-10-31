"use client"

import type React from "react"
import { NavigationPanel } from "./navigation-panel"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavigationPanel />
      {/* Desktop: Add left padding for sidebar, Mobile: Add bottom padding for bottom nav */}
      <div className="lg:pl-64 pb-20 lg:pb-0">{children}</div>
    </>
  )
}
