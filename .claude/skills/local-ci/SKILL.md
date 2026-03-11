---
name: local-ci
description: Run the full CI pipeline locally before pushing. Use when the user says "run CI", "check before push", or "validate build".
disable-model-invocation: true
argument-hint: "[--fix] [--skip-tests]"
---

# local-ci

ADR-008 파이프라인을 로컬에서 실행한다.

- `$0`: `--fix` (lint 자동 수정), `--skip-tests` (테스트 건너뛰기)

## 참고 문서 (프로젝트 루트 기준)

- `docs/adr/ADR-008.md` — CI/CD 전략
- `docs/code-conventions.md` — 코드 컨벤션

## 파이프라인 순서

```
lint → type-check → build → test(unit) → test(integration) → test(e2e) → security-scan
```

## 실행 명령

| 단계 | 명령 | 실패 시 |
|------|------|---------|
| Lint | `npm run lint` | `--fix` 시 `npx next lint --fix` 후 재검사 |
| Type Check | `npx tsc --noEmit` | 에러 목록 출력 |
| Build | `npm run build` | 빌드 에러 출력 |
| Unit Test | `npx jest --testPathPattern='__tests__/unit'` | 실패 테스트 상세 |
| Integration Test | `npx jest --testPathPattern='__tests__/integration'` | Docker 미실행 시 건너뛰기 |
| E2E Test | `npx playwright test` | Playwright 미설치 시 건너뛰기 |
| Security | `npm audit --audit-level=high` | 취약점 목록 출력 |

## 실행 흐름

1. 각 단계를 순차 실행, 실패 시 즉시 중단하고 보고
2. `--skip-tests` 시 lint → type-check → build만 실행
3. 전체 통과 시 "CI 파이프라인 통과" 보고
4. 실패 시 실패 단계 + 에러 내용 + 수정 제안
