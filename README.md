# ![RealWorld Example App](logo.png)

### Next.js 14 풀스택 RealWorld 앱

> [RealWorld](https://github.com/gothinkster/realworld) 스펙을 구현한 Medium.com 클론 애플리케이션

**데모:** [https://next-fullstack-realworld-app.vercel.app/](https://next-fullstack-realworld-app.vercel.app/)

![RealWorld Example App](screenshot.png)

---

## 기술 스택

| 카테고리 | 기술 |
|---------|------|
| 프론트엔드 | Next.js 14 (App Router), React 18, TypeScript 5 |
| 스타일링 | Tailwind CSS 3 |
| 백엔드 | Next.js API Routes |
| 데이터베이스 | PostgreSQL 13, Prisma 5 ORM |
| 인증 | NextAuth 4 (JWT, Credentials Provider) |
| 국제화 | next-intl (English, 中文简体) |
| 검증 | Zod |
| 배포 | Vercel (프로덕션), Docker Compose (로컬 개발) |

## 주요 기능

- **인증:** 회원가입, 로그인/로그아웃 (NextAuth JWT)
- **글 관리:** 글 작성, 수정, 삭제 (Markdown 지원)
- **댓글:** 글에 댓글 작성/삭제
- **좋아요:** 글 좋아요/좋아요 취소
- **팔로우:** 사용자 팔로우/언팔로우
- **피드:** 글로벌 피드, 개인 피드 (팔로우 기반)
- **태그:** 태그별 글 필터링
- **프로필:** 사용자 프로필 조회, 설정 변경
- **다국어:** English, 中文简体 지원 (locale 기반 라우팅)

## 빠른 시작

### 사전 요구사항

- [Docker](https://www.docker.com/) & Docker Compose
- (또는) Node.js 20+, PostgreSQL 13+

### Docker로 실행 (권장)

```bash
# 저장소 클론
git clone https://github.com/gardenofdev/next-fullstack-realworld-app.git
cd next-fullstack-realworld-app

# Docker Compose로 실행 (PostgreSQL + Next.js 개발 서버)
docker-compose up --build --force-recreate

# 브라우저에서 확인
# http://localhost:3000
```

### 로컬 실행 (Node.js)

```bash
# 의존성 설치
npm install

# 환경변수 설정 (.env 파일 참조)
# POSTGRES_PRISMA_URL, NEXTAUTH_SECRET 등 설정 필요

# DB 마이그레이션 및 시드 데이터 투입
npm run migrate
npm run seed

# 개발 서버 실행
npm run dev
```

### 환경변수

| 변수 | 설명 |
|------|------|
| `POSTGRES_PRISMA_URL` | PostgreSQL 연결 URL (Connection Pooling) |
| `POSTGRES_URL_NON_POOLING` | PostgreSQL 직접 연결 URL (마이그레이션용) |
| `NEXTAUTH_URL` | NextAuth 콜백 URL (예: `http://localhost:3000`) |
| `NEXTAUTH_SECRET` | JWT 서명용 시크릿 |
| `DEFAULT_USER_AVATAR` | 기본 사용자 아바타 URL |
| `NEXT_PUBLIC_API_URL` | 공개 API 베이스 경로 (예: `/api`) |

### 시드 데이터

`npm run seed` 실행 시 3명의 샘플 사용자와 12개 이상의 글이 생성된다.

| 사용자 | 이메일 | 비밀번호 |
|--------|--------|----------|
| Alice | `alice@prisma.io` | `123456` |
| Gerome | `gerome@realworld.io` | `123456` |
| Anah Benešová | `anah@realworld.io` | `123456` |

## 프로젝트 구조

```
src/
├── app/
│   ├── (browse)/[locale]/   # 페이지 라우팅 (locale 기반)
│   │   ├── (home)/          # 홈 (글 피드 + 태그)
│   │   ├── article/[slug]/  # 글 상세
│   │   ├── editor/          # 글 작성/수정
│   │   ├── profile/[username]/ # 사용자 프로필
│   │   ├── login/ & register/ # 인증
│   │   └── settings/        # 사용자 설정
│   └── api/                 # REST API 라우트
├── actions/                 # 서버 사이드 데이터 fetching
├── components/              # UI 컴포넌트
├── middlewares/              # 미들웨어 (auth, feed, intl)
├── libs/                    # 라이브러리 설정 (auth, prisma)
├── utils/                   # 유틸리티 함수
├── validation/              # Zod 스키마
└── types/                   # TypeScript 타입 정의
prisma/
├── schema.prisma            # DB 스키마
└── seed.ts                  # 시드 데이터
messages/
├── en.json                  # 영어 번역
└── zh.json                  # 중국어 간체 번역
```

## 개발 명령어

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | Next.js 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run lint` | ESLint + Prettier 검사 |
| `npm run migrate` | Prisma 마이그레이션 실행 |
| `npm run seed` | 시드 데이터 투입 |
| `npm run studio` | Prisma Studio (DB GUI) 실행 |

## 배포

### Vercel

이 프로젝트는 [Vercel](https://vercel.com)에 최적화되어 있다. GitHub 저장소를 연결하면 main 브랜치 푸시 시 자동 배포된다.

### Docker (프로덕션)

```bash
# 프로덕션 이미지 빌드
docker compose -f docker-compose.production.yml build

# 백그라운드 실행
docker compose -f docker-compose.production.yml up -d

# http://localhost:3000
```

## Claude Code 스킬

프로젝트에 맞춤화된 Claude Code 스킬이 `.claude/skills/`에 정의되어 있다.

| 스킬 | 명령 | 호출 방식 | 설명 |
|------|------|----------|------|
| **gen-test** | `/gen-test [파일] [유형]` | 자동/수동 | ADR-007 기반 테스트 파일 생성 |
| **run-tests** | `/run-tests [유형] [--coverage]` | 수동 | 테스트 실행 + 커버리지 보고 |
| **gen-api-route** | `/gen-api-route [리소스] [메서드]` | 수동 | 프로젝트 패턴에 맞는 API 라우트 스캐폴딩 |
| **local-ci** | `/local-ci [--fix]` | 수동 | 로컬 CI 파이프라인 실행 (lint→build→test→scan) |
| **i18n-sync** | `/i18n-sync [check\|add\|sync]` | 자동/수동 | 번역 키 누락 체크 및 로케일 동기화 |
| **db-migrate** | `/db-migrate [migrate\|seed\|reset]` | 수동 | Prisma 마이그레이션 워크플로우 |
| **security-scan** | `/security-scan [--full]` | 수동 | 의존성 취약점 + 시크릿 노출 검사 |

> **자동 호출:** `gen-test`와 `i18n-sync`은 Claude가 맥락에 맞게 자동으로 실행할 수 있다. 나머지는 `/명령어`로만 실행된다.

## 문서

| 문서 | 설명 |
|------|------|
| [CLAUDE.md](CLAUDE.md) | AI 에이전트를 위한 프로젝트 아키텍처 가이드 |
| [아키텍처 의사결정 기록 (ADR)](docs/adr/README.md) | 주요 기술 선택의 맥락과 근거 (10건) |
| [바이브 코딩 워크플로우](docs/vibe-coding-workflow.md) | OpenSpec 기반 AI 협업 개발 워크플로우 가이드 |
| [코드 컨벤션](docs/code-conventions.md) | 코드 스타일, 커밋, PR 규칙 |
| [전환 계획](docs/vibe-coding-transition-plan.md) | 바이브 코딩 프로젝트 전환 전체 계획 |
| [Claude Code 스킬 가이드](docs/claude-code-skills.md) | 프로젝트 맞춤 스킬 사용법과 설계 원칙 |

## 참고

- [vue3-realworld-example-app](https://github.com/gardenofdev/vue3-realworld-example-app)
- [realworld](https://github.com/gothinkster/realworld)
- [react-realworld-example-app](https://github.com/gardenofdev/react-realworld-example-app/)
