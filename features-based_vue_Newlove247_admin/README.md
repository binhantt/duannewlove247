README — Newlove247 Admin (Vue Feature-based)
🚀 Giới thiệu

Newlove247 Admin là ứng dụng quản trị được xây dựng trên Vue 3 + Vite + TypeScript, theo kiến trúc feature-based để dễ dàng maintain, mở rộng và onboard dev mới.
Mục tiêu: cung cấp hệ thống quản trị (admin panel) cho các nghiệp vụ quản lý người dùng, sản phẩm, đơn hàng, báo cáo.

📂 Cấu trúc thư mục (Feature-based)
features-based_vue_Newlove247_admin/
├── public/                  # Tài nguyên tĩnh
├── src/
│   ├── app/                 # Bootstrap, global config
│   │   ├── main.ts          # Entry chính
│   │   ├── router/          # Vue Router
│   │   ├── store/           # Global store (Pinia)
│   │   ├── providers/       # Cấu hình API, DI
│   │   └── layouts/         # Layouts chính (AdminLayout, AuthLayout)
│   │
│   ├── features/            # 📌 Theo domain/business
│   │   ├── auth/            # Đăng nhập, đăng ký, phân quyền
│   │   ├── users/           # Quản lý người dùng
│   │   ├── products/        # Quản lý sản phẩm
│   │   ├── orders/          # Quản lý đơn hàng
│   │   └── dashboard/       # Trang tổng quan
│   │
│   ├── shared/              # Tài nguyên dùng chung
│   │   ├── components/      # UI components (Button, Modal, Table…)
│   │   ├── hooks/           # Custom hooks (useAuth, useFetch…)
│   │   ├── utils/           # Hàm tiện ích
│   │   ├── constants/       # Biến cố định (roles, routes…)
│   │   └── types/           # TypeScript types/interfaces
│   │
│   ├── assets/              # Ảnh, icons, styles global
│   └── index.html
│
├── .env                     # Config môi trường
├── vite.config.ts           # Config Vite
├── tsconfig.json            # Config TypeScript
├── package.json
└── README.md

🛠️ Công nghệ sử dụng

Vue 3 (Composition API)

Vite — build tool siêu nhanh

TypeScript — typing an toàn

Pinia — state management

Vue Router — định tuyến động

Ant Design Vue — UI components

Axios — HTTP client

ESLint + Prettier — code style

⚙️ Cài đặt & Chạy dự án
1️⃣ Cài dependencies
npm install
# hoặc
yarn install

2️⃣ Chạy dự án dev
npm run dev

3️⃣ Build production
npm run build

4️⃣ Preview production
npm run preview

🔑 Quản lý ENV

Tạo file .env:

VITE_API_URL=https://api.newlove247.com
VITE_APP_NAME=Newlove247 Admin

🌟 Các tính năng chính

✅ Đăng nhập/Đăng xuất, phân quyền

✅ Quản lý người dùng (CRUD, phân vai trò)

✅ Quản lý sản phẩm (thêm, sửa, xóa, hình ảnh, danh mục)

✅ Quản lý đơn hàng (theo trạng thái)

✅ Dashboard thống kê (biểu đồ doanh thu, top sản phẩm)

✅ Hệ thống thông báo & logs

📖 Quy tắc code

Mỗi feature = 1 folder trong features/

Component tái sử dụng đặt trong shared/components/

API gọi qua services thay vì viết trực tiếp trong component

State dùng Pinia, không để local state phức tạp trong component

Sử dụng TypeScript cho toàn bộ interface, types

👨‍💻 Contributing

Fork repo

Tạo branch mới (feature/add-user-crud)

Commit code rõ ràng

Tạo Pull Request

Bạn có muốn mình viết thêm hướng dẫn ví dụ chi tiết 1 feature (vd: users/) để README này rõ ràng cho dev mới khi onboard không?