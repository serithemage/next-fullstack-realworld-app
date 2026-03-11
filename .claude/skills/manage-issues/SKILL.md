---
name: manage-issues
description: GitHub 이슈 생성, 업데이트, 닫기를 관리한다. 코드 리뷰 결과를 이슈로 등록하거나 진행 상황을 업데이트할 때 사용한다.
user-invokable: true
argument-hint: "[create|update|close|comment] [이슈 설명 또는 번호]"
---

# manage-issues

GitHub 이슈를 체계적으로 관리하는 스킬.

- `$ARGUMENTS`: 동작과 대상 (예: `create XSS 취약점 수정`, `close 9`, `comment 1 작업 완료`)

## 기본 설정

- **레포**: `serithemage/next-fullstack-realworld-app`
- **CLI**: 모든 `gh` 명령에 `-R "serithemage/next-fullstack-realworld-app"` 플래그 필수
- **라벨**: 이슈 생성 시 적절한 라벨 자동 부여

## 라벨 체계

| 라벨 | 용도 |
|------|------|
| `bug` | 버그, 오류, 잘못된 동작 |
| `security` | 보안 취약점 (XSS, IDOR, 인증 등) |
| `enhancement` | 기능 개선, 리팩토링 |
| `testing` | 테스트 관련 |
| `infra` | 인프라, CI/CD, 설정 |
| `epic` | 대규모 작업 묶음 |
| `documentation` | 문서 관련 |
| `critical` | 즉시 수정 필요 |
| `high` | 높은 우선순위 |

## 이슈 생성 (create)

### 실행 흐름

1. 인자에서 이슈 내용 파악. 인자가 없으면 AskUserQuestion으로 질문
2. 관련 소스 코드를 Read로 확인하여 정확한 파일 경로와 라인 번호 수집
3. 아래 템플릿에 따라 이슈 본문 작성
4. `gh issue create` 명령으로 이슈 생성

### 이슈 본문 템플릿

```markdown
## 작업 배경

[이 이슈가 왜 필요한지 1-2문장으로 설명]

## 문제점

[현재 코드의 문제를 구체적으로 설명. 코드 스니펫 포함]

**파일:** `경로:라인번호`

## 수정 방향

[권장하는 수정 방법을 구체적으로 제시]

## 인수조건

- [ ] [검증 가능한 조건 1]
- [ ] [검증 가능한 조건 2]
- [ ] 기존 테스트 통과
```

### 생성 명령 형식

```bash
REPO="serithemage/next-fullstack-realworld-app"
gh issue create -R "$REPO" \
  --title "이슈 제목" \
  --label "label1,label2" \
  --body "$(cat <<'EOF'
이슈 본문
EOF
)"
```

### 다건 생성 시 규칙

- 독립적인 이슈는 병렬로 생성 (Bash 도구 동시 호출)
- 관련 이슈끼리 본문에서 상호 참조 (`#번호`)
- severity가 같은 이슈는 하나의 이슈로 묶지 말고 개별 등록

## 이슈 업데이트 (update/comment)

### 실행 흐름

1. `gh issue view <번호>` 로 이슈 본문의 **인수조건** 을 확인
2. 각 인수조건을 코드/빌드/테스트 결과와 대조하여 충족 여부 판정
3. **모든 인수조건 충족 시** 아래 템플릿으로 코멘트 작성
4. **미충족 조건이 있으면** 사용자에게 보고하고 추가 작업 필요 여부 확인

### 코멘트 템플릿

```bash
REPO="serithemage/next-fullstack-realworld-app"
gh issue comment <번호> -R "$REPO" --body "$(cat <<'EOF'
## 진행 상황

[작업 내용 요약]

### 인수조건 검증

| 인수조건 | 충족 | 근거 |
|---------|------|------|
| [조건 1] | ✅ / ❌ | [코드 위치 또는 테스트 결과] |
| [조건 2] | ✅ / ❌ | [코드 위치 또는 테스트 결과] |

### 변경 파일
- `파일1` — 변경 내용
- `파일2` — 변경 내용

### 검증
[lint, build, 테스트 결과]
EOF
)"
```

## 이슈 닫기 (close)

```bash
REPO="serithemage/next-fullstack-realworld-app"
gh issue close <번호> -R "$REPO" --comment "$(cat <<'EOF'
## 완료

[수정 내용 요약]

### 변경 파일
- `파일1` — 변경 내용
- `파일2` — 변경 내용

### 검증
- [x] 인수조건 충족
- [x] 테스트 통과
EOF
)"
```

## 필수 규칙

- 이슈 제목은 명확하고 행동 지향적 (예: "XSS 취약점 수정: ArticleBody에 sanitizer 적용")
- 본문에 반드시 파일 경로와 코드 스니펫 포함
- 라벨은 반드시 1개 이상 부여
- 이슈 번호는 생성 후 사용자에게 보고
