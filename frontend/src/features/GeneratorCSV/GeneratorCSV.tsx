import Button from "../../components/Button/Button";
import { fetchReports } from "../.././../api/fetchReports";
import { useState } from "react";
import Loader from "../../components/Loader/Loader";
import styles from "./GeneratorCSV.module.css";
import imageDelete from "../../assets/Vector.svg";

export default function GeneratorCSV() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fileBlob, setFileBlob] = useState<Blob | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  async function handleClick() {
    try {
      function getRandomSize(): number {
        const values = [0.01, 0.03, 0.05, 0.07, 0.1];
        const randomIndex = Math.floor(Math.random() * values.length);
        return values[randomIndex];
      }
      const size = getRandomSize();
      setIsLoading(true);
      const blob = await fetchReports.getReport(
        (status) => {
          setIsSuccess(status);
        },
        size,
        "on"
      );
      if (!blob) return;
      setFileBlob(blob);
      setIsLoading(false);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }
  function handleDelete() {
    setFileBlob(null);
  }
  function handleDownlowded() {
    if (!fileBlob) return;

    const url = window.URL.createObjectURL(fileBlob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "report.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  }
  return (
    <div>
      {fileBlob ? (
        <div className={styles.download}>
          <div className={styles.buttons}>
            <p className={`${isSuccess ? styles.done : styles.error}`}>
              {isSuccess ? "Done!" : "Ошибка"}
            </p>
            <button onClick={handleDelete} className={styles.button}>
              <img src={imageDelete} alt="удалить" />
            </button>
          </div>
          {isSuccess && (
            <div className={styles.block}>
              <p className={styles.text}>файл сгенерирован!</p>
              <Button
                className={styles.buttonDwn}
                onClick={handleDownlowded}
                text="Скачать"
              />
            </div>
          )}
          {!isSuccess && <p className={styles.errorText}>упс, не то...</p>}
        </div>
      ) : (
        <div>
          {isLoading ? (
            <div>
              <Loader />
              <p className={styles.text}>идёт процесс генерации</p>
            </div>
          ) : (
            <Button text="Начать генерацию" onClick={handleClick} />
          )}
        </div>
      )}
    </div>
  );
}
