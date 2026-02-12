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
    <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden w-full max-w-5xl mx-auto transform transition-all hover:scale-[1.01] duration-500">
      {/* Fake Browser Header */}
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center space-x-2">
        <div className="flex space-x-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        <div className="flex-1 text-center">
          <div className="bg-white border border-gray-200 rounded-md py-1 px-4 text-xs text-gray-500 inline-flex items-center">
            <Icons.ShieldCheck className="w-3 h-3 mr-1 text-green-500" />
            console.guance.com/dashboard/overview
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50">
        
        {/* KPI Cards */}
        <div className="md:col-span-3 grid grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 transition-shadow hover:shadow-md cursor-pointer">
            <div className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">总请求数</div>
            <div className="text-2xl font-bold text-gray-800">2.4M</div>
            <div className="text-green-500 text-xs flex items-center mt-1"><Icons.Activity className="w-3 h-3 mr-1" /> +12%</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 transition-shadow hover:shadow-md cursor-pointer">
            <div className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">平均延迟</div>
            <div className="text-2xl font-bold text-gray-800">45ms</div>
            <div className="text-blue-500 text-xs flex items-center mt-1"><Icons.Activity className="w-3 h-3 mr-1" /> -5%</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 transition-shadow hover:shadow-md cursor-pointer">
            <div className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">错误率</div>
            <div className="text-2xl font-bold text-gray-800">0.02%</div>
            <div className="text-green-500 text-xs flex items-center mt-1">稳定</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 transition-shadow hover:shadow-md cursor-pointer">
            <div className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">活跃节点</div>
            <div className="text-2xl font-bold text-gray-800">142</div>
            <div className="text-orange-500 text-xs flex items-center mt-1">扩容中</div>
          </div>
        </div>

        {/* Main Chart */}
        <div className="md:col-span-2 bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold text-gray-700">应用性能趋势</h3>
            <div className="flex space-x-2">
              <span className="w-2 h-2 rounded-full bg-guance-orange"></span>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6A00" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#FF6A00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="time" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#9CA3AF', fontSize: 10}}
                  interval="preserveStartEnd"
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', fontSize: '12px' }}
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
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">资源使用率</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.slice(10)}>
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', fontSize: '12px' }}
                />
                <Bar dataKey="value2" fill="#3B82F6" radius={[4, 4, 0, 0]} animationDuration={1000} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};