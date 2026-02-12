import React, { useState, useRef, useEffect } from 'react';
import { Icons } from './Icons';
import { generateObservabilityInsightStream } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const AiChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '您好！我是观测云 AI 助手。关于产品功能、价格或技术问题，有什么可以帮您的吗？' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    // Create placeholder for AI response
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

    try {
      let accumulatedResponse = '';
      for await (const chunk of generateObservabilityInsightStream(userMsg)) {
        accumulatedResponse += chunk;
        setMessages(prev => {
          const newHistory = [...prev];
          const lastMsg = newHistory[newHistory.length - 1];
          if (lastMsg.role === 'assistant') {
            lastMsg.content = accumulatedResponse;
          }
          return newHistory;
        });
      }
    } catch (err) {
      setMessages(prev => {
         const newHistory = [...prev];
         const lastMsg = newHistory[newHistory.length - 1];
         if (lastMsg.role === 'assistant') {
            lastMsg.content = '抱歉，连接服务器时出现问题，请稍后再试。';
         }
         return newHistory;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center group ${
          isOpen ? 'bg-gray-800 rotate-90' : 'bg-guance-orange hover:scale-110 hover:-translate-y-1'
        } text-white`}
        aria-label="打开 AI 客服"
      >
        {isOpen ? <Icons.X className="w-6 h-6" /> : <Icons.MessageSquare className="w-6 h-6" />}
        {!isOpen && (
            <span className="absolute right-full mr-3 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                AI 客服
            </span>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 md:right-6 z-50 w-[calc(100vw-32px)] md:w-[380px] h-[500px] max-h-[70vh] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-fade-in-up origin-bottom-right">
          
          {/* Header */}
          <div className="bg-[#0B1121] p-4 flex items-center justify-between shadow-md relative z-10">
            <div className="flex items-center space-x-3">
               <div className="bg-white/10 p-1.5 rounded-lg">
                  <Icons.Bot className="w-5 h-5 text-guance-orange" />
               </div>
               <div>
                   <span className="text-white font-bold block text-sm">观测云智能助手</span>
                   <div className="flex items-center mt-0.5">
                       <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse mr-1.5"></div>
                       <span className="text-[10px] text-gray-400">在线</span>
                   </div>
               </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-md">
              <Icons.Minimize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5 bg-[#F8FAFC]">
            <div className="text-center text-xs text-gray-400 my-4">
                <span>今天</span>
            </div>
            
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center mr-2 flex-shrink-0 mt-1 shadow-sm">
                        <Icons.Bot className="w-4 h-4 text-guance-orange" />
                    </div>
                )}
                <div 
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-guance-orange text-white rounded-br-none' 
                      : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                  }`}
                >
                  {msg.role === 'user' ? (
                    msg.content
                  ) : (
                    <div className="prose prose-sm max-w-none prose-p:my-1 prose-a:text-blue-600">
                       <ReactMarkdown remarkPlugins={[remarkGfm]}>
                         {msg.content}
                       </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && messages[messages.length - 1].content === '' && (
               <div className="flex justify-start animate-fade-in">
                 <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center mr-2 flex-shrink-0 shadow-sm">
                        <Icons.Bot className="w-4 h-4 text-guance-orange" />
                 </div>
                 <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex space-x-1 items-center h-[46px]">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                 </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 relative z-10">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="输入您的问题..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl pl-4 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-guance-orange/20 focus:border-guance-orange transition-all text-sm placeholder-gray-400"
              />
              <button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="absolute right-2 p-1.5 bg-guance-orange text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all transform active:scale-95 shadow-sm"
              >
                <Icons.Send className="w-4 h-4" />
              </button>
            </div>
            <div className="text-center mt-2 flex justify-center items-center">
               <span className="text-[10px] text-gray-400 flex items-center">
                  <Icons.ShieldCheck className="w-3 h-3 mr-1" /> 内容由 AI 生成，仅供参考
               </span>
            </div>
          </form>
        </div>
      )}
    </>
  );
};