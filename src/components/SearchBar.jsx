import { useState } from "react"
import { Search, Loader2 } from "lucide-react"

export default function SearchBar({ onSearch, loading }) {
  const [handle, setHandle] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    const t = handle.trim()
    if(t) onSearch(t)
  }

  return (
    <div className="flex flex-col items-center gap-4 py-12">
      <div className="text-center mb-2">
        <h1 className="text-4xl font-bold text-white mb-2">CP Coach</h1>
        <p className="text-slate-400 text-lg">Enter your Codeforces username</p>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={handle}
            onChange={e=>setHandle(e.target.value)}
            placeholder="Enter handle (e.g. tourist)"
            disabled={loading}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
        </div>
        <button type="submit" disabled={loading||!handle.trim()}
          className="px-6 py-3 rounded-xl font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-all disabled:opacity-50 flex items-center gap-2">
          {loading ? <><Loader2 size={18} className="animate-spin"/>Fetching</> : "Analyze"}
        </button>
      </form>
      <div className="flex gap-2 flex-wrap justify-center">
        <span className="text-slate-500 text-sm">Try:</span>
        {["tourist","jiangly","Petr","Um_nik"].map(u=>(
          <button key={u} onClick={()=>{setHandle(u);onSearch(u)}} disabled={loading}
            className="text-sm px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors disabled:opacity-50">
            {u}
          </button>
        ))}
      </div>
    </div>
  )
}