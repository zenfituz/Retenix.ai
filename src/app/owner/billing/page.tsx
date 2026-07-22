import { CreditCard, Check, Zap, Shield } from 'lucide-react';

export default function OwnerBilling() {
  return (
    <div className="p-8 space-y-8 min-h-screen bg-neutral-950 text-white">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
          Billing & Subscription
        </h1>
        <p className="text-neutral-400 mt-2">Manage your gym's subscription plan and payment methods</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-amber-400" />
              Current Plan
            </h2>
            <div className="flex items-center justify-between p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
              <div>
                <h3 className="text-lg font-bold text-indigo-400">Pro Plan</h3>
                <p className="text-sm text-neutral-400 mt-1">Billed monthly. Next charge: $49 on Aug 1, 2026.</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold">$49</span><span className="text-neutral-400">/mo</span>
              </div>
            </div>
            
            <div className="mt-6 flex gap-4">
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
                Change Plan
              </button>
              <button className="px-4 py-2 bg-transparent border border-white/10 hover:bg-white/5 text-white rounded-lg transition-colors">
                Cancel Subscription
              </button>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-indigo-400" />
              Payment Integration
            </h2>
            <p className="text-neutral-400 text-sm mb-6">
              Connect your preferred payment gateway to accept payments from your gym members.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-white/10 rounded-xl hover:bg-white/5 transition-colors cursor-pointer flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold text-sm">Stripe</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Stripe</h4>
                    <p className="text-xs text-neutral-400">Global payments</p>
                  </div>
                </div>
                <button className="text-sm px-3 py-1 bg-indigo-600 rounded-md">Connect</button>
              </div>

              <div className="p-4 border border-emerald-500/30 bg-emerald-500/5 rounded-xl flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-[#33cccc] rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-xs">Payme</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Payme</h4>
                    <p className="text-xs text-emerald-400">Connected</p>
                  </div>
                </div>
                <button className="text-sm px-3 py-1 border border-white/10 rounded-md hover:bg-white/5">Settings</button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-b from-indigo-900/50 to-neutral-900 border border-indigo-500/20 backdrop-blur-sm">
            <Shield className="w-8 h-8 text-indigo-400 mb-4" />
            <h3 className="text-lg font-bold mb-2">Upgrade to Enterprise</h3>
            <p className="text-sm text-neutral-400 mb-4">
              Get advanced analytics, custom branding, and dedicated support for your growing gym.
            </p>
            <ul className="space-y-2 mb-6">
              {['Unlimited members', 'Custom mobile app', 'Priority support', 'Advanced CRM'].map((feature, i) => (
                <li key={i} className="flex items-center text-sm text-neutral-300">
                  <Check className="w-4 h-4 mr-2 text-emerald-400" />
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full py-2 bg-white text-black font-semibold rounded-lg hover:bg-neutral-200 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
