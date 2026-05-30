import { useState } from "react"
import { Brain, Send, Loader2, Sparkles } from "lucide-react"
import { getAIRecommendations, askMentor } from "../services/geminiApi"

export default function AICoach({ user, weakTopics, strongTopics }) {
  const [plan, setPlan] = useState("")
  const [loadingPlan, setLoadingPlan] = useState(false)
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [loadingAnswer, setLoadingAnswer] = useState(false)
  const [error, setError] = useState("")

  async function fetchPlan() {
    setLoadingPlan(true)
    setError("")
    try {
      const result = await getAIRecommendations(user.handle, user.rating, weakTopics, strongTopics)
      setPlan(result)
    } catch(e) {
      setError("AI error: " + e.message)
    } finally {
      setLoadingPlan(false)
    }
  }

  async function fetchAnswer() {
    if(!question.trim()) return
    setLoadingAnswer(true)
    setError("")
    try {
      const result = await askMentor(user.handle, user.rating, weakTopics, question)
      setAnswer(result)
    } catch(e) {
      setError("AI error: " + e.message)
    } finally {
      setLoadingAnswer(false)
    }
  }

  return (
    <div className="space-y-6 mb-6">

      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <Sparkles size={18} className="text-yellow-400"/> AI Daily Practice Plan
          </h3>
          <button onClick={fetchPlan} disabled={loadingPlan}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-all disabled:opacity-50 flex items-center gap-2">
            {loadingPlan ? <><Loader2 size={15} className="animate-spin"/>Generating...</> : "Generate Plan"}
          </button>
        </div>

        {!plan && !loadingPlan && (
          <div className="text-center py-8 text-slate-500">
            <Brain size={40} className="mx-auto mb-3 opacity-40"/>
            <p className="text-sm">Click "Generate Plan" to get your personalized AI practice plan</p>
          </div>
        )}

        {loadingPlan && (
          <div className="text-center py-8">
            <Loader2 size={32} className="animate-spin mx-auto text-blue-400 mb-3"/>
            <p className="text-slate-400 text-sm">Gemini AI analyzing your profile...</p>
          </div>
        )}

        {plan && (
          <div className="bg-slate-900 rounded-xl p-4 text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
            {plan}
          </div>
        )}
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
        <h3 className="text-white font-semibold flex items-center gap-2 mb-4">
          <Brain size={18} className="text-purple-400"/> Ask AI Mentor
        </h3>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={question}
            onChange={e=>setQuestion(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&fetchAnswer()}
            placeholder="Ask anything... e.g. How do I improve at DP?"
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          />
          <button onClick={fetchAnswer} disabled={loadingAnswer||!question.trim()}
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition-all disabled:opacity-50 flex items-center gap-2">
            {loadingAnswer ? <Loader2 size={16} className="animate-spin"/> : <Send size={16}/>}
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {["How to improve at DP?","Best resources for graphs?","How to upsolve effectively?","Contest strategy tips?"].map(q=>(
            <button key={q} onClick={()=>setQuestion(q)}
              className="text-xs px-3 py-1.5 rounded-full bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors">
              {q}
            </button>
          ))}
        </div>

        {loadingAnswer && (
          <div className="text-center py-6">
            <Loader2 size={28} className="animate-spin mx-auto text-purple-400 mb-2"/>
            <p className="text-slate-400 text-sm">AI Mentor thinking...</p>
          </div>
        )}

        {answer && !loadingAnswer && (
          <div className="bg-slate-900 rounded-xl p-4 text-sm text-slate-300 leading-relaxed border-l-4 border-purple-500">
            {answer}
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-950 border border-red-800 text-red-300 rounded-xl px-4 py-3 text-sm">
          {error}
        </div>
      )}
    </div>
  )
}