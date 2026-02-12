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
          points: ["主机与进程监控", "Kubernetes & Docker 支持", "云厂商集成 (阿里云, AWS, Huawei)", "网络性能监控"],
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
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">一个平台， <br/><span className="text-guance-orange">无限可能</span></h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">打破团队间的数据孤岛。观测云将开发、运维和安全团队紧密联系在一起。</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Tabs */}
          <div className="lg:w-1/3 space-y-4">
            {[
              { id: TabType.INFRA, icon: Icons.Server, label: "基础设施" },
              { id: TabType.APM, icon: Icons.Activity, label: "应用性能监测" },
              { id: TabType.LOGS, icon: Icons.FileText, label: "日志" },
              { id: TabType.RUM, icon: Icons.Globe, label: "用户体验" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center p-4 rounded-xl transition-all duration-300 border-2 text-left ${
                  activeTab === tab.id 
                    ? 'border-guance-orange bg-orange-50 shadow-md scale-105' 
                    : 'border-transparent hover:bg-gray-50'
                }`}
              >
                <div className={`p-3 rounded-lg mr-4 ${activeTab === tab.id ? 'bg-guance-orange text-white' : 'bg-gray-200 text-gray-500'}`}>
                  <tab.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${activeTab === tab.id ? 'text-gray-900' : 'text-gray-600'}`}>{tab.label}</h3>
                  <p className="text-sm text-gray-500 hidden sm:block">实时洞察</p>
                </div>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="lg:w-2/3 bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-200 relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-64 h-64 bg-${content.color}-500 opacity-5 rounded-full blur-3xl -mr-32 -mt-32`}></div>
            
            <div className="relative z-10 h-full flex flex-col justify-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">{content.title}</h3>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {content.desc}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.points.map((point, i) => (
                  <div key={i} className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-guance-orange mr-3"></div>
                    <span className="font-medium text-gray-700">{point}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <a href="#" className="text-guance-orange font-bold text-lg inline-flex items-center hover:underline">
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