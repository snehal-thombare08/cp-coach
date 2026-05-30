import { useState } from "react"
import SearchBar from "./components/SearchBar"
import ProfileCard from "./components/ProfileCard"
import RatingChart from "./components/RatingChart"
import TopicAnalysis from "./components/TopicAnalysis"
import ContestHistory from "./components/ContestHistory"
import Roadmap from "./components/Roadmap"
import AICoach from "./components/AICoach"
import { getUserInfo, getUserRating, getUserSubmissions, analyzeTopics, classifyTopics } from "./services/codeforcesApi"

export default function App() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  async function handleSearch(handle) {
    setLoading(true)
    setError(null)
    setData(null)
    try {
      const [user, ratingHistory, submissions] = await Promise.all([
        getUserInfo(handle),
        getUserRating(handle),
        getUserSubmissions(handle, 500),
      ])
      const solvedSet = new Set(submissions.filter(s=>s.verdict==="OK").map(s=>s.problem.name))
      const topicStats = analyzeTopics(submissions)
      const classification = classifyTopics(topicStats)
      setData({ user, ratingHistory, solvedCount:solvedSet.size, topicStats, classification })
    } catch(err) {
      setError(err.message||"Something went wrong. Check the username and try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <SearchBar onSearch={handleSearch} loading={loading}/>
        {error&&(
          <div className="bg-red-950 border border-red-800 text-red-300 rounded-xl px-4 py-3 text-sm mb-6">
            Error: {error}
          </div>
        )}
        {loading&&(
          <div className="space-y-4 animate-pulse">
            {[260,300,240,200,360].map((h,i)=>(
              <div key={i} className="bg-slate-800 rounded-2xl" style={{height:h}}/>
            ))}
          </div>
        )}
        {data&&!loading&&(
          <>
            <ProfileCard user={data.user} solvedCount={data.solvedCount} contestCount={data.ratingHistory.length}/>
            <RatingChart ratingHistory={data.ratingHistory}/>
            <TopicAnalysis topicStats={data.topicStats} classification={data.classification}/>
            <ContestHistory ratingHistory={data.ratingHistory}/>
            <Roadmap user={data.user} weakTopics={data.classification.weak} solvedCount={data.solvedCount}/>
            <div className="bg-gradient-to-r from-blue-950 to-purple-950 border border-purple-800/50 rounded-2xl p-4 mb-6 text-center">
              <p className="text-white font-semibold text-lg mb-1">🤖 AI Coach — Powered by Gemini</p>
              <p className="text-slate-400 text-sm">Personalized practice plan + Ask your CP mentor anything</p>
            </div>
            <AICoach
              user={data.user}
              weakTopics={data.classification.weak}
              strongTopics={data.classification.strong}
            />
          </>
        )}
      </div>
    </div>
  )
}