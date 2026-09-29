import { Tutor, TrialRequest, EscalationCase } from '../types';

export const mockTutors: Tutor[] = [
  {
    id: 't-1',
    name: 'Nguyễn Hà My',
    avatar: '/src/assets/images/tutor_female_portrait_1790393145183.jpg',
    university: 'ĐH Sư Phạm Hà Nội',
    achievement: 'Thủ khoa đầu vào khối Toán, Giải Nhì HSG Quốc gia môn Toán',
    matchScore: 99,
    distance: 1.8,
    subjects: ['Toán học', 'Toán nâng cao', 'Luyện thi cấp 3'],
    grades: ['Lớp 8', 'Lớp 9', 'Lớp 10'],
    rate: 250000,
    bio: 'Chào phụ huynh, em là Hà My hiện đang là sinh viên năm 3 khoa Sư phạm Toán chất lượng cao trường ĐH Sư Phạm HN. Em có 3 năm kinh nghiệm luyện thi chuyển cấp vào 10 trường công lập tại Hà Nội, cam kết giúp học sinh lấy lại căn bản và đột phá điểm số từ 5 lên 8.5+.',
    rating: 4.9,
    reviewsCount: 42,
    verified: {
      cccd: true,
      diploma: true,
      studentCard: true
    },
    availability: ['Tối Thứ 3', 'Tối Thứ 5', 'Chiều Chủ Nhật']
  },
  {
    id: 't-2',
    name: 'Trần Minh Đức',
    avatar: '/src/assets/images/tutor_male_portrait_1790393163366.jpg',
    university: 'ĐH Bách Khoa Hà Nội',
    achievement: '29.5 điểm thi Đại học, Cựu học sinh Chuyên KHTN',
    matchScore: 95,
    distance: 2.5,
    subjects: ['Toán học', 'Vật lý'],
    grades: ['Lớp 9', 'Lớp 10', 'Lớp 11', 'Lớp 12'],
    rate: 300000,
    bio: 'Với phương pháp dạy học trực quan và tư duy logic Bách Khoa, mình giúp học sinh hiểu bản chất bài toán thay vì học vẹt. Đặc biệt có giáo trình riêng luyện thi SAT và luyện thi vào các trường chuyên như KHTN, Sư Phạm.',
    rating: 4.8,
    reviewsCount: 31,
    verified: {
      cccd: true,
      diploma: true,
      studentCard: true
    },
    availability: ['Tối Thứ 2', 'Tối Thứ 6', 'Sáng Thứ 7']
  },
  {
    id: 't-3',
    name: 'Lê Thị Phương Thảo',
    avatar: '', // Fallback styled avatar
    university: 'ĐH Ngoại Thương',
    achievement: 'IELTS 8.5, Học bổng khuyến khích học tập FTU',
    matchScore: 88,
    distance: 3.2,
    subjects: ['Tiếng Anh', 'Tiếng Anh giao tiếp', 'Luyện thi IELTS'],
    grades: ['Lớp 6', 'Lớp 7', 'Lớp 8', 'Lớp 9', 'Lớp 10'],
    rate: 280000,
    bio: 'Phương pháp giảng dạy tiếng Anh phản xạ, tạo không khí học tập thoải mái vui vẻ giúp học sinh tự tin giao tiếp đồng thời nắm vững ngữ pháp để chinh phục kỳ thi chuyển cấp đạt kết quả cao nhất.',
    rating: 5.0,
    reviewsCount: 19,
    verified: {
      cccd: true,
      diploma: true,
      studentCard: false
    },
    availability: ['Chiều Thứ 4', 'Tối Thứ 7', 'Chiều Chủ Nhật']
  }
];

export const mockTrialRequests: TrialRequest[] = [
  {
    id: 'req-1',
    parentName: 'Nguyễn Văn Hải',
    studentGrade: 'Lớp 9',
    subject: 'Toán học (Ôn thi vào 10 công lập)',
    schedule: 'Tối Thứ 3, Tối Thứ 5 (19:30 - 21:30)',
    location: 'Nguyễn Khánh Toàn, Cầu Giấy, HN (Học tại nhà)',
    budget: '250k - 300k / buổi',
    status: 'pending',
    dateRequested: '2026-09-25'
  },
  {
    id: 'req-2',
    parentName: 'Phạm Thị Hoài',
    studentGrade: 'Lớp 8',
    subject: 'Tiếng Anh lấy gốc',
    schedule: 'Chiều Thứ Bảy, Chiều Chủ Nhật',
    location: 'Trung Kính, Cầu Giấy, HN (Học tại nhà)',
    budget: '200k - 250k / buổi',
    status: 'accepted',
    dateRequested: '2026-09-23'
  },
  {
    id: 'req-3',
    parentName: 'Hoàng Minh Tuấn',
    studentGrade: 'Lớp 12',
    subject: 'Toán học & Vật lý ôn thi THPTQG',
    schedule: 'Tối Thứ 2, Tối Thứ 6',
    location: 'Học Online qua Zoom',
    budget: '300k - 350k / buổi',
    status: 'pending',
    dateRequested: '2026-09-24'
  }
];

export const mockEscalationCases: EscalationCase[] = [
  {
    id: 'esc-1',
    title: 'Gia sư đi trễ buổi học thử',
    parentName: 'Nguyễn Văn Hải',
    tutorName: 'Nguyễn Hà My',
    reason: 'Phụ huynh phản ánh gia sư đến trễ 20 phút không báo trước ở buổi học thử đầu tiên ngày 24/09.',
    status: 'resolving',
    dateCreated: '2026-09-25',
    logs: [
      '2026-09-25 09:00 - Hệ thống ghi nhận phản hồi khiếu nại từ Phụ huynh Hải.',
      '2026-09-25 10:30 - Điều phối viên gọi điện hỗ trợ phụ huynh xoa dịu tình hình.',
      '2026-09-25 11:15 - Gia sư Hà My giải trình: Gặp tai nạn giao thông nhẹ trên đường Cầu Giấy, điện thoại bị hỏng màn hình nên không liên lạc được.'
    ]
  },
  {
    id: 'esc-2',
    title: 'Yêu cầu hoàn trả phí Escrow học thử',
    parentName: 'Trần Thị Mai',
    tutorName: 'Lê Văn Nam',
    reason: 'Buổi học thử không hiệu quả, học sinh không hiểu bài, phụ huynh muốn hủy lịch và hoàn trả 100% học phí đặt cọc.',
    status: 'resolved',
    dateCreated: '2026-09-22',
    logs: [
      '2026-09-22 14:00 - Phụ huynh gửi yêu cầu hoàn phí kèm lý do chất lượng chưa đạt.',
      '2026-09-23 09:30 - Liên hệ gia sư Nam xác nhận tình trạng buổi dạy.',
      '2026-09-23 15:00 - Chấp thuận hoàn phí 100% cho phụ huynh qua tài khoản ngân hàng theo chính sách Escrow.',
      '2026-09-23 15:10 - Đóng case thành công.'
    ]
  }
];
