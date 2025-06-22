import { getDateFromDay } from "../../services/getDate";
import styles from "./TableCreate.module.css";
interface Props {
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

export default function TableCreate({
  average_spend_galactic,
  big_spent_at,
  big_spent_civ,
  big_spent_value,
  less_spent_at,
  less_spent_civ,
  less_spent_value,
  rows_affected,
  total_spend_galactic,
}: Props) {
  return (
    <ul className={styles.grid}>
      <li className={styles.item}>
        <h2 className={styles.title}>{total_spend_galactic}</h2>
        <p className={styles.p}>общие расходы в галактических кредитах</p>
      </li>
      <li className={styles.item}>
        <h2 className={styles.title}>{less_spent_civ}</h2>
        <p className={styles.p}>цивилизация с минимальными расходами</p>
      </li>
      <li className={styles.item}>
        <h2 className={styles.title}>{rows_affected}</h2>
        <p className={styles.p}>количество обработанных записей</p>
      </li>
      <li className={styles.item}>
        <h2 className={styles.title}>{getDateFromDay(big_spent_at)}</h2>
        <p className={styles.p}>день года с максимальными расходами </p>
      </li>
      <li className={styles.item}>
        <h2 className={styles.title}>{getDateFromDay(less_spent_at)}</h2>
        <p className={styles.p}>день года с минимальными расходами </p>
      </li>
      <li className={styles.item}>
        <h2 className={styles.title}>{big_spent_value}</h2>
        <p className={styles.p}>максимальная сумма расходов за день </p>
      </li>
      <li className={styles.item}>
        <h2 className={styles.title}>{big_spent_civ}</h2>
        <p className={styles.p}>цивилизация с максимальными расходами </p>
      </li>
      <li className={styles.item}>
        <h2 className={styles.title}>{average_spend_galactic}</h2>
        <p className={styles.p}>средние расходы в галактических кредитах</p>
      </li>
    </ul>
  );
}
