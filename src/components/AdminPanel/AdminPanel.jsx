import styles from "./AdminPanel.module.css"
export const AdminPanel = () => {
  return (
    <div className={styles.boxContent}>
			<div className={styles.leftContent}>
        <h3>Wybierz lokalizację</h3>
        <button className={styles.buttonLeftContent}>Sklep 1
        <button>E</button><button>D</button></button>
        <button className={styles.buttonLeftContent}>Sklep 2
        <button>E</button><button>D</button></button> <button className={styles.buttonLeftContent}>Sklep 3
        <button>E</button><button>D</button></button> <button className={styles.buttonLeftContent}>Sklep 4
        <button>E</button><button>D</button></button> <button className={styles.buttonLeftContent}>Sklep 5
          <button>E</button><button>D</button></button>
        <button className={styles.buttonInfoEmployee}>Pracownicy bez lokalizacji (<p></p>)</button>
			</div>
      <div className={styles.rightContent}>
        <button className={styles.buttonAddEmployee}>Dodaj pracownika</button>
        <button className={styles.buttonSave}>Zapisz</button>
        <div className={styles.boxEmployeesList}>
          <button>pracownik 1</button>
          <button>pracownik 2</button>
          <button>pracownik 3</button>
          <button>pracownik 4</button>
          <button>pracownik 5</button>
        </div>
				<button className={styles.buttonFinish}>Zakończ</button>
			</div>
		</div>
    )
  }