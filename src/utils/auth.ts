function auth() {
  let accessToken: string | null = null

  function login(token: string) {
    accessToken = token
  }

  function logout() {
    accessToken = null
  }

  function getToken() {
    return accessToken
  }

  function isAuthenticated() {
    return accessToken !== null
  }

  return {
    login,
    logout,
    getToken,
    isAuthenticated,
  }
}

export const session = auth()
