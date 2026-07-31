import React from 'react'
import { RegisterForm } from '../../_components/RegisterForm'
// import { RegistrationForm } from '../../_components/RegisterForm'

const register = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">

        {/* Form generic texts */}

        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome to RentNest</h1>
          <p className="text-gray-500 ">
           Register here giving your credentials
          </p>

          {/* form */}
          <RegisterForm></RegisterForm>

        </div>
      </div>
    </div>
  )
}

export default register