---
name: db-migrate
description: Run Prisma database migration workflow. Use when the user changes schema, says "migrate", "seed", or "db reset".
disable-model-invocation: true
argument-hint: "[migrate|seed|reset|status]"
---

# db-migrate

Prisma 데이터베이스 마이그레이션 워크플로우를 실행한다.

- `$0`: 동작 (기본: `status`)
  - `migrate` — 스키마 변경 감지 + 마이그레이션 생성/적용
  - `seed` — 시드 데이터 적용
  - `reset` — DB 리셋 + 시드 (사용자 확인 필수)
  - `status` — 현재 마이그레이션 상태 확인

## 참고 문서 (프로젝트 루트 기준)

- `prisma/schema.prisma` — DB 스키마
- `prisma/seed.ts` — 시드 스크립트
- `CLAUDE.md` — "Database" 섹션

## 실행 명령

| 동작 | 명령 |
|------|------|
| status | `npx prisma migrate status` |
| migrate | `npx prisma migrate dev --name $NAME` |
| seed | `npm run seed` |
| reset | `npx prisma migrate reset` (확인 필요) |

## 실행 흐름

### migrate
1. `prisma/schema.prisma` 변경 사항 확인 (git diff)
2. 마이그레이션 이름을 AskUserQuestion으로 질문
3. `npx prisma migrate dev --name {name}` 실행
4. Prisma Client 재생성 확인
5. 결과 보고

### 주의 사항
- 소프트 삭제: Article, Comment의 `del: Boolean @default(false)` 유지
- 복합키: Follows, Favorites 패턴 준수
- `@@map()`: 테이블명은 snake_case
- reset은 데이터 손실 위험 — 반드시 사용자 확인 후 실행
