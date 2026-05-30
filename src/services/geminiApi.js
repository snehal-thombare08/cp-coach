const API_KEY = import.meta.env.VITE_GROQ_KEY

async function callAI(prompt) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1024,
    })
  })
  const data = await res.json()
  if(data.error) throw new Error(data.error.message)
  return data.choices[0].message.content
}

export async function getAIRecommendations(handle, rating, weakTopics, strongTopics) {
  const prompt = `You are an expert Competitive Programming coach.
Codeforces User: ${handle}
Current Rating: ${rating || "Unrated"}
Weak Topics: ${weakTopics.slice(0,5).join(", ") || "none"}
Strong Topics: ${strongTopics.slice(0,5).join(", ") || "none"}

Give a structured response with:
1. DAILY PRACTICE PLAN - 3 specific problems to solve today with difficulty level
2. TOPIC PRIORITY - which weak topic to focus on first and why
3. RATING PREDICTION - realistic next milestone and timeline
4. PRO TIP - one specific actionable advice

Keep it concise and practical.`
  return await callAI(prompt)
}

export async function askMentor(handle, rating, weakTopics, question) {
  const prompt = `You are an expert CP mentor coaching ${handle} (Rating: ${rating || "Unrated"}).
Their weak topics: ${weakTopics.slice(0,5).join(", ") || "none"}.
Student asks: "${question}"
Give a helpful, specific, encouraging answer in 3-4 sentences.`
  return await callAI(prompt)
}