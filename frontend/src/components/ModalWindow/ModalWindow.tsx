import type { TableData } from "../../../store/TableStore";
import ReactDOM from "react-dom";
import styles from "./ModalWindow.module.css";
import { useEffect } from "react";
import imageCancel from "../../assets/Vector.svg";
const modalRoot = document.getElementById("modal-root");
interface Props extends TableData {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}
export default function ModalWindow({
  average_spend_galactic,
  big_spent_at,
  big_spent_civ,
  big_spent_value,
  less_spent_at,
  less_spent_civ,
  less_spent_value,
  rows_affected,
  total_spend_galactic,
  isOpen,
  setIsOpen,
}: Props) {
  if (!isOpen || !modalRoot) return null;
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [isOpen]);

  return ReactDOM.createPortal(
    <div className={styles.back} onClick={() => setIsOpen(false)}>
      <div className={styles.block}>
        <button className={styles.cancel} onClick={() => setIsOpen(false)}>
          <img src={imageCancel} alt="закрыть" />
        </button>
        <div className={styles.content} onClick={(e) => e.stopPropagation()}>
          <ul className={styles.grid}>
            <li className={styles.item}>
              <h3 className={styles.title}>{total_spend_galactic}</h3>
              <p className={styles.p}>общие расходы в галактических кредитах</p>
            </li>
            <li className={styles.item}>
              <h3 className={styles.title}>{rows_affected}</h3>
              <p className={styles.p}>количество обработанных записей</p>
            </li>
            <li className={styles.item}>
              <h3 className={styles.title}>{less_spent_at}</h3>
              <p className={styles.p}>день года с минимальными расходами </p>
            </li>
            <li className={styles.item}>
              <h3 className={styles.title}>{big_spent_civ}</h3>
              <p className={styles.p}>цивилизация с максимальными расходами </p>
            </li>
            <li className={styles.item}>
              <h3 className={styles.title}>{less_spent_civ}</h3>
              <p className={styles.p}>цивилизация с минимальными расходами</p>
            </li>
            <li className={styles.item}>
              <h3 className={styles.title}>{big_spent_at}</h3>
              <p className={styles.p}>день года с максимальными расходами </p>
            </li>

            <li className={styles.item}>
              <h3 className={styles.title}>{big_spent_value}</h3>
              <p className={styles.p}>максимальная сумма расходов за день </p>
            </li>
            <li className={styles.item}>
              <h3 className={styles.title}>{average_spend_galactic}</h3>
              <p className={styles.p}>
                средние расходы в галактических кредитах
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>,
    modalRoot
  );
}
