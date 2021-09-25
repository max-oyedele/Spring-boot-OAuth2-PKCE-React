import { useState, useEffect } from 'react'
import { useAuth } from 'react-oauth2-pkce'

import jwtDecode from 'jwt-decode'
import { refreshToken, requestServer } from '../api/Service'

import Layout from '../components/Layout'

import './Profile.css'

function Profile() {
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

  const [detailInfo, setDetailInfo] = useState(null)  

  const requestData = async () => {
    if (seconds === 0) {
      await refreshToken(token)
        .then(res => {
          setToken(res)
          console.log('refresh success', res)
          localStorage.setItem('token', JSON.stringify(res))          
        })
        .catch(error => {
          console.log('refresh error', error)
          alert('refresh error')
          logout()
        })
    }

    let sToken = localStorage.getItem('token')
    await requestServer(JSON.parse(sToken))
      .then(res => {
        setDetailInfo(res.details)
        console.log('get data success', res)        
        alert('Get Data Success')
      })
      .catch(error => {
        console.log('get data error', error)
        alert('Get Data Error')
        logout()
      })
  }

  useEffect(()=>{
    requestData()
  }, [])

  return (
    <Layout>
      <p className="caption">Profile</p>
      <div className="box-container">
        <p className="box-label">Details: {detailInfo?.decodedDetails}</p>
        <p className="box-label">Session Id: {detailInfo?.sessionId}</p>
        <p className="box-label">Token type: {detailInfo?.tokenType}</p>
        <p className="box-label token">Token value: {detailInfo?.tokenValue}</p>
      </div>
      {
        token && seconds < token.expires_in &&
        <div className="expire-time">Expiry time: {seconds}(s)</div>
      }
      {
        seconds === 0 &&
        <div className="expire-desc">access_token expired. refresh_token may be not expired</div>
      }
      <button onClick={requestData} className="profile-btn">Request Data</button>
    </Layout>
  )
}

export default Profile