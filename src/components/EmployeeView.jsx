import styles from "./EmployeeView.module.css";
export const EmployeeView = () => {
	return (
		<div className={styles.boxContent}>
			<div className={styles.leftContent}>
				<BoxHeaderLeftContent />
			</div>
			<div className={styles.rightContent}>
				<ButtonChooseAWeek />
				<ButtonLogout />
				<TableWeek />
				<CounterHour />
				<ConfirmButton />
			</div>
		</div>
	);
};
