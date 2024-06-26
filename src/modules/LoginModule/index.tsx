import React, { useEffect, useState } from 'react'
import { LoginFormData } from './interface'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useAuthContext } from '@/components/contexts/AuthContext'
import { useRouter } from 'next/navigation'

const LoginPage: React.FC = () => {
  const { login, isAuthenticated } = useAuthContext()
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
  })

  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    login(formData)
  }

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/tayangan')
    }
  }, [])

  return (
    <main className="py-28 flex justify-center items-center">
      <Card style={{ width: '300px' }}>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="dark:text-black">
            <div className="mb-6">
              <label htmlFor="username" className="block mb-2">
                Username:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <CardFooter className="flex flex-col items-center">
              <Button type="submit" className="w-full mb-4">
                Login
              </Button>
              <a
                href="/register"
                className="text-sm text-blue-600 hover:underline"
              >
                Register disini !
              </a>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}

export default LoginPage
