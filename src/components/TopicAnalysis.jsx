import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from "recharts"
import { Target, XCircle, CheckCircle, MinusCircle } from "lucide-react"

function TopicTag({ tag, type }) {
  const styles = {
    weak:"bg-red-950 text-red-300 border-red-800",
    medium:"bg-yellow-950 text-yellow-300 border-yellow-800",
    strong:"bg-green-950 text-green-300 border-green-800",
  }
  const icons = {
    weak:<XCircle size={13}/>,
    medium:<MinusCircle size={13}/>,
    strong:<CheckCircle size={13}/>
  }
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${styles[type]}`}>
      {icons[type]} {tag}
    </span>
  )
}

export default function TopicAnalysis({ topicStats, classification }) {
  const { weak, medium, strong } = classification
  const radarData = topicStats.slice(0,8).map(t=>({
    subject:t.tag.slice(0,15),
    rate:Math.round(t.rate*100)
  }))
  const topBars = topicStats.slice(0,12)
  const maxSolved = topBars[0]?.correct||1

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-6">
      <h3 className="text-white font-semibold flex items-center gap-2 mb-5">
        <Target size={18} className="text-purple-400"/> Topic Analysis
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <p className="text-slate-400 text-xs font-medium mb-3 uppercase tracking-wider">Most Practiced Topics</p>
          <div className="space-y-2">
            {topBars.map(t=>{
              const pct = Math.round((t.correct/maxSolved)*100)
              const barColor = t.rate>=0.75?"#22c55e":t.rate>=0.50?"#eab308":"#ef4444"
              return (
                <div key={t.tag}>
                  <div className="flex justify-between text-xs mb-0.5">
                    <span className="text-slate-300 truncate max-w-xs">{t.tag}</span>
                    <span className="text-slate-400">{t.correct}/{t.total}</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{width:`${pct}%`,backgroundColor:barColor}}/>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        {radarData.length>=3&&(
          <div>
            <p className="text-slate-400 text-xs font-medium mb-3 uppercase tracking-wider">Solve Rate Radar</p>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#334155"/>
                <PolarAngleAxis dataKey="subject" tick={{fill:"#94a3b8",fontSize:10}}/>
                <Radar dataKey="rate" stroke="#818cf8" fill="#818cf8" fillOpacity={0.25} strokeWidth={1.5}/>
                <Tooltip
                  formatter={v=>[`${v}%`,"Solve rate"]}
                  contentStyle={{background:"#0f172a",border:"1px solid #334155",borderRadius:8}}
                  labelStyle={{color:"#94a3b8"}}
                  itemStyle={{color:"#818cf8"}}/>
              </RadarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      <div className="mt-6 space-y-4">
        {weak.length>0&&(
          <div>
            <p className="text-red-400 text-xs font-semibold uppercase tracking-wider mb-2">Weak Topics</p>
            <div className="flex flex-wrap gap-2">{weak.slice(0,10).map(t=><TopicTag key={t} tag={t} type="weak"/>)}</div>
          </div>
        )}
        {medium.length>0&&(
          <div>
            <p className="text-yellow-400 text-xs font-semibold uppercase tracking-wider mb-2">Medium Topics</p>
            <div className="flex flex-wrap gap-2">{medium.slice(0,10).map(t=><TopicTag key={t} tag={t} type="medium"/>)}</div>
          </div>
        )}
        {strong.length>0&&(
          <div>
            <p className="text-green-400 text-xs font-semibold uppercase tracking-wider mb-2">Strong Topics</p>
            <div className="flex flex-wrap gap-2">{strong.slice(0,10).map(t=><TopicTag key={t} tag={t} type="strong"/>)}</div>
          </div>
        )}
      </div>
    </div>
  )
}