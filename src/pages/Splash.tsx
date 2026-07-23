import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home", { replace: true });
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-gradient-to-b from-orange-50 to-white">
      <span className="mb-4 text-7xl">🐾</span>
      <h1 className="text-2xl font-bold text-gray-900">댕케어 캘린더</h1>
      <p className="mt-2 text-sm text-gray-500">반려동물 돌봄 체크리스트</p>
    </div>
  );
}
