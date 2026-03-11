---
name: gen-test
description: Generate test files following ADR-007 patterns. Use when the user asks to write tests, create test files, add test coverage, or says "test this".
disable-model-invocation: false
argument-hint: "[file-path] [unit|integration|e2e]"
---

# gen-test

대상 파일에 대한 테스트를 생성한다. 인자가 없으면 AskUserQuestion으로 대상을 질문한다.

- `$0`: 테스트 대상 파일 경로
- `$1`: 테스트 유형 (선택, 기본: 자동 판단)

## 참고 문서 (프로젝트 루트 기준)

테스트 작성 전 아래 문서를 Read로 확인한다:

- `docs/adr/ADR-007.md` — 테스트 전략 (프레임워크, DB 전략, 커버리지 목표)
- `docs/code-conventions.md` — API 라우트 작성 패턴
- `prisma/schema.prisma` — DB 스키마 (모델 관계, 소프트 삭제 필드)
- `src/validation/schema.ts` — Zod 스키마

## 테스트 유형 자동 판단

| 대상 경로 | 유형 |
|-----------|------|
| `src/app/api/**` | unit |
| `src/validation/**` | unit |
| `src/utils/**` | unit |
| `src/actions/**` | unit |
| `src/components/**` | unit |
| `src/middlewares/**` | unit |
| `src/app/(browse)/**` | e2e |

## 실행 흐름

1. 대상 파일을 Read로 읽어 구조 파악
2. 테스트 유형 결정 (인자 또는 자동 판단)
3. ADR-007의 유형별 전략에 따라 테스트 작성:
   - **unit**: Jest + Prisma Client mocking (`jest-mock-extended`)
   - **integration**: Jest + Docker PostgreSQL
   - **e2e**: Playwright + Seed 데이터
4. 파일 위치: `__tests__/{unit|integration|e2e}/` 하위
5. 커버리지 60% 이상 목표, Happy path + Error path 모두 포함

## 필수 규칙

- 프로젝트 Prettier 설정 준수 (세미콜론 없음, 작은따옴표, 80자)
- Path alias `@/*` 사용
- 소프트 삭제(`del: false`) 필터 검증 테스트 포함
- 인증 필요 API는 인증/비인증 케이스 분리
- Zod 스키마는 유효/무효 입력 모두 커버
