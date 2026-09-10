import { useEffect } from 'react'

/**
 * Lightweight SEO helper — sets the document title and meta description
 * for the current page without pulling in a dependency like react-helmet.
 *
 * For fully server-rendered meta tags (better for crawlers/social previews
 * on dynamic product pages), consider migrating this app to Next.js or
 * adding a prerendering step (e.g. vite-plugin-ssr, react-snap) at build time.
 */
export default function Seo({ title, description }) {
  useEffect(() => {
    if (title) document.title = title

    if (description) {
      let tag = document.querySelector('meta[name="description"]')
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', 'description')
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', description)
    }
  }, [title, description])

  return null
}
