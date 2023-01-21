import styles from "./AdminEmployeesList.module.css"
export const AdminEmployeesList = () => {
    return (<div className={styles.boxContent}>
			<div className={styles.leftContent}>
				<h3>Wybierz lokalizację</h3>
				<ButtonLocation/>
				<AdministrationPanelButton/>
			</div>
			<div className={styles.rightContent}>
				<ButtonChooseAWeek/>
				<TableWeek/>
				<CounterHour />
				<ConfirmButton />
			</div>
		</div>)
  }