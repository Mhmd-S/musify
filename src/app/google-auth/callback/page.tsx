import React, { useEffect } from 'react'

const page = () => {

  const handleGoogleAuth = async () => {
    try {
      const response = await fetch('/api/auth/google', {
        method: 'POST',
      })
      const data = await response.json()
      console.log(data)
      window.location.href = data.url
      console.log(data)
      catch (error) {
      console.log(error)
    }
  }

  return (
    <div>page</div>
  )
}

export default page