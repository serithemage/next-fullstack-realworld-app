# Architecture Decision Records (ADR)

이 디렉토리는 프로젝트의 주요 기술 의사결정을 기록한다. [Michael Nygard의 ADR 포맷](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)을 따른다.

## ADR 목록

| 번호 | 제목 | 상태 | 날짜 |
|------|------|------|------|
| [ADR-001](ADR-001.md) | Next.js 14 App Router 선택 | 승인 | 2023-11-24 |
| [ADR-002](ADR-002.md) | PostgreSQL + Prisma ORM 선택 | 승인 | 2023-11-24 |
| [ADR-003](ADR-003.md) | NextAuth JWT 인증 전략 | 승인 | 2023-11-24 |
| [ADR-004](ADR-004.md) | next-intl 국제화 전략 | 승인 | 2023-11-24 |
| [ADR-005](ADR-005.md) | Tailwind CSS 스타일링 선택 | 승인 | 2023-11-24 |
| [ADR-006](ADR-006.md) | Zod 스키마 검증 전략 | 승인 | 2023-11-24 |
| [ADR-007](ADR-007.md) | 테스트 전략 (Jest + Playwright, 하이브리드 DB) | 제안 | 2026-03-11 |
| [ADR-008](ADR-008.md) | CI/CD 전략 (GitHub Actions + Vercel) | 제안 | 2026-03-11 |
| [ADR-009](ADR-009.md) | 소프트 삭제 패턴 | 승인 | 2023-11-24 |
| [ADR-010](ADR-010.md) | 미들웨어 체인 패턴 | 승인 | 2023-11-24 |

## ADR 포맷

각 ADR은 다음 구조를 따른다:

- **Status**: 제안(Proposed) / 승인(Accepted) / 폐기(Deprecated) / 대체(Superseded)
- **Context**: 의사결정이 필요한 배경과 상황
- **Decision**: 선택한 결정과 근거
- **Consequences**: 결정에 따른 긍정적/부정적 결과
