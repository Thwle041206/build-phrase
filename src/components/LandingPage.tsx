import React from 'react';
import { 
  Users, ArrowRight, Star, TrendingUp, ShieldCheck, Sparkles, 
  BookOpen, Award, CheckCircle2, ChevronRight, GraduationCap, 
  Clock, Heart, MessageSquare, ArrowUpRight, Check
} from 'lucide-react';
import { Tutor } from '../types';
import { mockTutors } from '../data/mockData';

interface LandingPageProps {
  onFindTutor: () => void;
  onGoToDashboard: () => void;
  onBrowseTutors: () => void;
  onSignIn: () => void;
  onRegister: () => void;
}

export default function LandingPage({
  onFindTutor,
  onGoToDashboard,
  onBrowseTutors,
  onSignIn,
  onRegister
}: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#F8FAFD] text-slate-900 font-sans selection:bg-blue-100">
      
      {/* 1. Clean Navigation Bar matching image.png */}
      <nav className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50 px-6 sm:px-10 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo with book icon matching image.png */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={onGoToDashboard}>
            <div className="w-9 h-9 rounded-xl bg-[#0B3B78] text-white flex items-center justify-center shadow-sm shadow-blue-900/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="flex items-baseline tracking-tight">
              <span className="font-extrabold text-xl text-[#0B3B78]">Tutor</span>
              <span className="font-bold text-xl text-slate-800">Match</span>
            </div>
          </div>

          {/* Center Nav item: Browse Tutors matching image.png */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <button 
              onClick={onBrowseTutors}
              className="flex items-center gap-2 hover:text-[#0B3B78] transition-colors cursor-pointer py-1"
            >
              <Users className="w-4 h-4 text-[#0B3B78]" />
              <span>Khám phá gia sư</span>
            </button>
            <button 
              onClick={onFindTutor}
              className="hover:text-[#0B3B78] transition-colors cursor-pointer py-1"
            >
              Tìm gia sư bằng AI
            </button>
            <a 
              href="#features" 
              className="hover:text-[#0B3B78] transition-colors cursor-pointer py-1"
            >
              Tính năng nổi bật
            </a>
            <a 
              href="#reviews" 
              className="hover:text-[#0B3B78] transition-colors cursor-pointer py-1"
            >
              Đánh giá
            </a>
          </div>

          {/* Right Actions matching image.png: Sign In & Get Started */}
          <div className="flex items-center gap-3">
            <button 
              onClick={onSignIn}
              className="text-sm font-bold text-slate-700 hover:text-[#0B3B78] px-3.5 py-2 transition-colors cursor-pointer"
            >
              Đăng nhập
            </button>
            <button 
              onClick={onRegister}
              className="bg-[#0B3B78] hover:bg-[#082a57] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-blue-900/10 cursor-pointer"
            >
              Bắt đầu ngay
            </button>
          </div>

        </div>
      </nav>

      {/* 2. Hero Section - Exact Design Layout from image.png */}
      <section className="relative overflow-hidden pt-10 pb-20 lg:py-24 px-6 sm:px-10">
        {/* Soft background ambient glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-blue-100/50 via-indigo-50/40 to-sky-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Subtitle & Action CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Badge matching image.png: ★ Premium Tutoring Marketplace */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-blue-200/90 bg-blue-50/80 text-[#0B3B78] text-xs font-bold tracking-wide shadow-3xs">
              <span className="text-amber-500">★</span>
              <span>Nền tảng kết nối gia sư chất lượng cao</span>
            </div>

            {/* Giant Main Title with highlighted "chuyên gia" (expert) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
              Làm chủ mọi môn học với sự dẫn dắt của{' '}
              <span className="relative inline-block text-[#0B3B78]">
                chuyên gia.
                <span className="absolute -bottom-1 left-0 w-full h-3 bg-amber-200/70 -z-10 rounded-sm transform -rotate-1"></span>
              </span>
            </h1>

            {/* Subtitle in Vietnamese with English companion context */}
            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-xl">
              Kết nối với đội ngũ gia sư giỏi đã được thẩm định năng lực và đạo đức nghiêm ngặt. Lộ trình học kèm 1-1 cá nhân hóa, cam kết bứt phá điểm số thực sự hiệu quả.
            </p>

            {/* CTA Buttons matching image.png: [Find a Tutor →] and [My Dashboard] */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={onFindTutor}
                className="bg-[#0B3B78] hover:bg-[#082a57] text-white px-7 py-3.5 rounded-xl font-black text-sm transition-all shadow-lg shadow-blue-900/15 flex items-center gap-2 group cursor-pointer"
              >
                <span>Tìm gia sư ngay</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onGoToDashboard}
                className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 px-7 py-3.5 rounded-xl font-bold text-sm transition-all shadow-sm cursor-pointer hover:border-slate-300"
              >
                Bảng điều khiển của tôi
              </button>
            </div>

            {/* Trust badges row */}
            <div className="flex items-center gap-6 pt-4 text-xs font-semibold text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Học thử 01 buổi miễn phí</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>100% hồ sơ xác thực 3 lớp</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Graphic with 4 Floating Cards matching image.png */}
          <div className="lg:col-span-6 relative flex justify-center items-center py-6">
            
            {/* Outer subtle container frame */}
            <div className="relative w-full max-w-[500px] h-[440px]">
              
              {/* Soft decorative background circles */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/70 to-slate-100/60 rounded-3xl -z-10 border border-slate-200/60 shadow-inner" />

              {/* FLOATING CARD 1 (Top Left / Center): Calculus Session just completed ★★★★★ */}
              <div className="absolute top-8 left-4 sm:left-6 bg-white rounded-2xl p-4 shadow-xl border border-slate-150/80 flex items-center gap-3.5 animate-in fade-in duration-500 max-w-[240px] z-20">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-[#0B3B78] font-black text-xs flex items-center justify-center shrink-0">
                  JD
                </div>
                <div className="space-y-0.5 text-left">
                  <h4 className="font-bold text-xs text-slate-900 leading-tight">Buổi Toán Giải Tích</h4>
                  <p className="text-[10px] text-slate-400 font-medium">Vừa hoàn thành</p>
                  <div className="flex text-amber-400 text-xs">
                    ★★★★★
                  </div>
                </div>
              </div>

              {/* FLOATING CARD 2 (Top Right): 500+ Vetted expert tutors */}
              <div className="absolute top-4 right-4 sm:right-6 bg-white rounded-2xl p-4 shadow-xl border border-slate-150/80 space-y-1 text-left w-[180px] z-10">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0B3B78] flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <div className="text-2xl font-black text-slate-900 tracking-tight">500+</div>
                <p className="text-[11px] text-slate-500 font-semibold leading-tight">Gia sư chuyên môn đã kiểm định</p>
              </div>

              {/* FLOATING CARD 3 (Bottom Left): 98% Dark Royal Navy Card */}
              <div className="absolute bottom-8 left-4 sm:left-8 bg-[#0B3B78] text-white rounded-2xl p-5 shadow-2xl space-y-2 text-left w-[200px] z-30">
                <div className="w-8 h-8 rounded-lg bg-white/10 text-sky-300 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div className="text-4xl font-black font-mono tracking-tight text-white">98%</div>
                <p className="text-[11px] text-blue-100 font-medium leading-snug">
                  Tỷ lệ học sinh tiến bộ vượt bậc sau 1 tháng
                </p>
              </div>

              {/* FLOATING CARD 4 (Bottom Right): Subject Popularity Progress bars */}
              <div className="absolute bottom-6 right-4 sm:right-6 bg-white rounded-2xl p-4 shadow-xl border border-slate-150/80 space-y-3.5 text-left w-[220px] z-20">
                {/* Mathematics */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">Toán học</span>
                    <span className="text-[9px] font-extrabold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-100 uppercase">Phổ biến</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="bg-[#0B3B78] h-full rounded-full w-[88%]"></div>
                  </div>
                </div>

                {/* Physics */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">Vật lý</span>
                    <span className="text-[10px] text-slate-400 font-semibold">9.2/10</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="bg-[#0B3B78] h-full rounded-full w-[68%]"></div>
                  </div>
                </div>

                {/* English */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">Tiếng Anh</span>
                    <span className="text-[10px] text-slate-400 font-semibold">IELTS 8.0+</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="bg-[#0B3B78] h-full rounded-full w-[82%]"></div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 3. Core Product Features (Giới thiệu các tính năng độc quyền bằng Tiếng Việt) */}
      <section id="features" className="py-16 sm:py-20 bg-white border-t border-slate-200/80 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#0B3B78]">
              Ưu thế vượt trội
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Giải pháp gia sư 4.0 toàn diện nhất hiện nay
            </h2>
            <p className="text-sm text-slate-600 font-medium">
              TutorMatch ứng dụng công nghệ trí tuệ nhân tạo độc quyền để loại bỏ nỗi lo tìm gia sư kém chất lượng của phụ huynh.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Feature 1 */}
            <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-6 text-left space-y-3 hover:border-blue-300 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#0B3B78] flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-slate-900">Matching Engine AI</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Thuật toán phân tích học lực, tính cách học sinh và khoảng cách địa lý để đề xuất top gia sư phù hợp nhất đạt trên 90% độ tương thích.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-6 text-left space-y-3 hover:border-blue-300 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-slate-900">Xác thực 3 lớp nghiêm ngặt</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Mọi gia sư đều phải xác minh CCCD chính chủ, bảng điểm, bằng đại học và chứng chỉ sư phạm trước khi được cấp huy hiệu Gold Badge.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-6 text-left space-y-3 hover:border-blue-300 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-slate-900">Bảo vệ học phí Escrow</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Học phí được giữ an toàn trong quỹ trung gian, chỉ giải ngân cho gia sư sau khi buổi học hoàn thành tốt đẹp. Hoàn 100% nếu học thử không hợp.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-6 text-left space-y-3 hover:border-blue-300 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-slate-900">Quản lý lịch thông minh</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Lịch tuần, lịch tháng trực quan, hỗ trợ gia sư và phụ huynh theo dõi tiến độ buổi học, điểm danh và gửi nhận xét đánh giá minh bạch.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Featured Tutors Preview Section */}
      <section className="py-16 sm:py-20 bg-[#F8FAFD] border-t border-slate-200/80 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div className="space-y-1.5 text-left">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#0B3B78]">
                Đội ngũ hàng đầu
              </span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Gia sư tiêu biểu tại TutorMatch
              </h2>
            </div>
            <button
              onClick={onBrowseTutors}
              className="text-xs font-black text-[#0B3B78] hover:text-blue-900 flex items-center gap-1.5 cursor-pointer bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-3xs"
            >
              <span>Xem tất cả gia sư</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockTutors.slice(0, 3).map((tutor) => (
              <div 
                key={tutor.id}
                className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all text-left space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center gap-3.5">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                      {tutor.avatar ? (
                        <img src={tutor.avatar} alt={tutor.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-[#0B3B78] text-white flex items-center justify-center font-bold text-lg">
                          {tutor.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">{tutor.name}</h4>
                      <p className="text-[11px] text-slate-500 font-semibold">{tutor.university}</p>
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold mt-0.5">
                        <span>★</span>
                        <span>{tutor.rating}</span>
                        <span className="text-slate-400 font-normal">({tutor.reviewsCount} đánh giá)</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    "{tutor.bio}"
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {tutor.subjects.slice(0, 2).map((sub, i) => (
                      <span key={i} className="text-[10px] bg-blue-50 text-[#0B3B78] font-bold px-2.5 py-1 rounded-lg border border-blue-100">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">Học phí đề xuất</span>
                    <strong className="text-sm font-black text-[#0B3B78] font-mono">
                      {tutor.rate.toLocaleString('vi-VN')} đ/buổi
                    </strong>
                  </div>
                  <button
                    onClick={onFindTutor}
                    className="bg-slate-900 hover:bg-[#0B3B78] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. How It Works (Quy trình 3 bước) */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-200/80 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#0B3B78]">
              Dễ dàng & Nhanh chóng
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Bắt đầu chỉ với 3 bước đơn giản
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            
            <div className="space-y-3 border-l-2 border-[#0B3B78] pl-5">
              <span className="text-xs font-black text-[#0B3B78] font-mono uppercase tracking-wider">Bước 01</span>
              <h3 className="text-lg font-bold text-slate-900">Nhập yêu cầu học kèm qua Chat AI</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Chia sẻ môn học, lớp của con, mục tiêu (lấy gốc, ôn thi vào 10, luyện thi chuyên, thi THPTQG) và lịch rảnh.
              </p>
            </div>

            <div className="space-y-3 border-l-2 border-[#0B3B78] pl-5">
              <span className="text-xs font-black text-[#0B3B78] font-mono uppercase tracking-wider">Bước 02</span>
              <h3 className="text-lg font-bold text-slate-900">Xem hồ sơ & nhận buổi học thử</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Hệ thống Matching Engine gửi danh sách gia sư tinh hoa. Phụ huynh xem video giới thiệu và hẹn học thử 01 buổi.
              </p>
            </div>

            <div className="space-y-3 border-l-2 border-[#0B3B78] pl-5">
              <span className="text-xs font-black text-[#0B3B78] font-mono uppercase tracking-wider">Bước 03</span>
              <h3 className="text-lg font-bold text-slate-900">Ký quỹ an toàn & đồng hành lâu dài</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Nếu hài lòng, phụ huynh kích hoạt khóa học chính thức với cam kết bảo hiểm học phí Escrow an tâm 100%.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section id="reviews" className="py-16 sm:py-20 bg-[#F8FAFD] border-t border-slate-200/80 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#0B3B78]">
              Cảm nhận thực tế
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Phụ huynh và học sinh nói gì về TutorMatch?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
              <div className="flex text-amber-400 text-xs">★★★★★</div>
              <p className="text-xs text-slate-700 leading-relaxed italic font-medium">
                "Tôi tìm được gia sư Toán 9 cho con chỉ sau 15 phút nói chuyện với Chatbot AI. Thầy dạy rất kiên nhẫn, điểm thi học kỳ vừa rồi của cháu tăng từ 6 lên 8.5."
              </p>
              <div className="pt-2 border-t border-slate-100">
                <strong className="text-xs text-slate-900 font-bold block">Chị Trần Thanh Mai</strong>
                <span className="text-[10px] text-slate-400">Phụ huynh học sinh lớp 9 (Cầu Giấy, Hà Nội)</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
              <div className="flex text-amber-400 text-xs">★★★★★</div>
              <p className="text-xs text-slate-700 leading-relaxed italic font-medium">
                "Chính sách bảo vệ học phí Escrow làm gia đình rất yên tâm. Không còn cảnh nộp học phí cả khóa rồi gia sư nghỉ giữa chừng như khi tìm bên ngoài."
              </p>
              <div className="pt-2 border-t border-slate-100">
                <strong className="text-xs text-slate-900 font-bold block">Anh Hoàng Quốc Tuấn</strong>
                <span className="text-[10px] text-slate-400">Phụ huynh học sinh lớp 12 (Thanh Xuân, Hà Nội)</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
              <div className="flex text-amber-400 text-xs">★★★★★</div>
              <p className="text-xs text-slate-700 leading-relaxed italic font-medium">
                "Hồ sơ gia sư ở đây được kiểm duyệt bằng cấp rất thật. Mình học kèm tiếng Anh với bạn gia sư Ngoại Thương có IELTS 8.5, phương pháp giảng rất thực tế."
              </p>
              <div className="pt-2 border-t border-slate-100">
                <strong className="text-xs text-slate-900 font-bold block">Lê Minh Khang</strong>
                <span className="text-[10px] text-slate-400">Học sinh chuyên Toán ôn thi IELTS</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. Bottom CTA Banner */}
      <section className="py-16 px-6 sm:px-10 bg-[#0B3B78] text-white text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Sẵn sàng nâng cao thành tích học tập ngay hôm nay?
          </h2>
          <p className="text-sm text-blue-100 max-w-xl mx-auto font-medium">
            Hãy để AI và các chuyên gia gia sư hàng đầu đồng hành cùng bạn trên con đường chinh phục mọi kỳ thi quan trọng.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={onFindTutor}
              className="bg-white hover:bg-slate-100 text-[#0B3B78] px-8 py-3.5 rounded-xl font-black text-sm transition-all shadow-lg cursor-pointer"
            >
              Bắt đầu tìm gia sư ngay
            </button>
            <button
              onClick={onRegister}
              className="bg-blue-600/40 hover:bg-blue-600/60 border border-blue-400/50 text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all cursor-pointer"
            >
              Đăng ký trở thành gia sư
            </button>
          </div>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="bg-slate-950 text-slate-400 text-xs py-8 px-6 sm:px-10 border-t border-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-500" />
            <span className="font-bold text-slate-300">TutorMatch EdTech Vietnam</span>
            <span>&copy; {new Date().getFullYear()} Bảo lưu mọi quyền.</span>
          </div>
          <div className="flex gap-6 font-semibold">
            <button onClick={onGoToDashboard} className="hover:text-white transition-colors cursor-pointer">
              Vào Bảng điều khiển
            </button>
            <a href="#features" className="hover:text-white transition-colors">Tính năng</a>
            <a href="#reviews" className="hover:text-white transition-colors">Đánh giá</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
