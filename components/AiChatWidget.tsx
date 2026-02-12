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
    { role: 'assistant', content: '您好，欢迎连接观测云智能终端。请下达指令。' }
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
            lastMsg.content = '信号中断，连接服务器失败。';
         }
         return newHistory;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button with Holographic Effect */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-[0_0_20px_rgba(255,106,0,0.4)] hover:shadow-[0_0_30px_rgba(255,106,0,0.6)] transition-all duration-300 flex items-center justify-center transform hover:scale-110 ${
          isOpen ? 'bg-white text-gray-900 rotate-90' : 'bg-gradient-to-br from-guance-orange to-red-600 text-white'
        }`}
        aria-label="联系智能客服"
      >
        {isOpen ? <Icons.X className="w-6 h-6" /> : <Icons.Headphones className="w-6 h-6 animate-pulse" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 md:right-6 z-50 w-[calc(100vw-32px)] md:w-[380px] h-[550px] max-h-[75vh] bg-[#0B1121]/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 flex flex-col overflow-hidden animate-fade-in-up origin-bottom-right font-sans">
          
          {/* Header - Cyberpunk Gradient */}
          <div className="bg-gradient-to-r from-guance-orange/80 to-purple-600/80 p-4 flex items-center justify-between shadow-lg relative z-10 text-white border-b border-white/10">
            <div className="flex items-center space-x-3">
               <div className="bg-black/20 p-2 rounded-lg backdrop-blur-sm border border-white/10">
                  <Icons.Cpu className="w-5 h-5 text-white" />
               </div>
               <div>
                   <span className="font-bold block text-base tracking-wide font-mono">GUANCE AI CORE</span>
                   <span className="text-white/70 text-[10px] flex items-center font-mono uppercase tracking-wider">
                     <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 animate-pulse"></span>
                     System Online
                   </span>
               </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded">
              <Icons.Minimize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area - Dark Grid Background */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-[#050A14] relative">
            <div className="absolute inset-0 bg-grid-slate-900/[0.1] pointer-events-none"></div>
            
            <div className="flex justify-center relative z-10">
                <span className="text-[10px] text-gray-500 bg-white/5 px-2 py-0.5 rounded border border-white/5 font-mono">SESSION START</span>
            </div>
            
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in items-end space-x-2 relative z-10`}>
                
                {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-[#1E293B] border border-guance-orange/50 flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(255,106,0,0.2)] text-guance-orange">
                        <Icons.Bot className="w-4 h-4" />
                    </div>
                )}

                <div 
                  className={`max-w-[85%] px-4 py-3 text-sm shadow-md backdrop-blur-md ${
                    msg.role === 'user' 
                      ? 'bg-guance-orange/90 text-white rounded-2xl rounded-br-sm border border-orange-400/30' 
                      : 'bg-white/10 text-gray-200 border border-white/10 rounded-2xl rounded-bl-sm'
                  }`}
                >
                  {msg.role === 'user' ? (
                    msg.content
                  ) : (
                    <div className="prose prose-invert prose-sm max-w-none prose-p:my-1 prose-a:text-guance-orange prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10">
                       <ReactMarkdown remarkPlugins={[remarkGfm]}>
                         {msg.content}
                       </ReactMarkdown>
                    </div>
                  )}
                </div>

                {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 text-gray-300">
                        <Icons.User className="w-4 h-4" />
                    </div>
                )}
              </div>
            ))}
            
            {isLoading && messages[messages.length - 1].content === '' && (
               <div className="flex justify-start animate-fade-in items-end space-x-2 relative z-10">
                 <div className="w-8 h-8 rounded-full bg-[#1E293B] border border-guance-orange/50 flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(255,106,0,0.2)] text-guance-orange">
                        <Icons.Bot className="w-4 h-4" />
                 </div>
                 <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-bl-sm border border-white/10 shadow-sm">
                    <div className="flex space-x-1 items-center h-4">
                        <div className="w-1.5 h-1.5 bg-guance-orange rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-guance-orange rounded-full animate-bounce delay-75"></div>
                        <div className="w-1.5 h-1.5 bg-guance-orange rounded-full animate-bounce delay-150"></div>
                    </div>
                 </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="bg-[#0B1121] p-4 border-t border-white/10 relative z-20">
             <form onSubmit={handleSend} className="relative flex items-center group">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="输入指令..."
                className="flex-1 bg-black/30 text-white border border-white/10 rounded-full pl-5 pr-12 py-3 focus:outline-none focus:border-guance-orange/50 focus:ring-1 focus:ring-guance-orange/50 transition-all text-sm font-mono placeholder-gray-600"
              />
              <button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="absolute right-1.5 p-2 bg-guance-orange text-white rounded-full hover:bg-orange-500 disabled:opacity-50 disabled:bg-gray-700 disabled:cursor-not-allowed transition-all shadow-[0_0_10px_rgba(255,106,0,0.3)]"
              >
                <Icons.Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};