import styles from "./Button.module.css";
interface Props {
  text: string;
  className?: string;
  isDisabled?: boolean;
  onClick?: () => void;
  children?: any;
}

export default function Button({
  className,
  text,
  isDisabled = false,
  onClick,
  children,
}: Props) {
  return (
    <button
      className={`${styles.button} ${className}`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {text}
      {children}
    </button>
  );
}
