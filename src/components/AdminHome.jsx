import styles from "./AdminHome.module.css"
export const AdminHome = () => {
    return (<div className={styles.boxContent}>
			<div className={styles.leftContent}>
				<h3>Wybierz lokalizację</h3>
				<button className={styles.buttonLeftContent}>Sklep 1</button>
				<button className={styles.buttonLeftContent}>Sklep 2</button>
				<button className={styles.buttonLeftContent}>Sklep 3</button>
				<button className={styles.buttonLeftContent}>Sklep 4</button>
				<button className={styles.buttonLeftContent}>Sklep 5</button>
				<button className={styles.buttonAdministrationPanel}>
					Panel Administracyjny
				</button>
			</div>
			<div className={styles.rightContent}>
				<button className={styles.buttonLogout}>Wyloguj</button>
				<button className={styles.buttonNext}>Dalej</button>
			</div>
		</div>)
  }