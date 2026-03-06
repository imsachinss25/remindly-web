import { useCallback, useState } from "react";
import Header from "../../components/common/Header"
import ReminderList from "../../components/reminder/ReminderList";
import styles from "./style.module.css";
import CreateReminderModal from "../../components/reminder/CreateReminderModal";

const Dashboard = () => {
	const [open, setOpen] = useState(false);
	
	const handleOpenReminderModal = useCallback(() => {
		setOpen(true)
	}, [])

	return (
		<div className={styles.container}>
			<div className={styles.contentWrapper}>
				<Header onNewReminder={handleOpenReminderModal}/>
				<ReminderList/>
			</div>
			 {open && <CreateReminderModal onClose={() => setOpen(false)} />}

		</div>
	)
}

export default Dashboard