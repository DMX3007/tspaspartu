import styles from "./Container.module.scss";

interface ContainerProps {
  description: string;
  value: string;
}

export const Container = ({ description, value }: ContainerProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.container__description}>{description}</div>
      <div className={styles.container__value}>{value}</div>
    </div>
  );
};
