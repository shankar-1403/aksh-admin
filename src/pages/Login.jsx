import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { IconEye, IconEyeOff } from '@tabler/icons-react'

export default function Login() {
  const { user, login } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from?.pathname
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (user) {
    return <Navigate to={from && from !== '/' ? from : '/dashboard'} replace />
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await login(email.trim(), password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message ?? 'Sign in failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-linear-to-br from-slate-800 via-slate-900 to-slate-800 px-4">
        <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
        }}
      />
      <div className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl shadow-black/40">
        <div className="mb-4 flex justify-center">
          <img
            src={'/src/assets/pcred_logo.webp'}
            alt="Pcred logo"
            className={`h-14 object-contain`}
          />
        </div>
        <h1 className="text-center text-2xl font-semibold text-white">
          Sign in
        </h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none ring-blue-500/0 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
              placeholder="you@company.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-300"
            >
              Password
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 pr-20 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-slate-700 p-1 cursor-pointer text-xs text-slate-300 hover:bg-slate-800"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <IconEyeOff size={20}/> : <IconEye size={20}/>}
              </button>
            </div>
          </div>

          {error && (
            <p className="rounded-lg bg-red-950/50 px-3 py-2 text-sm text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full cursor-pointer rounded-lg bg-[#084B70] py-2.5 text-sm font-semibold text-neutral-100 transition hover:bg-blue-900 disabled:opacity-50"
          >
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

      </div>
    </div>
  )
}

