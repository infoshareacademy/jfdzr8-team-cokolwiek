import { AdministrationPanelButton } from '../../components/AdministrationPanelButton/AdministrationPanelButton';
import { ButtonChooseAWeek } from '../../components/ButtonChooseAWeek/ButtonChooseAWeek';
import { ButtonLocation } from '../../components/ButtonLocation/Buttonlocation';
import { ConfirmButton } from "../../components/ConfirmButton/ConfirmButton";
import { CounterHour } from "../../components/CounterHour/CounterHour";
import { TableWeek } from '../../components/TableWeek/TableWeek';
import styles from "./AdminEmployeesList.module.css";

export const AdminEmployeesList = () => {
	return (
		<div className={styles.boxContent}>
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
		</div>
	);
};
