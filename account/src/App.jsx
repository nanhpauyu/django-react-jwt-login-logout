import { useState, useEffect } from 'react'
import Login from './pages/Login'
import axios from 'axios';


function App() {
  const [token, setToken] = useState(() => JSON.parse(localStorage.getItem('token')))
  const [message, setMessage] = useState()
  useEffect(async () => {
    // const refreshToken = localStorage.getItem('refresh');
    // const accessToken = localStorage.getItem('access');
    // setRefresh(refreshToken)
    // setAccess(accessToken)
    if (token) {
      try {
        const response = await axios('http://127.0.0.1:8000/', {
          headers: {
            Authorization: `Bearer ${token.access}`
          }
        }
        )

      } catch (error) {
      }
      if (response.stutus !== 200) {
        try {
          const response = await axios('http://127.0.0.1:8000/api/token/refresh/',
            { refresh: token.refresh },
            {
              headers: { 'Content-Type': 'application/json' }
            }
          )
          const access = response.data
          setToken(prev => ({ ...prev, access: access }))
        } catch (e) {

        }
      }
    } else {
      console.log(token)
    }


  }, [])

  return (
    <>
      {token ? <p>{message}</p> : <Login />}
    </>
  )
}

export default App
