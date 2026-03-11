---
name: run-tests
description: Run test suite with coverage reporting. Use when the user says "run tests", "check coverage", or "test all".
disable-model-invocation: true
argument-hint: "[unit|integration|e2e|all] [--coverage]"
---

# run-tests

테스트를 실행하고 결과를 보고한다.

- `$0`: 테스트 유형 (기본: `all`)
- `$1`: `--coverage` 플래그 (선택)

## 참고 문서 (프로젝트 루트 기준)

- `docs/adr/ADR-007.md` — 테스트 전략
- `docs/adr/ADR-008.md` — CI 파이프라인

## 실행 명령

| 유형 | 명령 |
|------|------|
| unit | `npx jest --testPathPattern='__tests__/unit'` |
| integration | `npx jest --testPathPattern='__tests__/integration'` |
| e2e | `npx playwright test` |
| all | unit → integration → e2e 순차 실행 |
| --coverage | `npx jest --coverage` 추가 |

## 실행 흐름

1. 테스트 설정 파일 존재 확인 (`jest.config.*`, `playwright.config.*`)
2. 미설치 의존성 감지 시 안내 (설치는 사용자 확인 후)
3. 테스트 실행
4. 결과 요약 보고:
   - 통과/실패 테스트 수
   - 커버리지 퍼센트 (60% 미만이면 경고)
   - 실패 테스트 상세 정보
