import { Map, Circle, CheckCircle2 } from "lucide-react"

function buildRoadmap(rating, weakTopics, solvedCount) {
  const r = rating||0
  const steps = []
  if(solvedCount<150) steps.push({
    phase:"Foundation", emoji:"🏗", target:"Any rating",
    tasks:["Div. 3 A, B problems daily solve kara","Basic DS: array, string, map, set","Target: 200 problems solve kara"],
    done:solvedCount>=150
  })
  if(r<1200) steps.push({
    phase:"Newbie to Pupil", emoji:"🌱", target:"Rating 1200",
    tasks:["Implementation + brute force","Sorting, prefix sums, basic math","Div. 3 A/B - 5 per day"],
    done:r>=1200
  })
  if(r<1600||weakTopics.includes("greedy")||weakTopics.includes("binary search")) steps.push({
    phase:"Pupil to Specialist", emoji:"⚡", target:"Rating 1600",
    tasks:["Greedy algorithms","Binary search on answer","Two pointers, sliding window"],
    done:r>=1600
  })
  if(r<1900||weakTopics.some(t=>t.includes("dp")||t.includes("dynamic"))) steps.push({
    phase:"DP Fundamentals", emoji:"🧠", target:"Rating 1900",
    tasks:["DP on arrays: LIS, LCS, knapsack","DP on strings, bitmask DP","AtCoder DP Contest practice kara"],
    done:r>=1900
  })
  if(r<2000||weakTopics.some(t=>t.includes("graph")||t==="dfs and similar"||t==="bfs")) steps.push({
    phase:"Graph Theory", emoji:"🕸", target:"Rating 2000",
    tasks:["BFS, DFS traversal problems","Dijkstra, Bellman-Ford","Trees, connected components"],
    done:r>=2000
  })
  steps.push({
    phase:"Contest Strategy", emoji:"🏆", target:"All levels",
    tasks:["Weekly Codeforces Div. 2 participate kara","Virtual contests practice kara","Upsolve - missed problems solve kara"],
    done:false
  })
  return steps
}

export default function Roadmap({ user, weakTopics, solvedCount }) {
  const steps = buildRoadmap(user.rating, weakTopics, solvedCount)
  const doneCount = steps.filter(s=>s.done).length
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-white font-semibold flex items-center gap-2">
          <Map size={18} className="text-teal-400"/>Personalized Roadmap
        </h3>
        <span className="text-slate-400 text-sm">{doneCount}/{steps.length} completed</span>
      </div>
      <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-6">
        <div className="h-full bg-teal-500 rounded-full transition-all duration-700"
          style={{width:`${steps.length?(doneCount/steps.length)*100:0}%`}}/>
      </div>
      <div className="space-y-4">
        {steps.map((step,i)=>(
          <div key={i} className={`flex gap-4 p-4 rounded-xl border transition-colors ${step.done?"bg-green-950/40 border-green-800/50":i===doneCount?"bg-blue-950/40 border-blue-700/50":"bg-slate-900/60 border-slate-700/50"}`}>
            <div className="flex-shrink-0 mt-0.5">
              {step.done
                ?<CheckCircle2 size={22} className="text-green-400"/>
                :i===doneCount
                ?<Circle size={22} className="text-blue-400"/>
                :<Circle size={22} className="text-slate-600"/>
              }
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-base">{step.emoji}</span>
                <span className={`font-semibold text-sm ${step.done?"text-green-300":i===doneCount?"text-blue-200":"text-slate-300"}`}>{step.phase}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${step.done?"bg-green-900/60 text-green-400":i===doneCount?"bg-blue-900/60 text-blue-300":"bg-slate-800 text-slate-400"}`}>{step.target}</span>
              </div>
              <ul className="space-y-0.5">
                {step.tasks.map((task,j)=>(
                  <li key={j} className="text-slate-400 text-xs flex items-start gap-1.5">
                    <span className="text-slate-600 mt-0.5">›</span>{task}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}