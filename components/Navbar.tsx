import React, { useState, useEffect } from 'react';
import { Icons } from './Icons';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav h-16' : 'bg-transparent h-24'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer group">
              <div className="w-10 h-10 bg-gradient-to-br from-guance-orange to-orange-600 rounded-lg flex items-center justify-center mr-3 shadow-[0_0_15px_rgba(255,106,0,0.3)] group-hover:shadow-[0_0_25px_rgba(255,106,0,0.6)] transition-all duration-300">
                <Icons.Activity className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight group-hover:text-guance-orange transition-colors">Guance</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              
              {/* Product Dropdown */}
              <div className="relative group cursor-pointer h-full flex items-center">
                <span className="text-gray-300 group-hover:text-white font-medium flex items-center transition-colors py-2 text-sm uppercase tracking-wide">
                  产品 <Icons.ChevronDown className="w-3 h-3 ml-1 group-hover:rotate-180 transition-transform duration-200 text-guance-orange" />
                </span>
                
                <div className="absolute top-full -left-4 w-[520px] bg-[#0B1121]/95 backdrop-blur-xl border border-white/10 shadow-2xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-4 group-hover:translate-y-0 p-6 grid grid-cols-2 gap-4">
                  {[
                    { icon: Icons.Server, title: "基础设施监控", desc: "主机、容器、K8s全栈监控", color: "blue" },
                    { icon: Icons.Activity, title: "应用性能监测", desc: "分布式链路追踪 APM", color: "orange" },
                    { icon: Icons.FileText, title: "日志管理", desc: "高性能日志检索与分析", color: "green" },
                    { icon: Icons.Globe, title: "用户体验监测", desc: "RUM 与前端性能监控", color: "purple" },
                    { icon: Icons.Zap, title: "CI/CD 可视化", desc: "持续集成流水线监控", color: "cyan" },
                    { icon: Icons.ShieldCheck, title: "安全巡检", desc: "云原生安全合规", color: "red" }
                  ].map((item, idx) => (
                    <a key={idx} href="#" className="flex items-start p-3 hover:bg-white/5 rounded-lg transition-all group/item border border-transparent hover:border-white/5">
                        <div className={`mt-1 mr-3 p-2 bg-${item.color}-500/10 text-${item.color}-400 rounded-lg group-hover/item:bg-${item.color}-500/20 group-hover/item:text-${item.color}-300 transition-colors`}>
                            <item.icon className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="font-bold text-gray-200 text-sm group-hover/item:text-white">{item.title}</div>
                            <div className="text-xs text-gray-500 mt-1">{item.desc}</div>
                        </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Solutions Dropdown */}
              <div className="relative group cursor-pointer h-full flex items-center">
                <span className="text-gray-300 group-hover:text-white font-medium flex items-center transition-colors py-2 text-sm uppercase tracking-wide">
                  解决方案 <Icons.ChevronDown className="w-3 h-3 ml-1 group-hover:rotate-180 transition-transform duration-200 text-guance-orange" />
                </span>
                
                <div className="absolute top-full -left-4 w-56 bg-[#0B1121]/95 backdrop-blur-xl border border-white/10 shadow-2xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-4 group-hover:translate-y-0 overflow-hidden py-2">
                   {[
                     "金融行业", "零售行业", "制造业", "游戏行业", "云原生方案"
                   ].map((item, idx) => (
                      <a key={idx} href="#" className="block px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors border-l-2 border-transparent hover:border-guance-orange">
                        {item}
                      </a>
                   ))}
                </div>
              </div>

              {['价格', '文档', '博客', '社区'].map((item) => (
                <a key={item} href="#" className="text-gray-300 hover:text-white font-medium text-sm uppercase tracking-wide transition-colors relative group">
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-guance-orange transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/* Buttons */}
            <div className="hidden md:flex items-center space-x-4">
               {isLoggedIn ? (
                 <div className="flex items-center space-x-4">
                     <span className="text-gray-300 font-medium">Administrator</span>
                     <button 
                       onClick={handleLogout}
                       className="text-gray-500 hover:text-red-400 font-medium transition-colors"
                     >
                       <Icons.X className="w-4 h-4" />
                     </button>
                 </div>
               ) : (
                 <button 
                   onClick={() => setShowLogin(true)}
                   className="text-gray-300 font-medium hover:text-white transition-colors"
                 >
                   登录
                 </button>
               )}
               <a href="https://auth.guance.com/middle_page" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-guance-orange border border-white/20 hover:border-guance-orange text-white px-5 py-2 rounded-lg font-medium transition-all shadow-lg hover:shadow-[0_0_20px_rgba(255,106,0,0.4)] backdrop-blur-sm">
                 免费试用
               </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-white focus:outline-none p-2"
              >
                {isOpen ? <Icons.X className="w-7 h-7" /> : <Icons.Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 top-16 bg-[#050A14] z-40 overflow-y-auto pb-20 animate-fade-in">
            <div className="px-4 py-6 space-y-1">
              
              {/* Mobile Product Accordion */}
              <div className="border-b border-gray-800">
                <button 
                  onClick={() => setMobileProductOpen(!mobileProductOpen)}
                  className="w-full flex justify-between items-center py-4 text-lg font-medium text-gray-200"
                >
                  产品
                  <Icons.ChevronDown className={`w-5 h-5 transition-transform duration-200 ${mobileProductOpen ? 'rotate-180 text-guance-orange' : 'text-gray-500'}`} />
                </button>
                {mobileProductOpen && (
                   <div className="pl-4 pb-4 space-y-3 bg-white/5 rounded-lg mb-4">
                       {['基础设施监控', '应用性能监测', '日志管理', '用户体验监测'].map((item) => (
                           <a key={item} href="#" className="block py-2 text-gray-400 hover:text-guance-orange flex items-center">
                             <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-3"></span>{item}
                           </a>
                       ))}
                   </div>
                )}
              </div>

              <a href="#" className="block py-4 text-lg font-medium text-gray-200 border-b border-gray-800">解决方案</a>
              <a href="#" className="block py-4 text-lg font-medium text-gray-200 border-b border-gray-800">价格</a>
              <a href="#" className="block py-4 text-lg font-medium text-gray-200 border-b border-gray-800">文档</a>

              <div className="pt-8 flex flex-col space-y-4">
                <a href="https://auth.guance.com/middle_page" target="_blank" rel="noopener noreferrer" className="w-full text-center py-4 bg-guance-orange text-white rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(255,106,0,0.3)]">
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
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={() => setShowLogin(false)}></div>
          <div className="bg-[#0B1121] border border-white/10 rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden animate-fade-in-up">
            <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">登录观测云</h3>
              <button onClick={() => setShowLogin(false)} className="text-gray-500 hover:text-white transition-colors">
                <Icons.X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleLogin} className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">账号</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-black/20 border border-white/10 text-white focus:border-guance-orange focus:ring-1 focus:ring-guance-orange outline-none transition-all"
                  placeholder="请输入您的账号"
                  required
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-400">密码</label>
                  <a href="#" className="text-sm text-guance-orange hover:text-orange-400">忘记密码？</a>
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-black/20 border border-white/10 text-white focus:border-guance-orange focus:ring-1 focus:ring-guance-orange outline-none transition-all"
                  placeholder="请输入密码"
                  required
                />
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  className="w-full bg-guance-orange text-white font-bold py-3.5 rounded-lg hover:bg-orange-600 transition-all shadow-[0_0_15px_rgba(255,106,0,0.4)]"
                >
                  立即登录
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};