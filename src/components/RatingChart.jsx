import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { getRatingColor } from "../utils/rankColors"
import { TrendingUp } from "lucide-react"

function CustomTooltip({ active, payload }) {
  if(!active||!payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm shadow-xl">
      <p className="text-slate-300 font-medium truncate max-w-xs">{d.contest}</p>
      <p className="text-blue-400 font-bold text-base mt-1">{d.rating}</p>
      <p className={`text-xs mt-0.5 ${d.delta>=0?"text-green-400":"text-red-400"}`}>{d.delta>=0?"+":""}{d.delta}</p>
      <p className="text-slate-500 text-xs mt-1">Rank #{d.rank}</p>
    </div>
  )
}

export default function RatingChart({ ratingHistory }) {
  if(!ratingHistory.length) return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-6">
      <h3 className="text-white font-semibold flex items-center gap-2"><TrendingUp size={18}/>Rating History</h3>
      <p className="text-slate-400 text-sm mt-3">No contest history yet.</p>
    </div>
  )

  const chartData = ratingHistory.map((r,i)=>({
    index:i+1, rating:r.newRating, delta:r.newRating-r.oldRating, contest:r.contestName, rank:r.rank
  }))
  const lineColor = getRatingColor(chartData[chartData.length-1]?.rating)
  const minR = Math.min(...chartData.map(d=>d.rating))-100
  const maxR = Math.max(...chartData.map(d=>d.rating))+100

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold flex items-center gap-2">
          <TrendingUp size={18} className="text-blue-400"/>Rating History
        </h3>
        <span className="text-slate-400 text-sm">{ratingHistory.length} contests</span>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={chartData} margin={{top:8,right:8,left:0,bottom:0}}>
          <defs>
            <linearGradient id="ratingGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={lineColor} stopOpacity={0.25}/>
              <stop offset="95%" stopColor={lineColor} stopOpacity={0.02}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b"/>
          <XAxis dataKey="index" tick={{fill:"#64748b",fontSize:11}} tickLine={false} axisLine={false}/>
          <YAxis domain={[minR,maxR]} tick={{fill:"#64748b",fontSize:11}} tickLine={false} axisLine={false} width={44}/>
          <Tooltip content={<CustomTooltip/>}/>
          <Area type="monotone" dataKey="rating" stroke={lineColor} strokeWidth={2.5}
            fill="url(#ratingGrad)"
            dot={chartData.length<=30?{r:3,fill:lineColor,strokeWidth:0}:false}
            activeDot={{r:5,fill:lineColor,strokeWidth:2,stroke:"#fff"}}/>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}