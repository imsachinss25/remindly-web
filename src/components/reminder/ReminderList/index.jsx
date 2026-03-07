import styles from "./style.module.css";
import ReminderCard from "../ReminderCard";
import { CalendarClock, CalendarX } from 'lucide-react';
import { getReminders } from "../../../services/reminder";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ListSkeleton from "../ListSkeleton";

export default function ReminderList({ refreshKey }) {
  const [loading, setLoading] = useState(false);
  const [reminders, setReminders] = useState([]);

  const fetchReminders = useCallback(async () => {
    try {
      setLoading(true)
      const resp = await getReminders();
      setReminders(resp?.data)
    } catch (e) {
      toast.error("Oops, Something went wrong!");
    } finally {
      setLoading(false)
    }
  }, []);

  useEffect(() => {
    fetchReminders()
  }, [refreshKey])

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>
        <CalendarClock className={styles.clockIcon} />
        {loading ? 'Fetching' : `Upcoming (${reminders.length})`}
      </h3>
      {
        loading
          ? <ListSkeleton />
          : <div className={styles.list}>
            {!reminders.length ? <div className={styles.emptyList}>
              <CalendarX /> No reminders available
            </div>
              :
              reminders.map((reminder, index) => (
                <div key={`reminder-list-${reminder._id}-${index}`}>
                  <ReminderCard
                    reminder={reminder}
                    handleRefresh={fetchReminders}
                  />
                </div>
              ))}
          </div>
      }
    </div>
  );
}