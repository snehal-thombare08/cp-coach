import { getRankMeta, getRatingColor } from "../utils/rankColors"
import { Trophy, Users, Star, TrendingUp } from "lucide-react"

export default function ProfileCard({ user, solvedCount, contestCount }) {
  const meta = getRankMeta(user.rank)
  const ratingColor = getRatingColor(user.rating)
  const maxColor = getRatingColor(user.maxRating)
  const initials = user.handle.slice(0,2).toUpperCase()

  const stats = [
    { icon:<Trophy size={16}/>, label:"Problems Solved", value:solvedCount },
    { icon:<TrendingUp size={16}/>, label:"Contests", value:contestCount },
    { icon:<Star size={16}/>, label:"Contribution", value:user.contribution>=0?`+${user.contribution}`:user.contribution },
    { icon:<Users size={16}/>, label:"Friends of", value:user.friendOfCount??0 },
  ]

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-6">
      <div className="flex items-start gap-5">
        <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0"
          style={{backgroundColor:ratingColor+"22",color:ratingColor,border:`2px solid ${ratingColor}`}}>
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-2xl font-bold text-white">{user.handle}</h2>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${meta.bg} ${meta.text}`}>{meta.label}</span>
          </div>
          {(user.firstName||user.lastName)&&(
            <p className="text-slate-400 text-sm mt-0.5">{[user.firstName,user.lastName].filter(Boolean).join(" ")}</p>
          )}
          {user.organization&&<p className="text-slate-500 text-xs mt-0.5">{user.organization}</p>}
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-xs text-slate-500 mb-0.5">Current</div>
          <div className="text-3xl font-bold" style={{color:ratingColor}}>{user.rating??"Unrated"}</div>
          <div className="text-xs text-slate-500 mt-2 mb-0.5">Max</div>
          <div className="text-lg font-semibold" style={{color:maxColor}}>Up {user.maxRating??"--"}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-slate-700">
        {stats.map(s=>(
          <div key={s.label} className="bg-slate-900 rounded-xl p-3">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">{s.icon}{s.label}</div>
            <div className="text-white text-xl font-semibold">{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}