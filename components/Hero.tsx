import React, { useState, useEffect } from 'react';
import { Icons } from './Icons';
import { DashboardPreview } from './DashboardPreview';

const slides = [
  {
    tag: "NEW",
    tagText: "观测云 AI Copilot 2.0 现已发布",
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
    }, 5000); // Rotate every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] bg-blue-50 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-1/2 -left-1/4 w-[800px] h-[800px] bg-orange-50 rounded-full blur-3xl opacity-50"></div>
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
                <div className="inline-flex items-center bg-white border border-gray-200 rounded-full px-4 py-1.5 mb-8 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <span className="bg-guance-orange text-white text-xs font-bold px-2 py-0.5 rounded-md mr-2">{slide.tag}</span>
                  <span className="text-sm text-gray-600 font-medium">{slide.tagText} <Icons.ArrowRight className="inline w-3 h-3 ml-1"/></span>
                </div>

                {/* Headline */}
                <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
                  {slide.title} <span className="gradient-text">{slide.highlight}</span> <br className="hidden md:block"/> {slide.titleSuffix}
                </h1>
                
                {/* Subhead */}
                <p className="max-w-2xl mx-auto text-xl text-gray-500 mb-10 leading-relaxed">
                  {slide.desc}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16">
                  <a href="https://auth.guance.com/middle_page" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 bg-guance-orange text-white text-lg font-bold rounded-lg hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center">
                    开始免费试用 <Icons.ArrowRight className="ml-2 w-5 h-5"/>
                  </a>
                  <button className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 text-lg font-bold rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all flex items-center justify-center">
                    <Icons.Activity className="mr-2 w-5 h-5 text-gray-500"/> 在线 Demo
                  </button>
                </div>
               </div>
            ))}
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center space-x-2 mb-12">
            {slides.map((_, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-8 bg-guance-orange' : 'bg-gray-300 hover:bg-gray-400'}`}
                    aria-label={`Go to slide ${index + 1}`}
                />
            ))}
        </div>

        {/* Dashboard Simulation */}
        <div className="relative mt-8">
             <DashboardPreview />
             {/* Floating badges */}
             <div className="absolute -left-4 top-1/4 bg-white p-3 rounded-lg shadow-xl border border-gray-100 hidden lg:flex items-center animate-bounce duration-[3000ms]">
                <div className="bg-green-100 p-2 rounded-md mr-3">
                   <Icons.CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-left">
                   <div className="text-xs text-gray-500 font-medium">状态</div>
                   <div className="text-sm font-bold text-gray-800">所有系统运行正常</div>
                </div>
             </div>
             <div className="absolute -right-8 bottom-1/4 bg-white p-3 rounded-lg shadow-xl border border-gray-100 hidden lg:flex items-center animate-bounce duration-[4000ms]">
                <div className="bg-blue-100 p-2 rounded-md mr-3">
                   <Icons.Zap className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-left">
                   <div className="text-xs text-gray-500 font-medium">吞吐量</div>
                   <div className="text-sm font-bold text-gray-800">45,200 req/sec</div>
                </div>
             </div>
        </div>

        {/* Logos */}
        <div className="mt-20 opacity-60">
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6">2000+ 企业信赖的选择</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center grayscale">
                <div className="text-xl font-bold text-gray-400 flex items-center"><Icons.Cloud className="mr-2"/> TechCorp</div>
                <div className="text-xl font-bold text-gray-400 flex items-center"><Icons.Database className="mr-2"/> DataFlow</div>
                <div className="text-xl font-bold text-gray-400 flex items-center"><Icons.Server className="mr-2"/> NetScale</div>
                <div className="text-xl font-bold text-gray-400 flex items-center"><Icons.ShieldCheck className="mr-2"/> SecureX</div>
                <div className="text-xl font-bold text-gray-400 flex items-center"><Icons.Cpu className="mr-2"/> AI_Labs</div>
            </div>
        </div>

      </div>
    </section>
  );
};