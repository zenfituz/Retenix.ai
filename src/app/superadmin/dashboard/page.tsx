import { Building2, CreditCard, Users, TrendingUp, Activity } from 'lucide-react';

export default function SuperadminDashboard() {
  const kpis = [
    { label: "Total Gyms", value: "142", icon: Building2, change: "+12%" },
    { label: "Platform Revenue", value: "$45,200", icon: CreditCard, change: "+8%" },
    { label: "Active Users", value: "12,450", icon: Users, change: "+15%" },
    { label: "Avg. Retention", value: "88%", icon: Activity, change: "+2%" }
  ];

  const recentGyms = [
    { id: 1, name: "FitLife Tashkent", owner: "Rustam T.", status: "Active", revenue: "$1,200" },
    { id: 2, name: "Iron Gym", owner: "Aziz B.", status: "Trial", revenue: "$0" },
    { id: 3, name: "Samarkand Fitness", owner: "Leyla M.", status: "Active", revenue: "$850" },
  ];

  return (
    <div className="p-8 space-y-8 min-h-screen bg-neutral-950 text-white">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
          Superadmin Dashboard
        </h1>
        <p className="text-neutral-400 mt-2">Platform overview and global KPIs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div key={index} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-neutral-400 text-sm">{kpi.label}</p>
                  <h3 className="text-2xl font-semibold mt-1">{kpi.value}</h3>
                </div>
                <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-emerald-400 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                {kpi.change} from last month
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-indigo-400" />
            Revenue Overview
          </h2>
          <div className="h-64 flex items-end justify-between space-x-2">
            {[40, 60, 45, 80, 55, 90, 75, 100, 85, 95, 70, 110].map((height, i) => (
              <div key={i} className="w-full bg-indigo-500/20 rounded-t-sm hover:bg-indigo-500/40 transition-colors" style={{ height: `${height}%` }}></div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-neutral-400">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
            <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <Building2 className="w-5 h-5 mr-2 text-indigo-400" />
            Recent Gyms
          </h2>
          <div className="space-y-4">
            {recentGyms.map((gym) => (
              <div key={gym.id} className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                <div>
                  <p className="font-medium">{gym.name}</p>
                  <p className="text-xs text-neutral-400">{gym.owner}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">{gym.revenue}</p>
                  <span className={`text-[10px] px-2 py-1 rounded-full ${gym.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                    {gym.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
