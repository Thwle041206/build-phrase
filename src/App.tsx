import React, { useState } from 'react';
import { Role, DemandProfile } from './types';
import TutorMateLogo from './components/TutorMateLogo';
import RoleSelector from './components/RoleSelector';
import ParentView from './components/ParentView';
import TutorView from './components/TutorView';
import OperatorView from './components/OperatorView';
import { 
  Users, User, GraduationCap, ShieldAlert, BookOpen, Layers, Menu, X, CheckSquare, 
  ChevronRight, Compass, Settings, LogIn, ExternalLink
} from 'lucide-react';

export default function App() {
  const [currentRole, setCurrentRole] = useState<Role>('parent');
  const [activeSubPage, setActiveSubPage] = useState<string>('P-02'); // Default to beautiful Chat AI page
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Authentication States
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isRegisteredSuccess, setIsRegisteredSuccess] = useState(false);
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Global Demand Profile shared state representing parents' selections
  const [currentProfile, setCurrentProfile] = useState<DemandProfile>({
    subject: 'Toán học (Lớp 9)',
    grade: 'Lớp 9',
    location: 'Cầu Giấy, HN (Tại nhà)',
    goal: 'Ôn thi vào 10 công lập',
    frequency: '2-3 buổi/tuần',
    schedule: 'Buổi tối T3, T5, T7',
    budget: 'Đang đợi xác nhận...',
    progress: 75
  });

  const handleUpdateProfile = (newProfile: DemandProfile) => {
    setCurrentProfile(newProfile);
  };

  const handleRoleChange = (role: Role) => {
    setCurrentRole(role);
    // Select reasonable default subpage for each role
    if (role === 'parent') {
      setActiveSubPage('P-02'); // Back to Chat AI
    } else if (role === 'tutor') {
      setActiveSubPage('T-04 Hộp yêu cầu học thử');
    } else if (role === 'operator') {
      setActiveSubPage('O-01 Dashboard & hàng đợi');
    }
  };

  // Define sidebar menu configurations based on F-1 Sitemap for all 3 roles
  const parentMenuGroups = [
    {
      title: 'Tab Tìm gia sư',
      items: [
        { id: 'P-01', label: 'Trang chủ' },
        { id: 'P-02', label: 'Lịch sử đoạn chat' },
      ]
    },
    {
      title: 'Tab Đã lưu',
      items: [
        { id: 'Danh sách gia sư đã lưu', label: 'Quản lý gia sư đã lưu' }
      ]
    },
    {
      title: 'Tab Lịch học thử',
      items: [
        { id: 'P-11', label: 'P-11 Trạng thái lịch' },
        { id: 'P-12', label: 'P-12 Đánh giá & thay thế' },
      ]
    },
    {
      title: 'Tab Hỗ trợ',
      items: [
        { id: 'P-13', label: 'P-13 Nhân viên / an toàn' }
      ]
    }
  ];

  const tutorMenuGroups = [
    {
      title: 'Tab Yêu cầu',
      items: [
        { id: 'T-04 Hộp yêu cầu học thử', label: 'T-04 Hộp yêu cầu dạy thử' }
      ]
    },
    {
      title: 'Tab Hồ sơ & lịch',
      items: [
        { id: 'T-01 Tạo/sửa hồ sơ', label: 'T-01 Tạo/sửa hồ sơ' },
        { id: 'T-02 Tải giấy tờ', label: 'T-02 Tải giấy tờ' }
      ]
    },
    {
      title: 'Tab Xác minh',
      items: [
        { id: 'T-03 Trạng thái xác minh', label: 'T-03 Trạng thái xác minh' }
      ]
    },
    {
      title: 'Tab Phản hồi',
      items: [
        { id: 'T-05 Phản hồi sau học thử', label: 'T-05 Phản hồi sau học thử' }
      ]
    }
  ];

  const operatorMenuGroups = [
    {
      title: 'Menu Hàng đợi',
      items: [
        { id: 'O-01 Dashboard & hàng đợi', label: 'O-01 Dashboard & hàng đợi' }
      ]
    },
    {
      title: 'Menu Xác minh gia sư',
      items: [
        { id: 'O-02 Duyệt hồ sơ', label: 'O-02 Duyệt hồ sơ' }
      ]
    },
    {
      title: 'Menu Escalation',
      items: [
        { id: 'O-03 Chi tiết case', label: 'O-03 Chi tiết case' }
      ]
    },
    {
      title: 'Menu Trace Agent',
      items: [
        { id: 'O-04 Trace & lý do hiển thị', label: 'O-04 Trace & lý do hiển thị' }
      ]
    },
    {
      title: 'Menu Báo cáo',
      items: [
        { id: 'Báo cáo tuần (Should, ngoài wireframe)', label: 'Báo cáo tuần (Bổ sung)' }
      ]
    }
  ];

  const currentMenuGroups = 
    currentRole === 'parent' ? parentMenuGroups :
    currentRole === 'tutor' ? tutorMenuGroups :
    operatorMenuGroups;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans antialiased text-slate-900 selection:bg-blue-100">
      
      {/* 1. Header (Top Bar Contract: 3 Zones) */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Zone 1: Brand Wordmark Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-500 cursor-pointer lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            <TutorMateLogo />
          </div>

          {/* Zone 2: Navigation Links based on active sitemap context */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <a href="#about" className="hover:text-blue-700 transition-colors">Giới thiệu</a>
            <a href="#how-it-works" className="hover:text-blue-700 transition-colors">Cách hoạt động</a>
            <a href="#escrow-policy" className="hover:text-blue-700 transition-colors">Chính sách Escrow</a>
            <a href="#safety" className="hover:text-blue-700 transition-colors">Cam kết an toàn</a>
          </nav>

          {/* Zone 3: Actions / Sign In */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                setAuthMode('login');
                setIsRegisteredSuccess(false);
                setAuthModalOpen(true);
              }}
              className="hidden sm:flex items-center gap-1 px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer whitespace-nowrap"
            >
              Đăng nhập
            </button>
            <button 
              onClick={() => {
                setAuthMode('register');
                setIsRegisteredSuccess(false);
                setAuthModalOpen(true);
              }}
              className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer whitespace-nowrap shadow-sm shadow-blue-500/10"
            >
              Đăng ký
            </button>
          </div>

        </div>
      </header>

      {/* 2. Simulation Role Selector HUD Banner */}
      <RoleSelector currentRole={currentRole} onChangeRole={handleRoleChange} />

      {/* 3. Main Body Structure (Sidebar Sitemap + Desktop Canvas Workspace) */}
      <div className="max-w-7xl w-full mx-auto flex-1 flex">
        
        {/* Sidebar Nav: Full Map of F-1 Sitemap for Active Role */}
        <aside className={`w-64 border-r border-slate-200 bg-white shrink-0 hidden lg:block ${sidebarOpen ? '' : 'lg:hidden'}`}>
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400">
              CẤU TRÚC SITEMAP F-1
            </span>
            <div className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-700 font-bold">
              <Compass className="w-4 h-4 text-blue-600" />
              <span>{currentRole === 'parent' ? 'Phụ huynh · Mobile Web (Desktop hóa)' : currentRole === 'tutor' ? 'Gia sư · Mobile Web (Desktop hóa)' : 'Operator · Desktop'}</span>
            </div>
          </div>

          <div className="p-4 space-y-5 overflow-y-auto max-h-[calc(100vh-280px)]">
            {currentMenuGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-1.5">
                <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wide block">
                  {group.title}
                </span>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const isActive = activeSubPage === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveSubPage(item.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-[11px] font-semibold transition-all flex items-center justify-between group cursor-pointer ${
                          isActive 
                            ? 'bg-blue-50 text-[#1E40AF] border border-blue-100 shadow-2xs' 
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                        }`}
                      >
                        <span className="truncate">{item.label}</span>
                        <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${
                          isActive ? 'text-blue-600 translate-x-0.5' : 'text-slate-300 group-hover:text-slate-500'
                        }`} />
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Workspace Center Content */}
        <main className="flex-1 p-6 md:p-8 overflow-x-hidden">
          
          {/* Active Sitemap Location HUD (Unboxed clean meta design!) */}
          <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold mb-6">
            <span>Sitemap</span>
            <span aria-hidden="true">&middot;</span>
            <span className="capitalize">{currentRole === 'parent' ? 'Phụ huynh & Học sinh' : currentRole === 'tutor' ? 'Gia sư (Tutor)' : 'Điều phối viên (Operator)'}</span>
            <span aria-hidden="true">&middot;</span>
            <span className="text-slate-700 font-bold">{activeSubPage}</span>
          </div>

          {/* Active Dashboard Views */}
          {currentRole === 'parent' && (
            <ParentView 
              activeSubPage={activeSubPage} 
              onNavigateSubPage={(pageId) => setActiveSubPage(pageId)} 
              currentProfile={currentProfile}
              updateGlobalProfile={handleUpdateProfile}
            />
          )}

          {currentRole === 'tutor' && (
            <TutorView 
              activeSubPage={activeSubPage} 
              onNavigateSubPage={(pageId) => setActiveSubPage(pageId)} 
            />
          )}

          {currentRole === 'operator' && (
            <OperatorView 
              activeSubPage={activeSubPage} 
              onNavigateSubPage={(pageId) => setActiveSubPage(pageId)} 
            />
          )}

        </main>

      </div>

      {/* 4. Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 px-6 py-6 mt-auto text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-medium text-slate-500 text-center md:text-left">
            &copy; {new Date().getFullYear()} tutor<strong>mate</strong> EdTech Vietnam. Bảo lưu mọi quyền.
          </p>
          <div className="flex flex-wrap justify-center gap-6 font-semibold text-slate-400">
            <a href="#terms" className="hover:text-white transition-colors">Điều khoản sử dụng</a>
            <a href="#privacy" className="hover:text-white transition-colors">Chính sách bảo mật</a>
            <a href="#support" className="hover:text-white transition-colors">Trung tâm hỗ trợ</a>
          </div>
        </div>
      </footer>

      {/* 5. Custom Auth Modal (Login / Register / Success with Facebook & Zalo Communities) */}
      {authModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-250">
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-800 text-sm">
                  {isRegisteredSuccess 
                    ? "🎉 Đăng Ký Thành Công!" 
                    : authMode === 'login' 
                      ? "🔒 Đăng Nhập Tài Khoản" 
                      : "📝 Tạo Tài Khoản Mới"
                  }
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  {isRegisteredSuccess 
                    ? "Chào mừng bạn đến với cộng đồng TutorMate EdTech" 
                    : "Kết nối gia sư chất lượng cao bằng công nghệ AI"
                  }
                </p>
              </div>
              <button 
                type="button"
                onClick={() => setAuthModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-200 text-slate-400 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5">
              {isRegisteredSuccess ? (
                // Success popup content
                <div className="space-y-5 text-center">
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm border border-emerald-100 animate-bounce">
                    <CheckSquare className="w-7 h-7" />
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-800 text-sm">Đăng ký tài khoản TutorMate thành công!</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed px-2">
                      Chào mừng phụ huynh <strong>{regName || 'Thành viên'}</strong>. Tài khoản của bạn đã sẵn sàng để trải nghiệm toàn bộ các tính năng tìm kiếm, đề xuất & so sánh gia sư hàng đầu bằng AI.
                    </p>
                  </div>

                  {/* Join Community Section right underneath success message */}
                  <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 text-left space-y-3.5">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wide text-blue-600 block">
                        👥 Tham gia cộng đồng
                      </span>
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                        Tham gia nhóm học tập chính thức của TutorMate để trao đổi kinh nghiệm, tải tài liệu miễn phí và nhận tư vấn trực tiếp từ ban cố vấn:
                      </p>
                    </div>

                    {/* Community Social Icons with Facebook / Zalo branding */}
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      {/* Facebook join button */}
                      <a 
                        href="https://facebook.com" 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-[#166FE5] text-white py-2 px-3 rounded-lg text-[10px] font-black transition-all cursor-pointer shadow-xs"
                      >
                        <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        Nhóm Facebook
                      </a>

                      {/* Zalo join button */}
                      <a 
                        href="https://zalo.me" 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 bg-[#0068FF] hover:bg-[#005AE0] text-white py-2 px-3 rounded-lg text-[10px] font-black transition-all cursor-pointer shadow-xs"
                      >
                        <div className="w-4 h-4 rounded-full bg-white text-[#0068FF] flex items-center justify-center font-extrabold text-[9px] font-sans shrink-0">
                          Z
                        </div>
                        Cộng đồng Zalo
                      </a>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setAuthModalOpen(false)}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-xl text-xs cursor-pointer transition-colors"
                    >
                      Bắt đầu trải nghiệm ngay &rarr;
                    </button>
                  </div>
                </div>
              ) : (
                // Form input mode
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (authMode === 'register') {
                      setIsRegisteredSuccess(true);
                    } else {
                      // Login success handles silently
                      setAuthModalOpen(false);
                    }
                  }}
                  className="space-y-4 text-xs"
                >
                  {authMode === 'register' && (
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Họ và tên của bạn:</label>
                      <input 
                        type="text" 
                        placeholder="Nguyễn Văn A"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        className="w-full px-3.5 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500 bg-white"
                        required
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Địa chỉ Email:</label>
                    <input 
                      type="email" 
                      placeholder="tenban@gmail.com"
                      value={authMode === 'register' ? regEmail : loginEmail}
                      onChange={(e) => authMode === 'register' ? setRegEmail(e.target.value) : setLoginEmail(e.target.value)}
                      className="w-full px-3.5 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500 bg-white font-mono"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Mật khẩu:</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      value={authMode === 'register' ? regPassword : loginPassword}
                      onChange={(e) => authMode === 'register' ? setRegPassword(e.target.value) : setLoginPassword(e.target.value)}
                      className="w-full px-3.5 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500 bg-white"
                      required
                    />
                  </div>

                  {authMode === 'register' ? (
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl cursor-pointer transition-colors text-center shadow-sm shadow-blue-500/10"
                    >
                      Đăng Ký Tài Khoản Mới
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-[#1E40AF] hover:bg-blue-800 text-white font-bold rounded-xl cursor-pointer transition-colors text-center shadow-sm shadow-blue-500/10"
                    >
                      Đăng Nhập Ngay
                    </button>
                  )}

                  {/* Switch Links */}
                  <div className="pt-2 border-t border-slate-100 text-center">
                    {authMode === 'login' ? (
                      <p className="text-slate-500 text-[11px]">
                        Chưa có tài khoản TutorMate?{' '}
                        <button
                          type="button"
                          onClick={() => {
                            setAuthMode('register');
                            setIsRegisteredSuccess(false);
                          }}
                          className="text-blue-600 font-bold hover:underline cursor-pointer"
                        >
                          Đăng ký miễn phí
                        </button>
                      </p>
                    ) : (
                      <p className="text-slate-500 text-[11px]">
                        Đã có tài khoản từ trước?{' '}
                        <button
                          type="button"
                          onClick={() => {
                            setAuthMode('login');
                            setIsRegisteredSuccess(false);
                          }}
                          className="text-blue-600 font-bold hover:underline cursor-pointer"
                        >
                          Đăng nhập tại đây
                        </button>
                      </p>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
