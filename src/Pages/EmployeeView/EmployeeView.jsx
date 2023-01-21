
import { BoxHeaderLeftContent } from '../../components/BoxHeaderLeftContent/BoxHeaderLeftContent';
import { ButtonChooseAWeek } from '../../components/ButtonChooseAWeek/ButtonChooseAWeek';
import { ButtonLogout } from '../../components/ButtonLogout/ButtonLogout';
import { ConfirmButton } from '../../components/ConfirmButton/ConfirmButton';
import { CounterHour } from '../../components/CounterHour/CounterHour';
import { TableWeek } from '../../components/TableWeek/TableWeek';
import styles from "./EmployeeView.module.css";




export const EmployeeView = () => {
	return (
		<div className={styles.boxContent}>
			<div className={styles.leftContent}>
				<BoxHeaderLeftContent/>
			</div>
			<div className={styles.rightContent}>
				<ButtonChooseAWeek />
				<ButtonLogout/>
				<TableWeek/>
				<CounterHour/>
				<ConfirmButton/>
			</div>
		</div>
	);
};
