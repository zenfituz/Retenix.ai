import { login, signup } from './actions'
import { ArrowRight } from 'lucide-react'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>
}) {
  const resolvedSearchParams = await searchParams;
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-8 relative z-10 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center font-display font-black text-bg text-2xl mb-4">
            R
          </div>
          <h1 className="text-2xl font-display font-bold text-text-hi">Welcome back</h1>
          <p className="text-text-dim text-sm mt-2">Sign in to your Retenix account</p>
        </div>

        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-mid" htmlFor="email">Email</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              required 
              className="bg-surface-2 border border-border-2 rounded-xl px-4 py-3 text-text-hi placeholder-text-dim focus:outline-none focus:border-accent transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-mid" htmlFor="password">Password</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              required 
              className="bg-surface-2 border border-border-2 rounded-xl px-4 py-3 text-text-hi placeholder-text-dim focus:outline-none focus:border-accent transition-colors"
              placeholder="••••••••"
            />
          </div>

          {resolvedSearchParams?.message && (
            <p className="text-sm text-bad bg-bad-dim border border-bad/30 p-3 rounded-lg text-center mt-2">
              {resolvedSearchParams.message}
            </p>
          )}

          <div className="flex flex-col gap-3 mt-4">
            <button 
              formAction={login}
              className="bg-accent text-bg px-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              Sign In <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              formAction={signup}
              className="bg-transparent border border-border-2 text-text-hi px-4 py-3 rounded-xl font-semibold hover:bg-surface-2 transition-colors"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
