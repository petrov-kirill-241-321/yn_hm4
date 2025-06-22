import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import HistoryList, {
  type IList,
} from "../../features/HistoryList/HistoryList";
import styles from "./historyPage.module.css";

export default function HistoryPage() {
  function handleClearStorage() {
    localStorage.clear();
    window.dispatchEvent(new Event("storage-change"));
  }
  let newList: Array<IList> = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith("table-")) {
      const value = JSON.parse(localStorage.getItem(key) ?? "");
      newList.push(value);
    }
  }
  return (
    <div>
      <HistoryList />
      {newList.length === 0 && <div className={styles.text}>История пуста</div>}
      <div className={styles.buttons}>
        <Link to={"/"}>
          <Button text="Сгенерировать больше" className={styles.more} />
        </Link>
        {newList.length > 0 && (
          <Button
            text="Очистить всё"
            className={styles.delete}
            onClick={handleClearStorage}
          />
        )}
      </div>
    </div>
  );
}
