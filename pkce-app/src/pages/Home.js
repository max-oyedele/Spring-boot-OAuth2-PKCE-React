import { useState, useEffect } from 'react'
import { useAuth } from 'react-oauth2-pkce'

import jwtDecode from 'jwt-decode'
import { refreshToken, requestServer } from '../api/Service'

import Layout from '../components/Layout'

import './Home.css'

function Home() {
  const { authService } = useAuth();

  const logout = async () => authService.logout();

  const [token, setToken] = useState(authService.isAuthenticated() ? authService.getAuthTokens() : null);
  useEffect(() => {
    setSeconds(token.expires_in)
    localStorage.setItem('token', JSON.stringify(token))
  }, [token])


  const [seconds, setSeconds] = useState(0)
  useEffect(() => {
    let timer = setInterval(() => {
      if (seconds > 0) setSeconds(seconds - 1)
      else if (seconds === 0) setSeconds(0)
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  })

  const refreshData = async () => {
    await refreshToken(token)
      .then(res => {
        setToken(res)
        localStorage.setItem('token', JSON.stringify(res))
        console.log('refresh success', res)
        alert('Refresh Data Success')
      })
      .catch(error => {
        console.log('refresh error', error)
        alert('Refresh Data Error')
        logout()
      })
  }

  const info = token ? jwtDecode(token.access_token) : null
  return (
    <Layout>
      <p className="caption">Home</p>
      <div className="box-container">
        <p className="box-label">User Name: {info?.user_name}</p>
        <p className="box-label">User Role: {info?.authorities[0]}</p>
      </div>
      {
        token && seconds < token.expires_in &&
        <div className="expire-time">Expiry time: {seconds}(s)</div>
      }
      {
        seconds === 0 &&
        <div className="expire-desc">access_token expired. refresh_token may be not expired</div>
      }
      <button onClick={refreshData} className="home-btn">Refresh Data</button>
    </Layout>
  )
}

export default Home