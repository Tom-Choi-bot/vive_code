# 댕케어 캘린더 V2 데이터 구조 설계 (TypeScript 타입 초안)

V2의 신규 기능(건강 트래커, 다이어리, 통계)을 지원하기 위해 새롭게 추가되는 데이터 구조표와 TypeScript 타입 초안입니다.

## 1. HealthRecord (건강 및 체중 기록)
반려동물의 체중 변화와 병원 진료 등의 건강 이벤트를 기록합니다.

| 필드명 | 타입 | 설명 | 필수 여부 |
|---|---|---|---|
| `id` | `string` | 건강 기록 고유 ID | 필수 |
| `petId` | `string` | 대상 반려동물 ID | 필수 |
| `date` | `string` | 기록 날짜 (YYYY-MM-DD) | 필수 |
| `type` | `"weight" \| "event"` | 기록 종류 (체중 vs 일반 이벤트) | 필수 |
| `weight` | `number` | 체중 (kg) (`type`이 `weight`일 때) | 선택 |
| `title` | `string` | 이벤트 제목 (병원 방문, 구토 등) | 선택 |
| `memo` | `string` | 상세 메모 및 소견 | 선택 |

```typescript
// src/types/health.ts
export interface HealthRecord {
  id: string;
  petId: string;
  date: string;
  type: "weight" | "event";
  weight?: number;
  title?: string;
  memo?: string;
}
```

## 2. DiaryRecord (사진 및 메모 다이어리)
특정 날짜에 반려동물과의 추억을 남기는 기록입니다.

| 필드명 | 타입 | 설명 | 필수 여부 |
|---|---|---|---|
| `id` | `string` | 다이어리 고유 ID | 필수 |
| `petId` | `string` | 대상 반려동물 ID | 필수 |
| `date` | `string` | 작성 날짜 (YYYY-MM-DD) | 필수 |
| `photoBase64` | `string` | 첨부 사진 (Local Storage 용량 확보를 위해 리사이징 처리) | 선택 |
| `memo` | `string` | 일기 내용 | 선택 |

```typescript
// src/types/diary.ts
export interface DiaryRecord {
  id: string;
  petId: string;
  date: string;
  photoBase64?: string;
  memo?: string;
}
```

## 3. AppStorage (스토리지 스키마 업데이트)
기존 `AppStorage` 인터페이스에 위의 두 가지 배열이 새로 추가됩니다.

```typescript
// src/types/record.ts (또는 storage.ts)
export interface AppStorage {
  pets: Pet[];
  routines: Routine[];
  records: DailyRecord[]; // 통계는 기존 DailyRecord를 가공하여 산출하므로 필드 변경 불필요
  healthRecords: HealthRecord[]; // 신규 추가
  diaryRecords: DiaryRecord[];   // 신규 추가
  settings: {
    selectedPetId: string | null;
  };
}
```
