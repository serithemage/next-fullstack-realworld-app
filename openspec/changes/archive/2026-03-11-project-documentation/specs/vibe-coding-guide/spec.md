## ADDED Requirements

### Requirement: OpenSpec 개요 설명
가이드 SHALL OpenSpec이 무엇인지, spec-driven development의 개념, 이 프로젝트에서의 역할을 설명해야 한다.

#### Scenario: OpenSpec 개념 이해
- **WHEN** 사용자가 가이드 도입부를 읽으면
- **THEN** OpenSpec의 목적과 spec-driven 변경 관리 개념을 이해할 수 있다

### Requirement: 워크플로우 단계별 설명
가이드 SHALL explore → propose → apply → archive 4단계를 각각 목적, 명령어, 동작 원리, 산출물과 함께 설명해야 한다.

#### Scenario: Explore 단계 이해
- **WHEN** 사용자가 Explore 섹션을 읽으면
- **THEN** `/opsx:explore`의 목적(사고/탐색), 사용 시점, 제약(코드 작성 불가)을 이해할 수 있다

#### Scenario: Propose 단계 이해
- **WHEN** 사용자가 Propose 섹션을 읽으면
- **THEN** `/opsx:propose`로 change 생성 시 proposal.md, design.md, tasks.md가 자동 생성됨을 이해할 수 있다

#### Scenario: Apply 단계 이해
- **WHEN** 사용자가 Apply 섹션을 읽으면
- **THEN** `/opsx:apply`로 tasks.md의 체크리스트를 순차 구현하는 과정을 이해할 수 있다

#### Scenario: Archive 단계 이해
- **WHEN** 사용자가 Archive 섹션을 읽으면
- **THEN** `/opsx:archive`로 완료된 change를 보관하는 과정과 delta spec 동기화를 이해할 수 있다

### Requirement: 실사용 예시 포함
가이드 SHALL 기능 추가 시나리오(예: 새 API 엔드포인트 추가)를 사용하여 전체 워크플로우를 처음부터 끝까지 시연하는 예시를 포함해야 한다.

#### Scenario: 예시를 통한 워크플로우 체험
- **WHEN** 사용자가 실사용 예시 섹션을 따라가면
- **THEN** 전체 워크플로우(explore → propose → apply → archive)의 흐름을 구체적으로 이해할 수 있다

### Requirement: 디렉토리 구조 설명
가이드 SHALL `openspec/` 디렉토리의 구조(config.yaml, changes/, specs/, archive/)를 설명해야 한다.

#### Scenario: OpenSpec 디렉토리 구조 파악
- **WHEN** 사용자가 디렉토리 구조 섹션을 읽으면
- **THEN** openspec/ 하위의 파일과 폴더의 역할을 이해할 수 있다
