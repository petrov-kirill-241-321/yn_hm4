import { create } from "zustand";
import { devtools } from "zustand/middleware";
interface LastAnaliticStore {
  fileName: string;
  date: string;
  status: boolean;
  update: (fileName: string, date: string, status: boolean) => void;
}

export const useLastAnaliticStore = create<LastAnaliticStore>()(
  devtools((set) => ({
    fileName: "",
    date: "",
    status: false,
    update: (fileName: string, date: string, status: boolean) =>
      set((state) => ({ fileName, date, status })),
  }))
);
