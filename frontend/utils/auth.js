import axios from 'axios'
const BASE_URL = 'http://localhost:3000'
const LEEWAY = 600000


const authStore = {
    currToken: '',
    tokenExpiry: 0,
    setCurrToken(token, expiry) {
        this.currToken = token
        this.tokenExpiry = expiry
    },
    setAuth(auth) {
        this.auth = auth
    }
    
}
async function getToken() {
  let accessToken = authStore.currToken
  const expiry = authStore.tokenExpiry
  if (!accessToken || expiry < Date.now() + LEEWAY) {
    accessToken = await refreshToken()
  }
  if (accessToken) {
    return 'JWT ' + accessToken
  }
}
async function refreshToken() {
  try {
    const response = await axios.post(`${BASE_URL}/refresh`, undefined, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
    const result = response.data.data
    authStore.setCurrToken(result.accessToken, result.access_exp)
    return result.accessToken
  } catch (error) {
    console.error(error)
  }
}

const inst = async (auth) => {
  const instance = axios.create({
    withCredentials: true
  })

  if (auth) {
    const token = await getToken()
    instance.defaults.headers.common['Authorization'] = token
  }

  return instance
}

export { getToken, inst, BASE_URL }
