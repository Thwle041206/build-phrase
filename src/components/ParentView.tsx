import React, { useState, useEffect } from 'react';
import { Tutor, DemandProfile } from '../types';
import { mockTutors } from '../data/mockData';
import ChatAI from './ChatAI';
import { 
  Sparkles, ClipboardList, RefreshCw, Layers, Check, Search, AlertCircle, 
  User, CheckCircle2, Bookmark, Calendar, PhoneCall, HelpCircle, ArrowRight, ShieldCheck, Star, X
} from 'lucide-react';

interface ParentViewProps {
  activeSubPage: string;
  onNavigateSubPage: (pageId: string) => void;
  currentProfile: DemandProfile;
  updateGlobalProfile: (profile: DemandProfile) => void;
}

export default function ParentView({ 
  activeSubPage, 
  onNavigateSubPage, 
  currentProfile, 
  updateGlobalProfile 
}: ParentViewProps) {
  // Local states
  const [savedTutors, setSavedTutors] = useState<string[]>(['t-1']); // Pre-save first tutor
  const [isScanning, setIsScanning] = useState(false);
  const [trialBooked, setTrialBooked] = useState(false);
  const [trialDate, setTrialDate] = useState('2026-10-02');
  const [trialTime, setTrialTime] = useState('19:30');
  const [selectedTutorForDetail, setSelectedTutorForDetail] = useState<Tutor>(mockTutors[0]);
  const [formSubject, setFormSubject] = useState('Toán học');
  const [formGrade, setFormGrade] = useState('Lớp 9');
  const [formBudget, setFormBudget] = useState('200k - 300k / buổi');
  const [formGoal, setFormGoal] = useState('Thi chuyên/Công lập');
  
  // State for side-by-side comparison on the right panel
  const [compareList, setCompareList] = useState<Tutor[]>([]);

  // Generator of 38 highly detailed matched tutors
  const [tutors38] = useState<Tutor[]>(() => {
    const baseTutors = [
      { name: 'Nguyễn Hà My', university: 'ĐH Sư Phạm Hà Nội', rate: 250000, distance: 1.8, rating: 4.9, matchScore: 99, achievement: 'Thủ khoa Toán ĐHSP, Giải Nhì HSG QG Toán' },
      { name: 'Trần Minh Đức', university: 'ĐH Bách Khoa Hà Nội', rate: 300000, distance: 2.5, rating: 4.8, matchScore: 95, achievement: '29.5 điểm thi đại học, Chuyên KHTN' },
      { name: 'Lê Thị Phương Thảo', university: 'ĐH Ngoại Thương', rate: 280000, distance: 3.2, rating: 5.0, matchScore: 88, achievement: 'IELTS 8.5, Học bổng khuyến khích FTU' },
      { name: 'Đỗ Hoàng Long', university: 'ĐH Khoa Học Tự Nhiên', rate: 240000, distance: 2.1, rating: 4.7, matchScore: 92, achievement: 'Giải Nhất HSG Toán Tỉnh, Chuyên Sư Phạm' },
      { name: 'Phạm Thanh Thảo', university: 'ĐH Quốc Gia Hà Nội', rate: 260000, distance: 2.9, rating: 4.9, matchScore: 91, achievement: 'Cựu học sinh chuyên Toán, 4 năm kinh nghiệm' },
      { name: 'Vũ Minh Tuấn', university: 'ĐH Sư Phạm Hà Nội', rate: 270000, distance: 3.4, rating: 4.6, matchScore: 89, achievement: '5 năm kinh nghiệm ôn thi Toán 9 vào 10' }
    ];

    const list: Tutor[] = [];
    for (let i = 0; i < 38; i++) {
      const base = baseTutors[i % baseTutors.length];
      const nameVariations = ['Anh', 'Bình', 'Chi', 'Dương', 'Hải', 'Giang', 'Hương', 'Khánh', 'Linh', 'Minh', 'Nam', 'Oanh', 'Phương', 'Quỳnh', 'Sơn', 'Trang', 'Vinh', 'Yến'];
      const surNames = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Vũ', 'Phan', 'Đỗ', 'Bùi'];
      const randomName = i < 3 ? base.name : `${surNames[i % surNames.length]} ${nameVariations[(i * 7) % nameVariations.length]}`;
      
      list.push({
        id: `tutor-gen-${i}`,
        name: randomName,
        avatar: i === 0 ? '/src/assets/images/tutor_female_portrait_1790393145183.jpg' : i === 1 ? '/src/assets/images/tutor_male_portrait_1790393163366.jpg' : '',
        university: i < 3 ? base.university : `Đại Học ${surNames[i % surNames.length]} HN`,
        achievement: i < 3 ? base.achievement : `Hơn ${(i % 4) + 2} năm kinh nghiệm dạy kèm Toán 9 đỗ công lập`,
        matchScore: Math.max(72, Math.min(99, base.matchScore - (i % 12))),
        distance: Number((base.distance + (i * 0.22) % 2.5).toFixed(1)),
        subjects: ['Toán học', 'Toán ôn thi vào 10'],
        grades: ['Lớp 9', 'Lớp 10'],
        rate: base.rate + (i % 4) * 15000,
        bio: `Gia sư nhiệt tình, có giáo trình thiết kế chuyên biệt cho học sinh thi vào lớp 10 công lập đạt điểm 8.5+.`,
        rating: Number((4.6 + (i % 5) * 0.1).toFixed(1)),
        reviewsCount: 18 + i,
        verified: { cccd: true, diploma: true, studentCard: i % 2 === 0 },
        availability: ['Tối Thứ 3', 'Tối Thứ 5', 'Chiều Chủ Nhật']
      });
    }
    return list;
  });

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

  // Google Calendar style state
  const [calendarView, setCalendarView] = useState<'week' | 'month'>('month');
  const [calendarSubjectFilter, setCalendarSubjectFilter] = useState<string>('all');
  
  // Selected event modal states
  const [selectedCalendarEvent, setSelectedCalendarEvent] = useState<any>(null);
  const [eventRating, setEventRating] = useState<number>(5);
  const [eventReviewText, setEventReviewText] = useState<string>('');
  const [eventReviewSubmitted, setEventReviewSubmitted] = useState<boolean>(false);
  const [replacementContext, setReplacementContext] = useState<any>(null);
  
  // List of active matched mock classes/events for Parent calendar
  const calendarEvents = [
    { id: 'ev-1', title: 'Học thử Toán 9', tutorName: 'Nguyễn Hà My', subject: 'Toán', date: '2026-10-02', time: '19:30', duration: '2 tiếng', status: 'confirmed', bgClass: 'bg-blue-600 text-white border-blue-700' },
    { id: 'ev-2', title: 'Toán 9 nâng cao', tutorName: 'Trần Minh Đức', subject: 'Toán', date: '2026-10-05', time: '18:00', duration: '2 tiếng', status: 'confirmed', bgClass: 'bg-blue-600 text-white border-blue-700' },
    { id: 'ev-3', title: 'Học thử Tiếng Anh', tutorName: 'Lê Thị Phương Thảo', subject: 'Tiếng Anh', date: '2026-10-03', time: '15:00', duration: '1.5 tiếng', status: 'pending', bgClass: 'bg-emerald-600 text-white border-emerald-700' },
    { id: 'ev-4', title: 'Vật Lý 9 Cơ bản', tutorName: 'Vũ Minh Tuấn', subject: 'Vật Lý', date: '2026-10-06', time: '14:00', duration: '2 tiếng', status: 'confirmed', bgClass: 'bg-amber-600 text-white border-amber-700' },
    { id: 'ev-5', title: 'Học thử Hóa Học', tutorName: 'Phạm Thanh Thảo', subject: 'Hóa Học', date: '2026-10-08', time: '19:30', duration: '2 tiếng', status: 'pending', bgClass: 'bg-purple-600 text-white border-purple-700' },
    { id: 'ev-6', title: 'Toán nâng cao 10', tutorName: 'Đỗ Hoàng Long', subject: 'Toán', date: '2026-10-12', time: '19:30', duration: '2 tiếng', status: 'confirmed', bgClass: 'bg-blue-600 text-white border-blue-700' },
  ];

  // Scanning simulation for P-05 "Đang tìm"
  useEffect(() => {
    if (activeSubPage === 'P-05') {
      setIsScanning(true);
      const timer = setTimeout(() => {
        setIsScanning(false);
        onNavigateSubPage('P-06'); // Auto transition to Shortlist after 2s
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [activeSubPage]);

  const handleToggleSaveTutor = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (savedTutors.includes(id)) {
      setSavedTutors(prev => prev.filter(t => t !== id));
    } else {
      setSavedTutors(prev => [...prev, id]);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateGlobalProfile({
      subject: formSubject,
      grade: formGrade,
      location: 'Cầu Giấy, HN (Tại nhà)',
      goal: formGoal,
      frequency: '2-3 buổi/tuần',
      schedule: 'Buổi tối',
      budget: formBudget,
      progress: 90
    });
    onNavigateSubPage('P-05'); // Jump to Scanning
  };

  const handleBookTrial = (tutor: Tutor) => {
    setSelectedTutorForDetail(tutor);
    onNavigateSubPage('P-10'); // Go to Book trial page
  };

  const handleConfirmTrialBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setTrialBooked(true);
    onNavigateSubPage('P-11'); // Transition to Schedule status
  };

  return (
    <div className="space-y-6">
      {/* Tab content renderer based on activeSubPage */}

      {/* ======================================= */}
      {/* P-01: Trang chủ / Landing Homepage      */}
      {/* ======================================= */}
      {activeSubPage === 'P-01' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          {/* Hero Banner Section */}
          <div className="relative bg-slate-950 text-white px-8 py-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/60 via-slate-950 to-slate-950 opacity-80"></div>
            <div className="relative max-w-3xl mx-auto space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                🚀 Đột phá công nghệ EdTech kết nối gia sư bằng AI
              </span>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
                Tìm Gia Sư Thông Minh <br />
                <span className="text-[#3B82F6]">Chỉ Trong 60 Giây</span> Bằng Trợ Lý AI
              </h1>
              <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                TutorMate sử dụng mô hình trí tuệ nhân tạo thế hệ mới để thấu hiểu năng lực học sinh, tự động định hình lộ trình mục tiêu và sàng lọc ra Top 3 Gia sư ưu tú nhất trong bán kính 3.5km.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <button 
                  onClick={() => onNavigateSubPage('P-02')}
                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-blue-500/20 cursor-pointer transition-all"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  Bắt đầu tìm gia sư bằng Chat AI
                </button>
                <button 
                  onClick={() => onNavigateSubPage('P-03')}
                  className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-bold rounded-xl flex items-center gap-2 cursor-pointer transition-all border border-slate-700"
                >
                  <ClipboardList className="w-4 h-4 text-slate-400" />
                  Đăng ký qua Form truyền thống
                </button>
              </div>
            </div>
          </div>

          {/* Core Values Section */}
          <div className="p-8 md:p-12 bg-slate-50 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-800 text-sm">Xác thực hồ sơ 100%</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Gia sư đều phải trải qua quy trình xác minh căn cước công dân (CCCD), thẻ sinh viên, bằng đại học và học bạ gắt gao của đội ngũ Operator.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-800 text-sm">Matching Engine thông minh</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Thuật toán phân tích địa lý tối ưu hóa khoảng cách di chuyển & đồng bộ thời gian rảnh, giúp nâng tỷ lệ kết nối thành công lên 98%.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-800 text-sm">Chính sách Escrow an tâm</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Học phí buổi học thử đầu tiên được lưu giữ an toàn trên hệ thống. Hoàn trả 100% nếu học thử không hài lòng hoặc muốn đổi gia sư.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ======================================= */}
      {/* P-02: Chat AI                           */}
      {/* ======================================= */}
      {activeSubPage === 'P-02' && (
        <ChatAI 
          onNavigateToPage={onNavigateSubPage} 
          updateGlobalProfile={updateGlobalProfile} 
          currentProfile={currentProfile} 
          onSelectTutor={(tutor) => setSelectedTutorForDetail(tutor)}
        />
      )}

      {/* ======================================= */}
      {/* P-03: Form fallback                     */}
      {/* ======================================= */}
      {activeSubPage === 'P-03' && (
        <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="text-center mb-6">
            <h2 className="text-lg font-bold text-slate-900">Form Đăng Ký Yêu Cầu Tìm Gia Sư</h2>
            <p className="text-xs text-slate-500 mt-1">Dành cho phụ huynh muốn nhập dữ liệu trực tiếp thay vì chat với AI</p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">Môn học cần học:</label>
              <select 
                value={formSubject} 
                onChange={(e) => setFormSubject(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500"
              >
                <option value="Toán học">Toán học</option>
                <option value="Tiếng Anh">Tiếng Anh</option>
                <option value="Vật lý">Vật lý</option>
                <option value="Hóa học">Hóa học</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">Trình độ học sinh:</label>
              <select 
                value={formGrade} 
                onChange={(e) => setFormGrade(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500"
              >
                <option value="Lớp 9">Lớp 9 (Luyện thi vào 10)</option>
                <option value="Lớp 10">Lớp 10</option>
                <option value="Lớp 11">Lớp 11</option>
                <option value="Lớp 12">Lớp 12 (Ôn thi Đại học)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">Mức học phí mong muốn:</label>
              <select 
                value={formBudget} 
                onChange={(e) => setFormBudget(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500"
              >
                <option value="150k - 200k / buổi">150k - 200k / buổi</option>
                <option value="200k - 300k / buổi">200k - 300k / buổi (Phổ biến)</option>
                <option value="> 300k / buổi">&gt; 300k / buổi (Gia sư chuyên)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">Mục tiêu học tập:</label>
              <input 
                type="text" 
                value={formGoal} 
                onChange={(e) => setFormGoal(e.target.value)}
                placeholder="Ví dụ: Đỗ lớp 10 công lập, ôn thi chuyên Toán..."
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors cursor-pointer text-center block"
            >
              Tìm Kiếm Gia Sư Phù Hợp Ngay &rarr;
            </button>
          </form>
        </div>
      )}

      {/* ======================================= */}
      {/* P-04: Xác nhận nhu cầu                  */}
      {/* ======================================= */}
      {activeSubPage === 'P-04' && (
        <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="text-center mb-6">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h2 className="text-lg font-bold text-slate-900 mt-2">Xác Nhận Lại Nhu Cầu Của Bạn</h2>
            <p className="text-xs text-slate-500 mt-1">Vui lòng rà soát kỹ các tiêu chí trước khi kích hoạt thuật toán kết xuất gia sư</p>
          </div>

          <div className="space-y-3.5 border-y border-slate-100 py-5 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500 font-semibold">Môn học & Lớp:</span>
              <span className="font-bold text-slate-800">{currentProfile.subject} ({currentProfile.grade})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-semibold">Địa điểm giảng dạy:</span>
              <span className="font-bold text-slate-800">{currentProfile.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-semibold">Mục tiêu học tập:</span>
              <span className="font-bold text-slate-800">{currentProfile.goal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-semibold">Tần suất học tập:</span>
              <span className="font-bold text-slate-800">{currentProfile.frequency}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-semibold">Lịch học chi tiết:</span>
              <span className="font-bold text-slate-800">{currentProfile.schedule}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-semibold">Ngân sách tối đa:</span>
              <span className="font-bold text-blue-600">{currentProfile.budget}</span>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button 
              onClick={() => onNavigateSubPage('P-02')}
              className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs cursor-pointer transition-colors"
            >
              Sửa yêu cầu bằng Chat
            </button>
            <button 
              onClick={() => onNavigateSubPage('P-05')}
              className="flex-1 py-2.5 bg-[#1E40AF] hover:bg-blue-800 text-white font-bold rounded-lg text-xs cursor-pointer transition-colors text-center"
            >
              Đồng ý & Quét tìm gia sư
            </button>
          </div>
        </div>
      )}

      {/* ======================================= */}
      {/* P-05: Đang tìm (Live Scanning Animation) */}
      {/* ======================================= */}
      {activeSubPage === 'P-05' && (
        <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded-2xl p-10 shadow-sm text-center">
          <div className="relative w-36 h-36 mx-auto mb-6 flex items-center justify-center">
            {/* Spinning Radar concentric rings */}
            <div className="absolute inset-0 rounded-full border-4 border-dashed border-blue-600/30 animate-spin" style={{ animationDuration: '10s' }}></div>
            <div className="absolute inset-4 rounded-full border-2 border-blue-500/20 animate-ping"></div>
            <div className="absolute inset-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <Search className="w-8 h-8 animate-pulse" />
            </div>
          </div>

          <h2 className="text-lg font-bold text-slate-900">Matching Engine Đang Hoạt Động...</h2>
          <p className="text-xs text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">
            Hệ thống đang quét cơ sở dữ liệu gồm 5,000+ gia sư tại Hà Nội, tính toán khoảng cách di chuyển dưới 3.5km từ Cầu Giấy và sàng lọc chứng chỉ học thuật tốt nhất...
          </p>

          <div className="mt-8 space-y-2 max-w-xs mx-auto text-left font-mono text-[10px] bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 text-slate-600">
              <span className="text-emerald-500">✔</span> Quét phạm vi địa lý Cầu Giấy...
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <span className="text-emerald-500">✔</span> Lọc trình độ: Chuyên Toán 9...
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <span className="animate-pulse text-blue-500">⚡</span> Đang tính điểm Matching Score...
            </div>
          </div>
        </div>
      )}

      {/* ======================================= */}
      {/* P-06: Shortlist (Tutor Matches)         */}
      {/* ======================================= */}
      {activeSubPage === 'P-06' && (
        <div className="space-y-5">
          {/* Header section with total count & summary */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white border border-slate-200 p-5 rounded-2xl shadow-2xs">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
                <h2 className="text-base font-bold text-slate-900">Danh Sách 38 Gia Sư Được Hệ Thống Lọc</h2>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">Hiển thị toàn bộ 38 kết quả khớp dựa trên khu vực Cầu Giấy và trình độ Toán 9</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-semibold text-slate-400">
                Đã chọn <strong className="text-amber-600 font-mono">{compareList.length}/3</strong> để so sánh
              </span>
              {compareList.length > 0 && (
                <button 
                  onClick={() => setCompareList([])}
                  className="px-2.5 py-1.5 text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Xóa chọn
                </button>
              )}
            </div>
          </div>

          {/* Dual column Workspace Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Vertically Scrollable Grid of 38 Tutors */}
            <div className={`space-y-4 ${compareList.length > 0 ? 'lg:col-span-8' : 'lg:col-span-12'}`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[720px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                {tutors38.map((t) => (
                  <div 
                    key={t.id} 
                    onClick={() => { setSelectedTutorForDetail(t); onNavigateSubPage('P-08'); }}
                    className={`bg-white border hover:shadow-md rounded-2xl p-4 cursor-pointer transition-all flex flex-col justify-between ${
                      compareList.some(item => item.id === t.id)
                        ? 'border-amber-400 ring-2 ring-amber-100/50'
                        : 'border-slate-200 hover:border-blue-400'
                    }`}
                  >
                    <div className="space-y-3.5">
                      {/* Top Header Card */}
                      <div className="flex gap-3">
                        {t.avatar ? (
                          <img 
                            src={t.avatar} 
                            alt={t.name} 
                            className="w-11 h-11 rounded-xl object-cover border border-slate-100 shrink-0"
                          />
                        ) : (
                          <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-xs">
                            {t.name.split(' ').pop()?.substring(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div className="overflow-hidden flex-1">
                          <div className="flex items-center justify-between gap-1 flex-wrap">
                            <span className="font-bold text-xs text-slate-800 truncate max-w-[100px]">{t.name}</span>
                            
                            {/* Toggle Compare Button next to tutor's name */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleCompare(t);
                              }}
                              className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md border transition-all cursor-pointer ${
                                compareList.some(item => item.id === t.id)
                                  ? 'bg-amber-500 text-white border-amber-500 shadow-3xs'
                                  : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              {compareList.some(item => item.id === t.id) ? '✓ So sánh' : '+ So sánh'}
                            </button>
                          </div>
                          <p className="text-[10px] text-slate-500 truncate mt-0.5">{t.university}</p>
                        </div>
                      </div>

                      {/* Core Metrics */}
                      <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-500">
                        <span className="bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-sm">
                          {t.matchScore}% Matching
                        </span>
                        <span>·</span>
                        <span>Cách {t.distance} km</span>
                      </div>

                      {/* Achievements */}
                      <p className="text-[11px] text-slate-600 line-clamp-2 italic font-medium bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        "{t.achievement}"
                      </p>

                      {/* Pricing / Subjects */}
                      <div className="space-y-1.5 border-t border-slate-100 pt-2.5 text-[11px]">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Mức học phí:</span>
                          <strong className="text-blue-700 font-mono">{t.rate.toLocaleString('vi-VN')} đ/buổi</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Thời gian trống:</span>
                          <span className="text-slate-600 font-medium truncate max-w-[120px]">{t.availability.slice(0, 2).join(', ')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                      <button 
                        onClick={(e) => handleToggleSaveTutor(t.id, e)}
                        className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-500 cursor-pointer"
                        title={savedTutors.includes(t.id) ? "Bỏ lưu" : "Lưu gia sư"}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${savedTutors.includes(t.id) ? 'fill-blue-600 text-blue-600 border-blue-600' : ''}`} />
                      </button>

                      <button 
                        onClick={(e) => { e.stopPropagation(); handleBookTrial(t); }}
                        className="px-3 py-1.5 bg-[#1E40AF] hover:bg-blue-800 text-white text-[10px] font-bold rounded-lg cursor-pointer transition-colors"
                      >
                        Đăng ký học thử &rarr;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: AI side-by-side comparison panel - Persistent inside layout */}
            {compareList.length > 0 && (
              <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-5 sticky top-28 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-1.5 text-amber-600">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <h3 className="font-bold text-slate-900 text-sm">Phân Tích So Sánh AI</h3>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">Bảng đối chiếu thông minh side-by-side của các gia sư đã chọn</p>
                </div>

                {/* Comparison Grid table */}
                <div className="space-y-3.5 text-[11px] leading-relaxed">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-[10px] text-slate-400">
                        <th className="py-1.5">Tiêu chí</th>
                        {compareList.map(t => (
                          <th key={t.id} className="py-1.5 font-bold text-slate-800 text-center truncate max-w-[65px]" title={t.name}>
                            {t.name.split(' ').pop()}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 font-semibold text-slate-700">
                      <tr>
                        <td className="py-2 text-slate-400">Matching</td>
                        {compareList.map(t => (
                          <td key={t.id} className="py-2 text-center text-emerald-600 font-mono font-bold">
                            {t.matchScore}%
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="py-2 text-slate-400">Học phí</td>
                        {compareList.map(t => (
                          <td key={t.id} className="py-2 text-center text-blue-700 font-mono font-bold">
                            {t.rate >= 300000 ? '300k' : t.rate >= 280000 ? '280k' : '250k'}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="py-2 text-slate-400">Khoảng cách</td>
                        {compareList.map(t => (
                          <td key={t.id} className="py-2 text-center text-slate-600">
                            {t.distance}km
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="py-2 text-slate-400">Đánh giá</td>
                        {compareList.map(t => (
                          <td key={t.id} className="py-2 text-center text-amber-500 font-bold">
                            {t.rating}★
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>

                  {/* AI Synthetic Analysis Text Section */}
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 text-[10px] leading-relaxed text-slate-600 space-y-2">
                    <strong className="text-slate-800 font-bold block">💡 Gợi ý lựa chọn từ TutorMate AI:</strong>
                    <ul className="space-y-1.5 list-disc list-inside">
                      {compareList.some(t => t.id === 'tutor-gen-0') && (
                        <li>
                          <strong>Hà My:</strong> Có năng lực Sư phạm chính quy cực kỳ xuất sắc và cách nhà bạn chỉ <strong>1.8km</strong>, giúp tiết kiệm tối đa thời gian di chuyển.
                        </li>
                      )}
                      {compareList.some(t => t.id === 'tutor-gen-1') && (
                        <li>
                          <strong>Minh Đức:</strong> Phù hợp nhất cho mục tiêu chinh phục trường chuyên cấp 3 nhờ phong thái tư duy logic Bách Khoa độc đáo.
                        </li>
                      )}
                      {compareList.some(t => t.id === 'tutor-gen-2') && (
                        <li>
                          <strong>Phương Thảo:</strong> Điểm đánh giá tuyệt đối (<strong>5.0★</strong>), là lựa chọn tối ưu cho định hướng giao tiếp & tiếng anh phản xạ.
                        </li>
                      )}
                      {compareList.filter(t => t.id !== 'tutor-gen-0' && t.id !== 'tutor-gen-1' && t.id !== 'tutor-gen-2').length > 0 && (
                        <li>
                          Các ứng viên dự phòng khác có mức thù lao rất cạnh tranh và lịch học rảnh linh hoạt cho tối Thứ 3/5/7.
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => onNavigateSubPage('P-09')}
                      className="w-full bg-[#1E40AF] hover:bg-blue-800 text-white font-bold py-2 px-3 rounded-lg cursor-pointer transition-colors text-center text-[10px]"
                    >
                      Bấm để so sánh chi tiết dạng lưới &rarr;
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ======================================= */}
      {/* P-07: Không có kết quả                  */}
      {/* ======================================= */}
      {activeSubPage === 'P-07' && (
        <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
          <h2 className="text-lg font-bold text-slate-900 mt-3">Không Tìm Thấy Gia Sư Trùng Khớp 100%</h2>
          <p className="text-xs text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">
            Các tiêu chí của bạn hiện đang quá thắt chặt (ví dụ: Ngân sách dưới 150k và học tại nhà Cầu Giấy cho lớp 9 thường có rất ít ứng viên chất lượng).
          </p>

          <div className="mt-6 border border-slate-100 bg-slate-50 rounded-xl p-4 text-left space-y-3 text-xs">
            <span className="font-bold text-slate-800">💡 Gợi ý điều chỉnh để tìm thấy ngay:</span>
            <ul className="space-y-2 text-slate-600 list-disc list-inside">
              <li>Mở rộng khoảng cách di chuyển từ <strong className="text-slate-800">3.5km lên 5km</strong>.</li>
              <li>Chuyển hình thức học sang <strong className="text-slate-800">Học Online 1-1</strong> để giảm chi phí & thêm gia sư giỏi ở tỉnh khác.</li>
              <li>Nâng khung ngân sách lên <strong className="text-blue-600">200k - 300k/buổi</strong> (khuyên dùng cho lớp 9).</li>
            </ul>
          </div>

          <button 
            onClick={() => {
              updateGlobalProfile({
                ...currentProfile,
                budget: '200k - 300k / buổi',
                progress: 85
              });
              onNavigateSubPage('P-02');
            }}
            className="mt-6 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors"
          >
            Nâng ngân sách & Tìm lại qua Chat AI
          </button>
        </div>
      )}

      {/* ======================================= */}
      {/* P-08: Chi tiết gia sư                   */}
      {/* ======================================= */}
      {activeSubPage === 'P-08' && selectedTutorForDetail && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          {/* Main Top Bio Card */}
          <div className="flex flex-col md:flex-row gap-6 pb-6 border-b border-slate-100">
            {selectedTutorForDetail.avatar ? (
              <img 
                src={selectedTutorForDetail.avatar} 
                alt={selectedTutorForDetail.name} 
                className="w-28 h-28 rounded-2xl object-cover border border-slate-200 shadow-sm"
              />
            ) : (
              <div className="w-28 h-28 rounded-2xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-3xl shadow-sm">
                {selectedTutorForDetail.name.split(' ').pop()?.substring(0, 2).toUpperCase()}
              </div>
            )}

            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-slate-900">{selectedTutorForDetail.name}</h2>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
                  <ShieldCheck className="w-3 h-3" /> Đã xác thực lý lịch vàng
                </span>
              </div>

              <p className="text-xs text-slate-500 font-medium">
                {selectedTutorForDetail.university} · {selectedTutorForDetail.achievement}
              </p>

              <div className="flex items-center gap-4 text-xs font-medium text-slate-600 pt-1">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <strong>{selectedTutorForDetail.rating}</strong> ({selectedTutorForDetail.reviewsCount} đánh giá)
                </div>
                <span>·</span>
                <div>Cách nhà: <strong>{selectedTutorForDetail.distance} km</strong></div>
                <span>·</span>
                <div>Học phí: <strong className="text-blue-700 font-mono">{(selectedTutorForDetail.rate).toLocaleString('vi-VN')} đ/buổi</strong></div>
              </div>
            </div>

            <div className="flex flex-col gap-2 shrink-0 md:justify-center">
              <button 
                onClick={() => handleBookTrial(selectedTutorForDetail)}
                className="px-5 py-3 bg-[#1E40AF] hover:bg-blue-800 text-white text-xs font-bold rounded-xl cursor-pointer transition-colors shadow-sm text-center"
              >
                Đăng ký học thử 1 buổi
              </button>
              <button 
                onClick={() => onNavigateSubPage('P-06')}
                className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer transition-colors text-center"
              >
                Trở lại danh sách
              </button>
            </div>
          </div>

          {/* Details sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="md:col-span-2 space-y-4">
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-800">Giới thiệu bản thân:</h4>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {selectedTutorForDetail.bio}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-800">Môn học & Khối lớp giảng dạy:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedTutorForDetail.subjects.map(s => (
                    <span key={s} className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium">
                      {s}
                    </span>
                  ))}
                  {selectedTutorForDetail.grades.map(g => (
                    <span key={g} className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md font-medium">
                      {g}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verified Documents */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-800">Chứng chỉ đã xác thực bời TutorMate:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="border border-slate-200 rounded-xl p-3 bg-white flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 bg-emerald-50 rounded-full p-0.5 shrink-0" />
                    <div>
                      <p className="font-bold text-slate-800">Căn cước (CCCD)</p>
                      <span className="text-[10px] text-slate-400">Khớp sinh trắc học</span>
                    </div>
                  </div>
                  <div className="border border-slate-200 rounded-xl p-3 bg-white flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 bg-emerald-50 rounded-full p-0.5 shrink-0" />
                    <div>
                      <p className="font-bold text-slate-800">Bằng Đại học / Học bạ</p>
                      <span className="text-[10px] text-slate-400">Hợp lệ</span>
                    </div>
                  </div>
                  <div className="border border-slate-200 rounded-xl p-3 bg-white flex items-center gap-2">
                    {selectedTutorForDetail.verified.studentCard ? (
                      <Check className="w-4 h-4 text-emerald-600 bg-emerald-50 rounded-full p-0.5 shrink-0" />
                    ) : (
                      <span className="w-4 h-4 text-slate-400 text-center font-bold font-mono shrink-0">-</span>
                    )}
                    <div>
                      <p className="font-bold text-slate-800">Thẻ Sinh viên</p>
                      <span className="text-[10px] text-slate-400">
                        {selectedTutorForDetail.verified.studentCard ? 'Đã duyệt' : 'N/A (Cựu SV)'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Calendar Schedule in Tutor Detail */}
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <h4 className="font-bold text-slate-800 mb-3">Lịch rảnh trong tuần:</h4>
                <div className="space-y-2">
                  {selectedTutorForDetail.availability.map((av) => (
                    <div key={av} className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-slate-100">
                      <span className="font-semibold text-slate-700">{av}</span>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-sm">Còn trống</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================= */}
      {/* P-09: So sánh (Comparison Table)         */}
      {/* ======================================= */}
      {activeSubPage === 'P-09' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 overflow-x-auto">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Bảng So Sánh Gia Sư Chi Tiết</h2>
            <p className="text-xs text-slate-500">Đối chiếu các tiêu chí then chốt để đưa ra lựa chọn tối ưu nhất</p>
          </div>

          <table className="w-full text-left text-xs min-w-[600px] border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="p-3 font-semibold text-slate-500">Tiêu chí so sánh</th>
                {mockTutors.slice(0, 2).map(t => (
                  <th key={t.id} className="p-3 font-bold text-slate-800 text-center w-1/3">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-sm">{t.name}</span>
                      <span className="text-[10px] font-normal text-slate-500">{t.university}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              <tr>
                <td className="p-3 text-slate-400 font-semibold">Matching Score</td>
                {mockTutors.slice(0, 2).map(t => (
                  <td key={t.id} className="p-3 text-center">
                    <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md font-bold text-xs">
                      {t.matchScore}% khớp
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 text-slate-400 font-semibold">Học phí một buổi</td>
                {mockTutors.slice(0, 2).map(t => (
                  <td key={t.id} className="p-3 text-center font-mono font-bold text-blue-700">
                    {(t.rate).toLocaleString('vi-VN')} đ
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 text-slate-400 font-semibold">Khoảng cách di chuyển</td>
                {mockTutors.slice(0, 2).map(t => (
                  <td key={t.id} className="p-3 text-center text-slate-700">
                    Cách {t.distance} km
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 text-slate-400 font-semibold">Đánh giá trung bình</td>
                {mockTutors.slice(0, 2).map(t => (
                  <td key={t.id} className="p-3 text-center text-slate-700">
                    <span className="font-bold">{t.rating} ⭐</span> ({t.reviewsCount} reviews)
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 text-slate-400 font-semibold">Thành tích nổi bật</td>
                {mockTutors.slice(0, 2).map(t => (
                  <td key={t.id} className="p-3 text-center text-slate-600 text-[11px] leading-relaxed max-w-xs">
                    {t.achievement}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 text-slate-400 font-semibold">Hành động</td>
                {mockTutors.slice(0, 2).map(t => (
                  <td key={t.id} className="p-3 text-center">
                    <button 
                      onClick={() => handleBookTrial(t)}
                      className="px-4 py-1.5 bg-[#1E40AF] hover:bg-blue-800 text-white font-bold rounded-lg cursor-pointer text-[11px] transition-colors"
                    >
                      Đặt học thử ngay
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* ======================================= */}
      {/* P-10: Đặt học thử                       */}
      {/* ======================================= */}
      {activeSubPage === 'P-10' && selectedTutorForDetail && (
        <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="text-center mb-6">
            <h2 className="text-lg font-bold text-slate-900">Đăng Ký Đặt Lịch Học Thử Miễn Phí</h2>
            <p className="text-xs text-slate-500 mt-1">Đồng hành cùng gia sư {selectedTutorForDetail.name}</p>
          </div>

          <form onSubmit={handleConfirmTrialBooking} className="space-y-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center gap-3">
              <img 
                src={selectedTutorForDetail.avatar || '/src/assets/images/tutor_female_portrait_1790393145183.jpg'} 
                alt={selectedTutorForDetail.name} 
                className="w-10 h-10 rounded-lg object-cover" 
              />
              <div>
                <strong className="text-slate-800 block">{selectedTutorForDetail.name}</strong>
                <span className="text-[10px] text-slate-400">{selectedTutorForDetail.university}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">Chọn Ngày Học Thử:</label>
                <input 
                  type="date" 
                  value={trialDate} 
                  onChange={(e) => setTrialDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500 font-mono"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">Chọn Giờ Học Thử:</label>
                <input 
                  type="time" 
                  value={trialTime} 
                  onChange={(e) => setTrialTime(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500 font-mono"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">Mô tả học lực hiện tại của bé:</label>
              <textarea 
                rows={3}
                placeholder="Bé bị mất căn bản phần hình học hay đại số? Bé có nhút nhát không?..."
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500"
              ></textarea>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 text-indigo-700 text-[11px] leading-relaxed">
              <strong>🔒 Cam kết Escrow an toàn:</strong> Bạn cọc trước học phí 1 buổi thử. Tiền được hệ thống khóa giữ và chỉ trả cho gia sư khi bạn xác nhận buổi học hoàn thành xuất sắc.
            </div>

            <button 
              type="submit"
              className="w-full py-3 bg-[#1E40AF] hover:bg-blue-800 text-white font-bold rounded-lg transition-colors cursor-pointer text-center"
            >
              Đặt lịch & Đóng cọc bảo chứng Escrow &rarr;
            </button>
          </form>
        </div>
      )}

      {/* ======================================= */}
      {/* Tab: Đã lưu                             */}
      {/* ======================================= */}
      {activeSubPage === 'Danh sách gia sư đã lưu' && (
        <div className="space-y-5">
          {/* Header section with total count & summary */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white border border-slate-200 p-5 rounded-2xl shadow-2xs">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
                <h2 className="text-base font-bold text-slate-900">Quản Lý Gia Sư Đã Lưu</h2>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">Danh sách các gia sư xuất sắc bạn đã lưu trong quá trình rà soát</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-semibold text-slate-400">
                Đã chọn <strong className="text-amber-600 font-mono">{compareList.length}/3</strong> để so sánh
              </span>
              {compareList.length > 0 && (
                <button 
                  onClick={() => setCompareList([])}
                  className="px-2.5 py-1.5 text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Xóa chọn
                </button>
              )}
            </div>
          </div>

          {/* Dual column Workspace Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: List of saved tutors */}
            <div className={`space-y-4 ${compareList.length > 0 ? 'lg:col-span-8' : 'lg:col-span-12'}`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tutors38.filter(t => savedTutors.includes(t.id)).map((t) => (
                  <div 
                    key={t.id} 
                    onClick={() => { setSelectedTutorForDetail(t); onNavigateSubPage('P-08'); }}
                    className={`bg-white border hover:shadow-md rounded-2xl p-4 cursor-pointer transition-all flex flex-col justify-between ${
                      compareList.some(item => item.id === t.id)
                        ? 'border-amber-400 ring-2 ring-amber-100/50'
                        : 'border-slate-200 hover:border-blue-400'
                    }`}
                  >
                    <div className="space-y-3.5">
                      {/* Top Header Card */}
                      <div className="flex gap-3">
                        {t.avatar ? (
                          <img 
                            src={t.avatar} 
                            alt={t.name} 
                            className="w-11 h-11 rounded-xl object-cover border border-slate-100 shrink-0"
                          />
                        ) : (
                          <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-xs">
                            {t.name.split(' ').pop()?.substring(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div className="overflow-hidden flex-1">
                          <div className="flex items-center justify-between gap-1 flex-wrap">
                            <span className="font-bold text-xs text-slate-800 truncate max-w-[100px]">{t.name}</span>
                            
                            {/* Toggle Compare Button next to tutor's name */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleCompare(t);
                              }}
                              className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md border transition-all cursor-pointer ${
                                compareList.some(item => item.id === t.id)
                                  ? 'bg-amber-500 text-white border-amber-500 shadow-3xs'
                                  : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              {compareList.some(item => item.id === t.id) ? '✓ So sánh' : '+ So sánh'}
                            </button>
                          </div>
                          <p className="text-[10px] text-slate-500 truncate mt-0.5">{t.university}</p>
                        </div>
                      </div>

                      {/* Core Metrics */}
                      <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-500">
                        <span className="bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-sm">
                          {t.matchScore}% Matching
                        </span>
                        <span>·</span>
                        <span>Cách {t.distance} km</span>
                      </div>

                      {/* Achievements */}
                      <p className="text-[11px] text-slate-600 line-clamp-2 italic font-medium bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        "{t.achievement}"
                      </p>

                      {/* Pricing / Subjects */}
                      <div className="space-y-1.5 border-t border-slate-100 pt-2.5 text-[11px]">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Mức học phí:</span>
                          <strong className="text-blue-700 font-mono">{t.rate.toLocaleString('vi-VN')} đ/buổi</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Thời gian trống:</span>
                          <span className="text-slate-600 font-medium truncate max-w-[120px]">{t.availability.slice(0, 2).join(', ')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                      <button 
                        onClick={(e) => handleToggleSaveTutor(t.id, e)}
                        className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-500 cursor-pointer"
                        title="Bỏ lưu"
                      >
                        <Bookmark className="w-3.5 h-3.5 fill-blue-600 text-blue-600 border-blue-600" />
                      </button>

                      <button 
                        onClick={(e) => { e.stopPropagation(); handleBookTrial(t); }}
                        className="px-3 py-1.5 bg-[#1E40AF] hover:bg-blue-800 text-white text-[10px] font-bold rounded-lg cursor-pointer transition-colors"
                      >
                        Đăng ký học thử &rarr;
                      </button>
                    </div>
                  </div>
                ))}

                {tutors38.filter(t => savedTutors.includes(t.id)).length === 0 && (
                  <div className="col-span-3 text-center py-12 text-slate-400 text-xs bg-white rounded-2xl border border-slate-200">
                    Chưa lưu gia sư nào. Hãy quay lại trang gợi ý để lưu ứng viên!
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: AI side-by-side comparison panel - Persistent inside layout */}
            {compareList.length > 0 && (
              <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-5 sticky top-28 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-1.5 text-amber-600">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <h3 className="font-bold text-slate-900 text-sm">Phân Tích So Sánh AI</h3>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">Bảng đối chiếu thông minh side-by-side của các gia sư đã lưu</p>
                </div>

                {/* Comparison Grid table */}
                <div className="space-y-3.5 text-[11px] leading-relaxed">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-[10px] text-slate-400">
                        <th className="py-1.5">Tiêu chí</th>
                        {compareList.map(t => (
                          <th key={t.id} className="py-1.5 font-bold text-slate-800 text-center truncate max-w-[65px]" title={t.name}>
                            {t.name.split(' ').pop()}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 font-semibold text-slate-700">
                      <tr>
                        <td className="py-2 text-slate-400">Matching</td>
                        {compareList.map(t => (
                          <td key={t.id} className="py-2 text-center text-emerald-600 font-mono font-bold">
                            {t.matchScore}%
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="py-2 text-slate-400">Học phí</td>
                        {compareList.map(t => (
                          <td key={t.id} className="py-2 text-center text-blue-700 font-mono font-bold">
                            {t.rate >= 300000 ? '300k' : t.rate >= 280000 ? '280k' : '250k'}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="py-2 text-slate-400">Khoảng cách</td>
                        {compareList.map(t => (
                          <td key={t.id} className="py-2 text-center text-slate-600">
                            {t.distance}km
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="py-2 text-slate-400">Đánh giá</td>
                        {compareList.map(t => (
                          <td key={t.id} className="py-2 text-center text-amber-500 font-bold">
                            {t.rating}★
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>

                  {/* AI Synthetic Analysis Text Section */}
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 text-[10px] leading-relaxed text-slate-600 space-y-2">
                    <strong className="text-slate-800 font-bold block">💡 Gợi ý lựa chọn từ TutorMate AI:</strong>
                    <ul className="space-y-1.5 list-disc list-inside">
                      {compareList.some(t => t.id === 'tutor-gen-0') && (
                        <li>
                          <strong>Hà My:</strong> Có năng lực Sư phạm chính quy cực kỳ xuất sắc và cách nhà bạn chỉ <strong>1.8km</strong>, giúp tiết kiệm tối đa thời gian di chuyển.
                        </li>
                      )}
                      {compareList.some(t => t.id === 'tutor-gen-1') && (
                        <li>
                          <strong>Minh Đức:</strong> Phù hợp nhất cho mục tiêu chinh phục trường chuyên cấp 3 nhờ phong thái tư duy logic Bách Khoa độc đáo.
                        </li>
                      )}
                      {compareList.some(t => t.id === 'tutor-gen-2') && (
                        <li>
                          <strong>Phương Thảo:</strong> Điểm đánh giá tuyệt đối (<strong>5.0★</strong>), là lựa chọn tối ưu cho định hướng giao tiếp & tiếng anh phản xạ.
                        </li>
                      )}
                      {compareList.filter(t => t.id !== 'tutor-gen-0' && t.id !== 'tutor-gen-1' && t.id !== 'tutor-gen-2').length > 0 && (
                        <li>
                          Các ứng viên dự phòng khác có mức thù lao rất cạnh tranh và lịch học rảnh linh hoạt cho tối Thứ 3/5/7.
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => onNavigateSubPage('P-09')}
                      className="w-full bg-[#1E40AF] hover:bg-blue-800 text-white font-bold py-2 px-3 rounded-lg cursor-pointer transition-colors text-center text-[10px]"
                    >
                      Bấm để so sánh chi tiết dạng lưới &rarr;
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ======================================= */}
      {/* ======================================= */}
      {/* P-11: Trạng thái lịch (Trial schedule)  */}
      {/* ======================================= */}
      {activeSubPage === 'P-11' && (
        <div className="space-y-6">
          
          {/* Calendar Controller & Filter Header */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-50 text-[#1E40AF] rounded-lg">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-slate-900">Lịch Học Thử & Học Chính Thức</h2>
                  <p className="text-[11px] text-slate-500">Xem và quản lý lịch học dạng Google Calendar thông minh</p>
                </div>
              </div>
            </div>

            {/* View Toggle & Subject Filters */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Subject Filter Dropdown */}
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-xs">
                <span className="text-[10px] font-bold text-slate-400">Môn học:</span>
                <select 
                  value={calendarSubjectFilter}
                  onChange={(e) => setCalendarSubjectFilter(e.target.value)}
                  className="bg-transparent font-bold text-slate-700 outline-none cursor-pointer"
                >
                  <option value="all">Tất cả môn</option>
                  <option value="Toán">Môn Toán</option>
                  <option value="Tiếng Anh">Môn Anh</option>
                  <option value="Vật Lý">Môn Lý</option>
                  <option value="Hóa Học">Môn Hóa</option>
                </select>
              </div>

              {/* Week / Month Toggle */}
              <div className="bg-slate-100 p-1 rounded-lg flex items-center gap-1 text-xs font-bold">
                <button
                  onClick={() => setCalendarView('week')}
                  className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                    calendarView === 'week' 
                      ? 'bg-white text-[#1E40AF] shadow-xs' 
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Tuần
                </button>
                <button
                  onClick={() => setCalendarView('month')}
                  className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                    calendarView === 'month' 
                      ? 'bg-white text-[#1E40AF] shadow-xs' 
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Tháng
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area: Split 12-cols Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left: Google Calendar Interface */}
            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
              
              {/* Month / Week Label header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-sm text-slate-800">
                  {calendarView === 'month' ? 'Tháng 10, Năm 2026' : 'Tuần 40 (28/09/2026 - 04/10/2026)'}
                </h3>
                <span className="text-[10px] bg-blue-50 text-[#1E40AF] font-bold px-2 py-0.5 rounded-sm">
                  Múi giờ Việt Nam (GMT+7)
                </span>
              </div>

              {/* MONTH VIEW GRID */}
              {calendarView === 'month' && (
                <div className="space-y-1">
                  {/* Calendar Weekday labels */}
                  <div className="grid grid-cols-7 text-center font-bold text-[10px] text-slate-400 uppercase tracking-wider py-1 bg-slate-50 rounded-lg">
                    <div>Thứ 2</div>
                    <div>Thứ 3</div>
                    <div>Thứ 4</div>
                    <div>Thứ 5</div>
                    <div>Thứ 6</div>
                    <div>Thứ 7</div>
                    <div>Chủ Nhật</div>
                  </div>

                  {/* Calendar days grid (October 2026 starts on Thursday 1st) */}
                  {/* September 28th to November 1st (35 days grid) */}
                  <div className="grid grid-cols-7 gap-1 text-[11px] font-semibold min-h-[400px]">
                    {/* Days from Sep 28 to Sep 30 */}
                    <div className="bg-slate-50/50 text-slate-300 p-2 border border-slate-100 rounded-lg min-h-[75px] flex flex-col justify-between">
                      <span>28</span>
                    </div>
                    <div className="bg-slate-50/50 text-slate-300 p-2 border border-slate-100 rounded-lg min-h-[75px] flex flex-col justify-between">
                      <span>29</span>
                    </div>
                    <div className="bg-slate-50/50 text-slate-300 p-2 border border-slate-100 rounded-lg min-h-[75px] flex flex-col justify-between">
                      <span>30</span>
                    </div>

                    {/* October Days 1 to 31 */}
                    {Array.from({ length: 31 }, (_, i) => {
                      const dayNumber = i + 1;
                      const dayString = `2026-10-${dayNumber.toString().padStart(2, '0')}`;
                      // Filter events for this day
                      const dayEvents = calendarEvents.filter(ev => ev.date === dayString && (calendarSubjectFilter === 'all' || ev.subject === calendarSubjectFilter));
                      const isToday = dayNumber === 2; // Simulating today is Oct 2nd, matching trialDate

                      return (
                        <div 
                          key={dayNumber} 
                          className={`p-1.5 border border-slate-100 rounded-lg min-h-[85px] flex flex-col justify-between transition-colors ${
                            isToday ? 'bg-blue-50/30 border-blue-300 ring-2 ring-blue-100/30' : 'bg-white hover:bg-slate-50/50'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                              isToday ? 'bg-[#1E40AF] text-white' : 'text-slate-700'
                            }`}>
                              {dayNumber}
                            </span>
                            {isToday && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping"></span>}
                          </div>

                          {/* Event pills container */}
                          <div className="space-y-1 mt-1.5">
                            {dayEvents.map(ev => (
                              <div 
                                key={ev.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedCalendarEvent(ev);
                                  setEventRating(5);
                                  setEventReviewText('');
                                  setEventReviewSubmitted(false);
                                }}
                                className={`px-1 py-0.5 rounded-md text-[8px] font-black leading-tight border overflow-hidden truncate whitespace-nowrap shadow-3xs cursor-pointer hover:scale-105 active:scale-95 transition-all ${ev.bgClass}`}
                                title={`${ev.title} (${ev.tutorName}) - ${ev.time} (Click để xem chi tiết & đánh giá)`}
                              >
                                {ev.time} {ev.title}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}

                    {/* November Day 1 */}
                    <div className="bg-slate-50/50 text-slate-300 p-2 border border-slate-100 rounded-lg min-h-[75px] flex flex-col justify-between">
                      <span>1</span>
                    </div>
                  </div>
                </div>
              )}

              {/* WEEK VIEW GRID */}
              {calendarView === 'week' && (
                <div className="space-y-1 overflow-x-auto">
                  <div className="min-w-[600px]">
                    {/* Header days row */}
                    <div className="grid grid-cols-8 text-center font-bold text-[10px] text-slate-400 py-2 bg-slate-50 rounded-lg border-b border-slate-100">
                      <div className="text-slate-400">Giờ</div>
                      <div>T2 (28/09)</div>
                      <div>T3 (29/09)</div>
                      <div>T4 (30/09)</div>
                      <div>T5 (01/10)</div>
                      <div className="bg-blue-50 text-[#1E40AF] rounded-sm py-0.5">T6 (02/10) ★</div>
                      <div>T7 (03/10)</div>
                      <div>CN (04/10)</div>
                    </div>

                    {/* Hour rows grid */}
                    <div className="divide-y divide-slate-100 text-[11px] font-semibold text-slate-600">
                      {[
                        { label: 'Sáng (08:00 - 12:00)', filterHours: ['08:', '10:', '11:'] },
                        { label: 'Chiều (13:00 - 17:00)', filterHours: ['13:', '14:', '15:', '16:'] },
                        { label: 'Tối (18:00 - 22:00)', filterHours: ['18:', '19:', '20:', '21:'] }
                      ].map((slot, sIdx) => (
                        <div key={sIdx} className="grid grid-cols-8 items-stretch min-h-[100px]">
                          {/* Left hour label */}
                          <div className="p-2 border-r border-slate-100 bg-slate-50/30 flex items-center justify-center text-[10px] text-slate-400 font-bold text-center leading-tight">
                            {slot.label}
                          </div>

                          {/* Day Columns (T2 - CN) */}
                          {['2026-09-28', '2026-09-29', '2026-09-30', '2026-10-01', '2026-10-02', '2026-10-03', '2026-10-04'].map((dayStr) => {
                            // Filter events matching both date and time slot filter
                            const slotEvents = calendarEvents.filter(ev => {
                              const matchesDate = ev.date === dayStr;
                              const matchesHour = slot.filterHours.some(h => ev.time.startsWith(h));
                              const matchesSubject = calendarSubjectFilter === 'all' || ev.subject === calendarSubjectFilter;
                              return matchesDate && matchesHour && matchesSubject;
                            });

                            return (
                              <div key={dayStr} className="p-1.5 border-r border-slate-100 flex flex-col gap-1 bg-white/40">
                                {slotEvents.map(ev => (
                                  <div 
                                    key={ev.id} 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedCalendarEvent(ev);
                                      setEventRating(5);
                                      setEventReviewText('');
                                      setEventReviewSubmitted(false);
                                    }}
                                    className={`p-2 rounded-lg border text-[9px] font-bold leading-relaxed space-y-1 hover:scale-102 active:scale-98 transition-all cursor-pointer shadow-3xs ${ev.bgClass}`}
                                    title={`${ev.title} - Click để xem chi tiết & đánh giá`}
                                  >
                                    <div className="flex justify-between items-center">
                                      <span className="font-extrabold">{ev.time}</span>
                                      <span className="text-[8px] opacity-80 uppercase font-black">{ev.subject}</span>
                                    </div>
                                    <p className="font-bold truncate">{ev.title}</p>
                                    <p className="text-[8px] font-medium opacity-90 truncate">GV: {ev.tutorName}</p>
                                  </div>
                                ))}
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Upcoming Lesson detail with Escrow Safeguards */}
            <div className="lg:col-span-4 space-y-5">
              
              {/* Escrow status card */}
              <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-5">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    Chi Tiết Lịch Học Thử Gần Nhất
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">Tiến trình xác minh & bảo vệ dòng tiền Escrow</p>
                </div>

                {/* Timeline flow chart */}
                <div className="relative pl-6 space-y-5 text-xs before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                  {/* Step 1 */}
                  <div className="relative">
                    <span className="absolute -left-[21px] w-4.5 h-4.5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white text-[9px] font-bold">✓</span>
                    <div>
                      <strong className="text-slate-800">Ký quỹ đặt cọc hoàn tất</strong>
                      <p className="text-[10px] text-slate-400">Đã khóa giữ 250,000đ học phí 1 buổi thử trên cổng trung gian bảo chứng an toàn.</p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="relative">
                    <span className="absolute -left-[21px] w-4.5 h-4.5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white text-[9px] font-bold">✓</span>
                    <div>
                      <strong className="text-slate-800">Gia sư xác nhận nhận lớp</strong>
                      <p className="text-[10px] text-slate-400">Gia sư {selectedTutorForDetail?.name || 'Nguyễn Hà My'} đã sẵn sàng dạy vào lúc {trialTime} ngày {trialDate}.</p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="relative">
                    <span className="absolute -left-[21px] w-4.5 h-4.5 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white text-[9px] font-bold">➔</span>
                    <div>
                      <strong className="text-blue-700">Chờ tiến hành học thử</strong>
                      <p className="text-[10px] text-slate-400">Buổi học được bảo hiểm 100% rủi ro, hoàn tiền cọc tức thì nếu gia sư vắng mặt.</p>
                    </div>
                  </div>
                </div>

                {/* Desktop actionable navigation links */}
                <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5 text-xs">
                  <button 
                    onClick={() => onNavigateSubPage('P-12')}
                    className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl cursor-pointer text-center transition-colors"
                  >
                    Đã học thử xong, viết Đánh giá
                  </button>
                  <button 
                    onClick={() => onNavigateSubPage('P-13')}
                    className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-[#1E40AF] font-bold rounded-xl cursor-pointer text-center transition-colors"
                  >
                    Báo cáo sự cố / Operator trợ giúp
                  </button>
                </div>
              </div>

              {/* Escrow assurance educational card */}
              <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-3xl p-5 shadow-sm space-y-3">
                <span className="text-[9px] bg-blue-500 text-white font-extrabold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                  🛡️ Escrow Safeguard
                </span>
                <h4 className="font-extrabold text-xs text-blue-100">Bảo chứng dòng tiền an toàn tuyệt đối</h4>
                <p className="text-[10px] leading-relaxed text-blue-200">
                  Học phí của học sinh được TutorMate giữ an toàn. Chỉ giải ngân cho gia sư sau khi buổi học kết thúc và nhận được phản hồi hài lòng 100% từ phụ huynh.
                </p>
              </div>

            </div>

          </div>

          {/* CUSTOM GOOGLE CALENDAR LESSON DETAIL & REVIEW MODAL */}
          {selectedCalendarEvent && (
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-250">
                {/* Header */}
                <div className="px-5 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] bg-blue-100 text-[#1E40AF] font-bold px-2 py-0.5 rounded-sm uppercase">
                      Chi tiết & Đánh giá buổi học thử
                    </span>
                    <h3 className="font-extrabold text-slate-800 text-sm mt-1">
                      {selectedCalendarEvent.title}
                    </h3>
                  </div>
                  <button 
                    type="button"
                    onClick={() => {
                      setSelectedCalendarEvent(null);
                      setEventReviewSubmitted(false);
                    }}
                    className="p-1 rounded-lg hover:bg-slate-200 text-slate-400 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
                  
                  {eventReviewSubmitted ? (
                    // Submission Success State
                    <div className="text-center py-6 space-y-4">
                      <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100 animate-bounce">
                        <Check className="w-8 h-8" />
                      </div>
                      <div className="space-y-1.5">
                        <h4 className="font-black text-sm text-slate-800">Gửi Đánh Giá Thành Công! 🎉</h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed px-6">
                          Cảm ơn phụ huynh đã đóng góp nhận xét quý giá. Hệ thống đã tự động kích hoạt **giải ngân học phí cọc Escrow** cho gia sư **{selectedCalendarEvent.tutorName}** một cách an toàn và minh bạch.
                        </p>
                      </div>
                      <div className="pt-3">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCalendarEvent(null);
                            setEventReviewSubmitted(false);
                          }}
                          className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs cursor-pointer transition-colors"
                        >
                          Đóng cửa sổ
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Lesson Details & Review Form State
                    <div className="space-y-5 text-xs">
                      
                      {/* Lesson details block */}
                      <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <div>
                          <span className="text-slate-400 font-bold text-[10px] block uppercase">GIA SƯ ĐẢM NHẬN:</span>
                          <strong className="text-slate-800 text-xs">{selectedCalendarEvent.tutorName}</strong>
                          <p className="text-[10px] text-slate-500">Đại học Sư Phạm Hà Nội</p>
                        </div>
                        <div>
                          <span className="text-slate-400 font-bold text-[10px] block uppercase">THỜI GIAN HỌC:</span>
                          <strong className="text-slate-800 text-xs">{selectedCalendarEvent.time} ngày {selectedCalendarEvent.date}</strong>
                          <p className="text-[10px] text-slate-500">Thời lượng: {selectedCalendarEvent.duration}</p>
                        </div>
                      </div>

                      {/* Syllabus & Tutor Assessment Details */}
                      <div className="space-y-3 border-t border-b border-slate-100 py-4">
                        <div className="space-y-1">
                          <strong className="text-slate-800 font-extrabold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                            Nội dung bài giảng đã học:
                          </strong>
                          <p className="text-slate-600 pl-2.5 leading-relaxed bg-blue-50/40 p-2 rounded-lg text-[11px]">
                            {selectedCalendarEvent.subject === 'Toán' 
                              ? 'Chuyên đề ôn thi rút gọn biểu thức, hệ thức lượng trong tam giác vuông, kỹ thuật phân tích đa thức thành nhân tử nhanh.'
                              : selectedCalendarEvent.subject === 'Tiếng Anh'
                                ? 'Thì hiện tại hoàn thành (Present Perfect), rèn luyện ngữ pháp chuyên sâu & luyện phát âm phản xạ 1-1.'
                                : selectedCalendarEvent.subject === 'Vật Lý'
                                  ? 'Định luật Ôm đối với đoạn mạch nối tiếp & song song. Thực hành tính toán điện trở tương đương.'
                                  : 'Lập công thức hóa học, cân bằng phương trình phản ứng hóa học & tính theo phương trình.'
                            }
                          </p>
                        </div>

                        <div className="space-y-1">
                          <strong className="text-slate-800 font-extrabold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                            Đánh giá sơ bộ từ Gia sư:
                          </strong>
                          <p className="text-slate-600 pl-2.5 leading-relaxed bg-amber-50/30 p-2 rounded-lg text-[11px] italic">
                            "Học sinh có tư duy cơ bản khá tốt, tiếp thu công thức nhanh. Tuy nhiên kỹ năng vẽ hình phụ còn lúng túng và tính toán phân số dễ bị nhầm dấu. Cần tăng cường luyện tập thêm các bài toán thực tế để đạt điểm 8.5+."
                          </p>
                        </div>
                      </div>

                      {/* Parent Feedback form (P-12 replica inside pop up) */}
                      <div className="space-y-4 pt-1 bg-white">
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3">
                          <strong className="text-slate-900 font-extrabold block text-xs">
                            📝 Đánh giá chất lượng của phụ huynh (P-12):
                          </strong>

                          {/* Interactive clickable stars */}
                          <div>
                            <span className="block text-slate-500 font-bold text-[10px] mb-1.5">Mức độ hài lòng:</span>
                            <div className="flex gap-1.5">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() => setEventRating(star)}
                                  className="text-2xl cursor-pointer hover:scale-110 active:scale-95 transition-all outline-none"
                                >
                                  <span className={star <= eventRating ? 'text-amber-400' : 'text-slate-200'}>
                                    ★
                                  </span>
                                </button>
                              ))}
                            </div>
                            <span className="text-[10px] text-slate-400 font-medium block mt-1">
                              {eventRating === 5 ? 'Tuyệt vời, hài lòng tuyệt đối' : eventRating === 4 ? 'Khá tốt, gia sư giảng dạy nhiệt tình' : 'Trung bình, cần cải thiện thêm'}
                            </span>
                          </div>

                          {/* Review Textarea comment box */}
                          <div>
                            <span className="block text-slate-500 font-bold text-[10px] mb-1">Nhận xét chi tiết:</span>
                            <textarea
                              rows={3}
                              value={eventReviewText}
                              onChange={(e) => setEventReviewText(e.target.value)}
                              placeholder="Mời phụ huynh viết bình luận chi tiết về thái độ dạy, khả năng truyền đạt kiến thức và tác phong sư phạm của gia sư..."
                              className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-blue-500 text-[11px] bg-white text-slate-800"
                            ></textarea>
                          </div>
                        </div>

                        {/* Submission and alternative replace buttons */}
                        <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              setReplacementContext({
                                subject: selectedCalendarEvent.subject,
                                tutorName: selectedCalendarEvent.tutorName,
                                rate: selectedCalendarEvent.subject === 'Toán' ? 250000 : selectedCalendarEvent.subject === 'Tiếng Anh' ? 280000 : 270000,
                                time: selectedCalendarEvent.time,
                                date: selectedCalendarEvent.date
                              });
                              setSelectedCalendarEvent(null);
                              onNavigateSubPage('P-12');
                            }}
                            className="flex-1 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl cursor-pointer text-center text-[10px] transition-colors border border-rose-200"
                          >
                            ❌ Thay thế gia sư khác
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => setEventReviewSubmitted(true)}
                            className="flex-2 py-2.5 bg-[#1E40AF] hover:bg-blue-800 text-white font-bold rounded-xl cursor-pointer text-center text-[10px] transition-colors shadow-sm shadow-blue-500/10"
                          >
                            🛡️ Gửi đánh giá & Giải ngân Escrow
                          </button>
                        </div>
                      </div>

                    </div>
                  )}

                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ======================================= */}
      {/* P-12: Đánh giá & thay thế (Split panel) */}
      {/* ======================================= */}
      {activeSubPage === 'P-12' && (
        <div className="space-y-6">
          
          {/* Layout Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Panel: Theo dõi & Đánh giá học thử (Filters + List of completed trials) */}
            <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
              <div>
                <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  Lịch Sử Đánh Giá & Theo Dõi Học Thử
                </h2>
                <p className="text-[11px] text-slate-500">Xem lại các buổi học thử đã qua và mức độ hài lòng của bạn</p>
              </div>

              {/* Filters for lesson evaluation tracking */}
              <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase mb-0.5">Môn học:</label>
                  <select className="w-full bg-white border border-slate-200 rounded-md p-1 text-[10px] outline-none text-slate-700 font-bold cursor-pointer">
                    <option>Tất cả môn</option>
                    <option>Môn Toán</option>
                    <option>Tiếng Anh</option>
                    <option>Vật Lý</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase mb-0.5">Gia sư:</label>
                  <select className="w-full bg-white border border-slate-200 rounded-md p-1 text-[10px] outline-none text-slate-700 font-bold cursor-pointer">
                    <option>Tất cả gia sư</option>
                    <option>Hà My</option>
                    <option>Minh Đức</option>
                    <option>Phương Thảo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase mb-0.5">Lịch học theo:</label>
                  <select className="w-full bg-white border border-slate-200 rounded-md p-1 text-[10px] outline-none text-slate-700 font-bold cursor-pointer">
                    <option>Tháng này</option>
                    <option>Tuần này</option>
                    <option>Cả năm</option>
                  </select>
                </div>
              </div>

              {/* List of evaluated lessons */}
              <div className="space-y-3">
                {[
                  {
                    id: 'rev-m-1',
                    title: 'Học thử Toán 9 - Chuyên đề Hình',
                    tutorName: 'Nguyễn Hà My',
                    date: '02/10/2026',
                    rating: 5,
                    comment: 'Gia sư giảng dạy vô cùng nhiệt tình, bám sát cấu trúc đề thi công lập. Bé nắm bắt hình vẽ tốt hơn nhiều.',
                    status: 'Đã hoàn tất giải ngân',
                    statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-100'
                  },
                  {
                    id: 'rev-m-2',
                    title: 'Học thử Tiếng Anh - Phát âm phản xạ',
                    tutorName: 'Lê Thị Phương Thảo',
                    date: '28/09/2026',
                    rating: 5,
                    comment: 'Nói tiếng Anh chuẩn bản ngữ, sửa phát âm cực tốt cho con. Phương pháp năng động giúp con hứng thú nói chuyện.',
                    status: 'Đã hoàn tất giải ngân',
                    statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-100'
                  },
                  {
                    id: 'rev-m-3',
                    title: 'Học thử Vật Lý - Điện trở mạch hỗn hợp',
                    tutorName: 'Vũ Minh Tuấn',
                    date: '24/09/2026',
                    rating: 4,
                    comment: 'Dạy khoa học, có giáo trình tự soạn logic. Chỉ có điều con bị mệt nên buổi học hơi chậm nhịp.',
                    status: 'Đã hoàn tất giải ngân',
                    statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-100'
                  }
                ].map((item) => (
                  <div key={item.id} className="border border-slate-100 bg-white rounded-2xl p-4 space-y-2.5 shadow-3xs">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <strong className="text-slate-800 text-[11px] block">{item.title}</strong>
                        <span className="text-[10px] text-slate-400">Gia sư: **{item.tutorName}** · Ngày: {item.date}</span>
                      </div>
                      <span className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded-sm border shrink-0 ${item.statusColor}`}>
                        {item.status}
                      </span>
                    </div>

                    {/* Star Display */}
                    <div className="flex gap-1 text-amber-400 text-xs">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>

                    <p className="text-[11px] text-slate-600 leading-relaxed italic bg-slate-50/50 p-2.5 rounded-lg border border-slate-100">
                      "{item.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Panel: AI replacement Chatbot dialogue */}
            <div className="lg:col-span-6 bg-slate-900 text-slate-100 border border-slate-800 rounded-3xl p-5 shadow-xl flex flex-col h-[560px] justify-between relative overflow-hidden">
              {/* Background gradient grid effect */}
              <div className="absolute inset-0 bg-radial-at-t from-slate-800/40 via-transparent to-transparent pointer-events-none"></div>

              {/* Chatbot Header */}
              <div className="border-b border-slate-800 pb-3 z-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-extrabold text-white text-xs shadow-md">
                    🤖
                  </div>
                  <div>
                    <h3 className="font-extrabold text-xs text-white">Trợ Lý Đổi Gia Sư Thông Minh</h3>
                    <p className="text-[9px] text-slate-400">Tự động tìm kiếm & đề xuất ứng viên thay thế tốt nhất</p>
                  </div>
                </div>
              </div>

              {/* Chat Messages Log */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4 z-10 pr-1 scrollbar-thin scrollbar-thumb-slate-800">
                {replacementContext ? (
                  // Contextual Dialogue based on the replacement requested
                  <>
                    {/* User Prompt representing auto-injected request */}
                    <div className="flex justify-end">
                      <div className="bg-blue-600 text-white rounded-2xl rounded-tr-none px-3.5 py-2.5 max-w-[85%] text-xs shadow-xs space-y-1">
                        <strong className="text-[10px] font-black opacity-90 block uppercase">🔄 YÊU CẦU THAY THẾ GIA SƯ:</strong>
                        <p className="leading-relaxed">
                          Tôi muốn đổi gia sư môn <strong className="text-white font-extrabold">{replacementContext.subject}</strong> khác thay thế cho **{replacementContext.tutorName}**.
                        </p>
                        <div className="pt-1.5 border-t border-blue-500/50 text-[10px] space-y-0.5 opacity-95">
                          <p>· Lịch trống mong muốn: <strong>{replacementContext.time} ngày {replacementContext.date}</strong></p>
                          <p>· Thù lao ước lượng: <strong>{replacementContext.rate.toLocaleString('vi-VN')} đ/buổi</strong></p>
                        </div>
                      </div>
                    </div>

                    {/* AI automated response */}
                    <div className="flex gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center font-black text-[10px] text-white shrink-0 shadow-sm">
                        AI
                      </div>
                      <div className="bg-slate-800 text-slate-200 rounded-2xl rounded-tl-none px-3.5 py-3 max-w-[85%] text-[11px] leading-relaxed space-y-3 shadow-md border border-slate-800">
                        <p>
                          Chào phụ huynh! Tôi đã tiếp nhận yêu cầu thay đổi gia sư dạy học cho bé từ lớp của gia sư **{replacementContext.tutorName}**.
                        </p>
                        <p>
                          Hệ thống AI đã tự động phân tích và trích lọc từ danh sách 38 hồ sơ để chọn ra **3 gia sư môn {replacementContext.subject}** có cùng khung lịch rảnh rỗi và thù lao, nhưng sở hữu điểm Matching Score vượt trội **(97%+)**:
                        </p>

                        {/* List of recommended replacement tutors */}
                        <div className="space-y-2.5 pt-1">
                          {[
                            {
                              id: 'rep-t-1',
                              name: 'Phạm Thanh Thảo',
                              university: 'Đại Học Ngoại Thương',
                              matchScore: 98,
                              rate: 260000,
                              achievement: 'Học bổng khuyến khích, IELTS 8.0, 4 năm ôn thi lớp 9.'
                            },
                            {
                              id: 'rep-t-2',
                              name: 'Đỗ Hoàng Long',
                              university: 'Đại Học Quốc Gia HN',
                              matchScore: 97,
                              rate: 250000,
                              achievement: 'Giải Nhất HSG, Chuyên Toán Sư Phạm, dạy kèm cực mát tay.'
                            }
                          ].map(t => (
                            <div key={t.id} className="bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-2 flex flex-col justify-between hover:border-blue-500 transition-colors">
                              <div>
                                <div className="flex justify-between items-center">
                                  <strong className="text-white font-extrabold text-[11px]">{t.name}</strong>
                                  <span className="text-[9px] bg-emerald-500/10 text-emerald-400 font-extrabold px-1.5 py-0.5 rounded-sm">
                                    {t.matchScore}% Match
                                  </span>
                                </div>
                                <p className="text-[10px] text-slate-400 mt-0.5">{t.university} · {t.rate.toLocaleString('vi-VN')} đ/buổi</p>
                                <p className="text-[10px] text-slate-300 line-clamp-1 italic mt-1 font-medium">"{t.achievement}"</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  alert(`Đã đặt lịch học thử thành công với gia sư thay thế: ${t.name}! Hệ thống sẽ gửi tin nhắn SMS xác nhận tới bạn.`);
                                  setReplacementContext(null);
                                  onNavigateSubPage('P-11');
                                }}
                                className="w-full py-1.5 bg-[#1E40AF] hover:bg-blue-800 text-white font-black text-[9px] rounded-lg transition-colors cursor-pointer text-center"
                              >
                                Đăng ký đặt lịch học thử ngay &rarr;
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  // Default welcome / idle chatbot state
                  <div className="flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center font-black text-[10px] text-white shrink-0">
                      AI
                    </div>
                    <div className="bg-slate-800 text-slate-300 rounded-2xl rounded-tl-none px-3.5 py-3 max-w-[85%] text-[11px] leading-relaxed space-y-2.5">
                      <p className="font-bold text-white text-xs">Xin chào phụ huynh!</p>
                      <p>
                        Tôi là Trợ Lý Tìm Gia Sư Thay Thế. Nhờ công nghệ phân tích thông minh, tôi luôn túc trực để hỗ trợ phụ huynh điều chỉnh lớp học hoặc tìm kiếm gia sư mới chất lượng tốt hơn bất cứ lúc nào.
                      </p>
                      <p className="text-[10px] text-slate-400 italic">
                        💡 Mách nhỏ: Vui lòng click nút **"Thay thế gia sư khác"** ở lịch học thử (màn hình P-11) để tôi lấy thông tin môn học, lịch và thù lao để gợi ý lập tức ứng viên sáng giá.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input Area */}
              <div className="border-t border-slate-800 pt-3 z-10 flex gap-2">
                <input 
                  type="text" 
                  placeholder="Hỏi trợ lý về thông tin gia sư, học phí, lịch..."
                  className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl outline-none focus:border-blue-500 text-[11px] text-white"
                  disabled
                />
                <button 
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-[10px] cursor-not-allowed opacity-50"
                  disabled
                >
                  Gửi
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ======================================= */}
      {/* P-13: Nhân viên / an toàn               */}
      {/* ======================================= */}
      {activeSubPage === 'P-13' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 text-xs">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Trung Tâm Hỗ Trợ Khách Hàng & An Toàn</h2>
            <p className="text-xs text-slate-500">Cam kết bảo chứng quyền lợi cho phụ huynh và học sinh</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="border border-slate-100 bg-slate-50 p-5 rounded-xl space-y-3">
              <h3 className="font-bold text-slate-800 text-sm">🛡 Quy trình Escrow bảo vệ tài chính</h3>
              <p className="text-slate-600 leading-relaxed">
                TutorMate áp dụng cơ chế ví trung gian giữ phí học thử. Tiền chỉ được chuyển giao cho gia sư sau khi buổi học thử được phụ huynh đánh giá thành công. Nếu gia sư vắng mặt hoặc chất lượng kém, tiền cọc được hoàn trả 100% trong 24h.
              </p>
            </div>

            <div className="border border-slate-100 bg-slate-50 p-5 rounded-xl space-y-3">
              <h3 className="font-bold text-slate-800 text-sm">📞 Hotline hỗ trợ khẩn cấp 24/7</h3>
              <p className="text-slate-600 leading-relaxed">
                Đội ngũ Operator chuyên nghiệp sẵn sàng can thiệp giải quyết mọi mâu thuẫn học thuật, hành vi không đúng đắn hoặc điều chỉnh lịch học khẩn cấp.
              </p>
              <div className="font-bold text-blue-700 bg-white border border-blue-100 p-2.5 rounded-lg text-center font-mono">
                HOTLINE: 1900 - 8899 - TMT
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
