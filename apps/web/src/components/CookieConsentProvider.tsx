"use client"

import * as React from "react"
import "vanilla-cookieconsent/dist/cookieconsent.css"
import * as CookieConsent from "vanilla-cookieconsent"
import { useLanguage } from "@/context/LanguageContext"

export function CookieConsentProvider() {
  const { locale } = useLanguage()

  React.useEffect(() => {
    CookieConsent.run({
      categories: {
        necessary: {
          enabled: true,
          readOnly: true,
        },
        analytics: {
          enabled: false,
        },
        marketing: {
          enabled: false,
        },
      },
      language: {
        default: locale || "en",
        autoDetect: "document",
        translations: {
          en: {
            consentModal: {
              title: "We value your privacy",
              description:
                "We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking 'Accept All', you consent to our use of cookies in accordance with our <a href='/privacy'>Privacy Policy</a>.",
              acceptAllBtn: "Accept All",
              acceptNecessaryBtn: "Reject All",
              showPreferencesBtn: "Manage Preferences",
            },
            preferencesModal: {
              title: "Privacy Preferences",
              acceptAllBtn: "Accept All",
              acceptNecessaryBtn: "Reject All",
              savePreferencesBtn: "Save Preferences",
              closeIconLabel: "Close",
              sections: [
                {
                  title: "Cookie Usage",
                  description: "I use cookies to ensure the basic functionalities of the website and to enhance your online experience.",
                },
                {
                  title: "Strictly Necessary Cookies",
                  description: "These cookies are essential for the proper functioning of the website.",
                  linkedCategory: "necessary",
                },
                {
                  title: "Analytics Cookies",
                  description: "These cookies collect information about how you use the website, which pages you visited and which links you clicked on.",
                  linkedCategory: "analytics",
                },
              ],
            },
          },
          th: {
            consentModal: {
              title: "เราให้ความสำคัญกับความเป็นส่วนตัวของคุณ",
              description:
                "เราใช้คุกกี้เพื่อเพิ่มประสิทธิภาพและประสบการณ์ที่ดีในการใช้งานเว็บไซต์ การคลิก 'ยอมรับทั้งหมด' ถือว่าท่านยินยอมให้เราใช้คุกกี้ตาม <a href='/privacy'>นโยบายความเป็นส่วนตัว</a> ของเรา",
              acceptAllBtn: "ยอมรับทั้งหมด",
              acceptNecessaryBtn: "ปฏิเสธทั้งหมด",
              showPreferencesBtn: "ตั้งค่าคุกกี้",
            },
            preferencesModal: {
              title: "การตั้งค่าความเป็นส่วนตัว",
              acceptAllBtn: "ยอมรับทั้งหมด",
              acceptNecessaryBtn: "ปฏิเสธทั้งหมด",
              savePreferencesBtn: "บันทึกการตั้งค่า",
              closeIconLabel: "ปิด",
              sections: [
                {
                  title: "การใช้งานคุกกี้",
                  description: "เราใช้คุกกี้เพื่อสนับสนุนการทำงานพื้นฐานของเว็บไซต์และยกระดับประสบการณ์การใช้งานของคุณ",
                },
                {
                  title: "คุกกี้ที่จำเป็นอย่างยิ่ง",
                  description: "คุกกี้เหล่านี้จำเป็นต่อการทำงานพื้นฐานและความปลอดภัยของเว็บไซต์",
                  linkedCategory: "necessary",
                },
                {
                  title: "คุกกี้เพื่อการวิเคราะห์",
                  description: "คุกกี้เหล่านี้ช่วยให้เราเข้าใจการเข้าชมและการใช้งานเว็บไซต์เพื่อพัฒนาให้ดียิ่งขึ้น",
                  linkedCategory: "analytics",
                },
              ],
            },
          },
        },
      },
      guiOptions: {
        consentModal: {
          layout: "box inline",
          position: "bottom right",
        },
        preferencesModal: {
          layout: "box",
        },
      },
    })
  }, [locale])

  React.useEffect(() => {
    try {
      CookieConsent.setLanguage(locale)
    } catch {
      // Ignored
    }
  }, [locale])

  return null
}
