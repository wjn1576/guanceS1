import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Icons } from './Icons';

const generateData = () => {
  const data = [];
  for (let i = 0; i < 20; i++) {
    data.push({
      time: `${i}:00`,
      value: Math.floor(Math.random() * 60) + 20,
      value2: Math.floor(Math.random() * 40) + 10,
    });
  }
  return data;
};

export const DashboardPreview: React.FC = () => {
  const [data, setData] = useState(generateData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1)];
        newData.push({
          time: 'Now',
          value: Math.floor(Math.random() * 60) + 20,
          value2: Math.floor(Math.random() * 40) + 10,
        });
        return newData;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0B1121] rounded-xl shadow-2xl border border-white/10 overflow-hidden w-full max-w-5xl mx-auto transform transition-all hover:scale-[1.005] duration-500">
      {/* Fake Browser Header */}
      <div className="bg-[#0F172A] border-b border-white/5 px-4 py-3 flex items-center space-x-2">
        <div className="flex space-x-1.5 opacity-50">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1 text-center">
          <div className="bg-black/30 border border-white/5 rounded-md py-1 px-4 text-xs text-gray-400 inline-flex items-center font-mono">
            <Icons.ShieldCheck className="w-3 h-3 mr-2 text-green-500" />
            console.guance.com/dashboard/overview
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#050A14]">
        
        {/* KPI Cards */}
        <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: '总请求数', val: '2.4M', change: '+12%', color: 'text-green-400', icon: Icons.Activity },
            { label: '平均延迟', val: '45ms', change: '-5%', color: 'text-blue-400', icon: Icons.Zap },
            { label: '错误率', val: '0.02%', change: '稳定', color: 'text-green-400', icon: Icons.CheckCircle },
            { label: '活跃节点', val: '142', change: '扩容中', color: 'text-orange-400', icon: Icons.Server },
          ].map((kpi, i) => (
            <div key={i} className="bg-[#0B1121] p-4 rounded-lg shadow-sm border border-white/5 hover:border-white/20 transition-all cursor-pointer group">
              <div className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1 group-hover:text-gray-300">{kpi.label}</div>
              <div className="text-2xl font-bold text-white font-mono">{kpi.val}</div>
              <div className={`${kpi.color} text-xs flex items-center mt-1`}>
                  <kpi.icon className="w-3 h-3 mr-1" /> {kpi.change}
              </div>
            </div>
          ))}
        </div>

        {/* Main Chart */}
        <div className="md:col-span-2 bg-[#0B1121] p-5 rounded-lg border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-guance-orange to-transparent"></div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold text-gray-300">应用性能趋势</h3>
            <div className="flex space-x-2">
              <span className="w-2 h-2 rounded-full bg-guance-orange shadow-[0_0_8px_#FF6A00]"></span>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6A00" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FF6A00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E293B" />
                <XAxis 
                  dataKey="time" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#475569', fontSize: 10}}
                  interval="preserveStartEnd"
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0B1121', borderColor: '#334155', color: '#fff', borderRadius: '4px', fontSize: '12px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#FF6A00" 
                  strokeWidth={2} 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                  animationDuration={1000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Side Chart */}
        <div className="bg-[#0B1121] p-5 rounded-lg border border-white/5 relative">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">资源使用率</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.slice(10)}>
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: '#0B1121', borderColor: '#334155', color: '#fff', borderRadius: '4px', fontSize: '12px' }}
                />
                <Bar dataKey="value2" fill="#3B82F6" radius={[2, 2, 0, 0]} animationDuration={1000} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};