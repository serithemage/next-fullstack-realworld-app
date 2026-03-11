## ADDED Requirements

### Requirement: ADR 디렉토리 및 인덱스
`docs/adr/` 디렉토리를 생성하고, `README.md`에 전체 ADR 목록(번호, 제목, 상태)을 표로 정리해야 한다.

#### Scenario: ADR 목록 조회
- **WHEN** 사용자가 `docs/adr/README.md`를 열면
- **THEN** ADR-001부터 ADR-010까지의 번호, 제목, 상태가 표로 표시된다

### Requirement: ADR 포맷 준수
각 ADR SHALL Michael Nygard 스타일(Status, Context, Decision, Consequences)을 따르며, 한국어로 작성하되 기술 용어는 영문을 유지해야 한다.

#### Scenario: ADR 포맷 검증
- **WHEN** 임의의 ADR 파일을 열면
- **THEN** Status, Context, Decision, Consequences 섹션이 모두 존재한다

### Requirement: ADR-001 Next.js 14 App Router 선택
App Router 선택의 맥락(Pages Router 대비), 결정 사항, 긍정적/부정적 결과를 기록해야 한다.

#### Scenario: Next.js 선택 근거 확인
- **WHEN** 사용자가 ADR-001을 읽으면
- **THEN** App Router vs Pages Router 비교와 선택 근거를 이해할 수 있다

### Requirement: ADR-002 PostgreSQL + Prisma ORM 선택
PostgreSQL과 Prisma 조합을 선택한 맥락, 대안(MongoDB, TypeORM, Drizzle 등) 대비 근거를 기록해야 한다.

#### Scenario: DB/ORM 선택 근거 확인
- **WHEN** 사용자가 ADR-002를 읽으면
- **THEN** PostgreSQL + Prisma 선택의 맥락과 대안 대비 이점을 이해할 수 있다

### Requirement: ADR-003 NextAuth JWT 인증 전략
Credentials Provider + JWT 세션 전략 선택의 맥락과 근거를 기록해야 한다.

#### Scenario: 인증 전략 근거 확인
- **WHEN** 사용자가 ADR-003을 읽으면
- **THEN** JWT vs Session 비교, Credentials Provider 선택 이유를 이해할 수 있다

### Requirement: ADR-004 next-intl 국제화 전략
next-intl 선택과 locale 라우팅 전략(`localePrefix: 'as-needed'`)의 맥락과 근거를 기록해야 한다.

#### Scenario: i18n 전략 근거 확인
- **WHEN** 사용자가 ADR-004를 읽으면
- **THEN** next-intl 선택 이유와 locale 라우팅 방식을 이해할 수 있다

### Requirement: ADR-005 Tailwind CSS 스타일링 선택
Tailwind CSS 선택의 맥락과 대안(CSS Modules, styled-components 등) 대비 근거를 기록해야 한다.

#### Scenario: 스타일링 선택 근거 확인
- **WHEN** 사용자가 ADR-005를 읽으면
- **THEN** Tailwind CSS 선택 이유와 대안 비교를 이해할 수 있다

### Requirement: ADR-006 Zod 스키마 검증 전략
Zod를 사용한 입력 검증 전략의 맥락과 근거를 기록해야 한다.

#### Scenario: 검증 전략 근거 확인
- **WHEN** 사용자가 ADR-006을 읽으면
- **THEN** Zod 선택 이유와 검증 패턴을 이해할 수 있다

### Requirement: ADR-007 테스트 전략
Jest + Playwright 하이브리드 DB 테스트 전략의 맥락과 근거를 기록해야 한다.

#### Scenario: 테스트 전략 근거 확인
- **WHEN** 사용자가 ADR-007을 읽으면
- **THEN** 테스트 프레임워크 선택과 DB 테스트 전략을 이해할 수 있다

### Requirement: ADR-008 CI/CD 전략
GitHub Actions + Vercel 배포 전략의 맥락과 근거를 기록해야 한다.

#### Scenario: CI/CD 전략 근거 확인
- **WHEN** 사용자가 ADR-008을 읽으면
- **THEN** GitHub Actions 파이프라인 구성과 Vercel 연동 전략을 이해할 수 있다

### Requirement: ADR-009 소프트 삭제 패턴
articles/comments에 `del` boolean 플래그를 사용한 소프트 삭제 패턴의 맥락과 근거를 기록해야 한다.

#### Scenario: 소프트 삭제 패턴 근거 확인
- **WHEN** 사용자가 ADR-009를 읽으면
- **THEN** 소프트 삭제 선택 이유와 구현 방식을 이해할 수 있다

### Requirement: ADR-010 미들웨어 체인 패턴
함수형 합성 기반 미들웨어 체인(withFeed → withAuth → withIntl) 패턴의 맥락과 근거를 기록해야 한다.

#### Scenario: 미들웨어 체인 근거 확인
- **WHEN** 사용자가 ADR-010을 읽으면
- **THEN** 미들웨어 체인 패턴의 설계 동기와 구현 방식을 이해할 수 있다
