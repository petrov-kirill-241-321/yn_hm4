import styles from "./Loader.module.css";
import imageLoader from "../../assets/loader.svg";

export default function Loader() {
  return (
    <div className={styles.loaderblock}>
      <img className={styles.loader} src={imageLoader} alt="идет загрузка" />
    </div>
  );
}
