import { create } from "zustand";
import { devtools } from "zustand/middleware";
export interface TableData {
  average_spend_galactic: number;
  big_spent_at: number;
  big_spent_civ: string;
  big_spent_value: number;
  less_spent_at: number;
  less_spent_civ: string;
  less_spent_value: number;
  rows_affected: number;
  total_spend_galactic: number;
}

interface TableState {
  tableId: number | null;
  table: TableData | null;
  updateTable: (data: TableData) => void;
  clearTable: () => void;
  updateTableId: (id: number) => void;
}

export const useTableStore = create<TableState>()(
  devtools((set) => ({
    tableId: null,
    table: null,
    updateTable: async (data) => await set((state) => ({ table: data })),
    clearTable: () => set((state) => ({ table: null })),
    updateTableId: (id: number) => set((state) => ({ tableId: id })),
  }))
);
