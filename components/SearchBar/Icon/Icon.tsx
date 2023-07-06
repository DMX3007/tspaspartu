import { cloneElement } from "react";
import styles from "./Icon.module.scss";

interface IconProps {
  children: React.ReactElement;
  clickHandler: React.MouseEventHandler<HTMLDivElement>;
}

export const Icon = ({ children, clickHandler }: IconProps): JSX.Element => {

  const styledIcon = children ? cloneElement(children, { className: styles.wrapperIcon__icon }) : null;

  return (
    <div className={styles.wrapper} onClick={clickHandler}>
      <div className={styles.wrapperIcon}>
        {styledIcon}
      </div>
    </div>
  );
};
