import React from 'react'
import LoginForm from '../../../../components/LoginForm'

const page = () => {
  return (
    // <div>page</div>
      <Suspense fallback={<p>Loading...</p>}>
      <LoginPage />
    </Suspense>
  )
}

export default page