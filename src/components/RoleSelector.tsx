import React from 'react';
import { Role } from '../types';
import { User, GraduationCap, ShieldAlert } from 'lucide-react';

interface RoleSelectorProps {
  currentRole: Role;
  onChangeRole: (role: Role) => void;
}

export default function RoleSelector({ currentRole, onChangeRole }: RoleSelectorProps) {
  const roles = [
    {
      id: 'parent' as Role,
      name: 'Phụ Huynh & Học Sinh',
      description: 'Tìm kiếm gia sư bằng AI, xem so sánh, danh sách, đặt học thử, quản lý lịch',
      icon: User,
      color: 'border-blue-500 text-blue-700 bg-blue-50',
      activeColor: 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-100',
      inactiveColor: 'border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
    },
    {
      id: 'tutor' as Role,
      name: 'Gia Sư (Tutor)',
      description: 'Nhận yêu cầu học thử, quản lý hồ sơ dạy học, tải giấy tờ xác minh, xem phản hồi',
      icon: GraduationCap,
      color: 'border-emerald-500 text-emerald-700 bg-emerald-50',
      activeColor: 'bg-emerald-600 text-white border-emerald-600 ring-2 ring-emerald-100',
      inactiveColor: 'border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
    },
    {
      id: 'operator' as Role,
      name: 'Operator (Điều phối)',
      description: 'Duyệt hồ sơ chứng chỉ, điều phối hàng đợi kết nối, phân tích lý do hiển thị AI',
      icon: ShieldAlert,
      color: 'border-amber-500 text-amber-700 bg-amber-50',
      activeColor: 'bg-amber-600 text-white border-amber-600 ring-2 ring-amber-100',
      inactiveColor: 'border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
    }
  ];

  return (
    <div className="bg-white border-b border-slate-200 px-6 py-3.5 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 mb-1">
            Chế độ mô phỏng Sitemap
          </span>
          <h2 className="text-sm font-semibold text-slate-900">
            Nền tảng Đa Vai Trò (Multi-Role) Desktop Website
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Click chọn vai trò bên dưới để đổi giao diện Desktop tương ứng của sitemap. Tất cả nút bấm đều liên kết logic.
          </p>
        </div>

        <div className="flex flex-wrap md:flex-nowrap gap-3">
          {roles.map((r) => {
            const Icon = r.icon;
            const isActive = currentRole === r.id;
            return (
              <button
                key={r.id}
                onClick={() => onChangeRole(r.id)}
                className={`flex-1 md:flex-none text-left px-4 py-2.5 rounded-lg border transition-all duration-250 cursor-pointer ${
                  isActive ? r.activeColor : r.inactiveColor
                }`}
                style={{ minWidth: '220px' }}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span className="font-semibold text-xs whitespace-nowrap">{r.name}</span>
                </div>
                <p className={`text-[10px] leading-normal mt-1 ${isActive ? 'text-white/80' : 'text-slate-400'}`}>
                  {r.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
