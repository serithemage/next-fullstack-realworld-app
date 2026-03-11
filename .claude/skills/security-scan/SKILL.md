---
name: security-scan
description: Run security scanning on the project. Use when the user says "security scan", "check vulnerabilities", or "audit dependencies".
disable-model-invocation: true
argument-hint: "[--full]"
---

# security-scan

ADR-008 기반 보안 스캔을 실행한다.

- `$0`: `--full` (전체 스캔, 기본은 의존성만)

## 참고 문서 (프로젝트 루트 기준)

- `docs/adr/ADR-008.md` — CI/CD 전략 (보안 스캔 항목)
- `CLAUDE.md` — "Authentication" 섹션

## 스캔 항목

| 항목 | 명령 | 기본 실행 |
|------|------|----------|
| npm 의존성 취약점 | `npm audit --audit-level=high` | O |
| 만료/비권장 패키지 | `npm outdated` | O |
| 시크릿 노출 | 소스코드 내 credential 패턴 검색 | `--full`만 |
| .env 파일 노출 | `.gitignore`에 `.env` 포함 확인 | `--full`만 |

## 실행 흐름

1. `npm audit --audit-level=high` 실행
2. `npm outdated` 실행
3. `--full` 시 추가 검사:
   - `.env*` 파일이 `.gitignore`에 포함되어 있는지 확인
   - 소스코드에서 하드코딩된 시크릿 패턴 검색
   - 환경변수가 코드에 노출되지 않았는지 확인
4. 결과 요약: 심각도별 취약점 수, 조치 필요 항목, 수정 명령 제안
