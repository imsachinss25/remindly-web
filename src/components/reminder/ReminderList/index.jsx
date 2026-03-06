import styles from "./style.module.css";
import ReminderCard from "../ReminderCard";
import { CalendarClock } from 'lucide-react';
import { getReminders } from "../../../services/reminder";
import { useEffect, useState } from "react";

export default function ReminderList({ handleRefresh }) {

  const [loading, setLoading] = useState(false);
  const [reminders, setReminders] = useState([]);
  


  const fetchReminders = async () => {
    try {
      setLoading(true)
      const resp = await getReminders();
      setReminders(resp?.data)
      onClose();
    } catch (e) {

    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchReminders()
  }, [])

  return (
    <div className={styles.wrapper}>
    
      <h3 className={styles.title}>
        <CalendarClock className={styles.clockIcon} />
        Upcoming ({reminders.length})
      </h3>

      <div className={styles.list}>
        {reminders.map((reminder) => (
          <div key={reminder.id}>
            <ReminderCard
              reminder={reminder}
              handleRefresh={fetchReminders}
            />
          </div>
        ))}
      </div>
    </div>
  );
}