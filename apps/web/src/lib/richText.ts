/**
 * Utility functions for safely extracting plain text from Payload CMS Lexical RichText ASTs,
 * bilingual objects, and raw strings.
 *
 * Prevents Next.js / React runtime errors:
 * "Objects are not valid as a React child (found: object with keys {root})"
 */

export type SupportedLocale = "en" | "th"

/**
 * Recursively extracts plain text from a Lexical AST node.
 */
function extractFromLexicalNode(node: any): string {
  if (!node || typeof node !== "object") return ""

  // Direct text leaf node
  if (typeof node.text === "string") {
    return node.text
  }

  // If node has children array (e.g. root, paragraph, heading, quote, list, listItem)
  if (Array.isArray(node.children)) {
    const childTexts = node.children
      .map((child: any) => extractFromLexicalNode(child))
      .filter((t: string) => t.length > 0)

    if (node.type === "paragraph" || node.type === "heading" || node.type === "quote") {
      return childTexts.join("")
    }
    if (node.type === "list") {
      return childTexts.join("\n")
    }
    if (node.type === "listitem") {
      return `• ${childTexts.join("")}`
    }

    return childTexts.join(" ")
  }

  return ""
}

/**
 * Safely extracts a clean plain text string from ANY value:
 * - Plain string / number / boolean
 * - Payload Lexical RichText object: { root: { children: [...] } }
 * - Localized object: { en: "...", th: "..." } or { en: { root: ... }, th: { root: ... } }
 * - Arrays of text or nodes
 * - null / undefined / empty objects
 *
 * GUARANTEE: This function ALWAYS returns a primitive string (never an object),
 * preventing React child runtime crashes.
 */
export function extractPlainText(
  value: any,
  preferredLocale?: SupportedLocale
): string {
  if (value === null || value === undefined) {
    return ""
  }

  // Primitive string
  if (typeof value === "string") {
    return value.trim()
  }

  // Primitive number or boolean
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value)
  }

  // Objects & Arrays
  if (typeof value === "object") {
    // 1. Lexical RichText document with `root` key
    if (value.root && typeof value.root === "object") {
      if (Array.isArray(value.root.children)) {
        return value.root.children
          .map((child: any) => extractFromLexicalNode(child))
          .filter(Boolean)
          .join("\n\n")
          .trim()
      }
      return extractFromLexicalNode(value.root).trim()
    }

    // 2. Direct Lexical node with `children`
    if (Array.isArray(value.children)) {
      return value.children
        .map((child: any) => extractFromLexicalNode(child))
        .filter(Boolean)
        .join(" ")
        .trim()
    }

    // 3. Leaf node with `text` property
    if (typeof value.text === "string") {
      return value.text.trim()
    }

    // 4. Localized dictionary: { en: ..., th: ... }
    if (preferredLocale && value[preferredLocale] !== undefined) {
      const localizedVal = value[preferredLocale]
      const extracted = extractPlainText(localizedVal, preferredLocale)
      if (extracted) return extracted
    }

    // Fallback: Check Thai then English if preferredLocale not matched
    if (value.th !== undefined) {
      const thVal = extractPlainText(value.th, "th")
      if (thVal) return thVal
    }
    if (value.en !== undefined) {
      const enVal = extractPlainText(value.en, "en")
      if (enVal) return enVal
    }

    // 5. Array of items
    if (Array.isArray(value)) {
      return value
        .map((item) => extractPlainText(item, preferredLocale))
        .filter(Boolean)
        .join(" ")
        .trim()
    }
  }

  return ""
}

