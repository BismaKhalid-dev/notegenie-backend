export const summaryPrompt = (content) => `
You are an expert study assistant.

Study Material:
"""
${content}
"""

Generate:
1. overview (3-5 sentences)
2. 5-8 key points
3. 3-5 important terms with definitions

Return ONLY valid JSON.

{
  "overview":"",
  "keyPoints":[""],
  "terms":[
    {
      "term":"",
      "definition":""
    }
  ]
}
`;

export const flashcardPrompt = (content) => `
Create 8-12 flashcards.

Content:
"""
${content}
"""

Return ONLY valid JSON.

{
  "cards":[
    {
      "question":"",
      "answer":""
    }
  ]
}
`;

export const quizPrompt = (content) => `
Create 5 MCQs.

Content:
"""
${content}
"""

Return ONLY valid JSON.

{
  "questions":[
    {
      "id":1,
      "question":"",
      "options":["","","",""],
      "correctIndex":0
    }
  ]
}
`;

export const chatPrompt = (content, history, message) => `
You are NoteGenie AI.

Notes:
"""
${content}
"""

Conversation:
${history.map((item) => `${item.role}: ${item.text}`).join("\n")}

User Question:
${message}
`;