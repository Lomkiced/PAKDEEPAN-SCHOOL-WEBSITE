"use client"

import * as React from "react"
import "vanilla-cookieconsent/dist/cookieconsent.css"
import * as CookieConsent from "vanilla-cookieconsent"

export function CookieConsentProvider() {
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
        default: "en",
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
  }, [])

  return null
}
