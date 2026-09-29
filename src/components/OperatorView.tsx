import React, { useState } from 'react';
import { mockEscalationCases, mockTutors } from '../data/mockData';
import { 
  BarChart, Activity, ShieldAlert, FileCheck, Search, Users, Database, Play, Eye, Check, X
} from 'lucide-react';

interface OperatorViewProps {
  activeSubPage: string;
  onNavigateSubPage: (pageId: string) => void;
}

export default function OperatorView({ activeSubPage, onNavigateSubPage }: OperatorViewProps) {
  // Operator states
  const [escalationCases, setEscalationCases] = useState(mockEscalationCases);
  const [unverifiedTutors, setUnverifiedTutors] = useState([
    { id: 'ut-1', name: 'Lê Văn Nam', university: 'ĐH Quốc Gia HN', docType: 'Bằng Cử nhân Toán', file: 'diploma_nam.jpg', status: 'pending' },
    { id: 'ut-2', name: 'Nguyễn Thị Hồng', university: 'ĐH Sư Phạm HN', docType: 'Căn cước công dân (CCCD)', file: 'cccd_hong.jpg', status: 'pending' }
  ]);
  const [searchTutorTrace, setSearchTutorTrace] = useState('Nguyễn Hà My');
  const [traceTutorResult, setTraceTutorResult] = useState(mockTutors[0]);

  const handleResolveCase = (id: string) => {
    setEscalationCases(prev => prev.map(c => c.id === id ? { ...c, status: 'resolved', logs: [...c.logs, `2026-09-25 20:00 - Operator đóng ticket thành công.`] } : c));
  };

  const handleApproveDoc = (id: string) => {
    setUnverifiedTutors(prev => prev.map(t => t.id === id ? { ...t, status: 'approved' } : t));
  };

  const handleRejectDoc = (id: string) => {
    setUnverifiedTutors(prev => prev.map(t => t.id === id ? { ...t, status: 'rejected' } : t));
  };

  const handleSearchTrace = (e: React.FormEvent) => {
    e.preventDefault();
    const found = mockTutors.find(t => t.name.toLowerCase().includes(searchTutorTrace.toLowerCase()));
    if (found) {
      setTraceTutorResult(found);
    } else {
      alert("Không tìm thấy dữ liệu trace cho gia sư này!");
    }
  };

  return (
    <div className="space-y-6 text-xs font-sans">

      {/* ======================================= */}
      {/* O-01: Dashboard & hàng đợi              */}
      {/* ======================================= */}
      {activeSubPage === 'O-01 Dashboard & hàng đợi' && (
        <div className="space-y-5">
          {/* Dashboard Telemetry Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-lg">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Tổng gia sư</span>
                <strong className="text-lg text-slate-800 font-mono">5,120</strong>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center text-lg">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Tỷ lệ Match AI</span>
                <strong className="text-lg text-slate-800 font-mono">98.4%</strong>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center text-lg">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Đang Escalated</span>
                <strong className="text-lg text-slate-800 font-mono">{escalationCases.filter(c => c.status === 'resolving').length}</strong>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex items-center gap-3">
              <div className="w-10 h-10 bg-[#E0F2FE] text-indigo-600 rounded-lg flex items-center justify-center text-lg">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Chờ duyệt hồ sơ</span>
                <strong className="text-lg text-slate-800 font-mono">{unverifiedTutors.filter(t => t.status === 'pending').length}</strong>
              </div>
            </div>
          </div>

          {/* Active Connect Queue table */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Hàng Đợi Kết Nối Thời Gian Thực</h3>
              <p className="text-slate-400 text-[10px] mt-0.5">Danh sách các yêu cầu tìm gia sư đang được điều phối tự động bởi AI và Operator giám sát</p>
            </div>

            <table className="w-full text-left font-medium">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 bg-slate-50">
                  <th className="p-2.5">Mã Case</th>
                  <th className="p-2.5">Phụ huynh</th>
                  <th className="p-2.5">Môn học / Lớp</th>
                  <th className="p-2.5">Gia sư khớp nhất</th>
                  <th className="p-2.5">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="p-2.5 font-mono text-slate-500">TMT-9941</td>
                  <td className="p-2.5">Nguyễn Văn Hải</td>
                  <td className="p-2.5">Toán 9 · Cầu Giấy</td>
                  <td className="p-2.5">Nguyễn Hà My (99% khớp)</td>
                  <td className="p-2.5">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-sm font-bold">Chờ học thử</span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-2.5 font-mono text-slate-500">TMT-8820</td>
                  <td className="p-2.5">Phạm Thị Hoài</td>
                  <td className="p-2.5">Tiếng Anh 8 · Cầu Giấy</td>
                  <td className="p-2.5">Lê Thị Phương Thảo (88% khớp)</td>
                  <td className="p-2.5">
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-sm font-bold">Đã chốt dạy</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================= */}
      {/* O-02: Duyệt hồ sơ                       */}
      {/* ======================================= */}
      {activeSubPage === 'O-02 Duyệt hồ sơ' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Bảng Duyệt Giấy Tờ Của Gia Sư</h2>
            <p className="text-xs text-slate-500">Thẩm định tính chân thực của tài liệu để cấp Verified Badge</p>
          </div>

          <div className="space-y-3">
            {unverifiedTutors.map(t => (
              <div key={t.id} className="border border-slate-100 bg-slate-50 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <strong className="text-slate-800 text-sm block">{t.name}</strong>
                  <span className="text-[10px] text-slate-400 block">{t.university} · {t.docType}</span>
                  <span className="text-[10px] font-mono text-slate-500 block mt-1">File đính kèm: <span className="underline cursor-pointer text-blue-600">{t.file}</span></span>
                </div>

                <div className="flex gap-2">
                  {t.status === 'pending' ? (
                    <>
                      <button 
                        onClick={() => handleApproveDoc(t.id)}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" /> Duyệt tài liệu
                      </button>
                      <button 
                        onClick={() => handleRejectDoc(t.id)}
                        className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <X className="w-3.5 h-3.5" /> Từ chối
                      </button>
                    </>
                  ) : t.status === 'approved' ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 font-bold rounded-lg border border-emerald-100">
                      ✓ Đã duyệt thành công
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-rose-50 text-rose-700 font-bold rounded-lg border border-rose-100">
                      ✖ Đã từ chối duyệt
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================= */}
      {/* O-03: Chi tiết case (Escalations)       */}
      {/* ======================================= */}
      {activeSubPage === 'O-03 Chi tiết case' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Chi Tiết Khiếu Nại & Escalation Ticket</h2>
            <p className="text-xs text-slate-500">Giải quyết tranh chấp và phân xử công bằng chính sách Escrow giữ phí</p>
          </div>

          <div className="space-y-4">
            {escalationCases.map(c => (
              <div key={c.id} className="border border-slate-100 bg-slate-50 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span> {c.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Mã vé: {c.id} · Phụ huynh: {c.parentName} · Gia sư: {c.tutorName}</p>
                  </div>
                  <div>
                    {c.status === 'resolving' ? (
                      <span className="px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-700 font-bold rounded-md">Đang xử lý</span>
                    ) : (
                      <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold rounded-md">Đã giải quyết xong</span>
                    )}
                  </div>
                </div>

                <p className="bg-white p-3 rounded-lg border border-slate-100 text-slate-700 leading-relaxed">
                  <strong>Mô tả lý do:</strong> {c.reason}
                </p>

                <div className="space-y-1.5 border-t border-slate-100 pt-3">
                  <span className="font-bold text-slate-800 block">Lịch sử điều phối của Operator:</span>
                  <ul className="space-y-1 text-slate-500 list-disc list-inside font-mono text-[10px]">
                    {c.logs.map((log, i) => (
                      <li key={i}>{log}</li>
                    ))}
                  </ul>
                </div>

                {c.status === 'resolving' && (
                  <div className="pt-3 border-t border-slate-100 flex gap-2">
                    <button 
                      onClick={() => handleResolveCase(c.id)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg cursor-pointer transition-colors"
                    >
                      Xác nhận Đóng Case & Hòa giải thành công
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================= */}
      {/* O-04: Trace & lý do hiển thị            */}
      {/* ======================================= */}
      {activeSubPage === 'O-04 Trace & lý do hiển thị' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Explainable AI - Tra Cứu Trọng Số Hiển Thị</h2>
            <p className="text-xs text-slate-500">Công cụ xem chi tiết nguyên nhân, điểm số thuật toán phân phối gia sư hiển thị cho Phụ huynh</p>
          </div>

          <form onSubmit={handleSearchTrace} className="flex gap-2 max-w-md">
            <input 
              type="text" 
              value={searchTutorTrace}
              onChange={(e) => setSearchTutorTrace(e.target.value)}
              placeholder="Nhập tên Gia sư để tra cứu (ví dụ: Nguyễn Hà My)..."
              className="flex-1 px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500"
            />
            <button 
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg cursor-pointer transition-colors flex items-center gap-1"
            >
              <Search className="w-3.5 h-3.5" /> Tìm trọng số
            </button>
          </form>

          {traceTutorResult && (
            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 space-y-4">
              <div className="flex gap-3">
                <img src={traceTutorResult.avatar || '/src/assets/images/tutor_female_portrait_1790393145183.jpg'} alt={traceTutorResult.name} className="w-10 h-10 rounded-lg object-cover" />
                <div>
                  <strong className="text-slate-800 text-sm block">{traceTutorResult.name}</strong>
                  <span className="text-[10px] text-slate-400">{traceTutorResult.university}</span>
                </div>
              </div>

              {/* Algorithmic weights charts */}
              <div className="space-y-3 text-slate-600 font-semibold max-w-md">
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span>Trùng khớp Môn & Khối lớp (Weight 40%)</span>
                    <strong className="text-blue-700">10 / 10</strong>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full w-[100%]"></div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span>Địa lý & Khoảng cách (Weight 30% - Chỉ cách {traceTutorResult.distance}km)</span>
                    <strong className="text-emerald-700">9.5 / 10</strong>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[95%]"></div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span>Sự trùng khớp Lịch rảnh (Weight 20%)</span>
                    <strong className="text-indigo-700">9.0 / 10</strong>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full w-[90%]"></div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span>Chỉ số uy tín & feedback phụ huynh cũ (Weight 10%)</span>
                    <strong className="text-amber-700">9.8 / 10</strong>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full w-[98%]"></div>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-lg text-indigo-700 leading-relaxed font-mono text-[10px]">
                🎯 <strong>CÔNG THỨC MATCHING SCORE:</strong> (Môn x 0.4) + (ĐịaLý x 0.3) + (Lịch rảnh x 0.2) + (UyTín x 0.1) = <strong className="text-[#1E40AF] text-xs">{traceTutorResult.matchScore}%</strong>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ======================================= */}
      {/* Báo cáo tuần                            */}
      {/* ======================================= */}
      {activeSubPage === 'Báo cáo tuần (Should, ngoài wireframe)' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Báo Cáo Hoạt Động & Biểu Đồ Tăng Trưởng Tuần</h2>
            <p className="text-xs text-slate-500">Phân tích chuyên sâu lưu lượng truy cập và tỷ lệ kết nối thành công</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="border border-slate-100 bg-slate-50 p-4 rounded-xl space-y-3">
              <span className="font-bold text-slate-800">📊 Tốc độ tăng trưởng kết nối</span>
              <div className="h-32 flex items-end gap-2.5 pt-4">
                <div className="flex-1 bg-blue-200 rounded-t-sm" style={{ height: '35%' }} title="Tuần 1"></div>
                <div className="flex-1 bg-blue-300 rounded-t-sm" style={{ height: '48%' }} title="Tuần 2"></div>
                <div className="flex-1 bg-blue-400 rounded-t-sm" style={{ height: '62%' }} title="Tuần 3"></div>
                <div className="flex-1 bg-blue-600 rounded-t-sm" style={{ height: '85%' }} title="Tuần 4"></div>
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>Tuần 1</span>
                <span>Tuần 2</span>
                <span>Tuần 3</span>
                <span>Tuần này</span>
              </div>
            </div>

            <div className="border border-slate-100 bg-slate-50 p-4 rounded-xl space-y-3">
              <span className="font-bold text-slate-800">🏆 Hiệu quả các kênh kết nối</span>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-[10px] mb-1">
                    <span>Trợ lý AI Chat (99% hài lòng)</span>
                    <strong>82%</strong>
                  </div>
                  <div className="h-1.5 bg-slate-200 rounded-full">
                    <div className="bg-blue-600 h-full w-[82%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] mb-1">
                    <span>Form Đăng ký Fallback</span>
                    <strong>12%</strong>
                  </div>
                  <div className="h-1.5 bg-slate-200 rounded-full">
                    <div className="bg-slate-400 h-full w-[12%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] mb-1">
                    <span>Giới thiệu thủ công (Operator)</span>
                    <strong>6%</strong>
                  </div>
                  <div className="h-1.5 bg-slate-200 rounded-full">
                    <div className="bg-slate-400 h-full w-[6%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
