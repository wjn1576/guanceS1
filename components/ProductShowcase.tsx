import React from 'react';
import { Icons } from './Icons';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, LineChart, Line } from 'recharts';

const integrationTags = [
  { name: 'docker', icon: <Icons.Server size={14} /> },
  { name: 'RabbitMQ', icon: <Icons.Database size={14} /> },
  { name: 'GitHub', icon: <Icons.Code2 size={14} /> },
  { name: 'elasticsearch', icon: <Icons.Search size={14} /> },
  { name: 'Windows', icon: <Icons.Terminal size={14} /> },
  { name: 'kafka', icon: <Icons.Activity size={14} /> },
  { name: 'Java', icon: <Icons.Code2 size={14} /> },
  { name: 'Skywalking', icon: <Icons.Cloud size={14} /> },
  { name: 'NGINX', icon: <Icons.Server size={14} /> },
  { name: 'rum', icon: <Icons.Globe size={14} /> },
  { name: 'Aliyun', icon: <Icons.Cloud size={14} /> },
  { name: 'syslog-ng', icon: <Icons.FileText size={14} /> },
  { name: 'MySQL', icon: <Icons.Database size={14} /> },
];

const miniChartData = [
  { name: 'A', value: 40 }, { name: 'B', value: 30 }, { name: 'C', value: 30 }
];
const miniLineData = Array.from({ length: 10 }, (_, i) => ({ val: Math.random() * 100 }));
const miniBarData = Array.from({ length: 8 }, (_, i) => ({ val: Math.random() * 100 }));

export const ProductShowcase: React.FC = () => {
  return (
    <section className="bg-[#141414] py-20 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">
          
          {/* Card 1: Global Coverage (Left, Tall) */}
          <div className="lg:col-span-1 lg:row-span-2 bg-[#1F1F1F] rounded-2xl p-8 relative overflow-hidden group border border-white/5 hover:border-guance-orange/50 transition-colors">
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="text-guance-orange text-xs font-bold mb-2">遍布全球的数据节点</div>
                <h3 className="text-3xl font-bold mb-4">覆盖全球</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  观测云数据节点遍布世界，确保客户在世界各地的系统和应用都能得到准确，高效的监控支持。
                </p>
              </div>
              
              {/* Abstract Globe Effect */}
              <div className="mt-8 relative h-48 w-full opacity-30">
                <div className="absolute inset-0 rounded-full border border-gray-500/30 scale-150 translate-y-20"></div>
                <div className="absolute inset-0 rounded-full border border-gray-500/30 scale-125 translate-y-20"></div>
                <div className="absolute inset-0 rounded-full border border-gray-500/30 scale-100 translate-y-20 bg-gradient-to-t from-gray-800 to-transparent"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full flex items-end justify-center">
                    <Icons.Globe className="w-48 h-48 text-gray-600 animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column Wrapper */}
          <div className="lg:col-span-2 lg:row-span-2 flex flex-col gap-6">
            
            {/* Card 2: Open Integration (Top) */}
            <div className="flex-1 bg-[#1F1F1F] rounded-2xl p-6 border border-white/5 hover:border-guance-orange/50 transition-colors relative overflow-hidden">
               <div className="relative z-10">
                 <div className="flex flex-wrap gap-3 mb-6 h-[100px] overflow-hidden mask-gradient-bottom">
                    {integrationTags.map((tag, idx) => (
                      <div key={idx} className="flex items-center space-x-2 bg-[#2A2A2A] px-3 py-1.5 rounded-md text-xs text-gray-300 border border-white/5 whitespace-nowrap">
                        {tag.icon}
                        <span>{tag.name}</span>
                      </div>
                    ))}
                    <div className="flex items-center space-x-2 bg-[#2A2A2A] px-3 py-1.5 rounded-md text-xs text-gray-300 border border-white/5">
                        <span className="opacity-50">...</span>
                    </div>
                 </div>
                 
                 <div className="mt-auto">
                    <div className="text-guance-orange text-xs font-bold mb-1">400+ 技术栈集成</div>
                    <h3 className="text-2xl font-bold">开放集成</h3>
                    <p className="text-gray-400 text-sm mt-2">
                      观测云能够无缝连接各类应用、数据库、基础设施和公有云平台，实现跨平台的数据采集、分析和监控。
                    </p>
                 </div>
               </div>
               
               {/* Fading overlay for tags */}
               <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#1F1F1F] pointer-events-none opacity-0"></div>
            </div>

            {/* Card 3: Unified Platform (Bottom) */}
            <div className="flex-1 bg-[#1F1F1F] rounded-2xl p-6 border border-white/5 hover:border-guance-orange/50 transition-colors flex flex-col justify-between">
                
                {/* Mini Dashboard Visual */}
                <div className="grid grid-cols-3 gap-3 mb-4 h-24">
                   <div className="bg-[#2A2A2A] rounded-lg p-2 flex items-center justify-center relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={miniChartData} innerRadius={15} outerRadius={25} dataKey="value" stroke="none">
                            <Cell fill="#FF6A00" />
                            <Cell fill="#333" />
                            <Cell fill="#555" />
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                   </div>
                   <div className="bg-[#2A2A2A] rounded-lg p-2 relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={miniBarData}>
                           <Bar dataKey="val" fill="#555" radius={[2,2,0,0]} />
                        </BarChart>
                      </ResponsiveContainer>
                   </div>
                   <div className="bg-[#2A2A2A] rounded-lg p-2 relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={miniLineData}>
                           <Line type="monotone" dataKey="val" stroke="#FF6A00" strokeWidth={2} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                   </div>
                </div>

                <div>
                   <div className="text-guance-orange text-xs font-bold mb-1">可定制仪表盘统一观测</div>
                   <h3 className="text-2xl font-bold">统一平台</h3>
                   <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                     观测云统一收集数据(Metrics, Traces, Logs)，将基础设施监控、日志监测、应用性能监控 (APM)、用户行为监测 (RUM) 等功能集成在统一的可定制仪表盘。
                   </p>
                </div>
            </div>

          </div>

          {/* Card 4: Pay as you go (Right, Tall) */}
          <div className="lg:col-span-1 lg:row-span-2 bg-[#1F1F1F] rounded-2xl p-8 border border-white/5 hover:border-guance-orange/50 transition-colors flex flex-col">
            <div className="mb-8">
               <div className="text-guance-orange text-xs font-bold mb-2">用多少 花多少</div>
               <h3 className="text-3xl font-bold mb-4">按量计费</h3>
               <p className="text-gray-400 text-sm leading-relaxed">
                 观测云根据实际使用量进行按天结算，0数据0花费，避免了传统企业版收费中的资源闲置。
               </p>
            </div>

            <div className="flex-grow flex items-center justify-center relative">
               <div className="relative w-32 h-32 flex items-center justify-center">
                  <div className="absolute w-24 h-24 rounded-full bg-[#2A2A2A] border border-gray-700 flex items-center justify-center z-10 shadow-2xl">
                     <span className="text-3xl font-bold text-gray-500">¥</span>
                  </div>
                  {/* Stack effect */}
                  <div className="absolute w-24 h-24 rounded-full bg-[#2A2A2A] border border-gray-700 top-4 scale-95 opacity-70"></div>
                  <div className="absolute w-24 h-24 rounded-full bg-[#2A2A2A] border border-gray-700 top-8 scale-90 opacity-40"></div>
                  
                  {/* Decorative Lines */}
                  <div className="absolute -left-12 top-1/2 w-10 h-[1px] bg-gray-700 border-t border-dashed border-gray-500"></div>
                  <div className="absolute -right-12 top-1/2 w-10 h-[1px] bg-gray-700 border-t border-dashed border-gray-500"></div>
               </div>
               
               {/* List indicators */}
               <div className="absolute right-0 top-1/2 transform translate-x-4 -translate-y-1/2 space-y-3 opacity-20">
                  <div className="w-16 h-2 bg-gray-500 rounded-full"></div>
                  <div className="w-12 h-2 bg-gray-500 rounded-full"></div>
                  <div className="w-14 h-2 bg-gray-500 rounded-full"></div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};