import React, { useState } from 'react';
import { mockTrialRequests } from '../data/mockData';
import { 
  Inbox, UserCheck, ShieldCheck, Star, FileText, Check, Upload, Calendar, Lock, AlertCircle, ArrowLeft, Camera
} from 'lucide-react';

interface TutorViewProps {
  activeSubPage: string;
  onNavigateSubPage: (pageId: string) => void;
}

export default function TutorView({ activeSubPage, onNavigateSubPage }: TutorViewProps) {
  // Tutor local states
  const [trialReqs, setTrialReqs] = useState(mockTrialRequests);
  const [profileName, setProfileName] = useState('Nguyễn Hà My');
  const [profileRate, setProfileRate] = useState(250000);
  
  // Custom comprehensive profile states
  const [profileSubject, setProfileSubject] = useState('Toán học');
  const [profileExperience, setProfileExperience] = useState(5); // 0, 5, 10, 15, 20
  const [profileAchievement, setProfileAchievement] = useState('Giải Nhì Học sinh giỏi Quốc gia môn Toán, GPA Sư Phạm 3.82/4.0');
  const [profileDegree, setProfileDegree] = useState('Đại học Sư Phạm Hà Nội (Khoa Sư phạm Toán học)');
  const [profileReviews, setProfileReviews] = useState('4.9/5★ (Trực quan từ 18 phụ huynh: "Cô giảng kiên trì, có lộ trình rõ nét giúp con tự tin")');
  const [profileTeachingStyle, setProfileTeachingStyle] = useState('Thực tế, rèn kỹ năng phản xạ tư duy ngược và giải đề chuyên sâu');
  const [profilePersonality, setProfilePersonality] = useState('Vui vẻ, kiên nhẫn, cẩn trọng, tâm lý với học sinh');
  const [profileCommSkills, setProfileCommSkills] = useState('Xuất sắc (Truyền đạt mạch lạc, phản xạ giao tiếp trôi chảy tốt)');
  const [profileDistance, setProfileDistance] = useState(10); // km
  const [profileTeachingFormat, setProfileTeachingFormat] = useState('Cả hai (Online & Offline)');
  const [profileGender, setProfileGender] = useState('Nữ');
  const [profileBirthYear, setProfileBirthYear] = useState(2004);
  const currentYear = 2026;
  const profileAge = currentYear - profileBirthYear;
  const [profileSchedule, setProfileSchedule] = useState<string[]>(['Tối Thứ 2', 'Tối Thứ 4', 'Chiều Thứ 7']);
  
  // Image.png state variables
  const [profilePhone, setProfilePhone] = useState('0987 654 321');
  const [profileEmail, setProfileEmail] = useState('nguyenvanA@gmail.com');
  const [profileIntro, setProfileIntro] = useState('Mình là sinh viên năm cuối trường Đại học Sư phạm Hà Nội, chuyên ngành Toán học.\nCó 3 năm kinh nghiệm dạy kèm, yêu thích việc truyền đạt kiến thức và giúp học sinh tiến bộ.\nRất mong được đồng hành cùng các bạn học sinh!');
  const [activeTab, setActiveTab] = useState('Thông tin cá nhân');

  // Tab 'Chuyên môn & năng lực' state variables
  const [availableSubjects, setAvailableSubjects] = useState<string[]>([
    'Toán học', 'Vật Lý', 'Hóa Học', 'Tiếng Anh', 'Ngữ Văn', 'Sinh Học',
    'Lịch Sử', 'Địa Lý', 'Tin Học', 'Khoa học tự nhiên', 'Tiểu học',
    'Tiếng Trung', 'Tiếng Nhật', 'Tiếng Hàn'
  ]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['Toán học', 'Vật Lý', 'Hóa Học']);
  const [selectedExpertises, setSelectedExpertises] = useState<string[]>(['Toán nâng cao / Thi chuyên', 'Lý chuyên / Lớp 9-12', 'Hóa chuyên / Lớp 8-12']);
  const [selectedCerts, setSelectedCerts] = useState<string[]>(['Chứng chỉ IELTS 7.5', 'Chứng chỉ Tin học văn phòng']);
  const [highestDegree, setHighestDegree] = useState('Đại học');
  const [major, setMajor] = useState('Sư phạm Toán');
  const [university, setUniversity] = useState('Đại học Sư Phạm Hà Nội');
  const [achievementsText, setAchievementsText] = useState('- Giải Nhất HSG Toán cấp Tỉnh năm 2022\n- Giải Ba HSG Vật Lý cấp Thành phố năm 2021\n- Học bổng khuyến khích học tập 4 năm liên tiếp tại ĐHSP Hà Nội');

  // Tab 'Kinh nghiệm & phương pháp' state variables
  const [expYears, setExpYears] = useState(5); // 0, 5, 10, 15, 20
  const [selectedStyles, setSelectedStyles] = useState<string[]>(['Kiên nhẫn, chậm rãi, bám sát SGK']);
  const [commSkillsIntro, setCommSkillsIntro] = useState('Tôi có khả năng truyền đạt dễ hiểu, linh hoạt điều chỉnh theo trình độ của từng học sinh. Luôn tạo không khí học tập thoải mái, thân thiện nhưng vẫn đảm bảo kỷ luật và hiệu quả. Tôi thường sử dụng ví dụ thực tế, hình ảnh và sơ đồ để giúp bài học trở nên sinh động và dễ hiểu hơn.');

  // Dynamic 4-column experience table state
  const [experienceRows, setExperienceRows] = useState<Array<{
    id: string;
    subject: string;
    format: 'Online' | 'Offline' | 'Cả hai';
    years: string;
    selfEvaluation: string;
  }>>([
    { id: '1', subject: 'Toán học', format: 'Cả hai', years: 'Dưới 5 năm', selfEvaluation: 'Chuyên dạy toán nâng cao ôn thi lớp 10 chuyên và HSG cấp Tỉnh.' },
    { id: '2', subject: 'Vật Lý', format: 'Offline', years: 'Dưới 3 năm', selfEvaluation: 'Dạy kèm Lý lớp 10, 11, 12 lấy lại gốc vững vàng, cam kết điểm thi học kỳ > 8.0' },
    { id: '3', subject: 'Hóa Học', format: 'Online', years: 'Dưới 2 năm', selfEvaluation: 'Hỗ trợ bồi dưỡng kiến thức cơ bản hóa cấp 2, 3 mất gốc nhanh chóng.' }
  ]);

  // Tab 'Hình thức & khu vực dạy & Học phí' state variables
  const [tutorFormat, setTutorFormat] = useState<'Chỉ Offline' | 'Chỉ Online' | 'Cả hai hình thức'>('Cả hai hình thức');
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>(['Quận Cầu Giấy', 'Quận Đống Đa', 'Quận Thanh Xuân', 'Quận Hai Bà Trưng']);
  const [tutorMaxDistance, setTutorMaxDistance] = useState(10); // km
  const [rateRequest, setRateRequest] = useState(250000);
  const [rateOnline, setRateOnline] = useState(200000);
  const [rateOffline, setRateOffline] = useState(250000);

  // Filter & calendar views states for T-04 Hộp yêu cầu dạy thử
  const [viewMode, setViewMode] = useState<'list' | 'week' | 'month'>('list');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All');
  const [selectedCalendarDay, setSelectedCalendarDay] = useState<number>(24);

  // Tab 'Quản lý phản hồi' state variables
  const [reviewsList, setProfileReviewsList] = useState([
    {
      id: 'rev-1',
      parentName: 'Chị Mai Anh',
      studentGrade: 'Học sinh lớp 9',
      subject: 'Toán học ôn thi vào 10',
      rating: 5,
      date: '2026-09-28',
      comment: 'Thầy dạy cực kỳ có tâm, kiên nhẫn bám sát lộ trình. Con mình từ chỗ sợ học Toán nay đã tự tin làm được bài nâng cao 8+.',
      reply: 'Dạ cảm ơn chị đã tin tưởng! Bé Mai Anh rất thông minh, chỉ cần khơi gợi tinh thần tự học đúng cách là phát huy tối đa thực lực ngay ạ.',
      tags: ['Tận tâm', 'Dễ hiểu', 'Đạt điểm cao']
    },
    {
      id: 'rev-2',
      parentName: 'Anh Quốc Tuấn',
      studentGrade: 'Học sinh lớp 12',
      subject: 'Vật lý luyện thi THPTQG',
      rating: 5,
      date: '2026-09-24',
      comment: 'Lộ trình luyện thi SAT và THPTQG cực kỳ khoa học. Phương pháp giải nhanh bằng sơ đồ tư duy giúp con tiết kiệm thời gian làm trắc nghiệm.',
      reply: '',
      tags: ['Sáng tạo', 'Phương pháp tốt', 'Giải nhanh']
    },
    {
      id: 'rev-3',
      parentName: 'Cô Thu Hương',
      studentGrade: 'Học sinh lớp 11',
      subject: 'Hóa học cấp tốc',
      rating: 4,
      date: '2026-09-20',
      comment: 'Thầy nhiệt tình, giáo án chuẩn bị chu đáo. Con tiến bộ nhanh, tuy nhiên cần cho thêm nhiều bài tập tự luyện về nhà hơn.',
      reply: 'Dạ cảm ơn góp ý quý báu của cô ạ! Em sẽ tăng cường thêm các dạng bài tự luyện phân bậc độ khó cho con rèn luyện thêm tại nhà ạ.',
      tags: ['Kiên nhẫn', 'Nhiệt tình']
    }
  ]);
  const [replyInputText, setReplyInputText] = useState<{ [key: string]: string }>({});
  const [selectedRatingFilter, setSelectedRatingFilter] = useState<string>('All');
  const [selectedTagFilter, setSelectedTagFilter] = useState<string>('All');

  const [uploadedFiles, setUploadedFiles] = useState<{ cccd: boolean; diploma: boolean; studentCard: boolean }>({
    cccd: true,
    diploma: true,
    studentCard: true
  });
  const [verificationStatus, setVerificationStatus] = useState<'approved' | 'pending'>('approved');

  const handleAcceptRequest = (id: string) => {
    setTrialReqs(prev => prev.map(req => req.id === id ? { ...req, status: 'accepted' } : req));
  };

  const handleDeclineRequest = (id: string) => {
    setTrialReqs(prev => prev.map(req => req.id === id ? { ...req, status: 'declined' } : req));
  };

  const handleUploadFile = (field: 'cccd' | 'diploma' | 'studentCard') => {
    setUploadedFiles(prev => ({ ...prev, [field]: true }));
    alert(`Tải lên tài liệu thành công! Đang chuyển tiếp hồ sơ đến Operator duyệt.`);
  };

  return (
    <div className="space-y-6">
      
      {/* ======================================= */}
      {/* T-04: Hộp yêu cầu học thử               */}
      {/* ======================================= */}
      {activeSubPage === 'T-04 Hộp yêu cầu học thử' && (
        <div className="space-y-6">
          
          {/* Header row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-slate-200 p-5 rounded-3xl shadow-3xs">
            <div>
              <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
                Hộp Thư Yêu Cầu Dạy Học Thử (T-04)
              </h2>
              <p className="text-[11px] text-slate-500 mt-0.5">Lời mời dạy thử trực tiếp gửi tới bạn từ hệ thống Matching Engine dựa trên điểm Score 92%</p>
            </div>
            {/* View Mode Toggle buttons */}
            <div className="flex bg-slate-100 p-1 rounded-xl gap-1 self-stretch sm:self-auto shadow-3xs shrink-0">
              {[
                { id: 'list', label: '📋 Danh sách' },
                { id: 'week', label: '📅 Lịch tuần' },
                { id: 'month', label: '📆 Lịch tháng' }
              ].map(mode => (
                <button
                  key={mode.id}
                  onClick={() => setViewMode(mode.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold transition-all cursor-pointer ${
                    viewMode === mode.id 
                      ? 'bg-white text-blue-700 shadow-3xs' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>

          {/* Filters Bar Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-center">
            
            {/* Subject filter */}
            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide block">Lọc theo môn học</label>
              <select
                value={selectedSubjectFilter}
                onChange={(e) => setSelectedSubjectFilter(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 bg-white rounded-xl outline-none focus:border-blue-500 text-slate-700 font-bold text-xs cursor-pointer shadow-3xs"
              >
                <option value="All">🔍 Tất cả môn học</option>
                <option value="Toán học">Toán học</option>
                <option value="Tiếng Anh">Tiếng Anh</option>
                <option value="Vật lý">Vật lý</option>
              </select>
            </div>

            {/* Status filter */}
            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide block">Lọc trạng thái phê duyệt</label>
              <select
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 bg-white rounded-xl outline-none focus:border-blue-500 text-slate-700 font-bold text-xs cursor-pointer shadow-3xs"
              >
                <option value="All">🚦 Tất cả trạng thái</option>
                <option value="pending">⏳ Chờ phản hồi (Pending)</option>
                <option value="accepted">✓ Đã đồng ý (Accepted)</option>
                <option value="declined">✕ Đã từ chối (Declined)</option>
              </select>
            </div>

            {/* Total Indicator */}
            <div className="text-right sm:text-left md:text-right text-[10px] text-slate-400 font-extrabold sm:col-span-2 md:col-span-1 pt-2 sm:pt-0">
              <span className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-xl border border-blue-100">
                Tìm thấy {
                  trialReqs.filter(req => {
                    const matchesSubject = selectedSubjectFilter === 'All' || req.subject.toLowerCase().includes(selectedSubjectFilter.toLowerCase());
                    const matchesStatus = selectedStatusFilter === 'All' || req.status === selectedStatusFilter;
                    return matchesSubject && matchesStatus;
                  }).length
                } yêu cầu phù hợp
              </span>
            </div>

          </div>

          {/* ======================================= */}
          {/* View Mode 1: LIST VIEW                  */}
          {/* ======================================= */}
          {viewMode === 'list' && (
            <div className="space-y-4">
              {trialReqs
                .filter(req => {
                  const matchesSubject = selectedSubjectFilter === 'All' || req.subject.toLowerCase().includes(selectedSubjectFilter.toLowerCase());
                  const matchesStatus = selectedStatusFilter === 'All' || req.status === selectedStatusFilter;
                  return matchesSubject && matchesStatus;
                })
                .map(req => (
                  <div key={req.id} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-3xs flex flex-col md:flex-row justify-between items-start md:items-center gap-5 hover:border-blue-200 transition-colors">
                    
                    {/* Left part */}
                    <div className="space-y-3 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-blue-50 text-[#1E40AF] flex items-center justify-center font-bold text-xs shrink-0">
                          👤
                        </span>
                        <div>
                          <strong className="text-slate-800 font-black text-sm">{req.parentName}</strong>
                          <span className="text-[10px] text-slate-400 font-bold ml-1.5">({req.studentGrade})</span>
                        </div>
                        <span className="text-[9px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md font-extrabold border border-blue-100 uppercase tracking-wide">
                          {req.subject}
                        </span>
                        <span className="text-[9px] text-slate-400 font-medium">Yêu cầu từ: {req.dateRequested}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50/50 p-3 rounded-2xl border border-slate-100 text-xs text-slate-600 font-medium">
                        <div>📍 Địa điểm: <strong className="text-slate-800 block mt-0.5 font-bold">{req.location}</strong></div>
                        <div>🕒 Lịch hẹn: <strong className="text-slate-800 block mt-0.5 font-bold">{req.schedule}</strong></div>
                        <div>💰 Thù lao đề xuất: <strong className="text-[#1E40AF] block mt-0.5 font-black font-mono">{req.budget}</strong></div>
                      </div>
                    </div>

                    {/* Right part - Accept / Decline */}
                    <div className="flex md:flex-col justify-end gap-2 shrink-0 w-full md:w-auto border-t md:border-t-0 border-slate-100 pt-3 md:pt-0">
                      {req.status === 'pending' ? (
                        <>
                          <button 
                            onClick={() => {
                              handleAcceptRequest(req.id);
                              alert(`Đã nhận lớp học thử của phụ huynh ${req.parentName}! Lịch hẹn học đã lưu vào hệ thống.`);
                            }}
                            className="flex-1 md:flex-none px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl cursor-pointer text-xs transition-colors shadow-sm shadow-emerald-500/10 text-center"
                          >
                            Chấp nhận dạy thử
                          </button>
                          <button 
                            onClick={() => {
                              handleDeclineRequest(req.id);
                              alert(`Đã từ chối lời mời dạy thử của ${req.parentName}.`);
                            }}
                            className="flex-1 md:flex-none px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl cursor-pointer text-xs transition-colors text-center border border-slate-200"
                          >
                            Từ chối
                          </button>
                        </>
                      ) : req.status === 'accepted' ? (
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-50 text-emerald-700 font-bold rounded-xl border border-emerald-100 text-xs self-end">
                          <Check className="w-3.5 h-3.5" /> Đã chấp thuận dạy thử
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-rose-50 text-rose-700 font-bold rounded-xl border border-rose-100 text-xs self-end">
                          ✕ Đã từ chối lời mời
                        </span>
                      )}
                    </div>

                  </div>
                ))}
              
              {trialReqs.filter(req => {
                const matchesSubject = selectedSubjectFilter === 'All' || req.subject.toLowerCase().includes(selectedSubjectFilter.toLowerCase());
                const matchesStatus = selectedStatusFilter === 'All' || req.status === selectedStatusFilter;
                return matchesSubject && matchesStatus;
              }).length === 0 && (
                <div className="bg-slate-50 text-slate-400 p-12 text-center rounded-3xl border border-dashed border-slate-200">
                  <span className="text-3xl block mb-2">🔍</span>
                  <span className="font-bold text-xs">Không tìm thấy yêu cầu học thử nào thỏa mãn bộ lọc!</span>
                </div>
              )}
            </div>
          )}

          {/* ======================================= */}
          {/* View Mode 2: WEEK CALENDAR VIEW         */}
          {/* ======================================= */}
          {viewMode === 'week' && (
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
              <div className="text-center font-bold text-xs text-slate-500 flex justify-between items-center pb-2 border-b border-slate-100">
                <span>&larr; Tuần từ 21/09/2026 - 27/09/2026</span>
                <span className="text-blue-700 text-sm font-extrabold uppercase">Lịch Biểu Học Thử Trong Tuần</span>
                <span>Tuần tiếp theo &rarr;</span>
              </div>

              {/* Grid 7 days (Monday - Sunday) */}
              <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
                {[
                  { name: 'Thứ 2', label: 'T2 (21/9)' },
                  { name: 'Thứ 3', label: 'T3 (22/9)', hasReqs: ['req-1'] },
                  { name: 'Thứ 4', label: 'T4 (23/9)', hasReqs: ['req-2'] },
                  { name: 'Thứ 5', label: 'T5 (24/9)', hasReqs: ['req-1'] },
                  { name: 'Thứ 6', label: 'T6 (25/9)', hasReqs: ['req-3'] },
                  { name: 'Thứ 7', label: 'T7 (26/9)', hasReqs: ['req-2'] },
                  { name: 'Chủ Nhật', label: 'CN (27/9)', hasReqs: ['req-2'] }
                ].map(day => {
                  // Get matching requests
                  const dayReqs = trialReqs.filter(r => {
                    const matchesSubject = selectedSubjectFilter === 'All' || r.subject.toLowerCase().includes(selectedSubjectFilter.toLowerCase());
                    const matchesStatus = selectedStatusFilter === 'All' || r.status === selectedStatusFilter;
                    if (!matchesSubject || !matchesStatus) return false;
                    
                    if (day.name === 'Thứ 3' || day.name === 'Thứ 5') return r.id === 'req-1';
                    if (day.name === 'Thứ 4' || day.name === 'Thứ 7' || day.name === 'Chủ Nhật') return r.id === 'req-2';
                    if (day.name === 'Thứ 2' || day.name === 'Thứ 6') return r.id === 'req-3';
                    return false;
                  });

                  return (
                    <div key={day.name} className="border border-slate-100 rounded-2xl p-3 bg-slate-50/50 flex flex-col justify-between min-h-[160px] space-y-3">
                      <div className="border-b border-slate-100 pb-1 text-center shrink-0">
                        <strong className="text-slate-800 text-[11px] block">{day.label}</strong>
                      </div>

                      {/* Display placed request pills */}
                      <div className="flex-1 space-y-1.5 overflow-y-auto">
                        {dayReqs.map(req => (
                          <div 
                            key={req.id}
                            onClick={() => alert(`Yêu cầu từ phụ huynh: ${req.parentName}\nMôn: ${req.subject}\nLịch học: ${req.schedule}\nHọc phí: ${req.budget}\nTrạng thái: ${req.status}`)}
                            className={`p-2 rounded-xl text-[10px] font-bold text-left cursor-pointer transition-all shadow-3xs ${
                              req.status === 'accepted' 
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                                : req.status === 'declined'
                                ? 'bg-rose-50 text-rose-800 border border-rose-200'
                                : 'bg-blue-50 text-blue-800 border border-blue-200 hover:scale-103'
                            }`}
                          >
                            <span className="block truncate font-black text-slate-800">{req.parentName}</span>
                            <span className="block truncate text-[9px] mt-0.5 text-slate-500 font-semibold">{req.subject}</span>
                            <span className="inline-block mt-1 text-[8px] bg-white px-1 py-0.5 rounded border border-slate-100 font-extrabold">
                              {req.status === 'pending' ? '⏳ Chờ' : req.status === 'accepted' ? '✓ Nhận' : '✕ Từ chối'}
                            </span>
                          </div>
                        ))}
                        {dayReqs.length === 0 && (
                          <div className="h-full flex items-center justify-center">
                            <span className="text-[9px] text-slate-400 font-medium">Lịch trống</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-[9px] text-slate-400 italic">💡 Mẹo: Nhấp vào từng ô thẻ lịch hẹn để xem tóm tắt thông tin chi tiết lời mời dạy học thử.</p>
            </div>
          )}

          {/* ======================================= */}
          {/* View Mode 3: MONTH CALENDAR VIEW        */}
          {/* ======================================= */}
          {viewMode === 'month' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Calendar grid on Left (8 cols) */}
              <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="text-slate-400 text-xs font-bold">&larr; Tháng 8/2026</span>
                  <strong className="text-slate-900 font-black text-sm uppercase">Tháng 9 năm 2026</strong>
                  <span className="text-slate-400 text-xs font-bold">Tháng 10/2026 &rarr;</span>
                </div>

                {/* Day labels header */}
                <div className="grid grid-cols-7 gap-1 text-center font-extrabold text-[9px] text-slate-400 uppercase">
                  {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(d => <div key={d} className="py-1">{d}</div>)}
                </div>

                {/* Grid 35 cells for September 2026 */}
                {/* September 2026 starts on a Tuesday (day 2 of grid if Monday is index 0) */}
                <div className="grid grid-cols-7 gap-2">
                  {/* Empty cell for Monday (August 31) */}
                  <div className="bg-slate-50/30 rounded-xl min-h-[55px] p-1 text-slate-300 text-[10px] font-bold">31</div>
                  
                  {Array.from({ length: 30 }).map((_, i) => {
                    const dayNum = i + 1;
                    
                    // Identify matching requests on specific dates
                    // Sept 23: req-2
                    // Sept 24: req-3
                    // Sept 25: req-1
                    const hasReqs = dayNum === 23 || dayNum === 24 || dayNum === 25;
                    const dayReqs = trialReqs.filter(r => {
                      if (dayNum === 23) return r.id === 'req-2';
                      if (dayNum === 24) return r.id === 'req-3';
                      if (dayNum === 25) return r.id === 'req-1';
                      return false;
                    });

                    const isSelected = selectedCalendarDay === dayNum;

                    return (
                      <div 
                        key={dayNum}
                        onClick={() => setSelectedCalendarDay(dayNum)}
                        className={`min-h-[55px] p-1.5 rounded-2xl border text-left cursor-pointer transition-all flex flex-col justify-between shadow-3xs ${
                          isSelected 
                            ? 'bg-blue-600 text-white border-blue-700 ring-2 ring-blue-100 scale-102' 
                            : 'bg-white hover:bg-slate-50 border-slate-150 text-slate-800'
                        }`}
                      >
                        <span className="text-[10px] font-black">{dayNum}</span>
                        <div className="flex gap-1">
                          {dayReqs.map(r => (
                            <span 
                              key={r.id} 
                              className={`w-2 h-2 rounded-full inline-block ${
                                r.status === 'accepted' 
                                  ? 'bg-emerald-500' 
                                  : r.status === 'declined' 
                                  ? 'bg-rose-500' 
                                  : 'bg-amber-400'
                              }`}
                              title={r.parentName}
                            ></span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Sidebar list on Right (4 cols) */}
              <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
                <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide block border-b border-slate-100 pb-2">
                  Chi tiết Ngày {selectedCalendarDay} Tháng 9
                </span>

                <div className="space-y-3">
                  {trialReqs
                    .filter(req => {
                      if (selectedCalendarDay === 23) return req.id === 'req-2';
                      if (selectedCalendarDay === 24) return req.id === 'req-3';
                      if (selectedCalendarDay === 25) return req.id === 'req-1';
                      return false;
                    })
                    .map(req => (
                      <div key={req.id} className="border border-slate-100 rounded-2xl p-4 bg-slate-50/50 space-y-3">
                        <div className="space-y-1 text-left">
                          <strong className="text-slate-800 text-xs font-bold block">{req.parentName}</strong>
                          <span className="text-[9px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md font-bold inline-block border border-blue-100 uppercase">
                            {req.subject}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500 space-y-1">
                          <div>📍 Địa điểm: <strong className="text-slate-700 font-bold">{req.location}</strong></div>
                          <div>🕒 Lịch hẹn: <strong className="text-slate-700 font-bold">{req.schedule}</strong></div>
                          <div>💰 Đề xuất: <strong className="text-blue-700 font-bold">{req.budget}</strong></div>
                        </div>

                        {/* Interactive triggers in Monthly view */}
                        <div className="flex gap-1.5 pt-2 border-t border-slate-200/50">
                          {req.status === 'pending' ? (
                            <>
                              <button 
                                onClick={() => {
                                  handleAcceptRequest(req.id);
                                  alert(`Đã nhận lớp học thử của phụ huynh ${req.parentName}!`);
                                }}
                                className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[9px] rounded-lg cursor-pointer transition-colors text-center"
                              >
                                Chấp nhận
                              </button>
                              <button 
                                onClick={() => {
                                  handleDeclineRequest(req.id);
                                  alert(`Đã từ chối lời mời dạy thử của ${req.parentName}.`);
                                }}
                                className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[9px] rounded-lg cursor-pointer transition-colors text-center border border-slate-200"
                              >
                                Từ chối
                              </button>
                            </>
                          ) : req.status === 'accepted' ? (
                            <span className="w-full text-center py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg text-[9px] font-extrabold">
                              ✓ Đã đồng ý
                            </span>
                          ) : (
                            <span className="w-full text-center py-1 bg-rose-50 text-rose-700 border border-rose-100 rounded-lg text-[9px] font-extrabold">
                              ✕ Đã từ chối
                            </span>
                          )}
                        </div>
                      </div>
                    ))}

                  {/* Fallback empty status */}
                  {selectedCalendarDay !== 23 && selectedCalendarDay !== 24 && selectedCalendarDay !== 25 && (
                    <div className="py-8 text-center text-slate-400">
                      <span className="text-xl block mb-1">📅</span>
                      <span className="text-[10px] font-bold block">Không có lịch hẹn học thử nào vào ngày {selectedCalendarDay}.</span>
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

        </div>
      )}

      {/* ======================================= */}
      {/* T-01 & T-02: Hồ sơ gia sư (Merged View) */}
      {/* ======================================= */}
      {activeSubPage === 'T-01 Tạo/sửa hồ sơ' && (
        <div className="space-y-6">
          
          {/* Header Row based on image.png */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => onNavigateSubPage('T-04 Hộp yêu cầu học thử')}
                className="p-2 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-colors shadow-3xs cursor-pointer text-slate-600 hover:text-blue-600"
                title="Quay lại"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-1.5 leading-none">
                  Cập nhật thông tin gia sư
                </h2>
                <p className="text-[11px] text-slate-500 mt-1">
                  Cập nhật thông tin về môn học, chuyên môn sâu, bằng cấp, chứng chỉ và thành tích của bạn.
                </p>
              </div>
            </div>
          </div>

          {/* Tab Bar matching image.png */}
          <div className="flex flex-wrap gap-2 pb-1 border-b border-slate-100 overflow-x-auto scrollbar-none">
            {[
              'Thông tin cá nhân',
              'Chuyên môn & năng lực',
              'Kinh nghiệm & phương pháp',
              'Hình thức & khu vực dạy & Học phí'
            ].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab 
                    ? 'bg-[#1E40AF] text-white shadow-sm' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Main 2-Column Grid matching image.png */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column - Form Area (8 cols) */}
            <div className="lg:col-span-8 space-y-5">
              
              {activeTab === 'Thông tin cá nhân' && (
                <div className="space-y-5">
                  
                  {/* Card 1: Thông tin cá nhân */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
                    <div className="border-b border-slate-100 pb-3 flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#1E40AF] flex items-center justify-center font-bold text-xs">
                        👤
                      </div>
                      <div>
                        <h3 className="font-extrabold text-xs text-slate-800">Thông tin cá nhân</h3>
                        <p className="text-[10px] text-slate-400">Thông tin cơ bản giúp phụ huynh hiểu rõ hơn về bạn.</p>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      
                      {/* Avatar Edit on Left */}
                      <div className="flex flex-col items-center space-y-2 shrink-0 w-full md:w-44 text-center">
                        <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-blue-500 shadow-sm bg-slate-50">
                          <img 
                            src="/src/assets/images/tutor_male_portrait_1790393163366.jpg" 
                            alt="Tutor Avatar"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button 
                          type="button"
                          onClick={() => alert("Chức năng tải lên ảnh đại diện mới đang sẵn sàng!")}
                          className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold text-[10px] cursor-pointer shadow-3xs flex items-center gap-1 transition-all"
                        >
                          <Camera className="w-3.5 h-3.5 text-slate-500" />
                          Đổi ảnh đại diện
                        </button>
                        <span className="text-[9px] text-slate-400">JPG, PNG (tối đa 5MB)</span>
                      </div>

                      {/* Input fields on Right */}
                      <div className="flex-1 w-full space-y-4">
                        
                        {/* Name input */}
                        <div>
                          <label className="block text-slate-700 font-bold mb-1 text-[11px]">Họ và tên gia sư <span className="text-rose-500">*</span></label>
                          <input 
                            type="text" 
                            value={profileName} 
                            onChange={(e) => setProfileName(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 bg-white rounded-xl outline-none focus:border-blue-500 text-slate-800 font-bold text-xs shadow-3xs"
                          />
                        </div>

                        {/* Gender input */}
                        <div>
                          <label className="block text-slate-700 font-bold mb-1.5 text-[11px]">Giới tính <span className="text-rose-500">*</span></label>
                          <div className="flex gap-6 mt-1">
                            {['Nam', 'Nữ', 'Khác'].map(g => (
                              <label key={g} className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-600">
                                <input 
                                  type="radio" 
                                  name="tutor-gender" 
                                  checked={profileGender === g} 
                                  onChange={() => setProfileGender(g)}
                                  className="text-[#1E40AF] focus:ring-blue-500 w-4 h-4 cursor-pointer"
                                />
                                {g}
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Age and Phone inputs */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-slate-700 font-bold mb-1 text-[11px]">Độ tuổi <span className="text-rose-500">*</span></label>
                            <div className="relative">
                              <select 
                                value={profileAge}
                                onChange={(e) => {
                                  const age = Number(e.target.value);
                                  setProfileBirthYear(2026 - age);
                                }}
                                className="w-full px-3 py-2 border border-slate-200 bg-white rounded-xl outline-none focus:border-blue-500 text-slate-800 text-xs font-bold shadow-3xs cursor-pointer appearance-none"
                              >
                                {Array.from({ length: 30 }).map((_, i) => {
                                  const ageVal = 18 + i;
                                  return (
                                    <option key={ageVal} value={ageVal}>{ageVal}</option>
                                  );
                                })}
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 text-[10px]">
                                🔽
                              </div>
                            </div>
                          </div>
                          <div>
                            <label className="block text-slate-700 font-bold mb-1 text-[11px]">Số điện thoại liên hệ <span className="text-rose-500">*</span></label>
                            <input 
                              type="tel" 
                              value={profilePhone} 
                              onChange={(e) => setProfilePhone(e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 bg-white rounded-xl outline-none focus:border-blue-500 text-slate-800 font-bold text-xs shadow-3xs font-mono"
                            />
                          </div>
                        </div>

                        {/* Email input */}
                        <div>
                          <label className="block text-slate-700 font-bold mb-1 text-[11px]">Email <span className="text-rose-500">*</span></label>
                          <input 
                            type="email" 
                            value={profileEmail} 
                            onChange={(e) => setProfileEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 bg-white rounded-xl outline-none focus:border-blue-500 text-slate-800 font-bold text-xs shadow-3xs font-mono"
                          />
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* Card 2: Giới thiệu bản thân */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#1E40AF] flex items-center justify-center font-bold text-xs">
                        📝
                      </div>
                      <h3 className="font-extrabold text-xs text-slate-800">Giới thiệu bản thân</h3>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-slate-700 font-bold text-[11px]">Giới thiệu ngắn về bản thân <span className="text-rose-500">*</span></label>
                      <div className="relative">
                        <textarea 
                          rows={5}
                          value={profileIntro}
                          onChange={(e) => {
                            if (e.target.value.length <= 500) {
                              setProfileIntro(e.target.value);
                            }
                          }}
                          placeholder="Mô tả tóm tắt kỹ năng sư phạm, niềm tự hào học tập..."
                          className="w-full px-3 py-2.5 border border-slate-200 bg-white rounded-xl outline-none focus:border-blue-500 text-slate-700 text-xs shadow-3xs leading-relaxed"
                        ></textarea>
                        <span className="absolute bottom-2.5 right-3 text-[9px] text-slate-400 font-bold bg-slate-50 px-1.5 py-0.5 rounded-md border border-slate-100">
                          {profileIntro.length}/500
                        </span>
                      </div>
                    </div>

                    {/* Bottom Action Buttons inside the left column */}
                    <div className="flex justify-end gap-3 pt-3">
                      <button
                        type="button"
                        onClick={() => {
                          setProfileName('Nguyễn Hà My');
                          setProfilePhone('0987 654 321');
                          setProfileEmail('nguyenvanA@gmail.com');
                          setProfileIntro('Mình là sinh viên năm cuối trường Đại học Sư phạm Hà Nội, chuyên ngành Toán học.\nCó 3 năm kinh nghiệm dạy kèm, yêu thích việc truyền đạt kiến thức và giúp học sinh tiến bộ.\nRất mong được đồng hành cùng các bạn học sinh!');
                          alert("Đã hoàn tác các thay đổi!");
                        }}
                        className="px-5 py-2 bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 font-bold rounded-xl text-xs transition-all shadow-3xs cursor-pointer"
                      >
                        Hủy
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          alert("Đã lưu các thay đổi hồ sơ thành công! Hồ sơ của bạn đã đồng bộ lên hệ thống.");
                        }}
                        className="px-6 py-2 bg-[#1E40AF] hover:bg-blue-800 text-white font-black rounded-xl text-xs transition-all shadow-md shadow-blue-500/10 cursor-pointer"
                      >
                        Lưu thay đổi
                      </button>
                    </div>

                  </div>

                </div>
              )}

              {activeTab === 'Chuyên môn & năng lực' && (
                <div className="space-y-5">
                  
                  {/* Card 1: Môn học & chuyên môn sâu */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5">
                    <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#1E40AF] flex items-center justify-center font-bold text-xs">
                          🎓
                        </div>
                        <div>
                          <h3 className="font-extrabold text-xs text-slate-800">1. Môn học & chuyên môn sâu</h3>
                        </div>
                      </div>
                      <span className="text-slate-400 text-xs cursor-help">ℹ️</span>
                    </div>

                    {/* Môn học multi select */}
                    <div className="space-y-2">
                      <label className="block text-slate-700 font-bold text-[11px]">Môn học <span className="text-rose-500">*</span></label>
                      <div className="flex flex-wrap gap-2">
                        {availableSubjects.map(sub => {
                          const isSelected = selectedSubjects.includes(sub);
                          return (
                            <button
                              key={sub}
                              type="button"
                              onClick={() => {
                                if (isSelected) {
                                  setSelectedSubjects(prev => prev.filter(s => s !== sub));
                                } else {
                                  setSelectedSubjects(prev => [...prev, sub]);
                                }
                              }}
                              className={`px-3 py-1.5 rounded-full text-[10px] font-extrabold transition-all cursor-pointer border ${
                                isSelected 
                                  ? 'bg-[#1E40AF] text-white border-blue-700 shadow-3xs' 
                                  : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
                              }`}
                            >
                              {sub} {isSelected && '✓'}
                            </button>
                          );
                        })}
                        {/* Plus button to add a new subject */}
                        <button
                          type="button"
                          onClick={() => {
                            const newSub = prompt("Nhập tên môn học giảng dạy mới:");
                            if (newSub && newSub.trim() !== "") {
                              const trimmed = newSub.trim();
                              if (availableSubjects.includes(trimmed)) {
                                alert("Môn học này đã tồn tại trong danh mục!");
                                return;
                              }
                              setAvailableSubjects(prev => [...prev, trimmed]);
                              setSelectedSubjects(prev => [...prev, trimmed]);
                            }
                          }}
                          className="px-3 py-1.5 rounded-full text-[10px] font-extrabold border border-dashed border-[#1E40AF] bg-white text-[#1E40AF] hover:bg-blue-50 transition-all cursor-pointer shadow-3xs"
                        >
                          + Thêm môn học
                        </button>
                      </div>
                    </div>

                    {/* Chuyên môn sâu tags */}
                    <div className="space-y-2 pt-2">
                      <label className="block text-slate-700 font-bold text-[11px]">Chuyên môn sâu <span className="text-slate-400 font-normal">(tùy chọn)</span></label>
                      <div className="border border-slate-200 bg-white rounded-xl p-3 flex flex-wrap gap-2">
                        {selectedExpertises.map(exp => (
                          <div key={exp} className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 text-slate-700 font-bold text-[10px] px-2.5 py-1 rounded-lg">
                            <span>{exp}</span>
                            <button 
                              type="button" 
                              onClick={() => setSelectedExpertises(prev => prev.filter(e => e !== exp))}
                              className="text-slate-400 hover:text-slate-700 font-bold text-xs"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            const newExp = prompt("Nhập chuyên môn sâu mới (ví dụ: Toán luyện thi Olympic):");
                            if (newExp) {
                              setSelectedExpertises(prev => [...prev, newExp]);
                            }
                          }}
                          className="text-[10px] text-[#1E40AF] hover:underline font-bold px-2 py-1"
                        >
                          + Thêm chuyên môn
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Bằng cấp & chứng chỉ */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5">
                    <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#1E40AF] flex items-center justify-center font-bold text-xs">
                        📋
                      </div>
                      <h3 className="font-extrabold text-xs text-slate-800">2. Bằng cấp & chứng chỉ</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-slate-700 font-bold mb-1 text-[11px]">Bằng cấp cao nhất <span className="text-rose-500">*</span></label>
                        <select 
                          value={highestDegree}
                          onChange={(e) => setHighestDegree(e.target.value)}
                          className="w-full px-2.5 py-2 border border-slate-200 bg-white rounded-xl outline-none focus:border-blue-500 text-slate-700 font-bold text-xs cursor-pointer shadow-3xs"
                        >
                          <option value="Đại học">Đại học</option>
                          <option value="Cao đẳng">Cao đẳng</option>
                          <option value="Thạc sĩ">Thạc sĩ</option>
                          <option value="Tiến sĩ">Tiến sĩ</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-slate-700 font-bold mb-1 text-[11px]">Ngành học <span className="text-rose-500">*</span></label>
                        <select 
                          value={major}
                          onChange={(e) => setMajor(e.target.value)}
                          className="w-full px-2.5 py-2 border border-slate-200 bg-white rounded-xl outline-none focus:border-blue-500 text-slate-700 font-bold text-xs cursor-pointer shadow-3xs"
                        >
                          <option value="Sư phạm Toán">Sư phạm Toán</option>
                          <option value="Sư phạm Vật lý">Sư phạm Vật lý</option>
                          <option value="Sư phạm Hóa học">Sư phạm Hóa học</option>
                          <option value="Ngôn ngữ Anh">Ngôn ngữ Anh</option>
                          <option value="Khác">Khác</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-slate-700 font-bold mb-1 text-[11px]">Trường / Cơ sở đào tạo <span className="text-rose-500">*</span></label>
                        <input 
                          type="text" 
                          value={university}
                          onChange={(e) => setUniversity(e.target.value)}
                          className="w-full px-3 py-1.5 border border-slate-200 bg-white rounded-xl outline-none focus:border-blue-500 text-slate-800 font-bold text-xs shadow-3xs"
                        />
                      </div>
                    </div>

                    {/* Chứng chỉ nộp */}
                    <div className="space-y-2 pt-2">
                      <label className="block text-slate-700 font-bold text-[11px]">Chứng chỉ <span className="text-slate-400 font-normal">(nếu có)</span></label>
                      <div className="flex flex-wrap gap-2 items-center">
                        {selectedCerts.map(cert => (
                          <div key={cert} className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 text-slate-700 font-bold text-[10px] px-2.5 py-1 rounded-lg">
                            <span>{cert}</span>
                            <button 
                              type="button" 
                              onClick={() => setSelectedCerts(prev => prev.filter(c => c !== cert))}
                              className="text-slate-400 hover:text-slate-700 font-bold text-xs"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            const newCert = prompt("Nhập chứng chỉ mới (ví dụ: Chứng chỉ IELTS 8.0, Chứng chỉ N2):");
                            if (newCert) {
                              setSelectedCerts(prev => [...prev, newCert]);
                            }
                          }}
                          className="px-3 py-1 bg-white border border-dashed border-blue-300 hover:bg-blue-50 text-[#1E40AF] font-bold rounded-lg text-[10px] cursor-pointer transition-colors"
                        >
                          + Thêm chứng chỉ
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Thành tích học tập & giải thưởng */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#1E40AF] flex items-center justify-center font-bold text-xs">
                        🛡
                      </div>
                      <h3 className="font-extrabold text-xs text-slate-800">3. Thành tích học tập & giải thưởng</h3>
                    </div>

                    <div className="space-y-2">
                      <div className="relative">
                        <textarea 
                          rows={4}
                          value={achievementsText}
                          onChange={(e) => {
                            if (e.target.value.length <= 500) {
                              setAchievementsText(e.target.value);
                            }
                          }}
                          className="w-full px-3 py-2.5 border border-slate-200 bg-white rounded-xl outline-none focus:border-blue-500 text-slate-700 text-xs shadow-3xs leading-relaxed font-semibold"
                        ></textarea>
                        <span className="absolute bottom-2.5 right-3 text-[9px] text-slate-400 font-bold bg-slate-50 px-1.5 py-0.5 rounded-md border border-slate-100">
                          {achievementsText.length}/500
                        </span>
                      </div>
                    </div>

                    {/* Bottom Action Buttons */}
                    <div className="flex justify-end gap-3 pt-3">
                      <button
                        type="button"
                        onClick={() => {
                          setAchievementsText('- Giải Nhất HSG Toán cấp Tỉnh năm 2022\n- Giải Ba HSG Vật Lý cấp Thành phố năm 2021\n- Học bổng khuyến khích học tập 4 năm liên tiếp tại ĐHSP Hà Nội');
                          alert("Đã hoàn tác các thay đổi!");
                        }}
                        className="px-5 py-2 bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 font-bold rounded-xl text-xs transition-all shadow-3xs cursor-pointer"
                      >
                        Hủy
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          alert("Đã lưu các thay đổi về Chuyên môn & Năng lực thành công!");
                        }}
                        className="px-6 py-2 bg-[#1E40AF] hover:bg-blue-800 text-white font-black rounded-xl text-xs transition-all shadow-md shadow-blue-500/10 cursor-pointer"
                      >
                        Lưu thay đổi
                      </button>
                    </div>

                  </div>
                </div>
              )}

              {activeTab === 'Kinh nghiệm & phương pháp' && (
                <div className="space-y-6">
                  
                  {/* Section 1: Số năm kinh nghiệm & Bảng tự đánh giá chi tiết */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
                    <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#1E40AF] flex items-center justify-center font-bold text-xs">
                        💼
                      </div>
                      <div>
                        <h3 className="font-extrabold text-xs text-slate-800">Số năm kinh nghiệm</h3>
                        <p className="text-[10px] text-slate-400">Bạn đã có bao nhiêu năm kinh nghiệm giảng dạy? (Chọn mốc tổng quan)</p>
                      </div>
                    </div>

                    {/* Expanded broad experience selection pills */}
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Dưới 6 tháng',
                        'Dưới 1 năm',
                        'Dưới 2 năm',
                        'Dưới 3 năm',
                        'Dưới 4 năm',
                        'Dưới 5 năm',
                        'Dưới 10 năm',
                        'Dưới 15 năm',
                        'Trên 20 năm'
                      ].map(label => {
                        const isSelected = expYears.toString() === label || (expYears === 5 && label === 'Dưới 5 năm');
                        return (
                          <button
                            key={label}
                            type="button"
                            onClick={() => {
                              // Store label directly as string or parse value
                              if (label === 'Dưới 5 năm') setExpYears(5);
                              else if (label === 'Dưới 10 năm') setExpYears(10);
                              else if (label === 'Dưới 15 năm') setExpYears(15);
                              else if (label === 'Trên 20 năm') setExpYears(20);
                              else setExpYears(label as any);
                            }}
                            className={`px-3 py-1.5 rounded-xl border text-[10px] font-extrabold transition-all cursor-pointer shadow-3xs ${
                              isSelected 
                                ? 'bg-blue-50/50 border-[#1E40AF] text-[#1E40AF] ring-1 ring-blue-50' 
                                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600'
                            }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                      {/* Plus button to add custom years text */}
                      <button
                        type="button"
                        onClick={() => {
                          const customExp = prompt("Nhập mốc kinh nghiệm tự chọn (ví dụ: '7 năm rưỡi', 'Gần 6 năm'):");
                          if (customExp && customExp.trim() !== "") {
                            setExpYears(customExp.trim() as any);
                          }
                        }}
                        className="px-3 py-1.5 rounded-xl border border-dashed border-[#1E40AF] text-[#1E40AF] bg-white hover:bg-blue-50 text-[10px] font-extrabold transition-all cursor-pointer"
                      >
                        + Thêm tự chọn năm
                      </button>
                    </div>

                    {/* Current chosen broad experience status */}
                    <div className="text-[10px] text-slate-500 font-semibold bg-slate-50 px-3 py-2 rounded-xl border border-slate-100 flex items-center gap-1.5">
                      <span>📌 Mốc kinh nghiệm chính hiện tại:</span>
                      <strong className="text-blue-700 font-black text-xs">
                        {typeof expYears === 'number' ? `Dưới ${expYears} năm` : expYears}
                      </strong>
                    </div>

                    {/* Section 1b: Detailed 4-column self-evaluation experience table */}
                    <div className="space-y-3 pt-3 border-t border-slate-100">
                      <div>
                        <strong className="text-xs text-slate-800 block">Đánh giá kinh nghiệm chi tiết theo từng môn học & hình thức</strong>
                        <p className="text-[10px] text-slate-400">Tự đánh giá năng lực sư phạm chi tiết giúp phụ huynh có cái nhìn cụ thể nhất cho từng môn.</p>
                      </div>

                      {/* Interactive Table with 4 columns: Môn | Hình thức | Năm kinh nghiệm | Tự đánh giá */}
                      <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-3xs">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="bg-slate-50 text-slate-500 font-extrabold text-[10px] uppercase border-b border-slate-200">
                                <th className="p-3 w-1/4">Môn học</th>
                                <th className="p-3 w-1/6">Hình thức</th>
                                <th className="p-3 w-1/4">Năm kinh nghiệm</th>
                                <th className="p-3">Tự đánh giá (nhập tự do)</th>
                                <th className="p-3 text-center w-12">Xóa</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {experienceRows.map((row, idx) => (
                                <tr key={row.id} className="hover:bg-slate-50/50">
                                  {/* Column 1: Môn */}
                                  <td className="p-2.5">
                                    <select
                                      value={row.subject}
                                      onChange={(e) => {
                                        const val = e.target.value;
                                        setExperienceRows(prev => prev.map(r => r.id === row.id ? { ...r, subject: val } : r));
                                      }}
                                      className="w-full px-2 py-1 border border-slate-200 rounded-lg outline-none focus:border-blue-500 text-slate-700 font-bold text-[11px] cursor-pointer bg-white"
                                    >
                                      {availableSubjects.map(sub => (
                                        <option key={sub} value={sub}>{sub}</option>
                                      ))}
                                    </select>
                                  </td>
                                  
                                  {/* Column 2: Hình thức */}
                                  <td className="p-2.5">
                                    <select
                                      value={row.format}
                                      onChange={(e) => {
                                        const val = e.target.value as any;
                                        setExperienceRows(prev => prev.map(r => r.id === row.id ? { ...r, format: val } : r));
                                      }}
                                      className="w-full px-2 py-1 border border-slate-200 rounded-lg outline-none focus:border-blue-500 text-slate-700 font-bold text-[11px] cursor-pointer bg-white"
                                    >
                                      <option value="Online">Online</option>
                                      <option value="Offline">Offline</option>
                                      <option value="Cả hai">Cả hai</option>
                                    </select>
                                  </td>

                                  {/* Column 3: Năm kinh nghiệm */}
                                  <td className="p-2.5">
                                    <div className="flex gap-1.5 items-center">
                                      <select
                                        value={row.years}
                                        onChange={(e) => {
                                          const val = e.target.value;
                                          setExperienceRows(prev => prev.map(r => r.id === row.id ? { ...r, years: val } : r));
                                        }}
                                        className="w-full px-2 py-1 border border-slate-200 rounded-lg outline-none focus:border-blue-500 text-slate-700 font-bold text-[11px] cursor-pointer bg-white"
                                      >
                                        <option value="Dưới 6 tháng">Dưới 6 tháng</option>
                                        <option value="Dưới 1 năm">Dưới 1 năm</option>
                                        <option value="Dưới 2 năm">Dưới 2 năm</option>
                                        <option value="Dưới 3 năm">Dưới 3 năm</option>
                                        <option value="Dưới 4 năm">Dưới 4 năm</option>
                                        <option value="Dưới 5 năm">Dưới 5 năm</option>
                                        <option value="Dưới 10 năm">Dưới 10 năm</option>
                                        <option value="Dưới 15 năm">Dưới 15 năm</option>
                                        <option value="Trên 20 năm">Trên 20 năm</option>
                                        <option value="Tự chọn">-- Nhập tay --</option>
                                      </select>
                                      
                                      {/* If custom years is selected or chosen, allow inline edit */}
                                      {row.years === 'Tự chọn' && (
                                        <input
                                          type="text"
                                          placeholder="Nhập tay..."
                                          onChange={(e) => {
                                            const val = e.target.value;
                                            setExperienceRows(prev => prev.map(r => r.id === row.id ? { ...r, years: val } : r));
                                          }}
                                          className="w-20 px-2 py-1 border border-slate-200 rounded-lg text-slate-800 text-[10px] font-bold"
                                        />
                                      )}
                                    </div>
                                  </td>

                                  {/* Column 4: Tự đánh giá */}
                                  <td className="p-2.5">
                                    <input 
                                      type="text"
                                      value={row.selfEvaluation}
                                      onChange={(e) => {
                                        const val = e.target.value;
                                        setExperienceRows(prev => prev.map(r => r.id === row.id ? { ...r, selfEvaluation: val } : r));
                                      }}
                                      placeholder="Ví dụ: Luyện thi đại học cam kết đạt từ 8 điểm trở lên..."
                                      className="w-full px-2.5 py-1 border border-slate-200 rounded-lg outline-none focus:border-blue-500 text-slate-700 text-[11px] bg-slate-50/30"
                                    />
                                  </td>

                                  {/* Delete row column */}
                                  <td className="p-2.5 text-center">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (experienceRows.length === 1) {
                                          alert("Phải có ít nhất 1 dòng tự đánh giá kinh nghiệm!");
                                          return;
                                        }
                                        setExperienceRows(prev => prev.filter(r => r.id !== row.id));
                                      }}
                                      className="text-rose-500 hover:text-rose-700 font-extrabold text-sm hover:bg-rose-50 p-1 rounded-md transition-colors"
                                      title="Xóa dòng này"
                                    >
                                      🗑️
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Add Row Button */}
                      <div className="flex justify-start">
                        <button
                          type="button"
                          onClick={() => {
                            const newId = (experienceRows.length + 1).toString();
                            setExperienceRows(prev => [...prev, {
                              id: newId,
                              subject: 'Toán học',
                              format: 'Cả hai',
                              years: 'Dưới 3 năm',
                              selfEvaluation: ''
                            }]);
                          }}
                          className="px-3.5 py-1.5 bg-white border border-dashed border-[#1E40AF] hover:bg-blue-50 text-[#1E40AF] font-bold text-[11px] rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                        >
                          ➕ Thêm dòng đánh giá kinh nghiệm
                        </button>
                      </div>

                    </div>
                  </div>

                  {/* Section 2: Phong cách giảng dạy */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                    <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#1E40AF] flex items-center justify-center font-bold text-xs">
                        💡
                      </div>
                      <div>
                        <h3 className="font-extrabold text-xs text-slate-800">Phong cách giảng dạy</h3>
                        <p className="text-[10px] text-slate-400">Chọn phong cách phù hợp nhất với bạn (có thể chọn nhiều)</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          title: 'Kiên nhẫn, chậm rãi, bám sát SGK',
                          sub: 'Phù hợp với học sinh cần nền tảng vững chắc, không áp lực.',
                          icon: '❤️'
                        },
                        {
                          title: 'Thực tế, rèn kỹ năng phản xạ & giải đề',
                          sub: 'Tăng khả năng ứng dụng và xử lý tình huống thực tế qua bài tập.',
                          icon: '🎯'
                        },
                        {
                          title: 'Sáng tạo, khơi gợi cảm hứng độc lập',
                          sub: 'Giúp học sinh chủ động tư duy, khám phá và yêu thích môn học.',
                          icon: '💡'
                        },
                        {
                          title: 'Nghiêm khắc, kỷ luật, kết quả cao',
                          sub: 'Đặt mục tiêu rõ ràng, theo sát tiến độ và đánh giá thường xuyên.',
                          icon: '🛡️'
                        }
                      ].map(style => {
                        const isSelected = selectedStyles.includes(style.title);
                        return (
                          <div 
                            key={style.title}
                            onClick={() => {
                              if (isSelected) {
                                setSelectedStyles(prev => prev.filter(s => s !== style.title));
                              } else {
                                setSelectedStyles(prev => [...prev, style.title]);
                              }
                            }}
                            className={`flex items-start gap-3.5 p-4 rounded-2xl border transition-all cursor-pointer shadow-3xs ${
                              isSelected 
                                ? 'bg-blue-50/20 border-[#1E40AF] ring-1 ring-blue-50' 
                                : 'bg-white hover:bg-slate-50 border-slate-200'
                            }`}
                          >
                            <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center text-sm shrink-0">
                              {style.icon}
                            </span>
                            <div className="flex-1 space-y-0.5 text-left">
                              <strong className="text-slate-800 text-[11px] font-bold block leading-snug">{style.title}</strong>
                              <p className="text-[9px] text-slate-400 font-medium leading-relaxed">{style.sub}</p>
                            </div>
                            <input 
                              type="checkbox" 
                              checked={isSelected}
                              readOnly
                              className="text-[#1E40AF] focus:ring-blue-500 rounded border-slate-300 w-3.5 h-3.5 cursor-pointer mt-0.5"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Section 3: Khả năng giao tiếp & truyền tải */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                    <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#1E40AF] flex items-center justify-center font-bold text-xs">
                        💙
                      </div>
                      <div>
                        <h3 className="font-extrabold text-xs text-slate-800">Khả năng giao tiếp & truyền tải</h3>
                        <p className="text-[10px] text-slate-400">Bạn có thể mô tả ngắn gọn về khả năng truyền đạt, giao tiếp của mình.</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="relative">
                        <textarea 
                          rows={4}
                          value={commSkillsIntro}
                          onChange={(e) => {
                            if (e.target.value.length <= 500) {
                              setCommSkillsIntro(e.target.value);
                            }
                          }}
                          className="w-full px-3 py-2.5 border border-slate-200 bg-white rounded-xl outline-none focus:border-blue-500 text-slate-700 text-xs shadow-3xs leading-relaxed"
                        ></textarea>
                        <span className="absolute bottom-2.5 right-3 text-[9px] text-slate-400 font-bold bg-slate-50 px-1.5 py-0.5 rounded-md border border-slate-100">
                          {commSkillsIntro.length}/500
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Section 4: Đánh giá từ học sinh cũ */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                    <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#1E40AF] flex items-center justify-center font-bold text-xs">
                        🏫
                      </div>
                      <div>
                        <h3 className="font-extrabold text-xs text-slate-800">Đánh giá từ học sinh cũ</h3>
                        <p className="text-[10px] text-slate-400">Hiển thị đánh giá thực tế từ học sinh/ phụ huynh sau các khóa học.</p>
                      </div>
                    </div>

                    <div className="flex flex-col xl:flex-row items-center gap-5">
                      
                      {/* Average score column */}
                      <div className="shrink-0 text-center space-y-1 w-full xl:w-32 bg-slate-50 p-4 border border-slate-100 rounded-2xl">
                        <strong className="text-3xl font-black text-slate-800 font-mono">4.8/5</strong>
                        <div className="text-amber-400 text-xs flex justify-center">★★★★★</div>
                        <span className="text-[9px] text-slate-400 block font-bold">Dựa trên 36 đánh giá</span>
                      </div>

                      {/* Flex horizontal scroll cards */}
                      <div className="flex-1 w-full flex gap-3 overflow-x-auto pb-1.5 scrollbar-none items-stretch">
                        {[
                          {
                            name: 'Minh Anh', grade: 'Lớp 10',
                            avatar: '👩',
                            quote: 'Thầy dạy rất dễ hiểu, kiên nhẫn và luôn động viên em cố gắng.'
                          },
                          {
                            name: 'Gia Huy', grade: 'Lớp 12',
                            avatar: '🧑',
                            quote: 'Nhờ thầy mà điểm Toán của em tăng từ 7.0 lên 9.0. Cảm ơn thầy!'
                          },
                          {
                            name: 'Phương Linh', grade: 'Lớp 11',
                            avatar: '👩',
                            quote: 'Thầy có phương pháp dạy rất hay, giúp em tự tin hơn khi làm bài.'
                          }
                        ].map((rev, index) => (
                          <div 
                            key={index}
                            className="bg-slate-50/50 hover:bg-blue-50/20 border border-slate-100 rounded-2xl p-3 text-left w-52 shrink-0 flex flex-col justify-between space-y-2.5 transition-all"
                          >
                            <p className="text-[10px] text-slate-600 italic leading-relaxed">
                              "{rev.quote}"
                            </p>
                            <div className="flex items-center gap-2 border-t border-slate-100/80 pt-2 shrink-0">
                              <span className="text-xs bg-white rounded-full p-1 border border-slate-100 shrink-0">
                                {rev.avatar}
                              </span>
                              <div>
                                <span className="font-extrabold text-[10px] text-slate-800 block leading-tight">{rev.name}</span>
                                <span className="text-[8px] text-slate-400 font-bold block">{rev.grade} · ★★★★★</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>

                    {/* Footer buttons for submission */}
                    <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => {
                          setCommSkillsIntro('Tôi có khả năng truyền đạt dễ hiểu, linh hoạt điều chỉnh theo trình độ của từng học sinh. Luôn tạo không khí học tập thoải mái, thân thiện nhưng vẫn đảm bảo kỷ luật và hiệu quả. Tôi thường sử dụng ví dụ thực tế, hình ảnh và sơ đồ để giúp bài học trở nên sinh động và dễ hiểu hơn.');
                          setExpYears(5);
                          setSelectedStyles(['Kiên nhẫn, chậm rãi, bám sát SGK']);
                          alert("Đã hoàn tác các thay đổi!");
                        }}
                        className="px-5 py-2 bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 font-bold rounded-xl text-xs transition-all shadow-3xs cursor-pointer"
                      >
                        Hủy
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          alert("Đã lưu các thay đổi về Kinh nghiệm & Phương pháp giảng dạy thành công!");
                        }}
                        className="px-6 py-2 bg-[#1E40AF] hover:bg-blue-800 text-white font-black rounded-xl text-xs transition-all shadow-md shadow-blue-500/10 cursor-pointer"
                      >
                        Lưu thay đổi
                      </button>
                    </div>

                  </div>

                </div>
              )}

              {activeTab === 'Hình thức & khu vực dạy & Học phí' && (
                <div className="space-y-6">
                  
                  {/* Card 1: 1. Hình thức giảng dạy */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                    <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#1E40AF] flex items-center justify-center font-bold text-xs">
                        💻
                      </div>
                      <div>
                        <h3 className="font-extrabold text-xs text-slate-800">1. Hình thức giảng dạy</h3>
                        <p className="text-[10px] text-slate-400">Chọn hình thức dạy phù hợp với nhu cầu của bạn.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        {
                          title: 'Chỉ Offline',
                          sub: 'Tại nhà học sinh',
                          icon: '🏠'
                        },
                        {
                          title: 'Chỉ Online',
                          sub: 'Qua phần mềm Zoom/Meet',
                          icon: '📹'
                        },
                        {
                          title: 'Cả hai hình thức',
                          sub: 'Online & Offline',
                          icon: '🏠+📹'
                        }
                      ].map(format => {
                        const isSelected = tutorFormat === format.title;
                        return (
                          <div 
                            key={format.title}
                            onClick={() => setTutorFormat(format.title as any)}
                            className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer shadow-3xs ${
                              isSelected 
                                ? 'bg-blue-50/20 border-[#1E40AF] ring-1 ring-blue-50 animate-pulse-subtle' 
                                : 'bg-white hover:bg-slate-50 border-slate-200'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-9 h-9 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center text-sm shrink-0">
                                {format.icon}
                              </span>
                              <div className="text-left space-y-0.5">
                                <strong className="text-slate-800 text-[11px] font-bold block leading-none">{format.title}</strong>
                                <span className="text-[9px] text-slate-400 font-semibold">{format.sub}</span>
                              </div>
                            </div>
                            <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected ? 'border-[#1E40AF] bg-[#1E40AF]' : 'border-slate-300 bg-white'
                            }`}>
                              {isSelected && <span className="w-1.5 h-1.5 bg-white rounded-full"></span>}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Card 2: 2. Khu vực có thể dạy */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5">
                    <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#1E40AF] flex items-center justify-center font-bold text-xs">
                        📍
                      </div>
                      <div>
                        <h3 className="font-extrabold text-xs text-slate-800">2. Khu vực có thể dạy</h3>
                        <p className="text-[10px] text-slate-400">Chọn khu vực bạn có thể di chuyển để dạy học.</p>
                      </div>
                    </div>

                    {/* Search and add district */}
                    <div className="flex gap-2.5">
                      <div className="relative flex-1">
                        <input 
                          type="text" 
                          id="district-input"
                          placeholder="Nhập địa điểm (quận/huyện, phường/xã, ...)"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              const val = (e.target as HTMLInputElement).value;
                              if (val.trim() !== '') {
                                if (selectedDistricts.includes(val.trim())) return;
                                setSelectedDistricts(prev => [...prev, val.trim()]);
                                (e.target as HTMLInputElement).value = '';
                              }
                            }
                          }}
                          className="w-full px-3 py-2 border border-slate-200 bg-white rounded-xl outline-none focus:border-blue-500 text-slate-800 font-bold text-xs shadow-3xs"
                        />
                      </div>
                      <button 
                        type="button"
                        onClick={() => {
                          const val = (document.getElementById('district-input') as HTMLInputElement)?.value;
                          if (val && val.trim() !== '') {
                            if (selectedDistricts.includes(val.trim())) return;
                            setSelectedDistricts(prev => [...prev, val.trim()]);
                            (document.getElementById('district-input') as HTMLInputElement).value = '';
                          } else {
                            const mapVal = prompt("Nhập khu vực chọn từ bản đồ:");
                            if (mapVal && mapVal.trim() !== '') {
                              setSelectedDistricts(prev => [...prev, mapVal.trim()]);
                            }
                          }
                        }}
                        className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-blue-600 rounded-xl font-bold text-xs shadow-3xs flex items-center gap-1.5 cursor-pointer transition-all shrink-0"
                      >
                        📍 Chọn trên bản đồ
                      </button>
                    </div>

                    {/* Selected districts list */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] text-slate-400 font-extrabold uppercase block">Các khu vực đã chọn:</span>
                      <div className="flex flex-wrap gap-2">
                        {selectedDistricts.map(dist => (
                          <div key={dist} className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 text-slate-700 font-bold text-[10px] px-2.5 py-1.5 rounded-lg shadow-3xs">
                            <span>{dist}</span>
                            <button 
                              type="button" 
                              onClick={() => setSelectedDistricts(prev => prev.filter(d => d !== dist))}
                              className="text-slate-400 hover:text-slate-700 font-bold text-xs"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Max Distance dropdown */}
                    <div className="space-y-2 pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600">🛣️</span>
                        <div>
                          <strong className="text-[11px] text-slate-700 font-bold block">Khoảng cách di chuyển tối đa</strong>
                          <p className="text-[9px] text-slate-400 font-medium">Bạn có thể di chuyển tối đa bao nhiêu km từ vị trí hiện tại để dạy học?</p>
                        </div>
                      </div>
                      <select
                        value={tutorMaxDistance}
                        onChange={(e) => setTutorMaxDistance(Number(e.target.value))}
                        className="w-full sm:w-56 px-3 py-2 border border-slate-200 bg-white rounded-xl outline-none focus:border-blue-500 text-slate-700 font-bold text-xs cursor-pointer shadow-3xs"
                      >
                        <option value={2}>📍 Dưới 2 km</option>
                        <option value={5}>📍 Dưới 5 km</option>
                        <option value={10}>📍 Dưới 10 km</option>
                        <option value={15}>📍 Dưới 15 km</option>
                        <option value={20}>📍 Dưới 20 km</option>
                      </select>
                    </div>

                  </div>

                  {/* Card 3: 3. Học phí */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                    <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#1E40AF] flex items-center justify-center font-bold text-xs">
                        🪙
                      </div>
                      <div>
                        <h3 className="font-extrabold text-xs text-slate-800">3. Học phí</h3>
                        <p className="text-[10px] text-slate-400">Cập nhật mức học phí bạn yêu cầu cho mỗi buổi học.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Rate request */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-500 font-bold block">💵 Học phí yêu cầu / buổi</label>
                        <div className="relative flex items-center">
                          <input 
                            type="number" 
                            value={rateRequest}
                            onChange={(e) => setRateRequest(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-slate-200 bg-white rounded-xl outline-none focus:border-blue-500 text-slate-800 font-bold text-xs shadow-3xs"
                          />
                          <span className="absolute right-3 text-[9px] text-slate-400 font-bold">đ/buổi</span>
                        </div>
                      </div>

                      {/* Rate Online */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-500 font-bold block">💻 Học phí Online</label>
                        <div className="relative flex items-center">
                          <input 
                            type="number" 
                            value={rateOnline}
                            onChange={(e) => setRateOnline(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-slate-200 bg-white rounded-xl outline-none focus:border-blue-500 text-slate-800 font-bold text-xs shadow-3xs"
                          />
                          <span className="absolute right-3 text-[9px] text-slate-400 font-bold">đ/buổi</span>
                        </div>
                      </div>

                      {/* Rate Offline */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-500 font-bold block">🏠 Học phí Offline</label>
                        <div className="relative flex items-center">
                          <input 
                            type="number" 
                            value={rateOffline}
                            onChange={(e) => setRateOffline(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-slate-200 bg-white rounded-xl outline-none focus:border-blue-500 text-slate-800 font-bold text-xs shadow-3xs"
                          />
                          <span className="absolute right-3 text-[9px] text-slate-400 font-bold">đ/buổi</span>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons inside Card 3 */}
                    <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => {
                          setTutorFormat('Cả hai hình thức');
                          setSelectedDistricts(['Quận Cầu Giấy', 'Quận Đống Đa', 'Quận Thanh Xuân', 'Quận Hai Bà Trưng']);
                          setTutorMaxDistance(10);
                          setRateRequest(250000);
                          setRateOnline(200000);
                          setRateOffline(250000);
                          alert("Đã hoàn tác các thay đổi!");
                        }}
                        className="px-5 py-2 bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 font-bold rounded-xl text-xs transition-all shadow-3xs cursor-pointer"
                      >
                        Hủy
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          alert("Đã lưu các thay đổi về Hình thức, Khu vực & Học phí thành công!");
                        }}
                        className="px-6 py-2 bg-[#1E40AF] hover:bg-blue-800 text-white font-black rounded-xl text-xs transition-all shadow-md shadow-blue-500/10 cursor-pointer"
                      >
                        Lưu thay đổi
                      </button>
                    </div>

                  </div>

                </div>
              )}

              {activeTab !== 'Thông tin cá nhân' && activeTab !== 'Chuyên môn & năng lực' && activeTab !== 'Kinh nghiệm & phương pháp' && activeTab !== 'Hình thức & khu vực dạy & Học phí' && (
                // Other tab mock view fallback
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                  <h3 className="font-extrabold text-sm text-slate-800">{activeTab}</h3>
                  <p className="text-slate-500 text-xs">Mục thông tin này đã được khởi tạo và đồng bộ sẵn sàng trên hệ thống cùng cơ sở dữ liệu.</p>
                  <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl space-y-2">
                    <p className="text-[11px] text-blue-800 font-bold">✓ Đã xác minh bằng cấp thực tế bởi Operator</p>
                    <p className="text-[11px] text-blue-800 font-bold">✓ Đã tối ưu hóa Matching Score đạt 92%</p>
                  </div>
                </div>
              )}

            </div>

            {/* Right Column - Sidebar Widgets (4 cols) matching image.png */}
            <div className="lg:col-span-4 space-y-5">
              
              {/* Widget 1: Tóm tắt chuyên môn */}
              <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                  <span className="text-blue-600 font-bold text-sm">🎖️</span>
                  <h3 className="font-extrabold text-slate-900 text-xs">Tóm tắt chuyên môn</h3>
                </div>

                <div className="space-y-4 text-xs text-slate-700">
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-extrabold block">💼 Môn học chính</span>
                    <span className="font-bold text-slate-800">{selectedSubjects.join(', ') || 'Chưa chọn'}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-extrabold block">🎯 Chuyên môn sâu</span>
                    <span className="font-bold text-slate-800">{selectedExpertises.join(', ') || 'Chưa điền'}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-extrabold block">🎓 Bằng cấp</span>
                    <span className="font-bold text-slate-800">{highestDegree} - {major}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-extrabold block">🌐 Chứng chỉ</span>
                    <span className="font-bold text-slate-800">{selectedCerts.join(', ') || 'Không có'}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-extrabold block">🏆 Thành tích tiêu biểu</span>
                    <span className="font-bold text-blue-800">Giải Nhất HSG Toán cấp Tỉnh (2022)</span>
                  </div>
                </div>
              </div>

              {/* Widget 2: Phản hồi từ học sinh cũ */}
              <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3 relative overflow-hidden">
                <div className="flex items-center gap-2">
                  <span className="text-xs">💬</span>
                  <h3 className="font-extrabold text-slate-800 text-xs">Phản hồi từ học sinh cũ</h3>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-3 relative group hover:bg-blue-50/20 transition-all cursor-pointer">
                  <p className="text-[11px] text-slate-600 leading-relaxed italic pr-4">
                    "Thầy giảng rất dễ hiểu, kiên nhẫn và luôn có cách giải thích sáng tạo. Nhờ thầy mà mình đã cải thiện rõ rệt điểm số môn Toán!"
                  </p>
                  <span className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-slate-300 group-hover:text-[#1E40AF] transition-colors font-bold text-xs">
                    &gt;
                  </span>
                  <div className="flex items-center gap-2 border-t border-slate-100 pt-2.5 text-[10px] font-bold text-slate-500">
                    <span className="text-amber-400 text-xs">★★★★★</span>
                    <span>5.0</span>
                    <span>·</span>
                    <span className="text-slate-700">Học sinh lớp 12</span>
                  </div>
                </div>
              </div>

              {/* Widget 3: Hồ sơ xác minh */}
              <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <span className="text-[#1E40AF]">🛡️</span>
                  <h3 className="font-extrabold text-slate-800 text-xs">Hồ sơ xác minh</h3>
                </div>
                
                <div className="space-y-2.5">
                  {[
                    { label: 'CCCD', isVerified: true },
                    { label: 'Bằng cấp', isVerified: true },
                    { label: 'Chứng chỉ', isVerified: true }
                  ].map(item => (
                    <div key={item.label} className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-600 flex items-center gap-2">
                        <span className="w-4 h-4 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-[9px] font-black">✓</span>
                        {item.label}
                      </span>
                      <span className="text-[9px] text-emerald-600 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                        Đã xác minh
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Widget 4: Điểm Matching AI - Repositioned to bottom of right column */}
              <div className="bg-blue-50/50 border border-blue-100 rounded-3xl p-5 shadow-3xs flex items-center gap-4">
                {/* Radial progress ring */}
                <div className="relative w-16 h-16 shrink-0 flex items-center justify-center bg-white rounded-full border border-blue-100 shadow-3xs">
                  {/* Circle outline */}
                  <svg className="w-14 h-14 transform -rotate-90">
                    <circle 
                      cx="28" cy="28" r="23" 
                      stroke="#E2E8F0" strokeWidth="4" 
                      fill="transparent" 
                    />
                    <circle 
                      cx="28" cy="28" r="23" 
                      stroke="#1E40AF" strokeWidth="4" 
                      fill="transparent" 
                      strokeDasharray={144}
                      strokeDashoffset={144 - (144 * 92) / 100}
                    />
                  </svg>
                  <span className="absolute text-slate-900 font-black text-xs">
                    92%
                  </span>
                </div>

                <div className="space-y-0.5">
                  <h4 className="text-xs font-black text-[#1E40AF] flex items-center gap-1">
                    Điểm Matching AI
                    <span className="text-slate-400 text-[9px] cursor-help">ℹ️</span>
                  </h4>
                  <strong className="block text-slate-800 text-[11px]">Rất phù hợp</strong>
                  <p className="text-[9px] text-slate-400 leading-snug font-medium">Dựa trên yêu cầu tìm kiếm của phụ huynh</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ======================================= */}
      {/* T-03: Hồ sơ cá nhân (Renamed & Upgraded) */}
      {/* ======================================= */}
      {activeSubPage === 'T-03 Trạng thái xác minh' && (
        <div className="max-w-4xl mx-auto space-y-6 text-xs text-slate-700">
          
          {/* Header Profile card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-center gap-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border border-slate-200 bg-slate-50 shrink-0">
              <img 
                src="/src/assets/images/tutor_male_portrait_1790393163366.jpg" 
                alt="Tutor Avatar"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-1 right-1 bg-emerald-500 text-white rounded-full p-1 text-[8px] font-black">✓</span>
            </div>
            
            <div className="space-y-1.5 flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <h2 className="text-lg font-black text-slate-900">Nguyễn Văn A</h2>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase">
                  🛡️ Đã xác thực Gold Badge
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-bold">Gia sư Toán - Lý - Hóa chuyên sâu lớp 9 - 12</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 text-[10px] text-slate-400 font-bold">
                <span>📧 nguyenvanA@gmail.com</span>
                <span>•</span>
                <span>📞 0987 654 321</span>
                <span>•</span>
                <span>📍 Cầu Giấy, Hà Nội</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left box: Verification & safety checklist */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 text-left">
              <h3 className="font-extrabold text-xs text-slate-800 border-b border-slate-100 pb-2">🛡️ Trạng thái xác thực hồ sơ</h3>
              <div className="space-y-3">
                {[
                  { label: 'Căn cước công dân (CCCD)', desc: 'Xác minh danh tính chính chủ bởi Operator', isOk: true },
                  { label: 'Bằng tốt nghiệp / Bằng Đại học', desc: 'Xác minh bằng cấp Sư phạm Toán', isOk: true },
                  { label: 'Chứng chỉ ngoại ngữ IELTS 7.5', desc: 'Xác minh chứng chỉ ngoại ngữ', isOk: true }
                ].map(check => (
                  <div key={check.label} className="flex gap-3 items-start">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs shrink-0 font-bold">✓</span>
                    <div>
                      <strong className="text-[11px] text-slate-800 block">{check.label}</strong>
                      <span className="text-[9px] text-slate-400">{check.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right box: Matching Performance statistics */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 text-left">
              <h3 className="font-extrabold text-xs text-slate-800 border-b border-slate-100 pb-2">📈 Thống kê chỉ số AI Matching</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-bold text-slate-600">Độ hoàn thiện hồ sơ:</span>
                  <span className="font-black text-blue-700">100%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: '100%' }}></div>
                </div>

                <div className="p-3.5 bg-blue-50/50 border border-blue-100 rounded-xl space-y-1">
                  <span className="text-[10px] text-[#1E40AF] font-extrabold block">📌 Ghi chú từ Operator:</span>
                  <p className="text-[9px] text-slate-500 leading-relaxed font-semibold">
                    "Hồ sơ của Nguyễn Văn A đã được phê duyệt ở cấp độ cao nhất. Bạn được ưu tiên phân phối ngẫu nhiên cho các phụ huynh trong khu vực Cầu Giấy và Ba Đình."
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ======================================= */}
      {/* T-05: Quản lý phản hồi                  */}
      {/* ======================================= */}
      {activeSubPage === 'T-05 Phản hồi sau học thử' && (
        <div className="space-y-6 text-slate-700">
          
          {/* Header Row */}
          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm text-left">
            <h2 className="text-base font-black text-slate-900">💬 Quản Lý Phản Hồi Từ Phụ Huynh</h2>
            <p className="text-[11px] text-slate-500 mt-1">Nơi theo dõi, lắng nghe và phản hồi trực tiếp các nhận xét thực tế từ phụ huynh & học sinh sau các khóa học thử.</p>
          </div>

          {/* Rating Breakdown Dashboard and Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            
            {/* Average Rating Big Block */}
            <div className="md:col-span-4 bg-white border border-slate-200 rounded-3xl p-5 shadow-3xs flex flex-col justify-center items-center text-center space-y-2">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase block tracking-wider">Điểm Đánh Giá Trung Bình</span>
              <strong className="text-4xl text-slate-900 font-black font-mono">4.9/5.0</strong>
              <div className="text-amber-400 text-lg">★★★★★</div>
              <span className="text-[10px] text-slate-500 font-semibold">Tỷ lệ hài lòng đạt <strong className="text-emerald-600">98%</strong></span>
              <span className="text-[9px] text-slate-400 block font-bold">Dựa trên 42 nhận xét chính thức</span>
            </div>

            {/* Stars Breakdown progress bars list */}
            <div className="md:col-span-5 bg-white border border-slate-200 rounded-3xl p-5 shadow-3xs flex flex-col justify-center space-y-3.5 text-xs text-slate-600 font-semibold">
              <div className="flex items-center gap-3">
                <span className="w-12 text-right text-[10px] font-bold">5 sao (✓)</span>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-100">
                  <div className="bg-amber-400 h-full rounded-full" style={{ width: '90%' }}></div>
                </div>
                <span className="w-8 font-mono text-right font-bold text-slate-800">90%</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-12 text-right text-[10px] font-bold">4 sao</span>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-100">
                  <div className="bg-amber-400 h-full rounded-full" style={{ width: '8%' }}></div>
                </div>
                <span className="w-8 font-mono text-right font-bold text-slate-800">8%</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-12 text-right text-[10px] font-bold">3 sao</span>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-100">
                  <div className="bg-amber-400 h-full rounded-full" style={{ width: '2%' }}></div>
                </div>
                <span className="w-8 font-mono text-right font-bold text-slate-800">2%</span>
              </div>
            </div>

            {/* Interactive Filters Panel */}
            <div className="md:col-span-3 bg-white border border-slate-200 rounded-3xl p-5 shadow-3xs flex flex-col justify-center space-y-3.5">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-extrabold uppercase block tracking-wide text-left">Lọc theo sao</label>
                <select
                  value={selectedRatingFilter}
                  onChange={(e) => setSelectedRatingFilter(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-200 bg-white rounded-lg outline-none text-slate-700 font-bold text-[11px] cursor-pointer"
                >
                  <option value="All">✨ Tất cả số sao</option>
                  <option value="5">⭐⭐⭐⭐&nbsp; 5 Sao</option>
                  <option value="4">⭐⭐⭐&nbsp; 4 Sao</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-extrabold uppercase block tracking-wide text-left">Lọc theo thẻ tag</label>
                <select
                  value={selectedTagFilter}
                  onChange={(e) => setSelectedTagFilter(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-200 bg-white rounded-lg outline-none text-slate-700 font-bold text-[11px] cursor-pointer"
                >
                  <option value="All">🏷️ Tất cả nhãn</option>
                  <option value="Tận tâm">Tận tâm</option>
                  <option value="Sáng tạo">Sáng tạo</option>
                  <option value="Kiên nhẫn">Kiên nhẫn</option>
                </select>
              </div>
            </div>

          </div>

          {/* Review Feed list */}
          <div className="space-y-4">
            
            <div className="text-left">
              <strong className="text-xs text-slate-800">Danh sách nhận xét mới nhất:</strong>
            </div>

            {reviewsList
              .filter(rev => {
                const matchesRating = selectedRatingFilter === 'All' || rev.rating.toString() === selectedRatingFilter;
                const matchesTag = selectedTagFilter === 'All' || rev.tags.includes(selectedTagFilter);
                return matchesRating && matchesTag;
              })
              .map(rev => (
                <div 
                  key={rev.id} 
                  className="bg-white border border-slate-200 rounded-3xl p-5 shadow-3xs text-xs space-y-4 hover:border-blue-200 transition-colors text-left"
                >
                  {/* Review Header card */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-50 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-blue-50 text-[#1E40AF] flex items-center justify-center font-bold text-xs shrink-0">
                        👩
                      </div>
                      <div>
                        <strong className="text-slate-800 font-extrabold text-sm block leading-none">{rev.parentName}</strong>
                        <span className="text-[10px] text-slate-400 mt-1 block font-semibold">{rev.studentGrade} · {rev.subject}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-1.5 shrink-0">
                      <div className="text-amber-400 font-bold font-mono text-xs flex gap-0.5">
                        {Array.from({ length: rev.rating }).map((_, i) => <span key={i}>★</span>)}
                      </div>
                      <span className="text-[9px] text-slate-400 font-bold">Ngày nhận xét: {rev.date}</span>
                    </div>
                  </div>

                  {/* Comment Body */}
                  <div className="space-y-2">
                    <p className="text-slate-600 leading-relaxed font-medium">
                      "{rev.comment}"
                    </p>
                    {/* Display review tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {rev.tags.map(tag => (
                        <span key={tag} className="text-[8px] bg-slate-50 text-slate-600 font-extrabold px-2 py-0.5 rounded-full border border-slate-200">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Reply Block of Tutor */}
                  {rev.reply ? (
                    <div className="bg-blue-50/40 border border-blue-100 rounded-2xl p-4 space-y-1.5 text-left">
                      <div className="flex justify-between items-center">
                        <strong className="text-[#1E40AF] text-[10px] font-black uppercase flex items-center gap-1">
                          <span>💬 Phản hồi của bạn (Gia sư)</span>
                          <span className="bg-blue-100 text-blue-700 text-[8px] px-1.5 py-0.5 rounded-md font-bold font-sans">Đã gửi</span>
                        </strong>
                        <button
                          type="button"
                          onClick={() => {
                            setProfileReviewsList(prev => prev.map(r => r.id === rev.id ? { ...r, reply: '' } : r));
                          }}
                          className="text-rose-500 hover:text-rose-700 font-extrabold text-[10px]"
                        >
                          Xóa phản hồi
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed italic font-medium">
                        "{rev.reply}"
                      </p>
                    </div>
                  ) : (
                    // Reply box input trigger
                    <div className="pt-2">
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={replyInputText[rev.id] || ''}
                          onChange={(e) => setReplyInputText(prev => ({ ...prev, [rev.id]: e.target.value }))}
                          placeholder={`Gửi phản hồi cho ${rev.parentName}...`}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              const val = replyInputText[rev.id];
                              if (val && val.trim() !== '') {
                                setProfileReviewsList(prev => prev.map(r => r.id === rev.id ? { ...r, reply: val.trim() } : r));
                                setReplyInputText(prev => ({ ...prev, [rev.id]: '' }));
                              }
                            }
                          }}
                          className="flex-1 px-3.5 py-2 border border-slate-200 rounded-xl bg-slate-50/50 outline-none focus:border-blue-500 font-medium"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const val = replyInputText[rev.id];
                            if (val && val.trim() !== '') {
                              setProfileReviewsList(prev => prev.map(r => r.id === rev.id ? { ...r, reply: val.trim() } : r));
                              setReplyInputText(prev => ({ ...prev, [rev.id]: '' }));
                            } else {
                              alert("Vui lòng nhập nội dung phản hồi trước khi gửi!");
                            }
                          }}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl transition-all cursor-pointer shrink-0"
                        >
                          Gửi phản hồi
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              ))}

            {reviewsList.filter(rev => {
              const matchesRating = selectedRatingFilter === 'All' || rev.rating.toString() === selectedRatingFilter;
              const matchesTag = selectedTagFilter === 'All' || rev.tags.includes(selectedTagFilter);
              return matchesRating && matchesTag;
            }).length === 0 && (
              <div className="bg-slate-50 text-slate-400 p-12 text-center rounded-3xl border border-dashed border-slate-200">
                <span className="text-3xl block mb-2">🔍</span>
                <span className="font-bold text-xs">Không tìm thấy nhận xét nào phù hợp với bộ lọc lựa chọn!</span>
              </div>
            )}

          </div>

        </div>
      )}

      {/* ======================================= */}
      {/* Thông báo View                         */}
      {/* ======================================= */}
      {activeSubPage === 'Thông báo' && (
        <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5 text-xs text-slate-700">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-black text-slate-900">🔔 Thông báo của bạn</h2>
            <p className="text-slate-400 text-[10px]">Cập nhật các thông tin mới nhất từ hệ thống và phụ huynh</p>
          </div>
          <div className="space-y-3">
            {[
              { title: '🎉 Yêu cầu dạy học thử mới!', time: '2 giờ trước', desc: 'Phụ huynh Nguyễn Văn Hải vừa gửi lời mời dạy thử lớp Toán 9 (ôn thi vào 10).' },
              { title: '🛡️ Hồ sơ của bạn đã được duyệt Gold Badge!', time: '1 ngày trước', desc: 'Operator vừa xác nhận thành công CCCD và bằng đại học Sư phạm của bạn.' }
            ].map((notif, idx) => (
              <div key={idx} className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-1 text-left">
                <div className="flex justify-between items-center">
                  <strong className="text-slate-800 text-xs">{notif.title}</strong>
                  <span className="text-[9px] text-slate-400 font-bold">{notif.time}</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-relaxed">{notif.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================= */}
      {/* Trung tâm trợ giúp View                  */}
      {/* ======================================= */}
      {activeSubPage === 'Trung tâm trợ giúp' && (
        <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5 text-xs text-slate-700">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-black text-slate-900">❓ Trung tâm trợ giúp & an toàn gia sư</h2>
            <p className="text-slate-400 text-[10px]">Hướng dẫn quy trình giảng dạy và giải quyết khiếu nại</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-1.5 text-left">
              <strong className="text-slate-800 text-xs block">1. Quy trình nhận lớp học thử thế nào?</strong>
              <p className="text-[11px] text-slate-500 leading-relaxed">Sau khi chấp nhận yêu cầu học thử từ phụ huynh trong tab "Quản lý lịch dạy", bạn sẽ nhận được thông tin liên hệ trực tiếp của phụ huynh để chốt ngày học thử đầu tiên.</p>
            </div>
            <div className="space-y-1.5 text-left">
              <strong className="text-slate-800 text-xs block">2. Cần trợ giúp khẩn cấp?</strong>
              <p className="text-[11px] text-slate-500 leading-relaxed">Hãy liên hệ hotline hỗ trợ khẩn cấp dành cho gia sư 24/7 của chúng tôi: <strong className="text-[#1E40AF]">1900 6789</strong> để được Operator giải quyết sự cố lớp học ngay lập tức.</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
