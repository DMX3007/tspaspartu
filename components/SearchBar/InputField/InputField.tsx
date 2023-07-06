import styles from "./InputField.module.scss";

// FIXME: Deal with controlled input use React memo or ? set state inside component input? In 2nd case we should validate input there. That means that we should send there also set of data from api/
interface InputFieldProps {
  font: string;
  description: string;
  inputValue: string;
  inputHandler: React.ChangeEventHandler<HTMLInputElement>;
}

export const InputField = ({ font, description, inputValue, inputHandler }: InputFieldProps) => {
  return (
    <div className={styles.input}>
      <div className={styles.input__label}>{description}</div>
      <input value={inputValue} onChange={inputHandler} />
    </div>
  );
};
