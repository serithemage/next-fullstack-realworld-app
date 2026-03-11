# 바이브 코딩 워크플로우 가이드

이 프로젝트는 **OpenSpec** 을 사용하여 AI 에이전트와의 협업 개발(바이브 코딩)을 구조화한다. 변경 사항을 제안 → 설계 → 구현 → 보관의 생명주기로 관리한다.

> **참고:** 이 프로젝트의 AI 에이전트는 **Claude Code** (claude.ai/code)를 사용한다. OpenSpec 명령어(`/opsx:explore`, `/opsx:propose` 등)는 Claude Code의 skill로 등록되어 있다.

---

## OpenSpec이란?

OpenSpec은 AI 네이티브 spec-driven development 시스템이다. 코드 변경을 구조화된 워크플로우로 관리하며, AI 에이전트가 맥락을 이해하고 일관성 있게 작업할 수 있도록 돕는다.

핵심 개념:
- **Change**: 하나의 변경 단위. proposal, design, specs, tasks 등의 artifact로 구성
- **Artifact**: change를 구성하는 문서 (proposal.md, design.md, tasks.md 등)
- **Schema**: artifact의 종류와 의존성을 정의하는 워크플로우 템플릿
- **Spec**: 시스템이 "무엇을 해야 하는지" 정의하는 요구사항 문서

### 설치

```bash
npm install -g openspec
```

프로젝트에는 이미 OpenSpec이 초기화되어 있다 (`openspec/` 디렉토리).

---

## 워크플로우 단계

```
Explore ──→ Propose ──→ Apply ──→ Archive
(탐색/사고)   (제안/설계)   (구현)     (완료/보관)
```

### 1. Explore: 탐색과 사고

**명령어:** `/opsx:explore`

**목적:** 구현 전에 아이디어를 탐색하고 문제를 조사한다. 코드를 읽고 분석하되, 코드를 작성하지 않는다.

**사용 시점:**
- 새 기능의 접근 방식을 고민할 때
- 기존 코드의 구조를 파악해야 할 때
- 여러 대안을 비교하고 싶을 때
- 문제의 범위를 파악할 때

**동작:**
- AI 에이전트가 "사고 파트너" 역할을 수행
- 코드베이스를 탐색하고 다이어그램으로 시각화
- 기존 change가 있으면 artifact를 참조하여 맥락 유지
- 사고가 구체화되면 Propose 단계로 전환 제안

**제약:** 코드 작성 불가. OpenSpec artifact(proposal, design 등) 작성은 허용.

### 2. Propose: 제안과 설계

**명령어:** `/opsx:propose <change-name>`

**목적:** change를 생성하고 모든 artifact를 한 번에 만든다.

**사용 시점:**
- 구체적인 변경 사항이 확정되었을 때
- 기능 추가, 버그 수정, 리팩토링 등을 시작할 때

**동작:**
1. `openspec new change "<name>"` — 디렉토리 생성
2. `openspec status` — artifact 빌드 순서 파악
3. 의존성 순서대로 artifact 생성:
   - **proposal.md** — 무엇을, 왜 (What & Why)
   - **design.md** — 어떻게 (How)
   - **specs/\*/spec.md** — 요구사항 (What should the system do)
   - **tasks.md** — 구현 체크리스트 (Step by step)

**산출물:**
```
openspec/changes/<name>/
├── .openspec.yaml     # change 메타데이터
├── proposal.md        # 동기와 범위
├── design.md          # 기술 설계
├── specs/             # 요구사항 명세
│   └── <capability>/spec.md
└── tasks.md           # 구현 체크리스트
```

### 3. Apply: 구현

**명령어:** `/opsx:apply [change-name]`

**목적:** tasks.md의 체크리스트를 순서대로 구현한다.

**사용 시점:**
- Propose에서 모든 artifact가 완료된 후
- 이전 세션에서 중단된 구현을 이어갈 때

**동작:**
1. proposal, design, specs, tasks를 읽어 맥락 파악
2. 각 pending task를 순회하며:
   - 코드 변경 수행
   - `- [ ]` → `- [x]`로 체크 표시
3. 문제 발생 시 일시 중지
4. 모든 task 완료 시 archive 제안

**특징:**
- 언제든 중단/재개 가능 (체크리스트로 진행 상태 추적)
- 구현 중 설계 이슈 발견 시 artifact 업데이트 가능

### 4. Archive: 보관

**명령어:** `/opsx:archive [change-name]`

**목적:** 완료된 change를 보관 처리한다.

**사용 시점:**
- 모든 task가 완료된 후
- 미완료 상태라도 의도적으로 종료할 때

**동작:**
1. artifact/task 완료 상태 검증 (미완료 시 경고)
2. delta spec이 있으면 main spec 동기화 여부 확인
3. `openspec/changes/<name>/` → `openspec/changes/archive/YYYY-MM-DD-<name>/`으로 이동

---

## 실사용 예시: "댓글 수정 기능 추가"

### Step 1: Explore

```
사용자: /opsx:explore
        댓글 수정 기능을 추가하고 싶어

AI: Comment 모델과 API를 분석해 보겠습니다...

    현재 댓글 API 구조:
    ┌──────────────────────────────────────┐
    │ GET  /api/articles/[slug]/comments   │ ← 목록 조회
    │ POST /api/articles/[slug]/comments   │ ← 생성
    │ DELETE /api/.../comments/[commentId] │ ← 삭제
    └──────────────────────────────────────┘

    PUT 엔드포인트가 없습니다. 추가해야 합니다.
    Comment 모델에 updatedAt 필드는 이미 존재합니다.

    Propose로 넘어갈까요?
```

### Step 2: Propose

```
사용자: /opsx:propose edit-comment

AI: change "edit-comment" 생성 중...
    ✓ proposal.md — 댓글 수정 기능 동기와 범위
    ✓ design.md — PUT 엔드포인트 설계, 권한 검증
    ✓ specs/comment-edit/spec.md — 수정 요구사항 및 시나리오
    ✓ tasks.md — 구현 체크리스트 (5개 태스크)

    구현 준비 완료! /opsx:apply로 시작하세요.
```

### Step 3: Apply

```
사용자: /opsx:apply edit-comment

AI: Working on task 1/5: API 라우트 추가...
    ✓ Task 1 complete

    Working on task 2/5: Zod 스키마 추가...
    ✓ Task 2 complete
    ...
    5/5 tasks complete!
    /opsx:archive로 보관하세요.
```

### Step 4: Archive

```
사용자: /opsx:archive edit-comment

AI: ✓ 모든 artifact 완료
    ✓ 모든 task 완료
    ✓ Archived to: openspec/changes/archive/2026-03-11-edit-comment/
```

---

## 디렉토리 구조

```
openspec/
├── config.yaml                    # OpenSpec 설정 (schema: spec-driven)
├── changes/
│   ├── <active-change>/           # 진행 중인 change
│   │   ├── .openspec.yaml         # change 메타데이터
│   │   ├── proposal.md            # 동기와 범위
│   │   ├── design.md              # 기술 설계
│   │   ├── specs/                 # 요구사항 명세
│   │   │   └── <capability>/
│   │   │       └── spec.md
│   │   └── tasks.md               # 구현 체크리스트
│   └── archive/                   # 완료된 change 보관
│       └── YYYY-MM-DD-<name>/
└── specs/                         # 프로젝트 main specs (누적)
```

### 주요 파일 설명

| 파일 | 역할 |
|------|------|
| `config.yaml` | 사용할 schema(워크플로우) 정의 |
| `proposal.md` | WHY — 변경 동기, 범위, 영향 |
| `design.md` | HOW — 기술 결정, 아키텍처, 트레이드오프 |
| `specs/*/spec.md` | WHAT — 시스템 요구사항, 테스트 시나리오 |
| `tasks.md` | DO — 구현 체크리스트 (apply에서 추적) |

---

## 유용한 CLI 명령어

```bash
openspec list                          # 활성 change 목록
openspec status --change "<name>"      # artifact 완료 상태
openspec show "<name>"                 # change 요약
openspec instructions <artifact>       # artifact 작성 가이드
```
