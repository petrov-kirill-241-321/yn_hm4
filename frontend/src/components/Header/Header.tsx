import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import image from "../../assets/Logo SS.png";
import image_analitics from "../../assets/mage_upload.svg";
import image_generator from "../../assets/oui_ml-create-multi-metric-job.svg";
import image_history from "../../assets/time_icon.svg";

export function Header() {
  return (
    <header className={styles.header}>
      <ul className={styles.list}>
        <li className={styles.logo}>
          <img src={image} />
        </li>
        <li className={styles.item__analitics}>Межгалактическая аналитика</li>
        <li className={styles.buttons}>
          <ul className={styles.buttons__list}>
            <li>
              <NavLink to={``} className={styles.item}>
                <img
                  src={image_analitics}
                  alt="analitics"
                  className={styles.image}
                />
                <p>CSV Аналитик</p>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/generator`} className={styles.item}>
                <img
                  src={image_generator}
                  alt="generator"
                  className={styles.image}
                />
                <p>CSV Генератор</p>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/history`} className={styles.item}>
                <img
                  src={image_history}
                  alt="history"
                  className={styles.image}
                />
                <p>История</p>
              </NavLink>
            </li>
          </ul>
        </li>
      </ul>
    </header>
  );
}
