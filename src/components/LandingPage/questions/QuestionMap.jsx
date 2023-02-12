import { useState } from "react";
import icon from "../../../assets/images/icon-arrow.svg";
import styles from "./Questions.module.css";

const QuestionMap = function (item, i) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = (id) => {
    setIsActive((prevState) => ({
      ...isActive,
      [id]: !prevState[id],
    }));
  };

  return (
    <div key={i}>
      <p
        className={isActive[`${i}`] ? styles.questionActive : styles.question}
        onClick={() => handleClick(i)}
      >
        {item.title}
        <img
          className={
            isActive[`${i}`] ? styles.iconArrowActive : styles.iconArrow
          }
          alt="arrow"
          src={icon}
        />
      </p>
      <p className={styles.answer}>{isActive[`${i}`] ? item.answer : ""}</p>
      <hr className={styles.line} />
    </div>
  );
};

export default QuestionMap;
