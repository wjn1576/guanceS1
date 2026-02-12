// Implements DeepSeek API
const API_KEY = "sk-4eca3ab91c464c0b81f6417bf3f4512b";
const API_URL = "https://api.deepseek.com/chat/completions";

export const generateObservabilityInsightStream = async function* (query: string) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: "你是一个观测云(Guance Cloud)的专家助手。你的目标是帮助用户理解监控、日志、链路追踪和DQL(Data Query Language)。保持回答简洁、专业且易懂，并推广统一可观测性的好处。如果被问及查询，请提供伪代码或DQL示例。"
          },
          {
            role: "user",
            content: query
          }
        ],
        stream: true
      })
    });

    if (!response.ok) {
        throw new Error(`DeepSeek API Error: ${response.status}`);
    }

    if (!response.body) throw new Error("No response body");

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('data: ')) {
           const jsonStr = trimmed.slice(6);
           if (jsonStr === '[DONE]') return;
           try {
             const json = JSON.parse(jsonStr);
             const content = json.choices?.[0]?.delta?.content || "";
             if (content) yield content;
           } catch (e) {
             console.warn("Error parsing stream:", e);
           }
        }
      }
    }
  } catch (error) {
    console.error("AI Service Error:", error);
    yield "我目前无法连接到 DeepSeek 知识库，请检查网络或稍后再试。";
  }
};