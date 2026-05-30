const BASE = "https://codeforces.com/api"

export async function getUserInfo(handle){
  const res = await fetch(`${BASE}/user.info?handles=${handle}`)
  const data = await res.json()
  if(data.status !== "OK") throw new Error(data.comment || "User not found")
  return data.result[0]
}

export async function getUserRating(handle){
  const res = await fetch(`${BASE}/user.rating?handle=${handle}`)
  const data = await res.json()
  if(data.status !== "OK") return []
  return data.result
}

export async function getUserSubmissions(handle,count=500){
  const res = await fetch(`${BASE}/user.status?handle=${handle}&count=${count}`)
  const data = await res.json()
  if(data.status !== "OK") return []
  return data.result
}

export function analyzeTopics(submissions){
  const tagData = {}
  submissions.forEach(sub=>{
    const tags = sub.problem?.tags ?? []
    tags.forEach(tag=>{
      if(!tagData[tag]) tagData[tag]={correct:0,wrong:0}
      if(sub.verdict==="OK") tagData[tag].correct++
      else tagData[tag].wrong++
    })
  })
  return Object.entries(tagData)
    .map(([tag,{correct,wrong}])=>{
      const total=correct+wrong
      return {tag,correct,wrong,total,rate:total>0?correct/total:0}
    })
    .filter(t=>t.total>=3)
    .sort((a,b)=>b.total-a.total)
}

export function classifyTopics(topicStats){
  return {
    weak:   topicStats.filter(t=>t.rate<0.50).map(t=>t.tag),
    medium: topicStats.filter(t=>t.rate>=0.50&&t.rate<0.75).map(t=>t.tag),
    strong: topicStats.filter(t=>t.rate>=0.75).map(t=>t.tag),
  }
}
