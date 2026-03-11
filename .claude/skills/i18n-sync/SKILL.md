---
name: i18n-sync
description: Check and sync i18n translation keys across locales (en, zh). Use when the user works with translations, adds UI text, or says "check translations".
disable-model-invocation: false
argument-hint: "[check|add|sync] [Namespace.key]"
---

# i18n-sync

번역 키의 동기화 상태를 확인하고 관리한다.

- `$0`: 동작 (기본: `check`)
  - `check` — 누락 키 탐지
  - `add` — 새 키 추가 (모든 로케일에 동시 추가)
  - `sync` — 누락 키를 자동 보충
- `$1`: 네임스페이스.키 (add 시 필수, 예: `Article.delete-confirm`)

## 참고 문서 (프로젝트 루트 기준)

- `CLAUDE.md` — "Internationalization" 섹션 (아키텍처 개요)
- `messages/en.json`, `messages/zh.json` — 번역 파일
- `src/navigation.ts` — 지원 로케일 정의 (`en`, `zh`)

## 실행 흐름

### check
1. `messages/en.json`과 `messages/zh.json`을 Read로 읽기
2. 양쪽의 키 트리 비교
3. 누락 키 목록 보고 (어느 로케일에서 빠졌는지 표시)

### add
1. 지정된 네임스페이스.키를 모든 로케일 파일에 추가
2. en 값은 사용자 입력, zh 값은 AskUserQuestion으로 질문
3. 알파벳순 정렬 유지

### sync
1. check 실행하여 누락 키 파악
2. 기준 로케일(en)에서 누락 키의 값을 복사
3. 복사된 키에 `[NEEDS_TRANSLATION]` 접두사 추가
4. 변경 사항 보고
