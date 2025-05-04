import { PATH } from '#routes/path.ts'

/**
 * Returns a list of translation namespaces based on the given URL.
 * Matches the URL path against route patterns defined in PATH.
 * Adds matched route key (lowercased) to the default namespaces.
 *
 * @param url - The URL to match against route patterns.
 * @returns An array of namespace strings.
 */
export function getNameSpace(url: string): string[] {
  const defaultNamespaces = ['common']
  const pathname = new URL(url, 'http://dummy-base').pathname

  // Extract only string-based route patterns from PATH (skip functional entries)
  const routeEntries = Object.entries(PATH).filter(
    ([, value]) => typeof value === 'string',
  ) as [string, string][]

  for (const [key, pattern] of routeEntries) {
    // Replace ':xxx' dynamic segments with wildcard '[^/]+'
    const regex = new RegExp(
      '^' +
        pattern
          .replace(/:[^/]+/g, '[^/]+') // dynamic segment -> wildcard
          .replace(/\//g, '\\/') + // escape '/' characters
        '$',
    )

    if (regex.test(pathname)) {
      return Array.from(new Set([...defaultNamespaces, key.toLowerCase()]))
    }
  }

  return Array.from(new Set([...defaultNamespaces, 'home']))
}
