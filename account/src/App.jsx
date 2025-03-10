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
        console.log(response.data)
        setMessage(response.data)
      } catch (error) {
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/',
            { "refresh": token.refresh },
            {
              headers: { 'Content-Type': 'application/json' }
            }
          )
          const access = response.data
          console.log(response.data)
          setToken(prev => ({ ...prev, access: access }))
          try {
            const response = await axios('http://127.0.0.1:8000/', {
              headers: {
                Authorization: `Bearer ${token.access}`
              }
            }
            )
            console.log(response.data)
            setMessage(response.data)
          } catch (error) {
          }
        } catch (e) {

        }
      }
      // if (response.stutus !== 200) {

      // }
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
