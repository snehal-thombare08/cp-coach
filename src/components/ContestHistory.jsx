import { Trophy, ArrowUp, ArrowDown } from "lucide-react"

export default function ContestHistory({ ratingHistory }) {
  const recent = [...ratingHistory].reverse().slice(0,8)
  if(!recent.length) return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-6">
      <h3 className="text-white font-semibold flex items-center gap-2"><Trophy size={18}/>Recent Contests</h3>
      <p className="text-slate-400 text-sm mt-3">No contest history yet.</p>
    </div>
  )
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-6">
      <h3 className="text-white font-semibold flex items-center gap-2 mb-4">
        <Trophy size={18} className="text-yellow-400"/>Recent Contests
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-500 text-xs uppercase tracking-wider">
              <th className="text-left pb-2 font-medium">Contest</th>
              <th className="text-center pb-2 font-medium">Rank</th>
              <th className="text-right pb-2 font-medium">Rating</th>
              <th className="text-right pb-2 font-medium">Change</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {recent.map((r,i)=>{
              const delta = r.newRating-r.oldRating
              const isPos = delta>=0
              return (
                <tr key={i} className="hover:bg-slate-700/40 transition-colors">
                  <td className="py-2.5 pr-4">
                    <span className="text-slate-200 truncate block max-w-xs">{r.contestName}</span>
                  </td>
                  <td className="py-2.5 text-center text-slate-300">#{r.rank}</td>
                  <td className="py-2.5 text-right font-semibold text-white">{r.newRating}</td>
                  <td className="py-2.5 text-right">
                    <span className={`inline-flex items-center gap-0.5 font-semibold ${isPos?"text-green-400":"text-red-400"}`}>
                      {isPos?<ArrowUp size={13}/>:<ArrowDown size={13}/>}{Math.abs(delta)}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}