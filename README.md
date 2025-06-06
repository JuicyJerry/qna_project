## 🔀 브랜치 전략

본 프로젝트는 기능 단위 브랜치 전략을 사용하여 코드 변경 사항을 명확히 추적하고 관리합니다.

### ✅ 기본 원칙

-   `main`: 배포용 안정 브랜치
-   `dev`: 통합 개발 브랜치 (선택)
-   `feat/page/작업유형-이슈번호-작업설명`: 기능 단위 작업 브랜치

---

### 📦 브랜치 네이밍 규칙

> feat/{page명}/{작업유형}-{이슈번호}-{작업설명}

#### ⛏ 작업유형 (작업의 성격)

| 유형       | 설명                        |
| ---------- | --------------------------- |
| `feat`     | 새로운 기능 추가            |
| `fix`      | 버그 수정                   |
| `style`    | UI 스타일/레이아웃 수정     |
| `refactor` | 리팩토링 (기능 변경 없음)   |
| `docs`     | 문서 수정                   |
| `test`     | 테스트 관련 작업            |
| `ci`       | 배포/자동화/워크플로우 작업 |
| `chore`    | 환경/설정/도구 작업         |

#### 🧱 예시

| 브랜치명                                 | 설명                   |
| ---------------------------------------- | ---------------------- |
| `feat/api/feat-1-connect-quiz-api`       | 퀴즈 API 연동 기능     |
| `feat/home/style-2-update-main-colors`   | 홈 화면 색상 스타일링  |
| `feat/layout/refactor-3-header-simplify` | 헤더 컴포넌트 리팩토링 |
| `feat/auth/feat-4-kakao-login`           | 카카오 로그인 연동     |

---

### 🧪 커밋 메시지 예시

> feat: 퀴즈 API 연동 기능 구현 (#1)
> fix: 제출 버튼 중복 클릭 방지 (#2)
> style: 결과 페이지 색상 변경 (#3)
