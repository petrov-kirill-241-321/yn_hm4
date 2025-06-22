import GeneratorCSV from "../../features/GeneratorCSV/GeneratorCSV";
import styles from "./generatorPage.module.css";

export default function GeneratorPage() {
  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>
        Сгенерируйте готовый csv-файл нажатием одной кнопки
      </p>
      <GeneratorCSV />
    </div>
  );
}
