import { useRef, useState } from "react";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import styles from "./UploadFile.module.css";
import imageRemove from "../../assets/Vector.svg";
import { fetchAggregate } from "../../../api/fetchAggregate.ts";
import { useTableStore, type TableData } from "../../../store/TableStore.ts";
import Loader from "../../components/Loader/Loader.tsx";
import { useLastAnaliticStore } from ".././../../store/LastAnaliticsStore.ts";

export default function UploadFile() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [table, setTable] = useState<TableData | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const updateTable = useTableStore((state) => state.updateTable);
  const updateTableId = useTableStore((state) => state.updateTableId);
  const clearTable = useTableStore((state) => state.clearTable);
  const [isValid, setIsValid] = useState<boolean | null>(true);
  const updateLastAnaliticStore = useLastAnaliticStore((state) => state.update);

  function handleRemove() {
    if (inputRef.current) {
      inputRef.current.value = "";
      setFileName(null);
      setFile(null);
      setIsSuccess(false);
      clearTable();
      setIsValid(true);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.currentTarget.files?.[0];

    setIsValid(true);
    if (file) {
      setFileName(file.name);
      setFile(file);
    } else {
      setFile(null);
    }
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove(styles.dragDrop);
    const file = e.dataTransfer.files?.[0];

    if (file) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      if (inputRef.current) {
        inputRef.current.files = dataTransfer.files;
      }
      setFile(file);
      setFileName(file.name);
    }
  }
  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add(styles.dragDrop);
  }
  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove(styles.dragDrop);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const tableId = Date.now();
    updateTableId(tableId);
    setIsLoading(true);
    e.preventDefault();
    if (file?.type !== "text/csv") {
      setIsValid(false);
      setIsLoading(false);
      return;
    }
    if (file) {
      let finalStatus = false;
      let finalTable = {};
      await fetchAggregate.getAggregate(
        file,
        10000,
        (obj) => {
          finalTable = obj;
          setTable(obj);
        },
        (table) => {
          updateTable(table);
        },
        (status) => {
          finalStatus = status;
          setIsSuccess(status);
        }
      );
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth() + 1; // Месяцы от 0 до 11
      const year = date.getFullYear();
      const currentDate = `${day}.${month < 9 ? `0${month}` : month}.${year}`;
      updateLastAnaliticStore(file.name, currentDate, isSuccess);
      localStorage.setItem(
        `table-${tableId}`,
        JSON.stringify({
          tableId,
          tableStore: finalTable,
          fileName: file.name,
          currentDate,
          isSuccess: finalStatus,
        })
      );
      setIsLoading(false);
    }
  }
  return (
    <Container>
      <p className={styles.title}>
        Загрузите <b>csv</b> файл и получите <b>полную информацию </b> о нём
        за сверхнизкое время
      </p>
      <div
        className={`${styles.uploadblock} ${fileName ? styles.uploadSave : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit}>
            <div className={styles.upload}>
              <label
                className={`${styles.label} ${
                  isSuccess ? styles.success : fileName ? styles.bgc : ""
                } ${!isValid ? styles.notValid : ""}`}
              >
                <input
                  ref={inputRef}
                  accept=".csv"
                  type="file"
                  name="file"
                  className={styles.input}
                  onChange={handleChange}
                />
                {fileName ? fileName : "Загрузить файл"}
              </label>
              {fileName && (
                <button
                  className={styles.remove}
                  onClick={handleRemove}
                  type="button"
                >
                  <img src={imageRemove} alt="удалить" />
                </button>
              )}
            </div>
            <p className={isValid ? styles.text : styles.errorText}>
              {isSuccess
                ? "готово!"
                : fileName && !isValid
                ? "упс, не то..."
                : fileName
                ? `файл загружен!`
                : `или перетащите сюда`}
            </p>
            {isValid && (
              <div className={styles.button}>
                {!isSuccess && (
                  <Button text="Отправить" isDisabled={isLoading} />
                )}
              </div>
            )}
          </form>
        )}
      </div>
    </Container>
  );
}
