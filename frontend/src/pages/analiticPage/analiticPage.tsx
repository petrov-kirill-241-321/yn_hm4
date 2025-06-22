import styles from "./analiticPage.module.css";
import UploadFile from "../../features/uploadFile/UploadFile";
import { useTableStore } from "../../../store/TableStore";
import TableCreate from "../../features/TableCreate/TableCreate";
export default function AnaliticPage() {
  const table = useTableStore((state) => state.table);
  return (
    <div>
      <UploadFile />
      {table ? (
        <TableCreate {...table} />
      ) : (
        <div className={styles.hailight}>
          Здесь <br />
          появятся хайлайты
        </div>
      )}
    </div>
  );
}
