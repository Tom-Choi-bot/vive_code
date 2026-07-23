# 🐾 댕케어 캘린더 (Dang Care Calendar)

반려동물의 돌봄 일정을 기록하고 관리하는 모바일 중심 체크리스트 웹앱 MVP입니다.

## 기능

- 반려동물 CRUD (강아지/고양이)
- 반복 루틴 관리 (요일, 하루 수행 횟수, 색상)
- 오늘 체크리스트 자동 생성 및 완료 체크
- 캘린더에서 과거 기록 조회/수정
- Local Storage 기반 오프라인 저장

## 기술 스택

- Vite + React + TypeScript
- Tailwind CSS
- React Router
- GitHub Pages

## 로컬 실행

```bash
npm install
npm run dev
```

개발 서버: http://localhost:5173/readers/

## 빌드

```bash
npm run build
npm run preview
```

## 배포

`main` 브랜치 push 시 GitHub Actions로 GitHub Pages에 자동 배포됩니다.

배포 URL: https://tom-choi-bot.github.io/readers/

## MVP 범위 외

로그인, 클라우드 동기화, 푸시 알림, 사진 첨부, 메모, 건강 기록 등은 포함되지 않습니다.

자세한 요구사항은 [prd.md](./prd.md)를 참고하세요.
