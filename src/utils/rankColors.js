export const RANK_META = {
  "newbie":{ color:"#888780",label:"Newbie",bg:"bg-gray-700",text:"text-gray-300"},
  "pupil":{ color:"#4caf50",label:"Pupil",bg:"bg-green-900",text:"text-green-300"},
  "specialist":{ color:"#03a89e",label:"Specialist",bg:"bg-teal-900",text:"text-teal-300"},
  "expert":{ color:"#3b82f6",label:"Expert",bg:"bg-blue-900",text:"text-blue-300"},
  "candidate master":{ color:"#a855f7",label:"Candidate Master",bg:"bg-purple-900",text:"text-purple-300"},
  "master":{ color:"#f97316",label:"Master",bg:"bg-orange-900",text:"text-orange-300"},
  "grandmaster":{ color:"#ef4444",label:"Grandmaster",bg:"bg-red-900",text:"text-red-300"},
  "legendary grandmaster":{ color:"#ef4444",label:"Legendary GM",bg:"bg-red-950",text:"text-yellow-300"},
}
export function getRankMeta(rank){
  if(!rank) return RANK_META["newbie"]
  const k=rank.toLowerCase()
  for(const key of Object.keys(RANK_META)) if(k.includes(key)) return RANK_META[key]
  return RANK_META["newbie"]
}
export function getRatingColor(r){
  if(!r) return "#888780"
  if(r<1200) return "#888780"
  if(r<1400) return "#4caf50"
  if(r<1600) return "#03a89e"
  if(r<1900) return "#3b82f6"
  if(r<2100) return "#a855f7"
  if(r<2400) return "#f97316"
  return "#ef4444"
}
