import { useCallback, useState } from "react";
import Modal from "../../common/Modal";
import styles from "./CreateReminderModal.module.css";
import Input from "../../common/Input";
import { createReminder } from "../../../services/reminder";
import Button from "../../common/Button";
import { toast } from "react-toastify";

function CreateReminderModal({ onClose }) {

  const [remiderData, setReminderData] = useState({
    title: '',
    description: '',
    date: '',
    time: ''
  })
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((key, e) => {
    setReminderData({
      ...remiderData,
      [key]: e.target.value
    })
  }, [remiderData])



  const handleSubmit = useCallback(async (e) => {
    try {
      e.preventDefault();
      setLoading(true)
      const resp = await createReminder(remiderData);
      toast.success("Reminder created successfully!");
      onClose();
    } catch (e) {
      toast.error("Oops, Something went wrong!");
    } finally {
      setLoading(false)
    }
  }, [remiderData]);

  return (
    <Modal title="Create Reminder" onClose={onClose}>
      <form className={styles.form}>

        <Input
          label="Title"
          type="text"
          placeholder="e.g. Team standup meeting"
          value={remiderData?.title}
          onChange={(e) => handleChange('title', e)}
          required
        />

        <label>Description (optional)</label>
        <textarea value={remiderData?.description} onChange={(e) => handleChange('description', e)} placeholder="Add some details..." rows="4" />

        <div className={styles.dateTimeWrapper}>
          <label>
            Reminder Date & Time
          </label>
          <div className={styles.dateTime}>
            <input value={remiderData?.date} onChange={(e) => handleChange('date', e)} type="date" required />
            <input value={remiderData?.time} onChange={(e) => handleChange('time', e)} type="time" required />
          </div>
        </div>

        <Button onClick={handleSubmit} loading={loading} variant="primary" disabled={!remiderData.title || !remiderData?.date || !remiderData?.time} type="submit">
          Create Reminder
        </Button>
      </form>
    </Modal>
  );
}

export default CreateReminderModal;