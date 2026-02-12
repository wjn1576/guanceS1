import React from 'react';
import { Icons } from './Icons';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#020408] border-t border-white/5 pt-16 pb-8 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-2">
            <a href="https://www.guance.com/product/GuanceDB" target="_blank" rel="noopener noreferrer" className="inline-block group">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-guance-orange rounded-md flex items-center justify-center mr-2 group-hover:bg-orange-600 transition-colors shadow-lg shadow-orange-900/20">
                     <Icons.Activity className="text-white w-5 h-5" />
                  </div>
                  <span className="text-xl font-bold text-white group-hover:text-guance-orange transition-colors">Guance 观测云</span>
                </div>
                <p className="text-gray-500 text-sm mb-6 max-w-xs group-hover:text-gray-400 transition-colors">
                  观测云是新一代统一可观测性平台，帮助您监控、排障并优化您的整个技术栈。
                </p>
            </a>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 cursor-pointer text-gray-500 hover:text-white transition-colors">
                <Icons.Globe className="w-4 h-4" />
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">产品</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-guance-orange transition-colors">基础设施监控</a></li>
              <li><a href="#" className="hover:text-guance-orange transition-colors">应用性能监测</a></li>
              <li><a href="#" className="hover:text-guance-orange transition-colors">日志管理</a></li>
              <li><a href="#" className="hover:text-guance-orange transition-colors">用户体验监测</a></li>
              <li><a href="#" className="hover:text-guance-orange transition-colors">CI/CD 可视化</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">资源</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-guance-orange transition-colors">文档中心</a></li>
              <li><a href="#" className="hover:text-guance-orange transition-colors">博客</a></li>
              <li><a href="#" className="hover:text-guance-orange transition-colors">开发者社区</a></li>
              <li><a href="#" className="hover:text-guance-orange transition-colors">客户案例</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">关于我们</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-guance-orange transition-colors">公司介绍</a></li>
              <li><a href="#" className="hover:text-guance-orange transition-colors">加入我们</a></li>
              <li><a href="#" className="hover:text-guance-orange transition-colors">合作伙伴</a></li>
              <li><a href="#" className="hover:text-guance-orange transition-colors">联系我们</a></li>
            </ul>
            <div className="mt-6">
               <div className="bg-white p-1 inline-block rounded-md border border-white/10">
                  <img 
                    src="https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEQ4q9pjXaOYwHvrznwkHJ2nI2WPX7sKAACXBwAAoLCaFQwQV-BgutVtDoE.jpg" 
                    alt="关注官方微信" 
                    className="w-24 h-24 object-cover"
                  />
               </div>
               <p className="text-xs text-gray-600 mt-2">关注官方微信</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <div className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Guance Cloud Inc. 保留所有权利。
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">条款</a>
            <a href="#" className="hover:text-white transition-colors">隐私</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};