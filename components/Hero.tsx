import React, { useState, useEffect } from 'react';
import { Icons } from './Icons';
import { DashboardPreview } from './DashboardPreview';

const slides = [
  {
    tag: "NEW",
    tagText: "AI Copilot 2.0 现已发布",
    title: "新一代",
    highlight: "统一可观测",
    titleSuffix: "平台",
    desc: "在一个平台上监控从基础设施到用户体验的一切。自动关联实时指标、链路追踪和日志，快速定位故障根因。"
  },
  {
    tag: "HOT",
    tagText: "全面支持国产信创环境",
    title: "无缝融合",
    highlight: "业务与运维",
    titleSuffix: "数据",
    desc: "打破部门墙。通过统一的数据视图，让开发、运维和业务团队使用同一种语言沟通，实时量化技术对业务的价值。"
  },
  {
    tag: "UPDATE",
    tagText: "智能告警 3.0 上线",
    title: "AI 驱动",
    highlight: "智能告警",
    titleSuffix: "降噪",
    desc: "告别告警风暴。基于机器学习算法自动发现异常，智能收敛告警信息，让您专注于真正重要的问题。"
  }
];

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#050A14]">
      {/* Dynamic Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
         {/* Moving Grid */}
         <div className="absolute inset-0 bg-grid-slate-900/[0.1] bg-[bottom] border-b border-slate-100/5 animate-grid-move" style={{ backgroundSize: '60px 60px' }}></div>
         
         {/* Glow Spots */}
         <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-guance-orange/10 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
         
         {/* Floating Particles (Simulated with CSS) */}
         <div className="absolute w-2 h-2 bg-white/20 rounded-full top-1/4 left-1/4 animate-ping"></div>
         <div className="absolute w-1 h-1 bg-white/30 rounded-full top-1/3 right-1/4 animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Content Carousel */}
        <div className="min-h-[300px] transition-all duration-500 ease-in-out">
            {slides.map((slide, index) => (
               <div 
                 key={index} 
                 className={`transition-all duration-700 absolute w-full left-0 top-0 ${index === currentSlide ? 'opacity-100 translate-y-0 relative' : 'opacity-0 translate-y-8 absolute pointer-events-none'}`}
                 style={{ display: index === currentSlide ? 'block' : 'none' }} 
               >
                 {/* Announcement Tag */}
                <div className="inline-flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8 backdrop-blur-md hover:border-guance-orange/50 transition-colors cursor-pointer group">
                  <span className="bg-guance-orange text-white text-xs font-bold px-2 py-0.5 rounded-md mr-2 shadow-[0_0_10px_rgba(255,106,0,0.5)]">{slide.tag}</span>
                  <span className="text-sm text-gray-300 font-medium group-hover:text-white transition-colors">{slide.tagText} <Icons.ArrowRight className="inline w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform"/></span>
                </div>

                {/* Headline */}
                <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight drop-shadow-2xl">
                  {slide.title} <span className="gradient-text">{slide.highlight}</span> <br className="hidden md:block"/> {slide.titleSuffix}
                </h1>
                
                {/* Subhead */}
                <p className="max-w-2xl mx-auto text-xl text-gray-400 mb-10 leading-relaxed">
                  {slide.desc}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-20">
                  <a href="https://auth.guance.com/middle_page" target="_blank" rel="noopener noreferrer" className="relative group w-full sm:w-auto px-8 py-4 bg-guance-orange text-white text-lg font-bold rounded-lg hover:bg-orange-600 transition-all shadow-[0_0_20px_rgba(255,106,0,0.4)] hover:shadow-[0_0_40px_rgba(255,106,0,0.6)] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    开始免费试用 <Icons.ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"/>
                  </a>
                  <button className="w-full sm:w-auto px-8 py-4 bg-white/5 text-gray-200 text-lg font-bold rounded-lg border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all flex items-center justify-center backdrop-blur-sm">
                    <Icons.Activity className="mr-2 w-5 h-5 text-guance-accent"/> 在线 Demo
                  </button>
                </div>
               </div>
            ))}
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center space-x-2 mb-16">
            {slides.map((_, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1 rounded-full transition-all duration-500 ${index === currentSlide ? 'w-12 bg-guance-orange shadow-[0_0_10px_#FF6A00]' : 'w-2 bg-gray-700 hover:bg-gray-500'}`}
                    aria-label={`Go to slide ${index + 1}`}
                />
            ))}
        </div>

        {/* Dashboard Simulation - Holographic Style */}
        <div className="relative mt-4 group">
             <div className="absolute -inset-1 bg-gradient-to-r from-guance-orange to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
             <div className="relative">
                <DashboardPreview />
             </div>
             
             {/* Floating badges */}
             <div className="absolute -left-8 top-1/4 bg-[#0B1121]/90 backdrop-blur-xl p-3 rounded-lg border border-green-500/30 hidden lg:flex items-center animate-bounce duration-[3000ms] shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                <div className="bg-green-500/20 p-2 rounded-md mr-3">
                   <Icons.CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div className="text-left">
                   <div className="text-xs text-gray-400 font-medium">系统状态</div>
                   <div className="text-sm font-bold text-white font-mono">SYSTEM ONLINE</div>
                </div>
             </div>
             <div className="absolute -right-12 bottom-1/4 bg-[#0B1121]/90 backdrop-blur-xl p-3 rounded-lg border border-blue-500/30 hidden lg:flex items-center animate-bounce duration-[4000ms] shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                <div className="bg-blue-500/20 p-2 rounded-md mr-3">
                   <Icons.Zap className="w-5 h-5 text-blue-500" />
                </div>
                <div className="text-left">
                   <div className="text-xs text-gray-400 font-medium">实时吞吐量</div>
                   <div className="text-sm font-bold text-white font-mono">45,200 req/s</div>
                </div>
             </div>
        </div>

        {/* Logos */}
        <div className="mt-24 opacity-40 hover:opacity-100 transition-opacity duration-500">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-8">Trusted by Tech Giants</p>
            <div className="flex flex-wrap justify-center gap-10 md:gap-20 items-center">
                {['TechCorp', 'DataFlow', 'NetScale', 'SecureX', 'AI_Labs'].map((name, i) => (
                    <div key={i} className="text-xl font-bold text-gray-400 hover:text-white transition-colors flex items-center">
                        <Icons.Cpu className="mr-2 w-5 h-5"/> {name}
                    </div>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
};