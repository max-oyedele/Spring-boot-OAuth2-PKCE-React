import axios from 'axios'

export const refreshToken = (token) => {
  return new Promise((resolve, reject) => {
    axios.post("http://localhost:8080/oauth/token?grant_type=refresh_token&client_id=public&refresh_token=" + token.refresh_token, {})
      .then(res => {
        resolve(res.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const requestServer = (token) => {
  return new Promise((resolve, reject) => {
    axios.get("http://localhost:9100/me", {
      headers: {
        "Authorization": 'Bearer ' + token.access_token,
      }
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}