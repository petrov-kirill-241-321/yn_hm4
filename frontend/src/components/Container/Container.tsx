import styles from "./Container.module.css";
interface Props {
  children: any;
  className?: string;
}
export default function Container({ children, className }: Props) {
  return <div className={`${styles.container} ${className}`}>{children}</div>;
}
