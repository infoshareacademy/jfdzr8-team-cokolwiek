import styles from "./AdminPanel.module.css"
export const AdminPanel = () => {
    return (<div className={styles.boxContent}>
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
        <ButtonAddEmployee/>
        <ButtonSave/>
        <div className={styles.boxEmployeesList}>
          <ButtonEmployee/>
        </div>
				<ButtonFinish/>
			</div>
		</div>)
  }