## Why

이 프로젝트는 Next.js 14 풀스택 RealWorld 앱으로 기능 구현은 완료되었으나, 문서화가 기본 영문 README만 존재하는 상태다. 바이브 코딩(AI 에이전트 협업 개발)을 위한 프로덕션 품질 전환의 첫 단계로, AI와 개발자 모두가 프로젝트를 빠르게 이해하고 안전하게 기여할 수 있는 종합 문서 체계를 구축한다.

## What Changes

- **README.md 한국어 전면 재작성**: 기존 영문 README를 한국어로 재작성. 프로젝트 소개, 기술 스택, 셋업 가이드, 디렉토리 구조, 배포 방법, 기여 가이드 포함
- **ADR 10건 작성**: `docs/adr/`에 모든 주요 기술 선택(Next.js, Prisma, NextAuth, next-intl, Tailwind, Zod, 테스트 전략, CI/CD, 소프트 삭제, 미들웨어 체인)에 대한 의사결정 기록
- **OpenSpec 바이브 코딩 워크플로우 가이드**: `docs/vibe-coding-workflow.md`에 OpenSpec 기반 변경 관리 워크플로우(explore → propose → apply → archive) 가이드
- **코드 컨벤션 문서**: `docs/code-conventions.md`에 ESLint/Prettier 규칙, 커밋 컨벤션, 네이밍 규칙, TypeScript 패턴 문서화

## Capabilities

### New Capabilities

- `project-readme`: 한국어 README 작성 — 프로젝트 소개, 셋업, 구조, 배포, 기여 가이드
- `architecture-decision-records`: ADR 10건 — 모든 주요 기술 선택의 맥락, 결정, 근거 기록
- `vibe-coding-guide`: OpenSpec 바이브 코딩 워크플로우 가이드 — 단계별 설명 및 실사용 예시
- `code-conventions`: 코드 컨벤션 문서 — 포매터/린터 규칙, 커밋/PR 규칙, 네이밍/타입 패턴

### Modified Capabilities

_(해당 없음 — 기존 specs 없음)_

## Impact

- `README.md`: 기존 영문 내용을 한국어로 전면 교체
- `docs/adr/`: 새 디렉토리 및 ADR-001 ~ ADR-010 파일 생성
- `docs/vibe-coding-workflow.md`: 새 파일 생성
- `docs/code-conventions.md`: 새 파일 생성
- 코드 변경 없음 — 순수 문서 작업
