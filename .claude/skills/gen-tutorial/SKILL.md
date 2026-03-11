---
name: gen-tutorial
description: 바이브 코딩 마이그레이션 튜토리얼을 생성하거나 업데이트한다. 대화 로그에서 실제 프롬프트와 결과를 추출하여 단계별 가이드를 작성한다.
user-invokable: true
argument-hint: "[create|update] [섹션명]"
---

# gen-tutorial

바이브 코딩 마이그레이션 튜토리얼(`docs/vibe-coding-migration-manual.md`)을 생성하거나 업데이트하는 스킬.

- `$ARGUMENTS`: 동작과 대상 (예: `create`, `update 테스트`, `update 보안 이슈`)

## 목적

기존 프로젝트를 바이브 코딩(AI 지원 개발)에 적합한 프로젝트로 전환하는 과정을 **실제 프롬프트와 결과** 기반으로 문서화한다. 다른 개발자가 이 문서만 보고 자신의 프로젝트에 동일한 전환을 적용할 수 있어야 한다.

## 데이터 소스

- **대화 로그**: `~/.claude/projects/<프로젝트이름>/` 하위 `.jsonl` 파일
- **기존 문서**: `docs/` 디렉토리의 ADR, 전환 계획 등
- **Git 히스토리**: 커밋 메시지와 변경 파일 목록

## 로그 파싱 방법

대화 로그에서 사용자 프롬프트를 추출하는 Python 스니펫:

```python
import json, re
with open(logfile, 'r') as f:
    for line in f:
        obj = json.loads(line.strip())
        if obj.get('type') == 'user':
            content = obj['message'].get('content', '')
            # system-reminder, command 태그 제거
            content = re.sub(r'<system-reminder>.*?</system-reminder>', '', content, flags=re.DOTALL)
            content = re.sub(r'<command-[^>]*>.*?</command-[^>]*>', '', content, flags=re.DOTALL)
```

## 튜토리얼 구조

```markdown
# 바이브 코딩 마이그레이션 매뉴얼

## 개요
[바이브 코딩이란 무엇인지, 왜 전환이 필요한지]

## 사전 준비
[필요 도구: Claude Code, gh CLI 등]

## Phase 1: 프로젝트 분석 및 문서화
### 사용된 프롬프트와 결과

## Phase 2: GitHub 이슈 체계화
### 사용된 프롬프트와 결과

## Phase 3: Claude Code 스킬 생성
### 사용된 프롬프트와 결과

## Phase 4: 테스트 인프라 구축
### 사용된 프롬프트와 결과

## Phase 5: 코드 리뷰 및 보안 이슈 수정
### 사용된 프롬프트와 결과

## Phase 6: 품질 자동화 (Git Hooks)
### 사용된 프롬프트와 결과

## 핵심 교훈
[실제 경험에서 배운 팁과 주의사항]
```

## 실행 흐름

### create (신규 생성)

1. `~/.claude/projects/<프로젝트이름>/` 에서 모든 `.jsonl` 로그 파일 파싱
2. 사용자 프롬프트를 시간순으로 정리하고 Phase별로 분류
3. 각 프롬프트의 결과(생성된 파일, 커밋 등)를 Git 히스토리에서 매칭
4. 튜토리얼 구조에 맞게 `docs/vibe-coding-migration-manual.md` 작성
5. 프롬프트의 오타는 정정하여 사용

### update (기존 업데이트)

1. 기존 `docs/vibe-coding-migration-manual.md`를 Read로 확인
2. 인자로 전달된 섹션 또는 최근 작업 내용을 해당 Phase에 반영
3. 새로운 프롬프트/결과를 추가하거나 기존 내용 수정

## 작성 규칙

- 프롬프트는 `>` 인용 블록으로 표시
- 오타가 있는 프롬프트는 정정하여 사용
- 각 프롬프트 뒤에 **결과 요약** (생성된 파일 목록, 주요 변경사항)을 표로 정리
- 범용적 프롬프트 패턴을 추출하여 다른 프로젝트에도 적용 가능하게 작성
- 프로젝트 고유 내용(파일명, 경로 등)은 설명에서 범용적 대안 제시
- system-reminder, command 태그 등 시스템 메시지는 프롬프트에서 제외
- 스킬 로딩 지시문(Skill instructions)은 프롬프트에서 제외
