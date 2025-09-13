# README — Next.js Enterprise Folder Structure

Tài liệu này mô tả **cấu trúc thư mục chuẩn (feature-based + clean architecture)** cho dự án Next.js (App Router, TypeScript, Tailwind). Mục tiêu: **rõ ràng, chi tiết từng file/folder** để một dev có kinh nghiệm 10 năm có thể dễ dàng maintain, scale và onboard.

---

## Mục lục

1. Giới thiệu
2. Cây thư mục (tree)
3. Giải thích chi tiết theo file/folder
4. Ví dụ code mẫu cho file quan trọng
5. Lệnh khởi tạo & scripts hữu ích
6. Gợi ý config bổ sung

---

## 1. Giới thiệu

Tài liệu này nhắm tới các dự án quy mô trung — lớn, áp dụng:

* Next.js 13+ (App Router)
* TypeScript
* Tailwind CSS
* Zustand / Redux (tuỳ chọn)

Bạn có thể dùng blueprint này như một **template** hoặc **guideline** tổ chức code.

---

## 2. Cây thư mục (ví dụ)

```
my-app/
├── app/
│   ├── (public)/
│   │   ├── layout.tsx
│   │   └── login/page.tsx
│   ├── (protected)/
│   │   ├── layout.tsx
│   │   └── dashboard/page.tsx
│   ├── api/
│   │   └── health/route.ts
│   ├── layout.tsx
│   └── page.tsx
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   └── Button.tsx
│   │   └── layout/
│   │       └── Header.tsx
│   ├── features/
│   │   └── auth/
│   │       ├── components/LoginForm.tsx
│   │       ├── hooks/useAuth.ts
│   │       ├── services/authService.ts
│   │       ├── store.ts
│   │       └── types.ts
│   ├── hooks/
│   │   └── useDebounce.ts
│   ├── lib/
│   │   ├── axios.ts
│   │   └── fetcher.ts
│   ├── services/
│   │   └── apiClient.ts
│   ├── store/
│   │   └── useUserStore.ts
│   ├── types/
│   │   └── index.ts
│   └── config/
│       └── constants.ts
├── public/
│   └── favicon.ico
├── styles/
│   └── globals.css
├── tests/
│   └── features/auth.test.tsx
├── .env.local
├── next.config.mjs
├── tsconfig.json
├── tailwind.config.cjs
├── postcss.config.cjs
├── package.json
└── README.md
```

---

## 3. Giải thích chi tiết theo file/folder

Dưới đây là mô tả từng file/folder quan trọng và mục đích của nó.

### `app/`

* **Mục đích**: Chứa routing theo App Router của Next.js (page.tsx, layout.tsx, route.ts cho API).
* **Lưu ý**: Chỉ để routing & layout; business logic đi vào `src/`.

**Các file tiêu biểu**:

* `app/layout.tsx` — root layout (global HTML, header, footer).
* `app/page.tsx` — trang homepage.
* `app/api/*/route.ts` — route server (API endpoint nhỏ).
* `app/(public)/` và `app/(protected)/` — nhóm route theo layout (grouping routes với segment).

---

### `src/` — business logic

Tất cả logic frontend chính nằm ở đây.

#### `src/components/`

* `ui/` — các component atomic (Button, Input, Icon, Avatar).
* `layout/` — Header, Footer, Sidebar (layout-level components).
* **Mục đích**: tái sử dụng UI, chỉ chứa presentational component.

#### `src/features/`

* Mỗi feature (domain) có 1 folder chứa: `components/`, `hooks/`, `services/`, `store.ts`, `types.ts`.
* Ví dụ: `src/features/auth/` chứa mọi thứ liên quan authentication.
* **Mục tiêu**: đóng gói feature, dễ tách (micro-frontend) khi cần.

#### `src/lib/`

* Helpers chung: `axios` instance, fetcher cho SWR/React Query, format date, logger.

#### `src/services/`

* Các client gọi API chung (có thể dùng fetch, axios hoặc react-query wrapper).
* `apiClient.ts` có thể chứa các interceptor, xử lý lỗi chung.

#### `src/hooks/`

* Custom hooks dùng across app (ví dụ `useDebounce`, `useMedia`, `usePagination`).

#### `src/store/`

* Global state (Zustand/Redux) file chính, export hook/provider.

#### `src/types/`

* Kiểu TypeScript chung (User, ApiResponse, enums...).

#### `src/config/`

* Hằng số, roles, feature flags.

---

### `public/`

* Static assets (images, robots.txt, favicon). Dùng đường dẫn tĩnh `/favicon.ico`.

---

### `styles/`

* `globals.css` — chèn `@tailwind base`, `@tailwind components`, `@tailwind utilities` và styles toàn cục.

---

### `tests/`

* Unit / integration tests. Tổ chức theo feature.

---

### Root config files

* `.env.local` — env local (không commit).
* `next.config.mjs` — cấu hình Next.js (image domains, env vars, rewrites).
* `tsconfig.json` — paths alias (`@/*` => `src/*`).
* `tailwind.config.cjs`, `postcss.config.cjs` — config Tailwind.
* `package.json` — scripts và dependencies.

---

## 4. Ví dụ code mẫu (những file quan trọng)

> Những ví dụ dưới đây là bản rút gọn để bạn copy nhanh vào project.

### `app/layout.tsx`

```tsx
import './globals.css'
import { ReactNode } from 'react'
import Header from '@/components/layout/Header'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <Header />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  )
}
```

---

### `app/api/health/route.ts`

```ts
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ ok: true, time: new Date().toISOString() })
}
```

---

### `src/components/ui/Button.tsx`

```tsx
import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost'
}

export default function Button({ children, variant='primary', ...rest }: Props) {
  const base = 'px-4 py-2 rounded-md font-medium'
  const cls = variant === 'primary' ? `${base} bg-sky-600 text-white` : `${base} bg-transparent`
  return (
    <button className={cls} {...rest}>{children}</button>
  )
}
```

---

### `src/lib/axios.ts`

```ts
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 10000,
})

api.interceptors.response.use(
  res => res,
  err => {
    // xử lý lỗi global: toast, logout nếu 401...
    return Promise.reject(err)
  }
)

export default api
```

---

### `src/features/auth/services/authService.ts`

```ts
import api from '@/lib/axios'

export const login = async (email: string, password: string) => {
  const { data } = await api.post('/auth/login', { email, password })
  return data
}

export const getProfile = async () => {
  const { data } = await api.get('/auth/me')
  return data
}
```

---

### `src/store/useUserStore.ts` (Zustand)

```ts
import { create } from 'zustand'

type User = { id: string; name: string } | null

type State = {
  user: User
  setUser: (u: User) => void
  clear: () => void
}

export const useUserStore = create<State>((set) => ({
  user: null,
  setUser: (u) => set({ user: u }),
  clear: () => set({ user: null })
}))
```

---

### `src/types/index.ts`

```ts
export type User = {
  id: string
  email: string
  name?: string
}

export type ApiResponse<T> = {
  ok: boolean
  data?: T
  error?: string
}
```

---

### `styles/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html, body { height: 100%; }
```

---

## 5. Lệnh khởi tạo & scripts hữu ích

* Tạo project: `npx create-next-app@latest my-app --typescript --tailwind`
* Chạy dev: `pnpm dev` hoặc `npm run dev` (`next dev`)

**package.json (scripts gợi ý)**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write .",
    "test": "vitest"
  }
}
```

---

## 6. Gợi ý config bổ sung

* **TS paths**: cấu hình `tsconfig.json` để dùng alias `@/` trỏ vào `src/`.
* **ESLint + Prettier**: bật rule cho React/Next và đặt Prettier làm format mặc định.
* **CI**: kiểm tra lint, test, build trên pipeline (GitHub Actions / GitLab CI).
* **Env**: giữ `.env.example` trong repo, không commit `.env.local`.

---

## 7. Gợi ý best-practices (ngắn)

* Feature-based tổ chức giúp scale và chia nhỏ trách nhiệm.
* Giữ `app/` mỏng — chỉ route và layouts.
* Viết test nhỏ cho từng feature.
* Tách UI (presentational) và logic (hooks/services).

---

## Kết luận

File README này là blueprint chi tiết cho một project Next.js theo phong cách enterprise. Nếu bạn muốn mình chuyển thành file `.md` để bạn tải về, hoặc tạo **script tự động** để tạo folder + file mẫu, mình sẽ tạo luôn.
