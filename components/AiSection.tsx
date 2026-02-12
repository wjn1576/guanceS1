import React, { useState } from 'react';
import { Icons } from './Icons';
import { generateObservabilityInsightStream } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const AiSection: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setResponse(""); // Clear for streaming start
    try {
      for await (const chunk of generateObservabilityInsightStream(query)) {
        setResponse(prev => (prev === null ? chunk : prev + chunk));
      }
    } catch (err) {
      setResponse("连接 AI 服务失败。");
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    "如何优化 MySQL 查询延迟？",
    "写一个 DQL 查询来过滤错误日志",
    "解释一下 Tracing 和 Logging 的区别"
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-guance-dark text-white relative overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-40 h-40 bg-blue-500 rounded-full blur-[100px] opacity-20"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-guance-orange rounded-full blur-[120px] opacity-20"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-white/10 rounded-xl mb-6 backdrop-blur-sm border border-white/10">
            <Icons.Zap className="w-8 h-8 text-yellow-400" />
          </div>
          <h2 className="text-4xl font-bold mb-4">观测云 Copilot</h2>
          <p className="text-xl text-gray-300">
            询问有关您的基础设施或数据的任何问题。
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl min-h-[400px] flex flex-col">
          <form onSubmit={handleAsk} className="relative mb-6">
            <div className="absolute left-4 top-4 text-gray-400">
              <Icons.Search className="w-6 h-6" />
            </div>
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="询问 Copilot (例如：'显示过去一小时的 5xx 错误')"
              className="w-full bg-black/20 border border-gray-600 rounded-xl py-4 pl-14 pr-32 text-white placeholder-gray-400 focus:outline-none focus:border-guance-orange focus:ring-1 focus:ring-guance-orange transition-all text-lg"
            />
            <button 
              type="submit"
              disabled={loading && response === ""} 
              className="absolute right-2 top-2 bottom-2 bg-guance-orange hover:bg-orange-600 text-white px-6 rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {loading && response === "" ? (
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
              ) : (
                "提问"
              )}
            </button>
          </form>

          {/* Response / Placeholder Area */}
          <div className="flex-grow flex flex-col">
            {!response && !loading ? (
              <div className="flex-grow flex flex-col items-center justify-center text-center p-8 opacity-60 border-2 border-dashed border-white/10 rounded-xl">
                 <Icons.Activity className="w-16 h-16 text-gray-500 mb-4" />
                 <h3 className="text-xl font-semibold text-gray-300 mb-2">等待指令</h3>
                 <p className="text-gray-400 mb-6">在上方输入问题，或尝试以下示例：</p>
                 <div className="flex flex-wrap gap-2 justify-center">
                  {suggestions.map((s, i) => (
                    <button 
                      key={i} 
                      onClick={() => setQuery(s)}
                      className="bg-white/5 hover:bg-white/10 border border-white/5 rounded-full px-4 py-2 text-sm text-gray-300 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : response ? (
              <div className="bg-black/30 rounded-xl p-6 border border-white/5 animate-fade-in flex-grow">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 mr-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <Icons.Zap className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <h4 className="text-sm font-bold text-gray-400 uppercase mb-2">Copilot 回答</h4>
                    <div className="prose prose-invert max-w-none text-gray-200">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          code(props: any) {
                            const {children, className, node, ...rest} = props
                            const match = /language-(\w+)/.exec(className || '')
                            return match ? (
                              <SyntaxHighlighter
                                {...rest}
                                PreTag="div"
                                children={String(children).replace(/\n$/, '')}
                                language={match[1]}
                                style={vscDarkPlus}
                                className="rounded-md !bg-[#0d1117] !p-4 !m-0 border border-gray-700"
                              />
                            ) : (
                              <code {...rest} className={`${className} bg-white/10 rounded px-1.5 py-0.5 text-orange-200 font-mono text-sm`}>
                                {children}
                              </code>
                            )
                          },
                          // Custom styling for tables to ensure they look good in dark mode
                          table: ({node, ...props}) => (
                            <div className="overflow-x-auto my-6 rounded-lg border border-gray-700">
                               <table {...props} className="min-w-full divide-y divide-gray-700" />
                            </div>
                          ),
                          thead: ({node, ...props}) => <thead {...props} className="bg-white/5" />,
                          tbody: ({node, ...props}) => <tbody {...props} className="divide-y divide-gray-700 bg-transparent" />,
                          tr: ({node, ...props}) => <tr {...props} className="hover:bg-white/5 transition-colors" />,
                          th: ({node, ...props}) => <th {...props} className="px-4 py-3 text-left text-xs font-bold text-gray-200 uppercase tracking-wider" />,
                          td: ({node, ...props}) => <td {...props} className="px-4 py-3 text-sm text-gray-300 whitespace-pre-wrap" />,
                          a: ({node, ...props}) => <a {...props} className="text-guance-orange hover:underline" target="_blank" rel="noopener noreferrer" />,
                          ul: ({node, ...props}) => <ul {...props} className="list-disc list-outside ml-5 space-y-1 my-4" />,
                          ol: ({node, ...props}) => <ol {...props} className="list-decimal list-outside ml-5 space-y-1 my-4" />,
                          h1: ({node, ...props}) => <h1 {...props} className="text-2xl font-bold text-white mt-8 mb-4 border-b border-gray-700 pb-2" />,
                          h2: ({node, ...props}) => <h2 {...props} className="text-xl font-bold text-white mt-6 mb-3" />,
                          h3: ({node, ...props}) => <h3 {...props} className="text-lg font-bold text-gray-200 mt-4 mb-2" />,
                          p: ({node, ...props}) => <p {...props} className="my-3 leading-relaxed" />,
                        }}
                      >
                        {response}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Loading State Placeholder (Thinking...)
               <div className="flex-grow flex items-center justify-center p-8">
                  <div className="flex flex-col items-center">
                    <div className="animate-pulse flex space-x-2 mb-4">
                      <div className="h-3 w-3 bg-guance-orange rounded-full"></div>
                      <div className="h-3 w-3 bg-guance-orange rounded-full delay-75"></div>
                      <div className="h-3 w-3 bg-guance-orange rounded-full delay-150"></div>
                    </div>
                    <p className="text-gray-400">正在思考中...</p>
                  </div>
               </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};