import React, { Suspense } from 'react'
import LoginForm from '../../../../components/LoginForm'

const page = () => {
  return (
    // <div>page</div>
      <Suspense fallback={<p>Loading...</p>}>
      <LoginForm />
    </Suspense>
  )
}

export default page