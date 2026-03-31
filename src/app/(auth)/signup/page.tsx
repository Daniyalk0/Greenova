import React, { Suspense } from 'react'
import SignupForm from '../../../../components/SignupForm'

const page = () => {
  return (
    // <div>page</div>
    <Suspense fallback={<p>Loading...</p>}>
    <SignupForm/>
    </Suspense>
  )
}

export default page