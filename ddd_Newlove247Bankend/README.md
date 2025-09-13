# Newlove247 — Backend (Domain-Driven Design)

> README chi tiết cho backend ứng dụng hẹn hò **Newlove247** — kiến trúc theo Domain‑Driven Design (DDD). Tài liệu này mô tả cấu trúc thư mục, ràng buộc miền, luồng sự kiện, cách chạy local, các endpoints chính, và các khuyến nghị triển khai/kiểm thử.

---

## Mục lục

1. Giới thiệu nhanh
2. Mục tiêu & phạm vi
3. Kiến trúc tổng quan (DDD)
4. Cấu trúc thư mục (mapping)
5. Chi tiết từng layer

   * Domain
   * Application
   * Infrastructure
   * Presentation
   * Shared
6. Flows & Sequence diagrams (Mermaid)
7. Cấu hình môi trường (env)
8. Chạy & lệnh thường dùng
9. Kiểm thử & CI
10. Triển khai & scale
11. Bảo mật & quyền riêng tư
12. Observability
13. Roadmap / Next steps
14. Contributing
15. License

---

## 1. Giới thiệu nhanh

Newlove247 là backend cho một ứng dụng hẹn hò: quản lý user, profile, tìm match theo vị trí & sở thích, nhắn tin realtime, upload ảnh, hệ thống like/match, và cơ chế thông báo. Thiết kế theo DDD để tách rõ **business logic** (domain) khỏi concerns kỹ thuật (infrastructure).

## 2. Mục tiêu & phạm vi

* Tách biệt trách nhiệm rõ ràng giữa Domain / Application / Infrastructure / Presentation.
* Hỗ trợ nhiều nguồn dữ liệu (MongoDB, PostgreSQL) bằng pattern repository.
* Hỗ trợ WebSocket cho realtime messages & notifications.
* Event-driven: domain events (MatchCreated, MessageSent...) để dễ mở rộng (notifications, analytics, ML pipelines).

## 3. Kiến trúc tổng quan (DDD)

* **Domain**: Entities, ValueObjects, Aggregates, DomainEvents, Repository interfaces, Domain Services.
* **Application**: Orchestration, DTOs, Command/Query handlers, giao diện với bên ngoài (services như media, location).
* **Infrastructure**: Implementations của repository, third‑party service (push, cloud storage), DB config, framework glue (auth, websockets).
* **Presentation**: REST controllers và WebSocket endpoints.
* **Shared**: Utils, constants, exceptions, interfaces tái sử dụng.

---

## 4. Cấu trúc thư mục (mapping với đề bài)

(Đã có sẵn; ở đây mô tả ngắn cho mỗi thư mục)

```
src/
  domain/
    entities/
    value-objects/
    aggregates/
    events/
    repositories/   (interfaces)
    services/       (domain services)
  application/
    services/
    dtos/
    interfaces/
    handlers/
  infrastructure/
    database/
    services/       (external implementations)
    framework/
    common/
  presentation/
    controllers/
    models/
    docs/
  shared/
    utils/
    constants/
    exceptions/
    interfaces/
```

---

## 5. Chi tiết từng layer

### Domain (src/domain)

**Mục tiêu:** chứa business rules và invariants. Các thay đổi phải thể hiện logic nghiệp vụ.

* **Entities**: `User`, `Profile`, `Match`, `Message`, `Like`, `Photo`, `Interest`.

  * `User`: id, email, hashedPassword, roles, lastSeen, isActive...
  * `Profile`: userId, displayName, bio, age (VO), location (VO), photos\[], preferenceSettings (VO), stats (VO).
* **Value Objects**: `Location`, `Age`, `Gender`, `PreferenceSettings`, `ProfileStats` — immutable, so sánh theo giá trị.
* **Aggregates**:

  * `UserProfileAggregate` (root: User/Profile) — đảm bảo các thay đổi profile tuân thủ invariants.
  * `MatchingAggregate` — xử lý business rules khi match được tạo.
  * `ConversationAggregate` — quản lý messages, read receipts, blocking.
* **Domain Events**: `MatchCreated`, `MessageSent`, `ProfileUpdated`, `LikeReceived` — phát ra để các side-effect xử lý ở infra/app (notifications, analytics).
* **Repositories interfaces**: `IUserRepository`, `IMatchRepository`, `IMessageRepository`, `IProfileRepository` — chỉ khai báo các hành vi cần dùng trong domain/app.
* **Domain Services**: `MatchingService`, `RecommendationService`, `ProfileVisibilityService`, `MessageFilterService` — logic nghiệp vụ phức tạp không phù hợp để đặt vào entity.

**Ví dụ interface (TypeScript)**

```ts
// src/domain/repositories/IUserRepository.ts
import { User } from "../entities/User";

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<void>;
  delete(id: string): Promise<void>;
}
```

---

### Application (src/application)

**Mục tiêu:** orchestration — kết hợp domain objects & repositories để thực hiện use cases.

* **Services**: `UserMatchingService`, `ChatService`, `ProfileService`, `NotificationService`.
* **DTOs**: dùng để tách representation giữa layers: `UserProfileDto`, `MatchDto`, `MessageDto`, `PreferenceDto`.
* **External Interfaces**: `INotificationService`, `ILocationService`, `IMediaService`, `IModeratorService` — dùng dependency inversion để infra thực thi.
* **Command/Query Handlers**: thực hiện CQRS pattern: `CreateProfileHandler`, `FindMatchesHandler`, `SendMessageHandler`, `UpdatePreferencesHandler`.

**CreateProfileHandler (pseudocode)**

```ts
class CreateProfileHandler {
  constructor(private profileRepo: IProfileRepository, private mediaService: IMediaService) {}

  async execute(cmd: CreateProfileCommand) {
    const profile = Profile.createFrom(cmd.payload);
    await this.profileRepo.save(profile);
    // emit ProfileUpdated event or domain event
  }
}
```

---

### Infrastructure (src/infrastructure)

**Mục tiêu:** implement kỹ thuật: DB, cloud storage, push notifications, websockets, auth.

* **Database**: `UserRepository.ts`, `MatchRepository.ts`, `MessageRepository.ts` — có config cho MongoDB & PostgreSQL. Tách conversion (ORM/ODM ↔ domain entities) bằng mappers.
* **External Services**: `PushNotificationService`, `CloudStorageService`, `GeocodingService`, `ContentModerationService`.
* **Framework**: `WebsocketManager`, `AuthMiddleware`, `RateLimiter`, `Security` (headers, helmet...).
* **Common**: `Logger`, `Cache` (Redis), `Analytics`, `Metrics`.

**Khi implement repo:** giữ repositories trả về domain entities (không trả thẳng document/rows) — mapping ở infra.

---

### Presentation (src/presentation)

* **Controllers**: REST endpoints và input validation.

  * `AuthController`: `/auth/register`, `/auth/login`, `/auth/refresh`
  * `ProfileController`: `/profiles` (GET, POST, PUT, PATCH), `/profiles/:id/photos`
  * `MatchController`: `/matches`, `/matches/:id` (accept/reject)
  * `MessageController`: `/conversations/:id/messages` (POST/GET)
* **WebSocket**: room per conversation; events: `message:new`, `match:created`, `user:online`.
* **Docs**: `swagger.json`, websocket docs.

---

### Shared (src/shared)

* **Utils**: `MatchingAlgorithm.ts` (core scoring), `ProfileValidator.ts`, `MessageFormatter.ts`, `LocationUtils.ts`.
* **Constants**: `MatchingRules`, `ProfileLimits`, `MessageTypes`, `ErrorCodes`.
* **Exceptions**: domain-specific errors for graceful failures.
* **Interfaces**: `IMatchable`, `IMessageable`, `IProfileable`, `IRecommendable`.

**Lưu ý:** `MatchingAlgorithm` là algorithmic core có thể chuyển sang microservice riêng (scalability) hoặc sử dụng worker + Redis queues.

---

## 6. Flows & Sequence diagrams (Mermaid)

### Matching flow (tạo match khi 2 bên like nhau)

```mermaid
sequenceDiagram
  participant A as User A
  participant B as User B
  participant API as Backend
  participant Matching as MatchingService
  participant Repo as MatchRepository

  A->>API: POST /likes (target B)
  API->>Matching: recordLike(A,B)
  Matching-->>Repo: saveLike
  alt B has already liked A
    Matching->>Repo: createMatch(A,B)
    Repo-->>API: matchCreated
    API->>A: emit match:created
    API->>B: emit match:created
  end
```

### Messaging flow (realtime)

```mermaid
sequenceDiagram
  participant U1
  participant WS
  participant App as ChatService
  participant Repo

  U1->>WS: send message (conversationId, body)
  WS->>App: validate & sanitize
  App->>Repo: save message
  App->>WS: broadcast message:new
  App->>Notification: push if offline
```

---

## 7. Cấu hình môi trường (ví dụ `.env`)

```env
NODE_ENV=development
PORT=4000
DB_TYPE=postgres    # or mongodb
DB_URL=postgres://user:pass@localhost:5432/newlove247
JWT_SECRET=replace_with_secure_secret
REDIS_URL=redis://localhost:6379
CLOUD_STORAGE_ENDPOINT=https://s3.example.com
CLOUD_STORAGE_BUCKET=newlove-photos
PUSH_PROVIDER=expo|fcm|apns
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=100
```

---

## 8. Chạy & lệnh thường dùng

**Prereqs**: Node.js >= 18, pnpm / npm / yarn, Docker (nếu muốn chạy container), Redis

**Lệnh mẫu**

```bash
# cài dependencies
pnpm install

# chạy dev (nodemon/ts-node)
pnpm run dev

# build
pnpm run build

# start
pnpm start

# lint
pnpm run lint

# test
pnpm run test
```

**Docker (tóm tắt)**

* Có thể cung cấp `docker-compose.yml` gồm services: app, postgres, mongo (tùy chọn), redis, rabbitmq.

---

## 9. Kiểm thử & CI

* **Unit tests**: domain logic (entities, value objects, domain services) — Jest.
* **Integration tests**: repositories (sử dụng test DB/container), handlers.
* **E2E tests**: API endpoints — Playwright / Supertest.
* **Contract tests**: nếu có microservices.
* **CI**: GitHub Actions pipeline — lint → unit tests → build → integration tests → deploy (on tag or release).

---

## 10. Triển khai & scale

* **Message queue** (RabbitMQ/Kafka) cho domain events & async jobs (notifications, analytics, indexing).
* **Worker processes** để chạy Matching pipeline, background jobs (cleanup, reindex, ML scoring).
* **Stateless app servers** + Redis for sessions/cache.
* **DB scaling**: read replicas cho Postgres; sharding cho Mongo nếu cần.
* **Storage**: S3-compatible buckets cho ảnh.

---

## 11. Bảo mật & quyền riêng tư

* Password hashing (bcrypt/argon2), JWT cho access token, rotate refresh tokens.
* Validate & sanitize tất cả input (đặc biệt message, bio, uploaded metadata).
* Content moderation pipeline: hình ảnh & text moderation (IModeratorService) — reject/flag khi vi phạm.
* GDPR/PDPA: cung cấp khả năng xóa dữ liệu, xuất dữ liệu.
* Rate limiting, IP blocking, malware scanning cho ảnh.

---

## 12. Observability

* Centralized logs (JSON) -> ELK / Datadog.
* Metrics: Prometheus + Grafana (requests, error rate, queue lengths, match throughput).
* Tracing: OpenTelemetry cho request tracing qua services.

---

## 13. Roadmap / Next steps

* Tối ưu thuật toán matching (ML model + feedback loop).
* A/B testing ranking rules.
* Migrate matching engine ra microservice độc lập.
* Enhance moderation (human-in-the-loop)
* Add video messages & stories

---

## 14. Contributing

* Follow Git flow: `feature/*`, `hotfix/*`.
* Commit message: conventional commits (feat, fix, docs, chore, refactor).
* PR checklist: build ok, tests >= threshold, code review 1-2 approvals.
* Code style: Prettier + ESLint + TypeScript strict.

---

## 15. License

MIT

---

### Ghi chú cuối

Tài liệu này là README khởi đầu — tuỳ vào tech stack bạn chọn (NestJS / Express + TypeORM / Mongoose) sẽ có một số chi tiết implement khác nhau (DI container, module registration, ORM mappings...). Nếu bạn muốn mình tạo **README tiếng Anh**, **file `docker-compose.yml`**, **UML diagrams** (Class/Sequence/UseCase), hoặc **các file mẫu (ex: IUserRepository implementation for Postgres)** thì nói mình sẽ tiếp tục tạo ngay.
