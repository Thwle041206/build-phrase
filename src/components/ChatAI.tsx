import React, { useState, useEffect } from 'react';
import { Tutor, ChatMessage, DemandProfile } from '../types';
import { mockTutors } from '../data/mockData';
import { 
  Send, RefreshCw, HelpCircle, Plus, Mic, CheckCircle2, 
  HelpCircle as QuestionIcon, ShieldAlert, Zap, Compass, Check, X
} from 'lucide-react';

interface ChatAIProps {
  onNavigateToPage: (pageId: string) => void;
  updateGlobalProfile: (profile: DemandProfile) => void;
  currentProfile: DemandProfile;
  onSelectTutor?: (tutor: Tutor) => void;
}

export default function ChatAI({ onNavigateToPage, updateGlobalProfile, currentProfile, onSelectTutor }: ChatAIProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [budgetConfirmed, setBudgetConfirmed] = useState(false);
  const [stepActive, setStepActive] = useState(4); // 4 = Hình thức
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [compareList, setCompareList] = useState<Tutor[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const handleToggleCompare = (tutor: Tutor) => {
    if (compareList.some(item => item.id === tutor.id)) {
      setCompareList(prev => prev.filter(item => item.id !== tutor.id));
    } else {
      if (compareList.length >= 3) {
        alert("Bạn chỉ được chọn tối đa 3 gia sư để so sánh!");
        return;
      }
      setCompareList(prev => [...prev, tutor]);
    }
  };
  
  // Local edit states for the modal
  const [editSubject, setEditSubject] = useState(currentProfile.subject);
  const [editGrade, setEditGrade] = useState(currentProfile.grade);
  const [editLocation, setEditLocation] = useState(currentProfile.location);
  const [editGoal, setEditGoal] = useState(currentProfile.goal);
  const [editFrequency, setEditFrequency] = useState(currentProfile.frequency);
  const [editBudget, setEditBudget] = useState(currentProfile.budget);

  // Sync edit states when profile changes
  useEffect(() => {
    setEditSubject(currentProfile.subject);
    setEditGrade(currentProfile.grade);
    setEditLocation(currentProfile.location);
    setEditGoal(currentProfile.goal);
    setEditFrequency(currentProfile.frequency);
    setEditBudget(currentProfile.budget);
  }, [currentProfile, isModalOpen]);

  // Initialize initial message thread on load
  useEffect(() => {
    setMessages([
      {
        id: 'init-1',
        sender: 'ai',
        text: 'Chào bạn! Tôi là Trợ lý AI của tutormate 👋\n\nBạn đang tìm gia sư cho học sinh lớp mấy và học môn nào?',
        timestamp: '10:22',
      },
      {
        id: 'user-1',
        sender: 'user',
        text: 'Mình cần tìm gia sư Toán lớp 9 cho bé nhà mình, học tại nhà ở Cầu Giấy, muốn thi đỗ trường công lập, tuần 2-3 buổi.',
        timestamp: '10:24',
      },
      {
        id: 'ai-2',
        sender: 'ai',
        text: 'Tuyệt vời! Tôi đã định hình được lộ trình mục tiêu cho bé. Để tối ưu hóa danh sách ứng viên gia sư giỏi và có khoảng cách di chuyển gần nhất:\n\nBạn dự kiến mức học phí mỗi buổi khoảng bao nhiêu để tối ưu bộ lọc gia sư phù hợp nhất?',
        timestamp: '10:25',
        structuredData: {
          subjectAndGrade: 'Toán học - Lớp 9',
          location: 'Tại nhà - Cầu Giấy',
          goal: 'Đỗ lớp 10 công lập',
          frequency: '2-3 buổi/tuần',
        },
        options: [
          { label: '150k - 200k / buổi', value: '150k-200k' },
          { label: '200k - 300k / buổi', value: '200k-300k', recommended: true },
          { label: '> 300k / buổi', value: 'above-300k' },
        ]
      }
    ]);
  }, []);

  // Preset triggers for suggestions
  const handleSelectOption = (optionVal: string, optionLabel: string) => {
    // 1. Add user reply message
    const userMsg: ChatMessage = {
      id: `user-reply-${Date.now()}`,
      sender: 'user',
      text: `Mình chọn mức học phí: ${optionLabel}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Update global state immediately
    const updatedProfile = {
      ...currentProfile,
      budget: optionLabel,
      progress: 100
    };
    updateGlobalProfile(updatedProfile);
    setBudgetConfirmed(true);
    setStepActive(6); // Step 6 complete

    // 2. Add AI typing response
    const aiResponse: ChatMessage = {
      id: `ai-reply-${Date.now()}`,
      sender: 'ai',
      text: `Cảm ơn anh/chị! Hệ thống đã ghi nhận mức ngân sách ${optionLabel} và ưu tiên xếp hạng các gia sư thuộc top tối ưu.\n\n🎯 Tôi đã chọn lọc được **3 ứng viên gia sư xuất sắc nhất** cực kỳ phù hợp với học sinh lớp 9 tại Cầu Giấy (tiêu biểu như Thủ khoa Sư Phạm Toán Nguyễn Hà My chỉ cách nhà 1.8km).\n\n👉 Mời anh/chị click nút **"Xem gợi ý gia sư ngay"** ở bảng bên phải để bắt đầu so sánh hồ sơ và đặt lịch học thử miễn phí nhé!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg, aiResponse]);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const text = inputText.trim();
    const userMsg: ChatMessage = {
      id: `user-msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Simulated parsing of custom messages
    setTimeout(() => {
      // Check if text has numbers indicating budget
      let replyText = '';
      let budgetVal = '';

      if (text.toLowerCase().includes('200') || text.toLowerCase().includes('300')) {
        budgetVal = '200k - 300k / buổi (Đã chốt)';
        replyText = `Nhận diện ngân sách của bạn là tầm 200k-300k/buổi. Tôi đã áp dụng bộ lọc và hoàn thành hồ sơ nhu cầu 100%!`;
        setBudgetConfirmed(true);
        setStepActive(6);
        updateGlobalProfile({
          ...currentProfile,
          budget: '200k - 300k / buổi',
          progress: 100
        });
      } else {
        replyText = `Tôi đã nhận được thông điệp: "${text}". Đang phân tích yêu cầu bổ sung của bạn và tối ưu thuật toán tìm kiếm gia sư...`;
      }

      const aiMsg: ChatMessage = {
        id: `ai-reply-${Date.now()}`,
        sender: 'ai',
        text: replyText + `\n\nBạn có thể nhấn vào nút **"Xem gợi ý gia sư ngay"** bên phải để xem kết quả khớp tốt nhất.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1000);
  };

  const handleRestartChat = () => {
    setBudgetConfirmed(false);
    setStepActive(4);
    updateGlobalProfile({
      subject: 'Toán học (Lớp 9)',
      grade: 'Lớp 9',
      location: 'Cầu Giấy, HN (Tại nhà)',
      goal: 'Ôn thi vào 10 công lập',
      frequency: '2-3 buổi/tuần',
      schedule: 'Buổi tối T3, T5, T7',
      budget: 'Đang đợi xác nhận...',
      progress: 75
    });
    setMessages([
      {
        id: 'init-1',
        sender: 'ai',
        text: 'Chào bạn! Tôi là Trợ lý AI của tutormate 👋\n\nBạn đang tìm gia sư cho học sinh lớp mấy và học môn nào?',
        timestamp: '10:22',
      },
      {
        id: 'user-1',
        sender: 'user',
        text: 'Mình cần tìm gia sư Toán lớp 9 cho bé nhà mình, học tại nhà ở Cầu Giấy, muốn thi đỗ trường công lập, tuần 2-3 buổi.',
        timestamp: '10:24',
      },
      {
        id: 'ai-2',
        sender: 'ai',
        text: 'Tuyệt vời! Tôi đã định hình được lộ trình mục tiêu cho bé. Để tối ưu hóa danh sách ứng viên gia sư giỏi và có khoảng cách di chuyển gần nhất:\n\nBạn dự kiến mức học phí mỗi buổi khoảng bao nhiêu để tối ưu bộ lọc gia sư phù hợp nhất?',
        timestamp: '10:25',
        structuredData: {
          subjectAndGrade: 'Toán học - Lớp 9',
          location: 'Tại nhà - Cầu Giấy',
          goal: 'Đỗ lớp 10 công lập',
          frequency: '2-3 buổi/tuần',
        },
        options: [
          { label: '150k - 200k / buổi', value: '150k-200k' },
          { label: '200k - 300k / buổi', value: '200k-300k', recommended: true },
          { label: '> 300k / buổi', value: 'above-300k' },
        ]
      }
    ]);
  };

  // Get primary tutor candidate from mock data
  const primaryTutor = mockTutors[0];

  return (
    <div className="flex flex-col gap-4">
      {/* 1. Header Information Banner */}
      <div className="bg-[#E0F2FE] border border-blue-100 rounded-xl px-4 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <p className="text-xs font-semibold text-blue-900 leading-normal">
            Trợ lý AI đang sẵn sàng trò chuyện và phân tích gia sư phù hợp theo thời gian thực
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-medium text-blue-700">
          <span className="flex items-center gap-1 shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 100% Hồ sơ xác thực CCCD/Bằng cấp
          </span>
          <span className="flex items-center gap-1 shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Bảo mật danh tính
          </span>
        </div>
      </div>

      {/* 2. Main Chat Area + Sidebar Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Chat Assistant (Taking 8 cols on desktop) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col overflow-hidden min-h-[640px]">
          {/* Chat Panel Header */}
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-xs">
                {/* Robot icon/logo */}
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="11" width="18" height="10" rx="2" />
                  <circle cx="8.5" cy="16" r="1.5" fill="white" />
                  <circle cx="15.5" cy="16" r="1.5" fill="white" />
                  <path d="M12 2v4M9 2h6" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-800">Trợ lý AI tutormate</h3>
                <span className="text-[10px] text-slate-400 font-medium tracking-wide">PHẢN HỒI THỜI GIAN THỰC</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={handleRestartChat}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-600 cursor-pointer transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                Bắt đầu lại
              </button>
              <button className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 cursor-pointer">
                <HelpCircle className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat History */}
          <div className="flex-1 p-5 overflow-y-auto space-y-5 bg-[#FCFDFE] max-h-[460px]">
            <div className="text-center">
              <span className="inline-block px-3 py-1 bg-slate-100 text-slate-500 text-[11px] font-semibold rounded-full uppercase tracking-wider">
                Hôm nay, cuộc trò chuyện mới
              </span>
            </div>

            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {/* Avatar */}
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-xs">
                    <span className="text-xs font-bold">AI</span>
                  </div>
                )}

                <div className={`max-w-[85%] flex flex-col gap-1.5 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  {/* Bubble wrapper */}
                  <div className={`rounded-2xl p-4 text-xs leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-[#1E40AF] text-white rounded-tr-none shadow-sm' 
                      : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-100'
                  }`}>
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {/* Structured matches card */}
                    {msg.structuredData && (
                      <div className="mt-4 bg-white rounded-xl p-3 border border-blue-50 text-slate-800 shadow-xs space-y-2 max-w-md">
                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                          <div className="bg-slate-50 p-2 rounded-lg">
                            <span className="text-slate-400 block mb-0.5">Môn & Lớp</span>
                            <strong className="text-slate-800 block truncate">{msg.structuredData.subjectAndGrade}</strong>
                          </div>
                          <div className="bg-slate-50 p-2 rounded-lg">
                            <span className="text-slate-400 block mb-0.5">Hình thức & Địa chỉ</span>
                            <strong className="text-slate-800 block truncate">{msg.structuredData.location}</strong>
                          </div>
                          <div className="bg-slate-50 p-2 rounded-lg">
                            <span className="text-slate-400 block mb-0.5">Mục tiêu</span>
                            <strong className="text-slate-800 block truncate">{msg.structuredData.goal}</strong>
                          </div>
                          <div className="bg-slate-50 p-2 rounded-lg">
                            <span className="text-slate-400 block mb-0.5">Tần suất</span>
                            <strong className="text-slate-800 block truncate">{msg.structuredData.frequency}</strong>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Options Pills (e.g. Budget selection) */}
                  {msg.options && !budgetConfirmed && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {msg.options.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => handleSelectOption(opt.value, opt.label)}
                          className={`relative px-4 py-2 text-xs font-semibold rounded-xl border transition-all duration-200 cursor-pointer ${
                            opt.recommended 
                              ? 'bg-blue-50 text-blue-700 border-blue-300 hover:bg-blue-100 ring-1 ring-blue-200' 
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                          }`}
                        >
                          {opt.recommended && (
                            <span className="absolute -top-2 left-2 px-1.5 py-0.5 bg-blue-600 text-[8px] font-bold text-white rounded-md uppercase tracking-wider">
                              Khuyên dùng
                            </span>
                          )}
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Timestamp */}
                  <span className="text-[10px] text-slate-400 font-medium">
                    {msg.timestamp} {msg.sender === 'user' ? '· Đã gửi' : ''}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center text-slate-700 font-bold shrink-0 text-xs uppercase">
                    PH
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Stepper HUD indicator */}
          <div className="border-t border-slate-100 px-5 py-2.5 bg-slate-50/50">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium text-slate-500">
              <span className="text-slate-400 font-bold">6 bước AI thu thập:</span>
              <span className="flex items-center gap-0.5 text-emerald-600">
                1. Môn học <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
              </span>
              <span className="text-slate-300">|</span>
              <span className="flex items-center gap-0.5 text-emerald-600">
                2. Lớp <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
              </span>
              <span className="text-slate-300">|</span>
              <span className="flex items-center gap-0.5 text-emerald-600">
                3. Khu vực <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
              </span>
              <span className="text-slate-300">|</span>
              <span className={`flex items-center gap-0.5 ${stepActive >= 4 ? 'text-emerald-600 font-semibold' : 'text-slate-500'}`}>
                4. Hình thức {stepActive > 4 ? <Check className="w-3 h-3 text-emerald-600 stroke-[3]" /> : '🟢'}
              </span>
              <span className="text-slate-300">|</span>
              <span className={`flex items-center gap-0.5 ${stepActive >= 5 ? 'text-emerald-600 font-semibold' : 'text-slate-500'}`}>
                5. Tần suất {stepActive > 5 ? <Check className="w-3 h-3 text-emerald-600 stroke-[3]" /> : stepActive === 5 ? '🟢' : ''}
              </span>
              <span className="text-slate-300">|</span>
              <span className={`flex items-center gap-0.5 ${stepActive >= 6 ? 'text-emerald-600 font-semibold' : 'text-slate-500'}`}>
                6. Ngân sách {stepActive > 6 ? <Check className="w-3 h-3 text-emerald-600 stroke-[3]" /> : stepActive === 6 ? '🟢' : ''}
              </span>
            </div>
          </div>

          {/* Chat Input form */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100 bg-white">
            <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <button type="button" className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 cursor-pointer">
                <Plus className="w-4 h-4" />
              </button>
              
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={budgetConfirmed ? "Hồ sơ đã hoàn thành 100%! Bấm Xem gợi ý gia sư ngay..." : "Chọn mức 200.000 - 300.000 đ/buổi, ưu tiên lịch học tối Thứ 3, 5, 7"}
                className="flex-1 bg-transparent text-xs text-slate-700 outline-none placeholder-slate-400"
              />
              
              <button type="button" className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 cursor-pointer">
                <Mic className="w-4 h-4" />
              </button>
              
              <button 
                type="submit" 
                className="px-4 py-1.5 bg-[#1E40AF] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 hover:bg-blue-800 transition-colors cursor-pointer"
              >
                Gửi
                <Send className="w-3 h-3" />
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Dynamic Demand Profile HUD (Taking 4 cols on desktop) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Card 1: Demand Profile Progress */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-start gap-3">
              <div>
                <span className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span> Hồ sơ nhu cầu
                </span>
                <h4 className="font-bold text-slate-800 text-sm mt-1">Nhu cầu tìm gia sư</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">Đang xây dựng từ hội thoại</p>
              </div>

              {/* High-fidelity Circular Progress indicator */}
              <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="28"
                    cy="28"
                    r="24"
                    stroke="#F1F5F9"
                    strokeWidth="4"
                    fill="transparent"
                  />
                  <circle
                    cx="28"
                    cy="28"
                    r="24"
                    stroke="#1E40AF"
                    strokeWidth="4"
                    fill="transparent"
                    strokeDasharray={150.7}
                    strokeDashoffset={150.7 - (150.7 * currentProfile.progress) / 100}
                    className="transition-all duration-500 ease-out"
                  />
                </svg>
                <span className="absolute text-xs font-bold text-slate-800 font-mono">
                  {currentProfile.progress}%
                </span>
              </div>
            </div>

            {/* Profile Fields Details */}
            <div className="mt-5 space-y-2.5 border-t border-slate-100 pt-4 text-xs">
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Môn học:
                </span>
                <span className="font-semibold text-slate-800 text-right">{currentProfile.subject}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Địa điểm:
                </span>
                <span className="font-semibold text-slate-800 text-right truncate max-w-[180px]" title={currentProfile.location}>
                  {currentProfile.location}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Mục tiêu:
                </span>
                <span className="font-semibold text-slate-800 text-right">{currentProfile.goal}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Lịch dự kiến:
                </span>
                <span className="font-semibold text-slate-800 text-right">{currentProfile.frequency}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className={`w-4 h-4 ${budgetConfirmed ? 'text-emerald-500' : 'text-slate-300'} shrink-0`} /> Ngân sách:
                </span>
                <span className={`font-semibold ${budgetConfirmed ? 'text-slate-800' : 'text-blue-600 italic'} text-right`}>
                  {currentProfile.budget}
                </span>
              </div>
            </div>

            {/* Action button to adjust requirements details in a modal */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full mt-4 bg-blue-50 hover:bg-blue-100 text-[#1E40AF] text-xs font-bold py-2.5 px-3 rounded-xl border border-blue-100 cursor-pointer transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
            >
              📝 Điều chỉnh nhu cầu chi tiết
            </button>
          </div>

          {/* Card 2: 38 Potential Tutors Matching Banner */}
          <div className="bg-gradient-to-br from-[#1E40AF] to-blue-700 text-white rounded-2xl p-5 shadow-sm relative overflow-hidden">
            <div className="absolute right-2 top-2 opacity-10">
              <Zap className="w-24 h-24 stroke-[1]" />
            </div>

            <div className="flex items-center gap-2">
              <div className="p-2 bg-white/10 rounded-lg">
                <Zap className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <h4 className="font-bold text-sm">38 Gia sư tiềm năng</h4>
                <p className="text-[10px] text-blue-100">Phù hợp môn Toán 9 tại Cầu Giấy</p>
              </div>
            </div>

            {/* Featured Best Tutors (At least 3 top searches matched) inside banner - vertically scrollable */}
            <div className="mt-4 space-y-3 max-h-[250px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/25 scrollbar-track-transparent">
              {mockTutors.slice(0, 3).map((tutor) => (
                <div key={tutor.id} className="bg-white text-slate-800 rounded-xl p-3 shadow-xs flex justify-between items-center hover:bg-slate-50 transition-colors gap-2">
                  <div className="flex gap-3 overflow-hidden">
                    {tutor.avatar ? (
                      <img
                        src={tutor.avatar}
                        alt={tutor.name}
                        className="w-10 h-10 rounded-lg object-cover border border-slate-100 shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                        {tutor.name.split(' ').pop()?.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div className="overflow-hidden">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-xs truncate max-w-[80px]">{tutor.name}</span>
                        <Check className="w-3 h-3 text-blue-600 bg-blue-50 rounded-full p-0.5 shrink-0" />
                        
                        {/* Compare toggle button next to the name */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleCompare(tutor);
                          }}
                          className={`text-[8px] font-bold px-1 py-0.5 rounded-sm border cursor-pointer transition-colors shrink-0 ${
                            compareList.some(item => item.id === tutor.id)
                              ? 'bg-amber-500 text-white border-amber-500 shadow-3xs'
                              : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                          }`}
                        >
                          {compareList.some(item => item.id === tutor.id) ? '✓ So sánh' : '+ So sánh'}
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-500 truncate mt-0.5">{tutor.university}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50 px-1 py-0.5 rounded-sm">
                          {tutor.matchScore}% khớp
                        </span>
                        <span className="text-[9px] text-slate-400">
                          {tutor.distance}km
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Button "Xem hồ sơ" to view details */}
                  <button
                    onClick={() => {
                      if (onSelectTutor) {
                        onSelectTutor(tutor);
                      }
                      onNavigateToPage('P-08');
                    }}
                    className="shrink-0 text-[10px] font-bold bg-[#1E40AF] hover:bg-blue-800 text-white px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors whitespace-nowrap"
                  >
                    Xem hồ sơ
                  </button>
                </div>
              ))}
            </div>

            {/* Compare items action pill bar */}
            {compareList.length > 0 && (
              <div className="mt-3 p-2.5 bg-amber-500/10 rounded-xl border border-amber-500/20 flex items-center justify-between gap-2 animate-in fade-in slide-in-from-bottom-2 duration-250">
                <span className="text-[10px] text-amber-200 font-bold">
                  Đã chọn {compareList.length}/3 gia sư để phân tích
                </span>
                <button
                  type="button"
                  onClick={() => setIsCompareModalOpen(true)}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-black text-[9px] px-3 py-1.5 rounded-lg cursor-pointer transition-colors whitespace-nowrap shadow-xs"
                >
                  Phân tích so sánh ngay
                </button>
              </div>
            )}

            {/* Dynamic Button redirecting to Shortlist sitemap node */}
            <button
              onClick={() => onNavigateToPage('P-06')}
              className="w-full mt-4 bg-white hover:bg-slate-50 text-[#1E40AF] text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition-colors text-center"
            >
              Xem và so sánh gia sư gợi ý ngay
              <span className="text-lg leading-none">&rarr;</span>
            </button>
          </div>

          {/* Card 3: Matching Engine Diagnostics logs */}
          <div className="bg-slate-900 text-slate-300 rounded-2xl p-5 border border-slate-800 shadow-sm font-mono">
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-3">
              <Compass className="w-3.5 h-3.5 text-indigo-400" /> tutormate Matching Engine
            </div>
            <ul className="space-y-2 text-[10px] leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 shrink-0">•</span>
                <span>Đã nhận diện: <strong className="text-white">Toán 9 ôn thi vào 10</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 shrink-0">•</span>
                <span>Đang quét bán kính <strong className="text-white">&lt; 3.5 km</strong> quanh Cầu Giấy</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 shrink-0">•</span>
                {budgetConfirmed ? (
                  <span className="text-emerald-400">✓ Đã chốt ngân sách! Hệ thống đã kích hoạt thuật toán xếp hạng Top 3 gia sư tối ưu.</span>
                ) : (
                  <span>Chờ chốt ngân sách để xếp hạng <strong className="text-amber-400">Top 3 gia sư</strong></span>
                )}
              </li>
            </ul>
          </div>

          {/* Card 4: Safety Pledge Guarantee */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-[11px] leading-relaxed text-slate-500 flex gap-2.5">
            <ShieldAlert className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p>
              <strong className="text-slate-700">Cam kết 100%:</strong> Gia sư được xác minh CCCD, bằng cử nhân/thẻ sinh viên và học bạ. Học thử buổi đầu an tâm với chính sách Escrow giữ phí.
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Demand Profile Adjusting Modal Pop-up */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-800">Điều chỉnh nhu cầu chi tiết</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">Tùy biến các tiêu chí lọc gia sư theo mong muốn</p>
              </div>
              <button 
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-200 text-slate-400 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                updateGlobalProfile({
                  subject: editSubject,
                  grade: editGrade,
                  location: editLocation,
                  goal: editGoal,
                  frequency: editFrequency,
                  schedule: currentProfile.schedule,
                  budget: editBudget,
                  progress: 100
                });
                if (editBudget !== 'Đang đợi xác nhận...') {
                  setBudgetConfirmed(true);
                }
                setIsModalOpen(false);
              }}
              className="p-5 space-y-4 text-xs"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Môn học:</label>
                  <input 
                    type="text" 
                    value={editSubject} 
                    onChange={(e) => setEditSubject(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500 bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Khối lớp:</label>
                  <input 
                    type="text" 
                    value={editGrade} 
                    onChange={(e) => setEditGrade(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500 bg-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Hình thức & Địa chỉ:</label>
                <input 
                  type="text" 
                  value={editLocation} 
                  onChange={(e) => setEditLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500 bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Mục tiêu học tập:</label>
                <input 
                  type="text" 
                  value={editGoal} 
                  onChange={(e) => setEditGoal(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500 bg-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Tần suất học:</label>
                  <input 
                    type="text" 
                    value={editFrequency} 
                    onChange={(e) => setEditFrequency(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500 bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Ngân sách:</label>
                  <input 
                    type="text" 
                    value={editBudget} 
                    onChange={(e) => setEditBudget(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500 bg-white"
                    required
                  />
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-100 flex gap-2">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2 bg-[#1E40AF] hover:bg-blue-800 text-white font-bold rounded-lg cursor-pointer shadow-sm shadow-blue-500/10"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* AI Comparative Analysis Modal */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-250">
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-800">🤖 Trợ lý AI Phân Tích So Sánh Gia Sư</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">So sánh thông minh side-by-side dựa trên dữ liệu hệ thống</p>
              </div>
              <button 
                type="button"
                onClick={() => setIsCompareModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-200 text-slate-400 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body: Comparison Table */}
            <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className="p-2.5 font-semibold text-slate-500">Tiêu chí</th>
                      {compareList.map((tutor) => (
                        <th key={tutor.id} className="p-2.5 font-bold text-slate-800 text-center w-1/3">
                          <div className="flex flex-col items-center gap-1">
                            <span className="font-bold text-slate-800 text-xs">{tutor.name}</span>
                            <span className="text-[9px] font-normal text-slate-400 truncate max-w-[120px]">{tutor.university}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    <tr>
                      <td className="p-2.5 text-slate-400 font-semibold">Matching Score</td>
                      {compareList.map((tutor) => (
                        <td key={tutor.id} className="p-2.5 text-center">
                          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm font-bold text-[10px]">
                            {tutor.matchScore}% khớp
                          </span>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-2.5 text-slate-400 font-semibold">Học phí / Buổi</td>
                      {compareList.map((tutor) => (
                        <td key={tutor.id} className="p-2.5 text-center font-mono font-bold text-blue-700">
                          {tutor.rate.toLocaleString('vi-VN')} đ
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-2.5 text-slate-400 font-semibold">Khoảng cách</td>
                      {compareList.map((tutor) => (
                        <td key={tutor.id} className="p-2.5 text-center text-slate-700">
                          {tutor.distance} km
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-2.5 text-slate-400 font-semibold">Xếp hạng</td>
                      {compareList.map((tutor) => (
                        <td key={tutor.id} className="p-2.5 text-center text-slate-700 font-bold">
                          {tutor.rating} ⭐ ({tutor.reviewsCount} reviews)
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-2.5 text-slate-400 font-semibold">Lịch rảnh</td>
                      {compareList.map((tutor) => (
                        <td key={tutor.id} className="p-2.5 text-center text-slate-600 text-[10px]">
                          {tutor.availability.slice(0, 2).join(', ')}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* AI Comparative Diagnosis Insights */}
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-[11px] leading-relaxed text-indigo-900 space-y-2">
                <strong className="text-xs text-indigo-950 block">🎯 Đánh giá so sánh tự động từ AI:</strong>
                <ul className="space-y-1.5 list-disc list-inside text-indigo-800">
                  {compareList.some(t => t.id === 't-1') && (
                    <li>
                      <strong>Nguyễn Hà My:</strong> Có khoảng cách di chuyển gần nhất (<strong>1.8km</strong>) và nền tảng đại học sư phạm chính quy đỉnh cao. Phù hợp nhất cho việc kèm cặp sát sao để vực dậy học lực nhanh nhất.
                    </li>
                  )}
                  {compareList.some(t => t.id === 't-2') && (
                    <li>
                      <strong>Trần Minh Đức:</strong> Nổi bật với tư duy logic kỹ thuật ĐH Bách Khoa và kinh nghiệm ôn luyện trường chuyên. Phù hợp nhất cho bé muốn hướng tới mục tiêu chinh phục điểm 9+ hoặc thi chuyên cấp 3.
                    </li>
                  )}
                  {compareList.some(t => t.id === 't-3') && (
                    <li>
                      <strong>Lê Thị Phương Thảo:</strong> Điểm review tuyệt đối (<strong>5.0 ⭐</strong>) và có lợi thế vượt trội về ngoại ngữ. Phù hợp tối ưu cho định hướng học tiếng anh bài bản.
                    </li>
                  )}
                </ul>
                <div className="text-[10px] text-indigo-500 italic mt-2 border-t border-indigo-100/50 pt-2 text-right">
                  Phân tích dựa trên thuật toán tối ưu hóa đa mục tiêu TutorMate Core Engine v2.0
                </div>
              </div>

              {/* Modal footer action */}
              <div className="pt-3 border-t border-slate-100 text-right">
                <button
                  type="button"
                  onClick={() => setIsCompareModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl cursor-pointer transition-colors text-xs"
                >
                  Đóng phân tích
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
