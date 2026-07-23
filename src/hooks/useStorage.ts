import { useEffect } from "react";
import { loadStorage, saveStorage } from "../utils/storage";
import type { AppStorage } from "../types";

export function useStorageSync(data: AppStorage) {
  useEffect(() => {
    saveStorage(data);
  }, [data]);
}

export function useStorageInit(): AppStorage {
  return loadStorage();
}

// TODO: storage 이벤트 리스너로 탭 간 동기화
