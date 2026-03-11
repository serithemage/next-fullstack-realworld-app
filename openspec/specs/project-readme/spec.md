## ADDED Requirements

### Requirement: 한국어 프로젝트 소개
README.md SHALL 프로젝트의 목적, RealWorld 스펙 구현체임을 한국어로 설명하고, 데모 URL(Vercel)을 포함해야 한다.

#### Scenario: README 상단에 프로젝트 개요 표시
- **WHEN** 사용자가 README.md를 열면
- **THEN** 프로젝트명, 한줄 설명, 데모 링크가 최상단에 표시된다

### Requirement: 기술 스택 명시
README.md SHALL Next.js 14, React 18, TypeScript 5, Prisma 5, PostgreSQL, NextAuth 4, next-intl, Zod, Tailwind CSS를 포함한 기술 스택을 표로 정리해야 한다.

#### Scenario: 기술 스택 확인
- **WHEN** 사용자가 기술 스택 섹션을 확인하면
- **THEN** 프론트엔드, 백엔드, 인증, 국제화, 검증, 스타일링 카테고리별로 기술이 정리되어 있다

### Requirement: 빠른 시작 가이드
README.md SHALL Docker Compose를 사용한 로컬 개발 환경 셋업 절차를 단계별로 안내해야 한다.

#### Scenario: Docker로 로컬 환경 구동
- **WHEN** 사용자가 빠른 시작 섹션의 명령어를 순서대로 실행하면
- **THEN** PostgreSQL + Next.js 개발 서버가 http://localhost:3000에서 동작한다

### Requirement: 프로젝트 디렉토리 구조 설명
README.md SHALL src/ 하위의 주요 디렉토리(app, actions, components, middlewares, libs, utils, validation, types)의 역할을 설명해야 한다.

#### Scenario: 디렉토리 역할 파악
- **WHEN** 사용자가 프로젝트 구조 섹션을 읽으면
- **THEN** 각 디렉토리가 어떤 코드를 담고 있는지 이해할 수 있다

### Requirement: 주요 기능 목록
README.md SHALL 인증, 글 CRUD, 댓글, 좋아요, 팔로우, 태그 필터링, 다국어 지원 등 구현된 기능을 나열해야 한다.

#### Scenario: 기능 목록 확인
- **WHEN** 사용자가 주요 기능 섹션을 확인하면
- **THEN** RealWorld 스펙에서 구현한 모든 기능이 나열되어 있다

### Requirement: 개발 명령어 안내
README.md SHALL npm scripts(dev, build, lint, migrate, seed, studio)와 Docker 명령어를 설명해야 한다.

#### Scenario: 개발 명령어 참조
- **WHEN** 개발자가 특정 작업(빌드, 린트, DB 마이그레이션 등)을 수행하려 하면
- **THEN** 해당 명령어와 설명을 README에서 찾을 수 있다

### Requirement: 배포 안내
README.md SHALL Vercel 배포 방법과 프로덕션 Docker 빌드 방법을 안내해야 한다.

#### Scenario: 배포 방법 확인
- **WHEN** 사용자가 배포 섹션을 읽으면
- **THEN** Vercel 배포와 Docker 프로덕션 빌드 두 가지 방법이 설명되어 있다

### Requirement: 문서 링크 모음
README.md SHALL docs/ 디렉토리의 문서들(ADR, 바이브 코딩 가이드, 코드 컨벤션, 전환 계획)로의 링크를 포함해야 한다.

#### Scenario: 세부 문서 탐색
- **WHEN** 사용자가 더 상세한 문서를 찾으려 하면
- **THEN** README 하단의 링크를 통해 각 문서로 이동할 수 있다
