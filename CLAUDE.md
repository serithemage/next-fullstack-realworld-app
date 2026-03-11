# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
# Development
npm run dev                    # Next.js dev server (http://localhost:3000)
docker-compose up --build      # Docker dev environment (PostgreSQL + Next.js)

# Build & Lint
npm run build                  # Production build
npm run lint                   # ESLint + Prettier

# Database
npm run migrate                # prisma migrate dev
npm run seed                   # prisma db seed (3 sample users, 12+ articles)
npm run studio                 # prisma studio (DB GUI)

# Production Docker
docker compose -f docker-compose.production.yml build
docker compose -f docker-compose.production.yml up -d
```

## Architecture Overview

Next.js 14 App Router 풀스택 앱으로, [RealWorld](https://github.com/gothinkster/realworld) 스펙(Medium.com 클론)을 구현한다. Prisma + PostgreSQL 백엔드, NextAuth JWT 인증, next-intl 다국어(en, zh) 지원.

### Routing & Layout

```
src/app/(browse)/[locale]/     ← 모든 페이지의 locale 기반 라우팅
  ├── layout.tsx               ← IntlProvider → UserProvider → Header/Footer
  ├── (home)/page.tsx          ← 홈 (글 피드 + 태그)
  ├── article/[slug]/          ← 글 상세
  ├── editor/ & editor/[slug]/ ← 글 작성/수정
  ├── profile/[username]/      ← 사용자 프로필
  ├── login/ & register/       ← 인증
  └── settings/                ← 사용자 설정
```

`(browse)` 라우트 그룹은 레이아웃용이며 URL에 반영되지 않는다. `[locale]`이 모든 경로의 첫 세그먼트로 동작한다.

### Middleware Chain

`src/middleware.ts`에서 세 미들웨어를 체인으로 합성한다:

```
withFeed → withAuth → withIntl
```

- **withFeed**: 홈페이지에서 인증 사용자를 `?feed=feed`로 리다이렉트, 비인증 사용자의 feed 접근을 로그인으로 리다이렉트
- **withAuth**: `/editor`, `/settings` 경로를 JWT 토큰으로 보호
- **withIntl**: next-intl의 locale 라우팅 처리

`src/middlewares/chain.ts`의 `chain()` 함수가 미들웨어 팩토리들을 재귀적으로 합성한다. 각 미들웨어는 `(middleware: NextMiddleware) => NextMiddleware` 시그니처의 팩토리 함수다.

### API Routes

`src/app/api/` 하위의 REST API. 모든 라우트는 동일한 패턴을 따른다:

1. `getCurrentUser()`로 인증 확인
2. Zod 스키마(`src/validation/schema.ts`)로 입력 검증 (`.safeParse()`)
3. Prisma로 DB 조작
4. `ApiResponse` 클래스로 응답 (`src/app/api/response.ts`)
5. mutation 후 `revalidatePath()`로 캐시 무효화

`ApiResponse`는 `ok()`, `unauthorized()`, `badRequest()`, `notFound()`, `forbidden()`, `noContent()` 정적 메서드를 제공하며, `badRequest()`는 ZodError의 issue 메시지를 자동 추출한다.

### Authentication

NextAuth 4 Credentials Provider (`src/libs/auth.ts`):
- JWT 세션 전략, Prisma 어댑터
- bcrypt로 비밀번호 해싱 (10 rounds)
- 서버: `getSession()` → `getServerSession(authOptions)`
- 미들웨어: `getToken()` from `next-auth/jwt`
- 클라이언트: `AuthProvider` 컨텍스트 (`src/components/common/AuthProvider.tsx`)

### Database (Prisma + PostgreSQL)

`prisma/schema.prisma` 주요 모델:

- **User** ↔ Article (1:N), Comment (1:N), Favorites (M:N), Follows (자기참조 M:N)
- **Article** ↔ Tag (M:N via ArticlesTags), Comment (1:N) — `del` 플래그로 소프트 삭제
- **Comment** — `del` 플래그로 소프트 삭제
- **Follows** — 복합키 (followerId, followingId)
- **Favorites** — 복합키 (articleId, userId), Article.favoritesCount와 동기화 필요

Prisma 클라이언트 싱글턴: `src/libs/prisma.ts` (개발 중 hot-reload 시 다중 인스턴스 방지).

### Data Fetching (서버 사이드)

`src/actions/` — 서버 컴포넌트에서 호출하는 데이터 조회 함수들. Next.js Server Actions(`'use server'`)가 아닌 일반 async 함수이다 (`getUserProfile`만 예외적으로 `'use server'` 사용):

- `getCurrentUser()` — 세션 기반 현재 사용자 조회
- `getArticles(params)` — 필터링(tag, feed, author, favorited) + 페이지네이션
- `getArticle(slug)` — 글 상세 + 팔로우 상태
- `getUserProfile(username)` — 프로필 + 팔로우 상태
- `getComments(slug)` — 댓글 목록 (소프트 삭제 제외)

### Internationalization

next-intl 기반. `localePrefix: 'as-needed'` 설정.

- 지원 로케일: `en`, `zh` (`src/navigation.ts`)
- 번역 파일: `messages/{locale}.json`
- 클라이언트: `useTranslations(namespace)`, `useLocale()`
- 로케일 전환: `useRouter().replace(pathname, { locale })`
- `src/navigation.ts`에서 next-intl의 `Link`, `redirect`, `usePathname`, `useRouter`를 re-export
- **중요**: 페이지 내 링크는 반드시 `@/navigation`의 `Link`를 사용해야 한다 (next/link 직접 사용 금지). 이 Link가 locale을 자동으로 처리한다

### Client-Side Patterns

- `fetchWrapper()` (`src/utils/fetch.ts`) — 클라이언트 API 호출 래퍼, 에러 핸들링 포함
- Context Providers: `AuthProvider`, `ArticleProvider`, `FollowProvider`
- 상수: `ARTICLE_PAGE_LIMIT = 10`, `defaultImage` (`src/utils/constants.ts`)

## Code Style

> 상세한 코드 컨벤션은 [docs/code-conventions.md](docs/code-conventions.md) 참조.

- **Path alias**: `@/*` → `./src/*`
- **Formatter**: Prettier — no semicolons, single quotes, 80 width, 2 tab
- **Linter**: ESLint next/core-web-vitals + prettier plugin
- Article slug 생성 시 중복이면 auto-increment suffix 추가
- 소프트 삭제: articles/comments에 `del: boolean` 필드 사용, 조회 시 `del: false` 필터 필요

## Environment Variables

```
POSTGRES_PRISMA_URL          # Connection pooling URL
POSTGRES_URL_NON_POOLING     # Direct connection (migrations)
NEXTAUTH_URL                 # Auth callback URL
NEXTAUTH_SECRET              # JWT signing secret
DEFAULT_USER_AVATAR          # Default avatar URL
NEXT_PUBLIC_API_URL          # Public API base path (/api)
```

## OpenSpec Workflow

이 프로젝트는 OpenSpec을 사용한 spec-driven 변경 관리를 지원한다:

```bash
/opsx:explore    # 아이디어 탐색, 문제 조사 (코드 읽기만, 구현 안함)
/opsx:propose    # change 생성 + artifact 자동 생성 (proposal → design → tasks)
/opsx:apply      # tasks.md 기반 순차 구현
/opsx:archive    # 완료된 change 보관
```

변경 사항은 `openspec/changes/<name>/`에 proposal.md, design.md, tasks.md로 관리된다.
