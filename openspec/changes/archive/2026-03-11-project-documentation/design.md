## Context

Next.js 14 RealWorld 풀스택 앱은 기능 구현이 완료되었으나 문서가 기본 영문 README 하나뿐이다. 바이브 코딩 전환 계획의 1단계로 종합 문서 체계를 구축한다. 대상 독자는 AI 에이전트와 한국어 사용 개발자이며, 교육/학습용 레퍼런스 프로젝트로 활용된다.

현재 상태:
- `README.md`: 영문, 기본 셋업 정보만 포함
- `CLAUDE.md`: 프로젝트 루트에 이미 생성됨 (AI 에이전트용 아키텍처 가이드)
- `docs/vibe-coding-transition-plan.md`: 전체 전환 계획 문서 존재
- `docs/adr/`, `docs/vibe-coding-workflow.md`, `docs/code-conventions.md`: 미존재

## Goals / Non-Goals

**Goals:**

- README를 한국어로 재작성하여 프로젝트 소개, 셋업, 구조, 배포 방법을 포괄
- ADR 10건으로 모든 주요 기술 선택의 맥락과 근거를 기록
- OpenSpec 바이브 코딩 워크플로우 가이드로 AI 협업 개발 방법 안내
- 코드 컨벤션 문서로 일관된 코드 스타일과 기여 규칙 정립

**Non-Goals:**

- 코드 변경 (리팩토링, 기능 추가, 버그 수정)
- 테스트 코드 작성 (2단계에서 진행)
- CI/CD 파이프라인 구축 (3단계에서 진행)
- CLAUDE.md 재작성 (이미 생성 완료)

## Decisions

### 1. 문서 언어: 한국어 (전문 용어 영문 유지)

모든 문서를 한국어로 작성하되, 기술 용어(Next.js, Prisma, NextAuth, JWT, Zod, Tailwind CSS, ESLint, Prettier, Docker, Vercel 등)는 영문을 유지한다.

- **대안**: 영문 작성 → 오픈소스 커뮤니티에는 유리하나 교육 목적에 부적합
- **대안**: 한/영 이중 문서 → 유지보수 부담이 두 배

### 2. ADR 포맷: Michael Nygard 스타일

각 ADR은 Status, Context, Decision, Consequences 구조를 따른다. 교육 목적상 모든 기술 선택을 포괄적으로 기록한다(10건).

- **대안**: MADR (Markdown ADR) → 더 구조화되었으나 교육용으로는 과도
- **대안**: 핵심 3~5건만 → 교육 목적상 불충분

### 3. 문서 디렉토리 구조

```
docs/
├── adr/
│   ├── README.md          ← ADR 목록 및 설명
│   ├── ADR-001.md ~ ADR-010.md
├── vibe-coding-workflow.md
├── code-conventions.md
└── vibe-coding-transition-plan.md  ← 기존
```

- **대안**: 단일 docs.md 파일 → 탐색성 저하
- **대안**: Docusaurus/GitBook 등 문서 사이트 → 프로젝트 규모 대비 과도

### 4. README 구조

프로젝트 소개 → 데모 → 기술 스택 → 주요 기능 → 빠른 시작 → 프로젝트 구조 → 개발 가이드 → 배포 → 문서 링크 순서로 구성한다.

- **대안**: 최소 README + 별도 문서 → 진입 장벽 높음

### 5. 바이브 코딩 가이드 범위

OpenSpec 워크플로우에 집중한다. 일반적인 AI 코딩 팁은 제외하고, 이 프로젝트에서 실제로 사용하는 `/opsx:explore` → `/opsx:propose` → `/opsx:apply` → `/opsx:archive` 플로우를 예시와 함께 설명한다.

- **대안**: 범용 바이브 코딩 가이드 → 프로젝트 특정 맥락이 부족

## Risks / Trade-offs

- **문서 노후화**: 코드가 변경되면 문서가 outdated될 수 있음 → ADR은 append-only 특성으로 자연스럽게 대응. README/컨벤션 문서는 코드 변경 시 함께 업데이트하는 워크플로우를 가이드에 명시
- **한국어 전용**: 비한국어 사용자가 접근하기 어려움 → 교육/학습용 목적에 맞춰 의도적 선택. 코드와 CLAUDE.md는 영문 병행
- **ADR 10건 분량**: 작성량이 상당함 → 각 ADR을 간결하게 유지 (1페이지 이내)
- **OpenSpec 의존성**: 바이브 코딩 가이드가 OpenSpec CLI에 의존 → 가이드에 설치 방법 포함, OpenSpec 없이도 이해 가능하도록 개념 설명 병행

## Open Questions

_(없음 — 인터뷰를 통해 모든 결정 사항이 확정됨)_
