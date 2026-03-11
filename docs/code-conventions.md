# 코드 컨벤션

이 문서는 프로젝트의 코드 스타일, 커밋 규칙, PR 워크플로우를 정의한다.

---

## ESLint / Prettier

### Prettier 설정

| 옵션 | 값 | 설명 |
|------|-----|------|
| `semi` | `false` | 세미콜론 없음 |
| `singleQuote` | `true` | 작은따옴표 사용 |
| `printWidth` | `80` | 줄 최대 너비 |
| `tabWidth` | `2` | 들여쓰기 2칸 |

### ESLint 설정

- **extends**: `next/core-web-vitals`
- **plugins**: `prettier`
- `prettier/prettier: error` — Prettier 규칙 위반을 ESLint 에러로 처리
- `no-console: off` — console 사용 허용
- `@typescript-eslint/no-unused-vars: off` — 미사용 변수 허용

### 린트 실행

```bash
npm run lint        # ESLint + Prettier 검사
```

---

## 커밋 메시지 컨벤션

[Conventional Commits](https://www.conventionalcommits.org/) 형식을 따른다.

### 형식

```
<type>: <description>
```

### Type

| Type | 설명 | 예시 |
|------|------|------|
| `feat` | 새 기능 추가 | `feat: locale selector` |
| `fix` | 버그 수정 | `fix: failed to switch locale` |
| `docs` | 문서 변경 | `docs: add ADR for auth strategy` |
| `style` | 코드 포맷팅 (기능 변경 없음) | `style: fix prettier warnings` |
| `refactor` | 리팩토링 (기능 변경 없음) | `refactor: extract middleware chain` |
| `test` | 테스트 추가/수정 | `test: add article API tests` |
| `chore` | 빌드, 설정 등 기타 | `chore: update dependencies` |

### 규칙

- description은 소문자로 시작
- 마침표 없음
- 현재 시제 사용 (`add` O, `added` X)
- 50자 이내 권장

---

## 파일/폴더 네이밍

| 대상 | 규칙 | 예시 |
|------|------|------|
| React 컴포넌트 | PascalCase | `ArticlePreview.tsx`, `FollowButton.tsx` |
| 페이지 | Next.js 규칙 | `page.tsx`, `layout.tsx` |
| 유틸리티/액션 | camelCase | `getArticle.ts`, `fetchWrapper.ts` |
| 라우트 디렉토리 | kebab-case | `article/`, `popular-tags/` |
| 페이지 내부 컴포넌트 | `_components/` 디렉토리 | `(home)/_components/FeedToggle.tsx` |
| 타입 정의 | camelCase | `response.ts` |
| 검증 스키마 | camelCase | `schema.ts` |
| 번역 파일 | locale 코드 | `en.json`, `zh.json` |

### 디렉토리 규칙

- 라우트 그룹은 `()` 사용: `(browse)`, `(home)`
- 동적 세그먼트는 `[]` 사용: `[locale]`, `[slug]`, `[username]`
- Catch-all은 `[...]` 사용: `[...not_found]`

---

## TypeScript 타입 정의 패턴

### 인터페이스 네이밍

인터페이스는 `I` 접두사를 사용한다:

```typescript
interface IArticlesParams {
  tag?: string
  feed?: string
  author?: string
  favorited?: string
  offset?: number
  limit?: number
}
```

### Zod 스키마 기반 타입 추론

Zod 스키마에서 TypeScript 타입을 추론할 수 있다:

```typescript
import { z } from 'zod'

export const articleInputSchema = z.object({
  title: z.string().trim().min(1).max(100),
  description: z.string().optional(),
  body: z.string().min(1).max(65535),
  tagList: z.array(z.string().trim().max(100)).optional(),
})

type ArticleInput = z.infer<typeof articleInputSchema>
```

### API 응답 타입

`src/types/response.ts`에 API 응답 타입을 정의한다:

```typescript
interface ArticleResp {
  article: Article & {
    author: User
    tagList: Tag[]
  }
  following: boolean
}
```

### Path Alias

`@/*`는 `./src/*`로 매핑된다:

```typescript
import { getArticle } from '@/actions/getArticle'
import { ApiResponse } from '@/app/api/response'
```

---

## PR 워크플로우

### 브랜치 전략

```
main (프로덕션)
  └── feature/<name>    # 기능 개발
  └── fix/<name>        # 버그 수정
  └── docs/<name>       # 문서 작업
```

### 브랜치 네이밍

```
feature/add-comment-edit
fix/locale-switch-error
docs/add-adr-documents
```

### PR 규칙

- PR 제목: Conventional Commits 형식 (`feat: add comment editing`)
- 본문: 변경 내용 요약, 테스트 방법
- main 브랜치 직접 푸시 금지
- 린트/빌드/테스트 통과 필수 (CI 검증)

---

## API 라우트 작성 패턴

새 API 엔드포인트를 추가할 때 다음 패턴을 따른다:

### 표준 패턴

```typescript
import { NextRequest } from 'next/server'
import { revalidatePath } from 'next/cache'
import prisma from '@/libs/prisma'
import getCurrentUser from '@/actions/getCurrentUser'
import { ApiResponse } from '@/app/api/response'
import { someSchema } from '@/validation/schema'

export const POST = async (
  req: NextRequest,
  { params }: { params: { slug: string } }
) => {
  // 1. 인증 확인
  const currentUser = await getCurrentUser()
  if (!currentUser) return ApiResponse.unauthorized()

  // 2. 입력 검증 (Zod)
  const json = await req.json()
  const validated = someSchema.safeParse(json)
  if (!validated.success) return ApiResponse.badRequest(validated.error)

  // 3. DB 조작 (Prisma)
  const result = await prisma.article.create({
    data: { ...validated.data },
  })

  // 4. 캐시 무효화
  revalidatePath('/')

  // 5. 응답 반환
  return ApiResponse.ok(result)
}
```

### 응답 클래스 (`ApiResponse`)

| 메서드 | HTTP 상태 | 용도 |
|--------|----------|------|
| `ApiResponse.ok(data)` | 200 | 성공 응답 |
| `ApiResponse.unauthorized()` | 401 | 인증 필요 |
| `ApiResponse.badRequest(error)` | 400 | 입력 검증 실패 (ZodError 자동 처리) |
| `ApiResponse.notFound(message)` | 404 | 리소스 없음 |
| `ApiResponse.forbidden()` | 403 | 권한 없음 |
| `ApiResponse.noContent()` | 200 | 빈 응답 |

### 소프트 삭제 주의사항

articles/comments 조회 시 반드시 `del: false` 필터를 포함한다:

```typescript
const articles = await prisma.article.findMany({
  where: { del: false },  // 필수
})
```
