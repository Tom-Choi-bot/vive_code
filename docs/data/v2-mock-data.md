# 댕케어 캘린더 V2 목업 데이터 (Mock Data)

V2 기능(통계, 건강 트래커, 다이어리)을 테스트하고 UI를 설계할 때 사용할 목업 데이터 JSON 상세 명세입니다.
이 데이터는 앱 실행 시 초기 화면 구성과 차트 렌더링이 잘 되는지 확인하기 위해 사용됩니다.

## 전체 Mock JSON 스키마 (`dang-care-calendar` Local Storage 값)

```json
{
  "pets": [
    {
      "id": "pet-1",
      "name": "토리",
      "species": "dog",
      "breed": "푸들",
      "birthDate": "2015-05-05",
      "emoji": "🐩",
      "photoBase64": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ..."
    }
  ],
  "routines": [
    {
      "id": "routine-1",
      "petId": "pet-1",
      "title": "아침/저녁 사료",
      "repeatDays": [0, 1, 2, 3, 4, 5, 6],
      "timesPerDay": 2,
      "color": "#f97316"
    },
    {
      "id": "routine-2",
      "petId": "pet-1",
      "title": "저녁 산책",
      "repeatDays": [0, 1, 2, 3, 4, 5, 6],
      "timesPerDay": 1,
      "color": "#3b82f6"
    },
    {
      "id": "routine-3",
      "petId": "pet-1",
      "title": "심장사상충 약 (하트가드)",
      "repeatDays": [0],
      "timesPerDay": 1,
      "color": "#ef4444"
    }
  ],
  "records": [
    {
      "id": "record-1",
      "routineId": "routine-1",
      "date": "2026-07-21",
      "completedCount": 2,
      "completionTimes": ["2026-07-21T08:00:00Z", "2026-07-21T19:00:00Z"]
    },
    {
      "id": "record-2",
      "routineId": "routine-2",
      "date": "2026-07-21",
      "completedCount": 1,
      "completionTimes": ["2026-07-21T20:30:00Z"]
    },
    {
      "id": "record-3",
      "routineId": "routine-1",
      "date": "2026-07-22",
      "completedCount": 1,
      "completionTimes": ["2026-07-22T08:15:00Z"]
    }
  ],
  "healthRecords": [
    {
      "id": "health-1",
      "petId": "pet-1",
      "date": "2026-07-01",
      "type": "weight",
      "weight": 5.2,
      "memo": "여름맞이 미용 후 체중 측정"
    },
    {
      "id": "health-2",
      "petId": "pet-1",
      "date": "2026-07-15",
      "type": "weight",
      "weight": 5.1,
      "memo": "다이어트 사료 효과 확인"
    },
    {
      "id": "health-3",
      "petId": "pet-1",
      "date": "2026-07-20",
      "type": "event",
      "title": "동물병원 방문 (정기검진)",
      "memo": "심장 초음파 결과 이상 없음. 치석 제거 예약함."
    },
    {
      "id": "health-4",
      "petId": "pet-1",
      "date": "2026-07-23",
      "type": "weight",
      "weight": 5.3,
      "memo": "최근 간식을 많이 먹어서 다시 찜"
    }
  ],
  "diaryRecords": [
    {
      "id": "diary-1",
      "petId": "pet-1",
      "date": "2026-07-21",
      "photoBase64": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ...",
      "memo": "오늘 저녁 산책길에 처음 보는 시바견 친구랑 인사했다! 꼬리를 흔들며 엄청 좋아함. 집에 와서 뻗어서 자는 중 😴"
    },
    {
      "id": "diary-2",
      "petId": "pet-1",
      "date": "2026-07-22",
      "photoBase64": "",
      "memo": "아침에 비가 와서 산책을 못 나갔다. 대신 집에서 노즈워크 장난감으로 신나게 놀아줌."
    }
  ],
  "settings": {
    "selectedPetId": "pet-1"
  }
}
```

## 주요 테스트 포인트
1. **통계 화면용 데이터 (`records`)**: 최근 3일간의 사료, 산책 루틴 달성 데이터를 통해 '이번 주 달성률 차트'가 정상적으로 퍼센테이지(%)를 계산하고 렌더링하는지 확인합니다.
2. **건강 트래커 꺾은선 차트 (`healthRecords`)**: `type: "weight"` 인 데이터(5.2 -> 5.1 -> 5.3) 3건을 연결하여 꺾은선 차트가 그려지는지 확인합니다.
3. **건강 트래커 이벤트 렌더링 (`healthRecords`)**: `type: "event"` 인 데이터(정기검진)가 차트 하단 리스트에 타임라인 형태로 표시되는지 확인합니다.
4. **다이어리 렌더링 (`diaryRecords`)**: 사진이 있는 날(21일)과 사진이 없는 날(22일)의 일기장 컴포넌트 높이 및 레이아웃 깨짐 현상을 테스트합니다.
