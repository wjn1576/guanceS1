import React, { useState, useEffect } from 'react';
import { Icons } from './Icons';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Login Modal State
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Mobile Menu State
  const [mobileProductOpen, setMobileProductOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isOpen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'root' && password === '123456') {
      setIsLoggedIn(true);
      setShowLogin(false);
      alert('登录成功！欢迎回来。');
    } else {
      alert('用户名或密码错误。');
    }
  };

  const handleLogout = () => {
      setIsLoggedIn(false);
      setUsername('');
      setPassword('');
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer">
              <div className="w-10 h-10 bg-guance-orange rounded-lg flex items-center justify-center mr-2">
                <Icons.Activity className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-gray-900 tracking-tight">Guance 观测云</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              
              {/* Product Dropdown */}
              <div className="relative group cursor-pointer h-20 flex items-center">
                <span className="text-gray-600 group-hover:text-guance-orange font-medium flex items-center transition-colors py-2">
                  产品 <Icons.ChevronDown className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform duration-200" />
                </span>
                
                <div className="absolute top-full -left-4 w-[480px] bg-white shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 border border-gray-100 p-6 grid grid-cols-2 gap-4">
                  <a href="#" className="flex items-start p-2 hover:bg-orange-50 rounded-lg transition-colors group/item">
                      <div className="mt-1 mr-3 p-1.5 bg-blue-100 text-blue-600 rounded-md group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                          <Icons.Server className="w-5 h-5" />
                      </div>
                      <div>
                          <div className="font-bold text-gray-800 text-sm">基础设施监控</div>
                          <div className="text-xs text-gray-500 mt-1">全面监控主机、容器与 K8s</div>
                      </div>
                  </a>
                  <a href="#" className="flex items-start p-2 hover:bg-orange-50 rounded-lg transition-colors group/item">
                      <div className="mt-1 mr-3 p-1.5 bg-orange-100 text-orange-600 rounded-md group-hover/item:bg-orange-600 group-hover/item:text-white transition-colors">
                          <Icons.Activity className="w-5 h-5" />
                      </div>
                      <div>
                          <div className="font-bold text-gray-800 text-sm">应用性能监测</div>
                          <div className="text-xs text-gray-500 mt-1">分布式链路追踪 APM</div>
                      </div>
                  </a>
                  <a href="#" className="flex items-start p-2 hover:bg-orange-50 rounded-lg transition-colors group/item">
                      <div className="mt-1 mr-3 p-1.5 bg-green-100 text-green-600 rounded-md group-hover/item:bg-green-600 group-hover/item:text-white transition-colors">
                          <Icons.FileText className="w-5 h-5" />
                      </div>
                      <div>
                          <div className="font-bold text-gray-800 text-sm">日志管理</div>
                          <div className="text-xs text-gray-500 mt-1">高性能日志检索与分析</div>
                      </div>
                  </a>
                  <a href="#" className="flex items-start p-2 hover:bg-orange-50 rounded-lg transition-colors group/item">
                      <div className="mt-1 mr-3 p-1.5 bg-purple-100 text-purple-600 rounded-md group-hover/item:bg-purple-600 group-hover/item:text-white transition-colors">
                          <Icons.Globe className="w-5 h-5" />
                      </div>
                      <div>
                          <div className="font-bold text-gray-800 text-sm">用户体验监测</div>
                          <div className="text-xs text-gray-500 mt-1">RUM 与前端性能监控</div>
                      </div>
                  </a>
                  <a href="#" className="flex items-start p-2 hover:bg-orange-50 rounded-lg transition-colors group/item">
                      <div className="mt-1 mr-3 p-1.5 bg-indigo-100 text-indigo-600 rounded-md group-hover/item:bg-indigo-600 group-hover/item:text-white transition-colors">
                          <Icons.Zap className="w-5 h-5" />
                      </div>
                      <div>
                          <div className="font-bold text-gray-800 text-sm">CI/CD 可视化</div>
                          <div className="text-xs text-gray-500 mt-1">持续集成流水线监控</div>
                      </div>
                  </a>
                  <a href="#" className="flex items-start p-2 hover:bg-orange-50 rounded-lg transition-colors group/item">
                      <div className="mt-1 mr-3 p-1.5 bg-gray-100 text-gray-600 rounded-md group-hover/item:bg-gray-600 group-hover/item:text-white transition-colors">
                          <Icons.ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                          <div className="font-bold text-gray-800 text-sm">安全巡检</div>
                          <div className="text-xs text-gray-500 mt-1">云原生安全合规</div>
                      </div>
                  </a>
                </div>
              </div>

              {/* Solutions Dropdown */}
              <div className="relative group cursor-pointer h-20 flex items-center">
                <span className="text-gray-600 group-hover:text-guance-orange font-medium flex items-center transition-colors py-2">
                  解决方案 <Icons.ChevronDown className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform duration-200" />
                </span>
                
                <div className="absolute top-full -left-4 w-56 bg-white shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 border border-gray-100 overflow-hidden py-2">
                   {[
                     "金融行业", "零售行业", "制造业", "游戏行业", "云原生方案"
                   ].map((item, idx) => (
                      <a key={idx} href="#" className="block px-4 py-2.5 text-sm text-gray-700 hover:text-guance-orange hover:bg-orange-50 transition-colors">
                        {item}
                      </a>
                   ))}
                </div>
              </div>

              <a href="#" className="text-gray-600 hover:text-guance-orange font-medium">价格</a>
              <a href="#" className="text-gray-600 hover:text-guance-orange font-medium">文档</a>
              <a href="#" className="text-gray-600 hover:text-guance-orange font-medium">博客</a>
              <a href="#" className="text-gray-600 hover:text-guance-orange font-medium">社区</a>
            </div>

            {/* Buttons */}
            <div className="hidden md:flex items-center space-x-4">
               {isLoggedIn ? (
                 <div className="flex items-center space-x-4">
                     <span className="text-gray-700 font-medium">欢迎, Administrator</span>
                     <button 
                       onClick={handleLogout}
                       className="text-gray-500 hover:text-red-500 font-medium transition-colors"
                     >
                       退出
                     </button>
                 </div>
               ) : (
                 <button 
                   onClick={() => setShowLogin(true)}
                   className="text-gray-600 font-medium hover:text-gray-900"
                 >
                   登录
                 </button>
               )}
               <a href="https://auth.guance.com/middle_page" target="_blank" rel="noopener noreferrer" className="bg-guance-orange text-white px-5 py-2.5 rounded-md font-medium hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30">
                 免费开始
               </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 hover:text-gray-900 focus:outline-none p-2"
              >
                {isOpen ? <Icons.X className="w-7 h-7" /> : <Icons.Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 top-20 bg-white z-40 overflow-y-auto pb-20 animate-fade-in">
            <div className="px-4 py-6 space-y-1">
              
              {/* Mobile Product Accordion */}
              <div className="border-b border-gray-100">
                <button 
                  onClick={() => setMobileProductOpen(!mobileProductOpen)}
                  className="w-full flex justify-between items-center py-4 text-lg font-medium text-gray-800 active:bg-gray-50"
                >
                  产品
                  <Icons.ChevronDown className={`w-5 h-5 transition-transform duration-200 ${mobileProductOpen ? 'rotate-180 text-guance-orange' : 'text-gray-400'}`} />
                </button>
                {mobileProductOpen && (
                   <div className="pl-4 pb-4 space-y-3 bg-gray-50/50 rounded-lg mb-4">
                       <a href="#" className="block py-2 text-gray-600 hover:text-guance-orange flex items-center">
                         <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-3"></span>基础设施监控
                       </a>
                       <a href="#" className="block py-2 text-gray-600 hover:text-guance-orange flex items-center">
                         <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-3"></span>应用性能监测
                       </a>
                       <a href="#" className="block py-2 text-gray-600 hover:text-guance-orange flex items-center">
                         <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-3"></span>日志管理
                       </a>
                       <a href="#" className="block py-2 text-gray-600 hover:text-guance-orange flex items-center">
                         <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-3"></span>用户体验监测
                       </a>
                       <a href="#" className="block py-2 text-gray-600 hover:text-guance-orange flex items-center">
                         <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-3"></span>CI/CD 可视化
                       </a>
                   </div>
                )}
              </div>

              {/* Mobile Solutions Accordion */}
              <div className="border-b border-gray-100">
                <button 
                  onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                  className="w-full flex justify-between items-center py-4 text-lg font-medium text-gray-800 active:bg-gray-50"
                >
                  解决方案
                  <Icons.ChevronDown className={`w-5 h-5 transition-transform duration-200 ${mobileSolutionsOpen ? 'rotate-180 text-guance-orange' : 'text-gray-400'}`} />
                </button>
                 {mobileSolutionsOpen && (
                   <div className="pl-4 pb-4 space-y-3 bg-gray-50/50 rounded-lg mb-4">
                       {["金融行业", "零售行业", "制造业", "游戏行业", "云原生方案"].map(item => (
                           <a key={item} href="#" className="block py-2 text-gray-600 hover:text-guance-orange flex items-center">
                              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-3"></span>{item}
                           </a>
                       ))}
                   </div>
                )}
              </div>
              
              <a href="#" className="block py-4 text-lg font-medium text-gray-800 border-b border-gray-100 active:bg-gray-50">价格</a>
              <a href="#" className="block py-4 text-lg font-medium text-gray-800 border-b border-gray-100 active:bg-gray-50">文档</a>
              <a href="#" className="block py-4 text-lg font-medium text-gray-800 border-b border-gray-100 active:bg-gray-50">社区</a>

              <div className="pt-8 flex flex-col space-y-4">
                {!isLoggedIn ? (
                  <button 
                    onClick={() => {
                        setIsOpen(false);
                        setShowLogin(true);
                    }}
                    className="w-full text-center py-4 border border-gray-300 rounded-xl text-gray-800 font-bold text-lg active:bg-gray-50"
                  >
                    登录
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                    }}
                    className="w-full text-center py-4 border border-red-200 text-red-600 rounded-xl font-bold text-lg active:bg-red-50"
                  >
                    退出登录
                  </button>
                )}
                <a href="https://auth.guance.com/middle_page" target="_blank" rel="noopener noreferrer" className="w-full text-center py-4 bg-guance-orange text-white rounded-xl font-bold text-lg shadow-lg shadow-orange-500/30 active:bg-orange-600">
                  免费开始
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setShowLogin(false)}></div>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden animate-fade-in-up">
            <div className="bg-gray-50 px-8 py-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">登录观测云</h3>
              <button onClick={() => setShowLogin(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <Icons.X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleLogin} className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  账号
                </label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-guance-orange focus:border-transparent outline-none transition-all"
                  placeholder="请输入您的账号"
                  required
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    密码
                  </label>
                  <a href="#" className="text-sm text-guance-orange hover:underline">忘记密码？</a>
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-guance-orange focus:border-transparent outline-none transition-all"
                  placeholder="请输入密码"
                  required
                />
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  className="w-full bg-guance-orange text-white font-bold py-3.5 rounded-lg hover:bg-orange-600 transition-all shadow-md hover:shadow-lg transform active:scale-[0.98]"
                >
                  立即登录
                </button>
              </div>
              
              <div className="text-center text-sm text-gray-500 mt-4">
                还没有账号？ <a href="#" className="text-guance-orange font-medium hover:underline">免费注册</a>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};