import { Link } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import { useCalendar } from "../hooks/useCalendar";
import { Layout } from "../components/common/Layout";
import { EmptyState } from "../components/common/EmptyState";
import { Button } from "../components/common/Button";
import { CalendarGrid } from "../components/calendar/CalendarGrid";
import { DayRecords } from "../components/calendar/DayRecords";

export function Calendar() {
  const { pets } = useApp();
  const {
    selectedDate,
    setSelectedDate,
    viewMonth,
    monthSummaries,
    dayItems,
    goToPrevMonth,
    goToNextMonth,
  } = useCalendar();

  if (pets.length === 0) {
    return (
      <Layout title="캘린더">
        <EmptyState
          emoji="📅"
          title="먼저 반려동물을 등록해주세요"
          description="반려동물과 루틴을 등록하면 캘린더에서 기록을 확인할 수 있습니다."
          action={
            <Link to="/pets">
              <Button>반려동물 등록하기</Button>
            </Link>
          }
        />
      </Layout>
    );
  }

  return (
    <Layout title="캘린더">
      <CalendarGrid
        year={viewMonth.year}
        month={viewMonth.month}
        selectedDate={selectedDate}
        monthSummaries={monthSummaries}
        onSelectDate={setSelectedDate}
        onPrevMonth={goToPrevMonth}
        onNextMonth={goToNextMonth}
      />
      <DayRecords date={selectedDate} items={dayItems} />
    </Layout>
  );
}
