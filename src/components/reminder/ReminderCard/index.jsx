import { useCallback, useState } from "react";
import styles from "./ReminderCard.module.css";
import { Calendar, Trash2 } from 'lucide-react';
import DeleteReminder from "../DeleteReminder";

export default function ReminderCard({ reminder, handleRefresh }) {
  const { title, description, reminderTime } = reminder;
  const [deleteReminderModal, setDeleteReminderModal] = useState(null)

  const handleOpenDeleteModal = useCallback(() => {
    setDeleteReminderModal(reminder)
  }, [])


  const formatReminderTime = (isoString) => {
    const date = new Date(isoString);

    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      {deleteReminderModal && <DeleteReminder reminder={reminder} onClose={() => setDeleteReminderModal(null)} afterDelete={handleRefresh} />}
      <div className={styles.card}>
        <div className={styles.content}>
          <h3>{title}</h3>
          <p>{description}</p>

          <div className={styles.time}>
            <Calendar size={14} />
            <span>{formatReminderTime(reminderTime)}</span>
          </div>
        </div>
        <div className={styles.right}>
          <Trash2
            className={styles.delete}
            onClick={handleOpenDeleteModal}
          />
        </div>
      </div>
    </>
  );
}