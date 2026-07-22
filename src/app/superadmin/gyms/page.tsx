import { Search, Filter, MoreHorizontal, Building2, MapPin } from 'lucide-react';

export default function GymsList() {
  const gyms = [
    { id: 1, name: "FitLife Tashkent", location: "Tashkent, Yunusabad", owner: "Rustam T.", members: 450, status: "Active", joined: "2024-01-15" },
    { id: 2, name: "Iron Gym", location: "Samarkand, Center", owner: "Aziz B.", members: 120, status: "Trial", joined: "2024-03-22" },
    { id: 3, name: "BeFit Premium", location: "Tashkent, Mirzo Ulugbek", owner: "Leyla M.", members: 890, status: "Active", joined: "2023-11-05" },
    { id: 4, name: "PowerHouse", location: "Bukhara", owner: "Timur A.", members: 210, status: "Inactive", joined: "2023-08-12" },
    { id: 5, name: "Olympia Fitness", location: "Tashkent, Chilonzor", owner: "Nodir K.", members: 340, status: "Active", joined: "2024-02-10" },
  ];

  return (
    <div className="p-8 space-y-8 min-h-screen bg-neutral-950 text-white">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
            Zallar Ro'yxati (Gyms)
          </h1>
          <p className="text-neutral-400 mt-2">Manage registered gyms on the platform</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center">
          <Building2 className="w-4 h-4 mr-2" />
          Add New Gym
        </button>
      </div>

      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-64">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Search gyms..." 
              className="w-full pl-10 pr-4 py-2 bg-neutral-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
          <button className="p-2 bg-neutral-900 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
            <Filter className="w-5 h-5 text-neutral-400" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-neutral-400 text-sm">
                <th className="pb-3 font-medium pl-4">Gym Name</th>
                <th className="pb-3 font-medium">Location</th>
                <th className="pb-3 font-medium">Owner</th>
                <th className="pb-3 font-medium">Members</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Joined</th>
                <th className="pb-3 font-medium text-right pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {gyms.map((gym) => (
                <tr key={gym.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="py-4 pl-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center mr-3">
                        <Building2 className="w-4 h-4 text-indigo-400" />
                      </div>
                      <span className="font-medium">{gym.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-neutral-300">
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1 text-neutral-500" />
                      {gym.location}
                    </div>
                  </td>
                  <td className="py-4 text-sm text-neutral-300">{gym.owner}</td>
                  <td className="py-4 text-sm text-neutral-300">{gym.members}</td>
                  <td className="py-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      gym.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 
                      gym.status === 'Trial' ? 'bg-amber-500/20 text-amber-400' : 
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {gym.status}
                    </span>
                  </td>
                  <td className="py-4 text-sm text-neutral-400">{gym.joined}</td>
                  <td className="py-4 text-right pr-4">
                    <button className="p-1 text-neutral-400 hover:text-white transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
