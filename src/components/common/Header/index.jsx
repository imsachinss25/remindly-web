import styles from "./style.module.css";
import { Bell, CircleUserRound } from 'lucide-react';
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function Header({ onNewReminder, showCreateReminderCta = true }) {
  const navigate = useNavigate();

  const handleProfileNavigate = useCallback(() => {
	navigate("/profile");
  }, [])

  const handleDashboardNavigate = useCallback(() => {
	navigate("/dashboard");
  }, [])

  return (
    <header className={styles.header}>
        <div className={styles.headerContent}> 
      <div className={styles.left} onClick={handleDashboardNavigate}>
        <div className={styles.logoIcon}>
            <Bell />
        </div>
        <h2 className={styles.brand}>Remindly</h2>
      </div>

      <div className={styles.right}>
        {showCreateReminderCta ? <button className={styles.newBtn} onClick={onNewReminder}>
         + New Reminder
        </button> : <></>}

        <button className={styles.logoutBtn} onClick={handleProfileNavigate}>
          <CircleUserRound className={styles.profileIcon} size={30} />
        </button>
      </div>
      </div>
    </header>
  );
}