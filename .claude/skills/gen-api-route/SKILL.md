---
name: gen-api-route
description: Scaffold a new API route following project conventions. Use when the user wants to create a new API endpoint or says "new API route".
disable-model-invocation: true
argument-hint: "[resource-name] [GET|POST|PUT|DELETE]"
---

# gen-api-route

프로젝트 패턴에 맞는 새 API 라우트를 생성한다.

- `$0`: 리소스명 (예: `tags`, `notifications`)
- `$1`: HTTP 메서드 (선택, 기본: `GET,POST`)

인자가 없으면 AskUserQuestion으로 리소스와 기능을 질문한다.

## 참고 문서 (프로젝트 루트 기준)

라우트 생성 전 아래 문서를 Read로 확인한다:

- `docs/code-conventions.md` — "API 라우트 작성 패턴" 섹션
- `src/app/api/response.ts` — ApiResponse 클래스
- `src/validation/schema.ts` — Zod 스키마
- `src/app/api/articles/route.ts` — 기존 라우트 예시

## 표준 패턴

모든 API 라우트는 5단계를 따른다:

```
1. getCurrentUser()로 인증 확인
2. Zod .safeParse()로 입력 검증
3. Prisma로 DB 조작
4. revalidatePath()로 캐시 무효화
5. ApiResponse.ok(data)로 응답
```

## 실행 흐름

1. `src/app/api/{resource}/route.ts` 생성
2. 필요 시 동적 세그먼트 라우트도 생성 (`[id]/route.ts`)
3. 필요 시 Zod 스키마를 `src/validation/schema.ts`에 추가
4. 소프트 삭제 대상(article, comment 관련)이면 `del: false` 필터 포함
5. 생성된 파일 목록 보고
