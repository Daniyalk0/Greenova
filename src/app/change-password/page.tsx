import ChangePasswordForm from '@/components/ChangePasswordForm'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
    <ChangePasswordForm/>
    </Suspense>
  )
}

export default page