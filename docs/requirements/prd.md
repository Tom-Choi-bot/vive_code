# 🐾 Dang Care Calendar PRD (v2.0 Local-first)

> **Version**: 2.0
> **Project**: Dang Care Calendar
> **Type**: V2.0 PRD
> **Target Stack**: Vite + React + TypeScript + Tailwind CSS + Local Storage + GitHub Pages

---

# 1. 프로젝트 개요

## 프로젝트명

**Dang Care Calendar (댕케어 캘린더)**

### 한 줄 소개

반려동물의 돌봄 일정을 기록하고 관리하는 반응형 데스크탑/모바일 체크리스트 웹앱

---

# 2. 문제 정의

노령견 또는 질환이 있는 반려동물을 키우는 보호자는 다음과 같은 문제를 자주 경험한다.

* 약을 먹였는지 기억나지 않는다.
* 사료를 이미 줬는지 헷갈린다.
* 하루 여러 번 해야 하는 돌봄을 놓친다.
* 과거 돌봄 기록을 확인하기 어렵다.

현재 대부분 카카오톡이나 메모장으로 관리하거나 기억에 의존하고 있어 일정 누락 위험이 존재한다.

---

# 3. 목표

사용자가 오늘 해야 할 돌봄을 빠르게 확인하고 체크할 수 있도록 한다.

## Must Feature 1. 반려동물 관리 *(복원됨)*

### 목적

돌봄 대상 반려동물을 등록하고 관리한다.

### 기능

* 반려동물 등록
* 수정
* 삭제
* 목록 조회

### 입력 정보

* 이름 (필수)
* 종: dog | cat (필수)
* 품종 (선택)
* 생일 (선택)
* 이모지 (선택)
* 프로필 사진 (선택, Local Storage에 Base64 형태로 저장)

---

## Must Feature 2. 루틴 관리

### 목적

반려동물별 반복 루틴을 생성한다.

### 기능

* 루틴 생성
* 수정
* 삭제

### 입력 정보

* 루틴명
* 대상 반려동물
* 반복 요일
* 하루 수행 횟수
* 색상(Label)

### 반복 규칙

요일 선택

* 월
* 화
* 수
* 목
* 금
* 토
* 일

복수 선택 가능

> `repeatDays`는 `0=일, 1=월, …, 6=토` (JS `Date.getDay()` 기준) *(복원됨)*

### 하루 수행 횟수

사용자가 직접 지정

예시

* 밥 : 2회
* 산책 : 3회
* 약 : 1회

---

## Must Feature 3. 오늘 체크리스트

### 목적

오늘 수행해야 하는 루틴을 자동 생성하여 관리한다.

### 기능 *(복원됨)*

* 오늘 요일에 해당하는 루틴 자동 목록화
* 반려동물별 필터
* 체크 / 언체크
* 완료 시간 저장
* 완료율 표시

### 완료 규칙 *(복원됨)*

* `timesPerDay: N`이면 하루 최대 N회 체크 가능
* 체크 시 `completedCount++`, `completionTimes`에 ISO8601 타임스탬프 추가
* 언체크 시 마지막 completion 제거 (MVP 단순 규칙)

---

## Must Feature 4. 캘린더 & 기록 *(복원됨)*

### 목적

과거 돌봄 기록을 조회하고 수정한다.

### 기능

* 날짜 선택
* 과거 기록 조회
* 기록 수정 (체크 해제 / 재체크)

---

## Must Feature 5. 다크 모드 (V2.0)

### 목적
눈이 편안한 야간 사용 환경 제공

### 기능
* 브라우저/OS 시스템 테마 연동
* 수동 테마 전환 토글 (Light/Dark)

---

## Must Feature 6. 체중 및 건강 기록 트래커 (V2.0)

### 목적
루틴 이외의 반려동물의 건강 상태 변화를 로컬 환경에 기록하고 추적한다.

### 기능
* 체중 기록 및 꺾은선 차트 시각화
* 병원 방문, 예방접종 등 건강 이벤트(태그) 기록

---

## Must Feature 7. 사진 및 메모 다이어리 (V2.0)

### 목적
특정 날짜에 반려동물과의 추억을 기록한다.

### 기능
* 캘린더 날짜별로 사진 1장과 메모(일기) 등록
* 로컬 스토리지 한계(5MB)를 고려해 사진은 리사이징 후 Base64로 압축 저장

---

## Must Feature 8. 통계 및 리포트 (V2.0)

### 목적
과거 데이터를 분석하여 돌봄 성취도를 한눈에 보여준다.

### 기능
* 주간/월간 루틴 달성률 표시 (잔디심기 또는 막대 차트)
* 자주 놓치는 루틴 분석

---

# 4. 솔루션 *(복원됨)*

Local-first 체크리스트 웹앱으로, 별도 서버 없이 브라우저 Local Storage에 데이터를 저장한다.

* 오프라인에서도 동작
* 앱 실행 즉시 오늘 할 일 확인
* 반복 루틴 기반 자동 체크리스트 생성

---

# 5. 사용자 시나리오 *(복원됨)*

1. **약 급여 확인**: 보호자가 아침에 약을 먹였는지 헷갈릴 때, 앱에서 오늘 체크리스트를 확인하고 체크한다.
2. **사료 급여**: 하루 2회 사료 루틴에서 1회 완료 후 남은 횟수를 확인한다.
3. **산책 루틴**: 월·수·금 산책 루틴이 오늘 자동으로 표시되는지 확인한다.
4. **과거 기록 확인**: 캘린더에서 지난주 특정 날짜의 돌봄 완료 여부를 조회한다.

---

# 6. MVP 범위

위 Must Feature 1~4만 구현한다. 로그인, 클라우드 동기화, 알림 등은 제외.

---

# 7. 사용자 흐름 *(복원됨)*

```
Splash (앱 로고)
    ↓
Home (오늘 체크리스트)
    ├── Pet Management (반려동물 CRUD)
    ├── Routine Management (루틴 CRUD)
    └── Calendar (과거 기록 조회/수정)
```

---

# 8. 화면 구성

## Splash

* 앱 로고

---

## Home

* 오늘 날짜
* 오늘 체크리스트
* 완료율
* 반려동물 선택

---

## Pet Management

* 반려동물 목록
* 등록
* 수정
* 삭제

---

## Routine Management

* 루틴 목록
* 추가
* 수정
* 삭제

---

## Calendar

* 날짜 선택
* 과거 기록 조회
* 기록 수정

---

# 9. 데이터 모델

## Pet

```ts
interface Pet {
  id: string;
  name: string;
  species: "dog" | "cat";
  breed?: string;
  birthDate?: string;
  emoji?: string;
  photoBase64?: string;
}
```

---

## Routine

```ts
interface Routine {
  id: string;
  petId: string;
  title: string;
  repeatDays: number[];
  timesPerDay: number;
  color?: string;
}
```

---

## DailyRecord *(복원됨)*

```ts
interface DailyRecord {
  id: string;
  routineId: string;
  date: string;              // YYYY-MM-DD
  completedCount: number;    // 0 ~ routine.timesPerDay
  completionTimes: string[]; // ISO8601, 완료 순서대로 저장
}
```

---

# 10. Local Storage 스키마 *(복원됨)*

```ts
interface AppStorage {
  pets: Pet[];
  routines: Routine[];
  records: DailyRecord[];
  settings: {
    selectedPetId: string | null;
  };
}
```

* 저장 키: `dang-care-calendar` (단일 JSON)
* 구조:

```
dang-care-calendar
├── pets
├── routines
├── records
└── settings
```

---

# 11. 기술 스택

| 항목         | 선택            |
| ---------- | ------------- |
| Build Tool | Vite          |
| Framework  | React         |
| Language   | TypeScript    |
| Styling    | Tailwind CSS  |
| Storage    | Local Storage |
| Deployment | GitHub Pages  |

---

# 12. 프로젝트 구조 *(오타 수정됨)*

```
src/

 ├── components/
 │    ├── common/
 │    ├── pet/
 │    ├── routine/
 │    ├── calendar/
 │    └── today/

 ├── pages/
 │    ├── Splash.tsx
 │    ├── Home.tsx
 │    ├── Pets.tsx
 │    ├── Routines.tsx
 │    └── Calendar.tsx

 ├── hooks/
 │    ├── useTodayChecklist.ts
 │    ├── useCalendar.ts
 │    └── useStorage.ts

 ├── contexts/
 │    └── AppContext.tsx

 ├── types/
 │    ├── pet.ts
 │    ├── routine.ts
 │    └── record.ts

 ├── utils/
 │    ├── storage.ts
 │    ├── checklist.ts
 │    ├── calendar.ts
 │    └── date.ts

 ├── App.tsx
 └── main.tsx
```

---

# 13. 비기능 요구사항

* 데스크탑/모바일 반응형 UI
* 오프라인 동작
* Local Storage 기반 저장
* GitHub Pages 배포 가능
* 빠른 초기 로딩

---

# 14. 제외 기능 (Won't Have)

로컬 퍼스트 원칙을 유지하기 위해 다음 기능은 당분간 제외한다.

* 로그인 및 계정 시스템
* 가족 공유 및 클라우드 동기화 (서버 연동)
* 웹 푸시 알림

---

# 15. 성공 지표 *(복원됨)*

* 앱 실행 후 3탭 이내에 오늘 체크리스트 확인 가능
* Local Storage에 데이터 영속 저장 (새로고침 후 유지)
* GitHub Pages에서 정상 배포 및 오프라인 동작

---

# 16. 일정 *(복원됨)*

PRD §18 개발 체크리스트 Phase 1~6 순서로 진행한다.

---

# 17. Cursor 개발 규칙

개발 시 반드시 다음 원칙을 따른다.

1. MVP 범위를 벗어나는 기능은 구현하지 않는다.
2. 컴포넌트는 재사용 가능하도록 분리한다.
3. 모든 주요 함수에는 TODO 주석으로 확장 포인트를 남긴다.

---

# 18. 개발 체크리스트

## Phase 1

* [ ] Vite 프로젝트 생성
* [ ] Tailwind 설정
* [ ] 프로젝트 구조 생성

## Phase 2

* [ ] 반려동물 CRUD
* [ ] Local Storage 연동

## Phase 3

* [ ] 루틴 CRUD
* [ ] 반복 요일 구현
* [ ] 하루 수행 횟수 구현

## Phase 4

* [ ] 오늘 체크리스트 생성
* [ ] 완료 체크
* [ ] 완료 시간 저장

## Phase 5

* [ ] 캘린더 조회
* [ ] 기록 수정

## Phase 6

* [ ] 모바일 UI 개선
* [ ] GitHub Pages 배포

## Phase 7 (V2.0 Local-first)

* [ ] 다크 모드 연동 및 UI 테마 분리
* [ ] 통계 및 리포트 뷰 (차트 라이브러리 도입)
* [ ] 사진/메모 다이어리 UI 및 로컬 스토리지 저장 로직 (이미지 리사이징)
* [ ] 체중/건강 기록 트래커 UI 및 데이터 모델링
