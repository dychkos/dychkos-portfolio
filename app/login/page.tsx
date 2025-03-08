import type { Metadata } from "next"
import LoginForm from "./login-form"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to access the admin panel",
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string; error?: string }
}) {
  // Check if user is already logged in
  const session = await getServerSession(authOptions)

  // If user is already logged in and has admin role, redirect to admin
  if (session?.user?.role === "ADMIN") {
    redirect(searchParams.callbackUrl || "/admin")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            Login to your account
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Enter your credentials to access the admin panel
          </p>
        </div>

        {searchParams.error && (
          <div className="rounded-md bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/50 dark:text-red-200">
            {searchParams.error === "CredentialsSignin"
              ? "Invalid email or password"
              : "An error occurred. Please try again."}
          </div>
        )}

        <LoginForm callbackUrl={searchParams.callbackUrl} />
      </div>
    </div>
  )
}

