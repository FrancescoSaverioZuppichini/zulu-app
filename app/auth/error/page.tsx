"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PhoneContainer } from "@/components/phone/phone-container"
import Link from "next/link"

export default function AuthError() {
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const errorParam = searchParams.get("error")

    if (errorParam) {
      switch (errorParam) {
        case "CredentialsSignin":
          setError("Invalid username or password")
          break
        case "SessionRequired":
          setError("You need to be signed in to access this page")
          break
        default:
          setError(`Authentication error: ${errorParam}`)
      }
    } else {
      setError("An unknown authentication error occurred")
    }
  }, [searchParams])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <PhoneContainer>
        <div className="flex items-center justify-center h-full p-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Authentication Error</CardTitle>
              <CardDescription>There was a problem signing you in</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-red-500">{error}</p>
            </CardContent>
            <CardFooter>
              <Link href="/" className="w-full">
                <Button className="w-full">Back to Sign In</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </PhoneContainer>
    </main>
  )
}
