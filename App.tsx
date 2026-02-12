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
    <div className="min-h-screen flex flex-col font-sans text-gray-900">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <ProductShowcase />
        <GlobalNodes />
        <Features />
        <AiSection />
        
        {/* CTA Section */}
        <section className="bg-gray-50 py-20 border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">准备好开启观测之旅了吗？</h2>
            <p className="text-xl text-gray-500 mb-10">加入成千上万信赖观测云的工程团队，即刻提升系统可观测性。</p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="https://auth.guance.com/middle_page" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-guance-orange text-white text-lg font-bold rounded-lg hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/30">
                免费开始
              </a>
              <button className="px-8 py-4 bg-white text-gray-700 text-lg font-bold rounded-lg border border-gray-200 hover:bg-gray-100 transition-all">
                联系销售
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