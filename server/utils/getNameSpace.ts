export function getNameSpace(url: string): string[] {
  const defaultNamespaces = ['common', 'error']

  const path =
    new URL(url, 'http://dummybase').pathname.split('/')[1]?.toLowerCase() ||
    'home'

  const routeNamespaceMap: Record<string, string[]> = {
    home: ['home'],
    login: ['login'],
    register: ['register'],
    profile: ['profile'],
    friend: ['friend'],
  }

  const routeSpecificNamespaces = routeNamespaceMap[path] || []

  return [...new Set([...defaultNamespaces, ...routeSpecificNamespaces])]
}
