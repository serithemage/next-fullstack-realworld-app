# 바이브 코딩 프로젝트 전환 계획

> **프로젝트:** Next.js RealWorld Fullstack App (Conduit Clone)
> **목표:** 바이브 코딩을 위한 프로덕션 품질 전환 (문서화, 테스트, CI/CD)
> **용도:** 학습/교육용 레퍼런스 프로젝트
> **배포:** Vercel
> **문서 언어:** 한국어
> **작성일:** 2026-03-11

---

## 현재 상태

| 항목 | 상태 |
|------|------|
| 테스트 | 없음 (0%) |
| CI/CD | 없음 |
| 문서화 | 기본 영문 README만 존재 |
| 프로젝트 CLAUDE.md | 없음 |
| ADR | 없음 |
| 바이브 코딩 가이드 | 없음 |

### 기술 스택

- **Frontend:** Next.js 14, React 18, TypeScript 5, Tailwind CSS 3
- **Backend:** Next.js API Routes, Prisma 5 ORM, PostgreSQL 13
- **인증:** NextAuth 4 (JWT, Credentials Provider)
- **국제화:** next-intl (en, zh)
- **검증:** Zod
- **배포:** Vercel (프로덕션), Docker Compose (로컬 개발)

---

## 실행 순서

```
1단계: 문서화 → 2단계: 테스트 → 3단계: CI/CD
```

---

## 1단계: 문서화

### 1-1. README.md 한국어 전면 재작성

기존 영문 README를 한국어로 재작성하며 다음 내용을 포함한다.

- 프로젝트 소개 및 주요 기능
- 기술 스택 개요
- 로컬 개발 환경 셋업 가이드 (Docker Compose)
- 테스트 실행 방법 (단위/통합/E2E)
- 배포 방법 (Vercel)
- 프로젝트 디렉토리 구조 설명
- 기여 가이드

### 1-2. CLAUDE.md (프로젝트 루트)

AI 에이전트가 코드베이스를 이해하고 안전하게 작업할 수 있도록 다음 내용을 기술한다.

- 프로젝트 아키텍처 개요
- 디렉토리 구조 및 각 디렉토리의 역할
- 코드 컨벤션 (ESLint/Prettier 규칙, 네이밍 패턴)
- API 라우트 패턴 및 응답 구조 (ApiResponse 클래스)
- 데이터베이스 스키마 요약 및 Prisma 사용 패턴
- 인증 흐름 (NextAuth JWT)
- 국제화 구조 (next-intl, locale 라우팅)
- 미들웨어 체인 동작 원리 (withFeed → withAuth → withIntl)
- 빌드/개발 명령어
- 테스트 실행 방법

### 1-3. ADR (Architecture Decision Records)

`docs/adr/` 디렉토리에 포괄적 범위의 의사결정 기록을 작성한다.

| ADR | 주제 |
|-----|------|
| ADR-001 | Next.js 14 App Router 선택 |
| ADR-002 | PostgreSQL + Prisma ORM 선택 |
| ADR-003 | NextAuth JWT 인증 전략 |
| ADR-004 | next-intl 국제화 전략 |
| ADR-005 | Tailwind CSS 스타일링 선택 |
| ADR-006 | Zod 스키마 검증 전략 |
| ADR-007 | 테스트 전략 (Jest + Playwright, 하이브리드 DB) |
| ADR-008 | CI/CD 전략 (GitHub Actions + Vercel) |
| ADR-009 | 소프트 삭제 패턴 (articles, comments) |
| ADR-010 | 미들웨어 체인 패턴 |

### 1-4. OpenSpec 바이브 코딩 워크플로우 가이드

`docs/vibe-coding-workflow.md`에 다음 내용을 작성한다.

- OpenSpec 개요 및 설치 방법
- 워크플로우 단계별 설명
  - **Explore** (`/opsx:explore`): 아이디어 탐색, 문제 조사
  - **Propose** (`/opsx:propose`): change 생성 및 artifact 자동 생성 (proposal → design → tasks)
  - **Apply** (`/opsx:apply`): tasks.md 기반 순차 구현
  - **Archive** (`/opsx:archive`): 완료된 change 보관
- 실제 사용 예시 (기능 추가 시나리오)
- config.yaml 설정 가이드

### 1-5. 코드 컨벤션 문서

`docs/code-conventions.md`에 다음 내용을 작성한다.

- ESLint/Prettier 규칙 요약
- 커밋 메시지 컨벤션 (conventional commits)
- PR 워크플로우
- 파일/폴더 네이밍 규칙
- TypeScript 타입 정의 패턴

---

## 2단계: 테스트

### 2-1. 테스트 인프라 설정

**프레임워크 구성:**

| 테스트 유형 | 프레임워크 | 용도 |
|------------|-----------|------|
| 단위 테스트 | Jest + React Testing Library | 컴포넌트, 유틸리티, API 로직 |
| 통합 테스트 | Jest + Docker PostgreSQL | API 라우트 + 실제 DB 연동 |
| E2E 테스트 | Playwright | 사용자 시나리오 |

**DB 테스트 전략 (하이브리드):**

| 테스트 유형 | DB 전략 | 설명 |
|------------|---------|------|
| 단위 테스트 | Prisma Client mocking | jest-mock-extended로 Prisma Client를 mocking. 빠르고 DB 불필요 |
| 통합 테스트 | Docker PostgreSQL | docker-compose로 테스트용 PostgreSQL 컨테이너. 실제 쿼리 검증 |
| CI 환경 | GitHub Actions services | services 블록으로 PostgreSQL 컨테이너 실행 |
| E2E 테스트 | Docker PostgreSQL + Seed | 실제 DB에 seed 데이터 투입 후 브라우저 테스트 |

**커버리지 목표:** 60% 이상

### 2-2. 단위 테스트

대상 및 범위:

- **API 라우트 핸들러:** articles, comments, user, profiles, favorite, follow
- **유틸리티 함수:** dateTime, fetch, constants
- **미들웨어:** withAuth, withFeed, withIntl, chain
- **Zod 스키마:** userRegisterSchema, articleInputSchema, commentSchema
- **Server Actions:** getArticle, getArticles, getComments, getCurrentUser, getUserProfile
- **ApiResponse 클래스:** 성공/에러 응답 생성 및 매핑

### 2-3. 통합 테스트

대상 및 범위:

- **Article API:** 생성, 조회, 수정, 삭제, 목록(페이지네이션, 필터링)
- **Comment API:** 생성, 조회, 삭제
- **User API:** 회원가입, 사용자 정보 조회/수정
- **Favorite API:** 좋아요 토글, 카운트 정합성
- **Follow API:** 팔로우/언팔로우, 팔로우 상태 조회
- **인증 통합:** NextAuth JWT 토큰 발급 및 인증된 요청 처리

### 2-4. E2E 테스트 (Playwright)

**인증 전략:** seed.ts의 기존 테스트 사용자 활용

**시나리오:**

| 시나리오 | 상세 |
|---------|------|
| 글 CRUD | 글 작성 → 조회 → 수정 → 삭제, 태그 필터링 |
| 사회적 기능 | 팔로우/언팔로우, 좋아요/좋아요 취소, 댓글 작성/삭제 |
| 비로그인 브라우징 | 홈 피드 조회, 태그 필터, 글 상세 보기, 프로필 조회, 다국어 전환 |

---

## 3단계: CI/CD

### 3-1. GitHub Actions 워크플로우

**트리거:**
- PR 생성/업데이트 시: 전체 검증 파이프라인
- main 브랜치 머지 시: 검증 + 배포

**파이프라인 구성:**

```
┌─────────────┐
│   PR 생성    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│    Lint      │──── ESLint + Prettier 검사
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Type Check   │──── tsc --noEmit
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Build      │──── next build
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────┐
│          Test (병렬 실행)             │
├─────────────────┬───────────────────┤
│  단위 테스트     │  통합 테스트       │
│  (Jest)         │  (Jest + PG)      │
└─────────────────┴───────────────────┘
       │
       ▼
┌─────────────┐
│  E2E Test    │──── Playwright (PostgreSQL services)
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────┐
│          보안 스캔 (병렬 실행)        │
├─────────────────┬───────────────────┤
│  npm audit      │  gitleaks         │
│  (의존성 검사)   │  (시크릿 스캔)     │
└─────────────────┴───────────────────┘
       │
       ▼
┌─────────────┐
│ Vercel 배포   │──── PR: Preview / main: Production
└─────────────┘
```

### 3-2. 보안 스캔

| 도구 | 목적 | 실행 시점 |
|------|------|----------|
| npm audit | 의존성 취약점 검사 | 모든 PR |
| gitleaks | 시크릿(API 키, 비밀번호 등) 커밋 검사 | 모든 PR |

### 3-3. Vercel 배포 연동

- **Vercel GitHub Integration** 활용
- PR 생성 시 자동 Preview 배포 (리뷰어가 실제 동작 확인 가능)
- main 브랜치 머지 시 자동 프로덕션 배포

---

## 산출물 목록

| 산출물 | 경로 |
|-------|------|
| README (한국어) | `README.md` |
| 프로젝트 CLAUDE.md | `CLAUDE.md` |
| ADR 문서 (10건) | `docs/adr/ADR-001.md` ~ `ADR-010.md` |
| 바이브 코딩 워크플로우 가이드 | `docs/vibe-coding-workflow.md` |
| 코드 컨벤션 문서 | `docs/code-conventions.md` |
| Jest 설정 | `jest.config.ts`, `jest.setup.ts` |
| Playwright 설정 | `playwright.config.ts` |
| 단위 테스트 | `__tests__/unit/` |
| 통합 테스트 | `__tests__/integration/` |
| E2E 테스트 | `e2e/` |
| 테스트용 Docker Compose | `docker-compose.test.yml` |
| GitHub Actions 워크플로우 | `.github/workflows/ci.yml` |
| 본 계획 문서 | `docs/vibe-coding-transition-plan.md` |

---

## 트레이드오프 및 결정 사항

| 결정 | 근거 |
|------|------|
| Playwright 선택 | Next.js 공식 권장, 다중 브라우저 지원, Vercel과 자연스러운 연동 |
| 하이브리드 DB 테스트 | SQLite의 Prisma provider 호환성 문제 회피. 단위 테스트 속도와 통합 테스트 신뢰성 모두 확보 |
| 60% 커버리지 목표 | 교육용 프로젝트에 적절한 현실적 목표. 핵심 로직(API, 미들웨어) 위주 커버 |
| .env 현상 유지 | 로컬 개발용 기본값만 포함. CI에서는 GitHub Secrets 사용 |
| Seed 데이터 활용 (E2E) | 기존 seed.ts에 3명의 테스트 사용자 존재. 별도 회원가입 플로우 없이 안정적 |
| 한국어 문서 | 학습/교육용 목적에 부합. 전문 용어는 영문 유지 |
| OpenSpec 워크플로우 | 프로젝트에 이미 설치되어 있으며, 구조화된 변경 관리에 적합 |
| 포괄적 ADR | 교육 목적상 모든 기술 선택의 근거를 명시적으로 기록 |
