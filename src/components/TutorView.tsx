import React, { useState } from 'react';
import { mockTrialRequests } from '../data/mockData';
import { 
  Inbox, UserCheck, ShieldCheck, Star, FileText, Check, Upload, Calendar, Lock, AlertCircle
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
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Hộp Thư Yêu Cầu Dạy Học Thử</h2>
            <p className="text-xs text-slate-500">Nơi nhận lời mời dạy thử trực tiếp từ hệ thống Matching Engine</p>
          </div>

          <div className="space-y-4">
            {trialReqs.map(req => (
              <div key={req.id} className="border border-slate-100 bg-slate-50 rounded-xl p-5 text-xs flex flex-col md:flex-row justify-between gap-4">
                <div className="space-y-2.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{req.parentName}</span>
                    <span className="text-[10px] text-slate-500 font-medium">({req.studentGrade})</span>
                    <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-sm font-bold">
                      {req.subject}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-600">
                    <div>📍 Địa chỉ: <strong className="text-slate-800">{req.location}</strong></div>
                    <div>🕒 Lịch hẹn rảnh: <strong className="text-slate-800">{req.schedule}</strong></div>
                    <div>💰 Đề xuất thù lao: <strong className="text-blue-700">{req.budget}</strong></div>
                  </div>
                </div>

                <div className="flex md:flex-col justify-end gap-2 shrink-0">
                  {req.status === 'pending' ? (
                    <>
                      <button 
                        onClick={() => handleAcceptRequest(req.id)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg cursor-pointer transition-colors"
                      >
                        Chấp nhận dạy thử
                      </button>
                      <button 
                        onClick={() => handleDeclineRequest(req.id)}
                        className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-lg cursor-pointer transition-colors"
                      >
                        Từ chối
                      </button>
                    </>
                  ) : req.status === 'accepted' ? (
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-50 text-emerald-700 font-bold rounded-lg border border-emerald-100 self-end">
                      <Check className="w-3.5 h-3.5" /> Đã chấp thuận dạy
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-50 text-rose-700 font-bold rounded-lg border border-rose-100 self-end">
                      Đã từ chối dạy
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================= */}
      {/* T-01: Tạo/sửa hồ sơ                     */}
      {/* ======================================= */}
      {activeSubPage === 'T-01 Tạo/sửa hồ sơ' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 text-xs">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Quản Lý Hồ Sơ Năng Lực Sư Phạm</h2>
            <p className="text-xs text-slate-500">Cập nhật thông tin giảng dạy để gia tăng điểm số thuật toán Matching Engine</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); alert("Đã lưu cập nhật hồ sơ!"); }} className="space-y-4 max-w-xl">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">Họ và tên gia sư:</label>
                <input 
                  type="text" 
                  value={profileName} 
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">Mức phí yêu cầu (đ/buổi):</label>
                <input 
                  type="number" 
                  value={profileRate} 
                  onChange={(e) => setProfileRate(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">Mô tả kinh nghiệm sư phạm & thành tích học thuật:</label>
              <textarea 
                rows={4}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                defaultValue="Sinh viên khoa Sư phạm Toán xuất sắc tại ĐH Sư Phạm HN. Có 3 năm kinh nghiệm dạy kèm luyện thi Toán 9 nâng cao, hỗ trợ ôn luyện chuyển cấp đỗ trường công tốt nhất."
              ></textarea>
            </div>

            <button 
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg cursor-pointer transition-colors"
            >
              Lưu thay đổi hồ sơ
            </button>
          </form>
        </div>
      )}

      {/* ======================================= */}
      {/* T-02: Tải giấy tờ                       */}
      {/* ======================================= */}
      {activeSubPage === 'T-02 Tải giấy tờ' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 text-xs">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Cổng Tải Tài Liệu Xác Thực (CCCD & Bằng cấp)</h2>
            <p className="text-xs text-slate-500">Giấy tờ được mã hóa và chỉ dùng cho mục đích hậu kiểm tính pháp lý bởi Operator</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* CCCD Box */}
            <div className="border border-slate-200 rounded-xl p-4 text-center space-y-3 bg-slate-50 flex flex-col justify-between">
              <div>
                <strong className="text-slate-800 block text-sm">Căn cước công dân (CCCD)</strong>
                <p className="text-[10px] text-slate-400 mt-1">Yêu cầu chụp rõ 2 mặt, không mất góc</p>
              </div>
              <div className="py-4 border border-dashed border-slate-300 rounded-lg bg-white">
                {uploadedFiles.cccd ? (
                  <span className="text-emerald-600 font-bold flex items-center justify-center gap-1">
                    <Check className="w-4 h-4" /> Đã tải lên
                  </span>
                ) : (
                  <button 
                    onClick={() => handleUploadFile('cccd')}
                    className="mx-auto px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-bold cursor-pointer"
                  >
                    Tải file lên
                  </button>
                )}
              </div>
            </div>

            {/* Diploma Box */}
            <div className="border border-slate-200 rounded-xl p-4 text-center space-y-3 bg-slate-50 flex flex-col justify-between">
              <div>
                <strong className="text-slate-800 block text-sm">Bằng cử nhân / Học bạ</strong>
                <p className="text-[10px] text-slate-400 mt-1">Yêu cầu chụp bản gốc hoặc công chứng</p>
              </div>
              <div className="py-4 border border-dashed border-slate-300 rounded-lg bg-white">
                {uploadedFiles.diploma ? (
                  <span className="text-emerald-600 font-bold flex items-center justify-center gap-1">
                    <Check className="w-4 h-4" /> Đã tải lên
                  </span>
                ) : (
                  <button 
                    onClick={() => handleUploadFile('diploma')}
                    className="mx-auto px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-bold cursor-pointer"
                  >
                    Tải file lên
                  </button>
                )}
              </div>
            </div>

            {/* Student Card Box */}
            <div className="border border-slate-200 rounded-xl p-4 text-center space-y-3 bg-slate-50 flex flex-col justify-between">
              <div>
                <strong className="text-slate-800 block text-sm">Thẻ sinh viên (Nếu có)</strong>
                <p className="text-[10px] text-slate-400 mt-1">Yêu cầu thẻ còn niên hạn hiệu lực</p>
              </div>
              <div className="py-4 border border-dashed border-slate-300 rounded-lg bg-white">
                {uploadedFiles.studentCard ? (
                  <span className="text-emerald-600 font-bold flex items-center justify-center gap-1">
                    <Check className="w-4 h-4" /> Đã tải lên
                  </span>
                ) : (
                  <button 
                    onClick={() => handleUploadFile('studentCard')}
                    className="mx-auto px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-bold cursor-pointer"
                  >
                    Tải file lên
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================= */}
      {/* T-03: Trạng thái xác minh               */}
      {/* ======================================= */}
      {activeSubPage === 'T-03 Trạng thái xác minh' && (
        <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-xs space-y-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Trạng Thái Xác Thực Hồ Sơ</h2>
            <p className="text-xs text-slate-500">Giám sát quy trình thẩm định danh tính từ Ban quản trị</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xl shrink-0">
              🛡
            </div>
            <div>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-sm border border-emerald-100 uppercase">
                Hồ sơ Đã được Duyệt (Verified Gold Badge)
              </span>
              <p className="text-slate-500 text-[11px] mt-1">Hồ sơ đã vượt qua 100% chỉ tiêu xác minh pháp lý của Operator. Bạn được ưu tiên xuất hiện đầu tiên trên bảng Matching AI.</p>
            </div>
          </div>
        </div>
      )}

      {/* ======================================= */}
      {/* T-05: Phản hồi sau học thử              */}
      {/* ======================================= */}
      {activeSubPage === 'T-05 Phản hồi sau học thử' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 text-xs">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Phản Hồi & Thống Kê Sau Dạy Thử</h2>
            <p className="text-xs text-slate-500">Xem đánh giá trung thực từ phụ huynh để nâng cấp chất lượng dạy</p>
          </div>

          {/* Rating Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 text-center space-y-2">
              <span className="text-slate-400 block font-bold">Điểm số trung bình</span>
              <strong className="text-4xl text-slate-800 font-mono">4.9</strong>
              <div className="flex justify-center text-amber-400 text-lg">★★★★★</div>
              <span className="text-[10px] text-slate-400 block">42 đánh giá thực tế</span>
            </div>

            <div className="md:col-span-2 space-y-3 font-semibold text-slate-600">
              <div className="flex items-center gap-3">
                <span className="w-12 text-right">5 sao</span>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full w-[90%]"></div>
                </div>
                <span className="w-8">90%</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-12 text-right">4 sao</span>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full w-[8%]"></div>
                </div>
                <span className="w-8">8%</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-12 text-right">3 sao</span>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full w-[2%]"></div>
                </div>
                <span className="w-8">2%</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
