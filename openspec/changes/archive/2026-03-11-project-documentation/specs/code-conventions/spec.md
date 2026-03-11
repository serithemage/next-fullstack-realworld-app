## ADDED Requirements

### Requirement: ESLint/Prettier 규칙 문서화
문서 SHALL 프로젝트의 ESLint 설정(next/core-web-vitals, prettier 플러그인)과 Prettier 설정(세미콜론 없음, 작은따옴표, 80자 폭, 2칸 들여쓰기)을 명시해야 한다.

#### Scenario: 포매터/린터 규칙 확인
- **WHEN** 개발자가 코드 스타일 규칙을 확인하려 하면
- **THEN** ESLint와 Prettier의 주요 설정값을 문서에서 찾을 수 있다

### Requirement: 커밋 메시지 컨벤션
문서 SHALL Conventional Commits 형식(type: description)을 정의하고, 사용할 type(feat, fix, chore, docs, refactor, test, style)을 설명해야 한다.

#### Scenario: 커밋 메시지 작성
- **WHEN** 개발자가 커밋 메시지를 작성하려 하면
- **THEN** 허용된 type과 메시지 형식을 문서에서 확인할 수 있다

### Requirement: 파일/폴더 네이밍 규칙
문서 SHALL 컴포넌트(PascalCase), 유틸리티/액션(camelCase), 라우트 디렉토리(kebab-case), 페이지 내부 컴포넌트(`_components/`) 네이밍 규칙을 명시해야 한다.

#### Scenario: 새 파일 생성 시 네이밍 확인
- **WHEN** 개발자가 새 파일을 생성하려 하면
- **THEN** 파일 종류에 맞는 네이밍 규칙을 문서에서 확인할 수 있다

### Requirement: TypeScript 타입 정의 패턴
문서 SHALL 인터페이스 접두사(I prefix), Zod 스키마 기반 타입 추론, API 응답 타입(`src/types/response.ts`) 패턴을 설명해야 한다.

#### Scenario: 타입 정의 패턴 확인
- **WHEN** 개발자가 새 타입을 정의하려 하면
- **THEN** 프로젝트의 타입 정의 패턴과 컨벤션을 문서에서 확인할 수 있다

### Requirement: PR 워크플로우
문서 SHALL 브랜치 전략(feature 브랜치), PR 생성 절차, 리뷰 기준을 설명해야 한다.

#### Scenario: PR 생성 절차 확인
- **WHEN** 개발자가 PR을 만들려 하면
- **THEN** 브랜치 명명, PR 제목/본문 형식, 리뷰 절차를 문서에서 확인할 수 있다

### Requirement: API 라우트 작성 패턴
문서 SHALL API 라우트의 표준 패턴(인증 확인 → Zod 검증 → Prisma 조작 → ApiResponse 반환 → revalidatePath)을 설명해야 한다.

#### Scenario: 새 API 라우트 작성
- **WHEN** 개발자가 새 API 엔드포인트를 추가하려 하면
- **THEN** 프로젝트의 표준 API 라우트 패턴을 문서에서 참조할 수 있다
