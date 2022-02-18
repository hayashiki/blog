import {
  logEvent,
  Analytics,
  isSupported,
  getAnalytics,
  initializeAnalytics,
} from 'firebase/analytics'
import { useEffect } from 'react'
import { initializeApp } from 'firebase/app'

import config from './config.json'

// Initialize Firebase
export const firebaseApp = initializeApp(config)

let analytics: false | Analytics
;(async () => {
  analytics = (await isSupported()) && getAnalytics(firebaseApp)
})()

export const useAnalytics = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') return
    console.log('init Analytics')
    initializeAnalytics(firebaseApp)
  }, [])
}

export const usePageView = (location: string, path: string) => {
  useEffect(() => {
    if (typeof window !== 'undefined') return
    logEvent(<Analytics>analytics, 'page_view', {
      page_location: location,
      page_path: path,
      page_title: document.title,
    })
  }, [])
}
