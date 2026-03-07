import { useCallback, useState } from "react";
import Header from "../../components/common/Header"
import ReminderList from "../../components/reminder/ReminderList";
import styles from "./style.module.css";
import CreateReminderModal from "../../components/reminder/CreateReminderModal";

const Dashboard = () => {
	const [open, setOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // to refetch the reminders
	
	const handleOpenReminderModal = useCallback(() => {
		setOpen(true)
	}, [])

  const refetchReminders = useCallback(() => {
		setRefreshKey(refreshKey + 1)
	}, [refreshKey])

	return (
		<div className={styles.container}>
			<div className={styles.contentWrapper}>
				<Header onNewReminder={handleOpenReminderModal}/>
				<ReminderList refreshKey={refreshKey}/>
			</div>
			 {open && <CreateReminderModal onCreated={refetchReminders} onClose={() => setOpen(false)} />}

		</div>
	)
}

export default Dashboard