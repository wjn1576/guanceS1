import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { ProductShowcase } from './components/ProductShowcase';
import { GlobalNodes } from './components/GlobalNodes';
import { AiSection } from './components/AiSection';
import { Footer } from './components/Footer';
import { AiChatWidget } from './components/AiChatWidget';

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-100 bg-[#050A14] selection:bg-guance-orange selection:text-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <ProductShowcase />
        <GlobalNodes />
        <Features />
        <AiSection />
        
        {/* CTA Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-guance-dark">
             <div className="absolute inset-0 bg-grid-slate-900 opacity-20 animate-grid-move"></div>
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-gradient-to-t from-guance-orange/10 to-transparent blur-3xl"></div>
          </div>

          <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">准备好开启<span className="text-guance-orange">全栈观测</span>之旅了吗？</h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">加入成千上万信赖观测云的工程团队，即刻体验数据驱动的极致性能。</p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a href="https://auth.guance.com/middle_page" target="_blank" rel="noopener noreferrer" className="group relative px-8 py-4 bg-guance-orange text-white text-lg font-bold rounded-lg overflow-hidden transition-all shadow-[0_0_20px_rgba(255,106,0,0.3)] hover:shadow-[0_0_40px_rgba(255,106,0,0.5)]">
                <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-out -skew-x-12 -translate-x-full"></div>
                <span className="relative">免费开始使用</span>
              </a>
              <button className="px-8 py-4 bg-transparent text-white text-lg font-bold rounded-lg border border-white/20 hover:bg-white/5 hover:border-white/40 transition-all backdrop-blur-sm">
                联系销售顾问
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AiChatWidget />
    </div>
  );
}

export default App;