import { useEffect, useState } from "react";
import type { TableData } from "../../../store/TableStore";
import Container from "../../components/Container/Container";
import HistoryItem from "../../components/HistoryItem/HistoryItem";

export interface IList {
  tableId: number;
  currentDate: string;
  fileName: string;
  isSuccess: boolean;
  tableStore: TableData;
}

export default function HistoryList() {
  const [list, setList] = useState<IList[]>([]);
  function loadFromStore() {
    let newList: Array<IList> = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("table-")) {
        const value = JSON.parse(localStorage.getItem(key) ?? "");
        newList.push(value);
      }
    }
    setList(newList);
  }

  useEffect(() => {
    loadFromStore();
    const handler = () => loadFromStore();

    window.addEventListener("storage-change", handler);

    return () => {
      window.removeEventListener("storage-change", handler);
    };
  }, []);

  return (
    <Container>
      {list.map((item) => (
        <HistoryItem
          date={item.currentDate}
          fileName={item.fileName}
          status={item.isSuccess}
          key={item.tableId}
          id={item.tableId}
        />
      ))}
    </Container>
  );
}
