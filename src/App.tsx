import React, { useState } from 'react';
import { Role, DemandProfile } from './types';
import TutorMateLogo from './components/TutorMateLogo';
import RoleSelector from './components/RoleSelector';
import ParentView from './components/ParentView';
import TutorView from './components/TutorView';
import OperatorView from './components/OperatorView';
import LandingPage from './components/LandingPage';
import { 
  Users, User, GraduationCap, ShieldAlert, BookOpen, Layers, Menu, X, CheckSquare, 
  ChevronRight, Compass, Settings, LogIn, ExternalLink, Home
} from 'lucide-react';

export default function App() {
  const [showLandingPage, setShowLandingPage] = useState<boolean>(true); // Defaults to Landing Page as requested!
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
  const [authRole, setAuthRole] = useState<Role>('parent');

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
    setShowLandingPage(false);
    // Select reasonable default subpage for each role
    if (role === 'parent') {
      setActiveSubPage('P-02'); // Back to Chat AI
    } else if (role === 'tutor') {
      setActiveSubPage('Tutor-AI-Assistant');
    } else if (role === 'operator') {
      setActiveSubPage('O-01 Dashboard & hàng đợi');
    }
  };

  // Define sidebar menu configurations based on F-1 Sitemap for all 3 roles
  const parentMenuGroups = [
    {
      title: 'Trang chủ',
      items: [
        { id: 'landing', label: '🏠 Trang chủ giới thiệu' },
      ]
    },
    {
      title: 'Tìm kiếm gia sư',
      items: [
        { id: 'P-01', label: '🤖 Đề xuất gia sư AI' },
        { id: 'P-02', label: '💬 Trò chuyện & Yêu cầu' },
      ]
    },
    {
      title: 'Lưu trữ',
      items: [
        { id: 'Danh sách gia sư đã lưu', label: '❤️ Gia sư đã lưu' }
      ]
    },
    {
      title: 'Lịch học thử',
      items: [
        { id: 'P-11', label: '📅 Trạng thái lịch học thử' },
        { id: 'P-12', label: '⭐️ Đánh giá & Đổi gia sư' },
      ]
    },
    {
      title: 'Trợ giúp',
      items: [
        { id: 'P-13', label: '🛡️ Hỗ trợ sự cố & An toàn' }
      ]
    }
  ];

  const tutorMenuGroups = [
    {
      title: 'Trang chủ',
      items: [
        { id: 'landing', label: '🏠 Trang chủ giới thiệu' },
      ]
    },
    {
      title: 'Tài khoản gia sư',
      items: [
        { id: 'Tutor-AI-Assistant', label: '🤖 Trợ lý AI hồ sơ' },
        { id: 'T-03 Trạng thái xác minh', label: '👤 Hồ sơ cá nhân' },
        { id: 'T-01 Tạo/sửa hồ sơ', label: '✏️ Cập nhật thông tin gia sư' },
        { id: 'T-04 Hộp yêu cầu học thử', label: '📅 Quản lý lịch dạy' },
        { id: 'T-05 Phản hồi sau học thử', label: '💬 Quản lý phản hồi' }
      ]
    },
    {
      title: 'Hỗ trợ & liên hệ',
      items: [
        { id: 'Trung tâm trợ giúp', label: '❓ Trung tâm trợ giúp' }
      ]
    }
  ];

  const operatorMenuGroups = [
    {
      title: 'Trang chủ',
      items: [
        { id: 'landing', label: '🏠 Trang chủ giới thiệu' },
      ]
    },
    {
      title: 'Hàng đợi vận hành',
      items: [
        { id: 'O-01 Dashboard & hàng đợi', label: '📊 Hàng đợi yêu cầu dạy học' }
      ]
    },
    {
      title: 'Thẩm định chất lượng',
      items: [
        { id: 'O-02 Duyệt hồ sơ', label: '🛡️ Phê duyệt hồ sơ gia sư' }
      ]
    },
    {
      title: 'Xử lý sự cố',
      items: [
        { id: 'O-03 Chi tiết case', label: '🚨 Giải quyết tranh chấp (Escalations)' }
      ]
    },
    {
      title: 'Giải thuật Matching',
      items: [
        { id: 'O-04 Trace & lý do hiển thị', label: '🔍 Tra cứu thuật toán Matching' }
      ]
    },
    {
      title: 'Thống kê',
      items: [
        { id: 'Báo cáo tuần (Should, ngoài wireframe)', label: '📈 Báo cáo vận hành hàng tuần' }
      ]
    }
  ];

  const currentMenuGroups = 
    currentRole === 'parent' ? parentMenuGroups :
    currentRole === 'tutor' ? tutorMenuGroups :
    operatorMenuGroups;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans antialiased text-slate-900 selection:bg-blue-100">
      
      {showLandingPage ? (
        /* ========================================================= */
        /* MÀN HÌNH CHÍNH GIỚI THIỆU SẢN PHẨM (LANDING PAGE TIẾNG VIỆT) */
        /* ========================================================= */
        <LandingPage 
          onFindTutor={() => {
            setShowLandingPage(false);
            setCurrentRole('parent');
            setActiveSubPage('P-02');
          }}
          onBrowseTutors={() => {
            setShowLandingPage(false);
            setCurrentRole('parent');
            setActiveSubPage('P-01');
          }}
          onGoToDashboard={() => setShowLandingPage(false)}
          onSignIn={() => {
            setAuthMode('login');
            setIsRegisteredSuccess(false);
            setAuthModalOpen(true);
          }}
          onRegister={() => {
            setAuthMode('register');
            setIsRegisteredSuccess(false);
            setAuthModalOpen(true);
          }}
        />
      ) : (
        /* ========================================================= */
        /* MÀN HÌNH BẢNG ĐIỀU KHIỂN & KHÔNG GIAN LÀM VIỆC (DASHBOARD) */
        /* ========================================================= */
        <>
          {/* 1. Header (Top Bar Contract: 3 Zones) */}
          <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-6 py-4 shadow-3xs">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              
              {/* Zone 1: Brand Wordmark Logo */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-500 cursor-pointer lg:hidden"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div 
                  onClick={() => setShowLandingPage(true)} 
                  className="cursor-pointer transition-transform hover:scale-102"
                  title="Nhấp để về trang chủ giới thiệu"
                >
                  <TutorMateLogo />
                </div>
              </div>

              {/* Zone 2: Navigation Links based on active sitemap context */}
              <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-600">
                <button 
                  onClick={() => setShowLandingPage(true)}
                  className="hover:text-[#0B3B78] transition-colors cursor-pointer flex items-center gap-1 font-bold text-slate-800"
                >
                  <Home className="w-3.5 h-3.5 text-[#0B3B78]" />
                  <span>Trang chủ giới thiệu</span>
                </button>
                <button 
                  onClick={() => {
                    setCurrentRole('parent');
                    setActiveSubPage('P-01');
                  }}
                  className="hover:text-[#0B3B78] transition-colors cursor-pointer"
                >
                  Khám phá gia sư
                </button>
                <button 
                  onClick={() => {
                    setCurrentRole('parent');
                    setActiveSubPage('P-02');
                  }}
                  className="hover:text-[#0B3B78] transition-colors cursor-pointer"
                >
                  Tìm gia sư AI
                </button>
                <button 
                  onClick={() => setShowLandingPage(true)}
                  className="hover:text-[#0B3B78] transition-colors cursor-pointer"
                >
                  Tính năng nổi bật
                </button>
              </nav>

              {/* Zone 3: Actions / Sign In & Home Toggle */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowLandingPage(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#0B3B78] bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors cursor-pointer shadow-3xs"
                  title="Xem màn hình chính giới thiệu"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Trang chủ</span>
                </button>
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
                        const isActive = (!showLandingPage && activeSubPage === item.id) || (showLandingPage && item.id === 'landing');
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              if (item.id === 'landing') {
                                setShowLandingPage(true);
                              } else {
                                setShowLandingPage(false);
                                setActiveSubPage(item.id);
                              }
                            }}
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
                <span className="text-slate-700 font-bold">
                  {(() => {
                    const foundItem = currentMenuGroups
                      .flatMap(g => g.items)
                      .find(item => item.id === activeSubPage);
                    return foundItem ? foundItem.label : activeSubPage;
                  })()}
                </span>
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
                &copy; {new Date().getFullYear()} tutor<strong>mate</strong> / tutor<strong>match</strong> EdTech Vietnam. Bảo lưu mọi quyền.
              </p>
              <div className="flex flex-wrap justify-center gap-6 font-semibold text-slate-400">
                <button onClick={() => setShowLandingPage(true)} className="hover:text-white transition-colors cursor-pointer">
                  Màn hình chính giới thiệu
                </button>
                <a href="#terms" className="hover:text-white transition-colors">Điều khoản sử dụng</a>
                <a href="#privacy" className="hover:text-white transition-colors">Chính sách bảo mật</a>
                <a href="#support" className="hover:text-white transition-colors">Trung tâm hỗ trợ</a>
              </div>
            </div>
          </footer>
        </>
      )}

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
                <div className="space-y-4 text-xs">
                  
                  {/* Google OAuth Button with authentic G logo */}
                  <button
                    type="button"
                    onClick={() => {
                      const name = authRole === 'parent' ? 'Phụ huynh' : authRole === 'tutor' ? 'Gia sư Nguyễn Văn A' : 'Điều phối viên Trực';
                      alert(`[Google Sign-In] Đăng nhập bằng Google thành công!\nChào mừng ${name} đã đồng bộ qua tài khoản Google.`);
                      handleRoleChange(authRole);
                      setAuthModalOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 py-2.5 px-4 rounded-xl font-bold cursor-pointer transition-all shadow-3xs"
                  >
                    {/* Google G Logo SVG */}
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.18 1-.78 1.85-1.63 2.42v2.01h2.64c1.55-1.42 2.63-3.53 2.63-6.44z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-2.64-2.01c-.73.49-1.66.78-2.64.78-2.83 0-5.22-1.91-6.07-4.49H1.14v2.07C2.96 20.36 7.15 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.93 14.62c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V8.37H1.14C.41 9.81 0 11.4 0 13s.41 3.19 1.14 4.63l4.79-3.01z"/>
                      <path fill="#EA4335" d="M12 4.75c1.62 0 3.08.56 4.22 1.66l3.16-3.16C17.45 1.41 14.97 1 12 1 7.15 1 2.96 3.64 1.14 7.21l4.79 3.01c.85-2.58 3.24-4.47 6.07-4.47z"/>
                    </svg>
                    <span>
                      {authMode === 'login' ? 'Đăng nhập với Google' : 'Đăng ký nhanh với Google'}
                    </span>
                  </button>

                  <div className="flex items-center gap-3 my-2">
                    <div className="h-px bg-slate-150 flex-1"></div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase shrink-0">Hoặc tiếp tục với Email</span>
                    <div className="h-px bg-slate-150 flex-1"></div>
                  </div>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (authMode === 'register') {
                        setIsRegisteredSuccess(true);
                        // Trigger role update
                        handleRoleChange(authRole);
                      } else {
                        // Login success
                        handleRoleChange(authRole);
                        alert(`Đăng nhập thành công với vai trò: ${authRole === 'parent' ? 'Phụ huynh' : authRole === 'tutor' ? 'Gia sư' : 'Điều phối viên'}`);
                        setAuthModalOpen(false);
                      }
                    }}
                    className="space-y-4"
                  >
                    
                    {/* Role Selection Container */}
                    <div className="space-y-1.5 bg-slate-50 border border-slate-100 p-3 rounded-xl">
                      <label className="block text-slate-600 font-extrabold text-[10px] uppercase">Chọn vai trò của bạn:</label>
                      <div className="grid grid-cols-3 gap-1.5">
                        {[
                          { id: 'parent', label: '👨‍👩‍👦 Phụ huynh' },
                          { id: 'tutor', label: '🎓 Gia sư' },
                          { id: 'operator', label: '🛡️ Admin/Op' }
                        ].map(r => (
                          <button
                            key={r.id}
                            type="button"
                            onClick={() => setAuthRole(r.id as any)}
                            className={`py-1.5 rounded-lg text-[9px] font-extrabold text-center border transition-all cursor-pointer ${
                              authRole === r.id 
                                ? 'bg-blue-600 text-white border-blue-700 shadow-3xs' 
                                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600'
                            }`}
                          >
                            {r.label}
                          </button>
                        ))}
                      </div>
                    </div>

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
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
