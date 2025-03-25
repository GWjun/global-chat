export function getNameSpace(url: string): string[] {
  const defaultNamespaces = ['common', 'error']

  // 첫 번째 경로 추출
  const path = url.split('/')[1]?.toLowerCase() || 'home'

  console.log(path)

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
