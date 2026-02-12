import React, { useState } from 'react';
import { Icons } from './Icons';
import { TabType } from '../types';

export const Features: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.INFRA);

  const renderContent = () => {
    switch(activeTab) {
      case TabType.INFRA:
        return {
          title: "基础设施监控",
          desc: "全栈可见性，覆盖您的主机、容器和 K8s 集群。支持自动发现资源，秒级监控。",
          points: ["主机与进程监控", "Kubernetes & Docker 支持", "云厂商集成 (阿里云, AWS)", "网络性能监控"],
          color: "blue"
        };
      case TabType.APM:
        return {
          title: "应用性能监测 (APM)",
          desc: "追踪微服务间的每一个请求。通过自动化的代码级分析，快速识别瓶颈并优化性能。",
          points: ["分布式链路追踪", "服务拓扑图", "代码级 Profiling", "数据库查询分析"],
          color: "orange"
        };
      case TabType.LOGS:
        return {
          title: "日志管理",
          desc: "集中式日志管理，提供极速的查询体验。自动将日志与链路追踪、指标关联。",
          points: ["实时日志流", "上下文感知搜索", "日志聚类与模式分析", "敏感数据脱敏"],
          color: "green"
        };
      case TabType.RUM:
        return {
          title: "用户体验监测 (RUM)",
          desc: "深入了解前端用户体验。追踪页面加载速度、JS 错误和用户行为路径。",
          points: ["会话回放 (Session Replay)", "Core Web Vitals", "前端错误追踪", "用户行为分析"],
          color: "purple"
        };
    }
  };

  const content = renderContent();

  return (
    <section className="py-24 bg-[#050A14] relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">一个平台， <br/><span className="gradient-text">无限可能</span></h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">打破团队间的数据孤岛。观测云将开发、运维和安全团队紧密联系在一起。</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Tabs */}
          <div className="lg:w-1/3 space-y-4">
            {[
              { id: TabType.INFRA, icon: Icons.Server, label: "基础设施", color: 'blue' },
              { id: TabType.APM, icon: Icons.Activity, label: "应用性能监测", color: 'orange' },
              { id: TabType.LOGS, icon: Icons.FileText, label: "日志", color: 'green' },
              { id: TabType.RUM, icon: Icons.Globe, label: "用户体验", color: 'purple' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group w-full flex items-center p-4 rounded-xl transition-all duration-300 border text-left relative overflow-hidden ${
                  activeTab === tab.id 
                    ? `border-${tab.color}-500/50 bg-${tab.color}-500/10 shadow-[0_0_15px_rgba(0,0,0,0.3)]` 
                    : 'border-white/5 hover:bg-white/5 hover:border-white/10'
                }`}
              >
                {activeTab === tab.id && <div className={`absolute left-0 top-0 bottom-0 w-1 bg-${tab.color}-500`}></div>}
                
                <div className={`p-3 rounded-lg mr-4 transition-colors ${
                  activeTab === tab.id ? `bg-${tab.color}-500 text-white` : 'bg-white/10 text-gray-400 group-hover:text-white'
                }`}>
                  <tab.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${activeTab === tab.id ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>{tab.label}</h3>
                  <p className="text-sm text-gray-500 hidden sm:block">实时洞察</p>
                </div>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="lg:w-2/3 tech-border rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-80 h-80 bg-${content.color}-600/20 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none`}></div>
            
            <div className="relative z-10 h-full flex flex-col justify-center">
              <h3 className="text-3xl font-bold text-white mb-6 flex items-center">
                 {content.title}
                 <span className={`ml-3 px-3 py-1 text-xs bg-${content.color}-500/20 text-${content.color}-300 rounded-full border border-${content.color}-500/30`}>Live</span>
              </h3>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {content.desc}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.points.map((point, i) => (
                  <div key={i} className="flex items-center bg-white/5 p-4 rounded-lg border border-white/5 hover:border-white/20 transition-colors">
                    <div className={`w-2 h-2 rounded-full bg-${content.color}-500 mr-3 shadow-[0_0_8px_currentColor]`}></div>
                    <span className="font-medium text-gray-200">{point}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <a href="#" className={`text-${content.color}-400 font-bold text-lg inline-flex items-center hover:text-${content.color}-300 hover:translate-x-1 transition-all`}>
                  探索 {content.title} <Icons.ArrowRight className="ml-2 w-5 h-5"/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};