import { useCallback, useState } from "react";
import Button from "../../common/Button"
import Modal from "../../common/Modal"
import styles from "./DeleteReminder.module.css";
import { deleteReminder } from "../../../services/reminder";
import { toast } from "react-toastify";

const DeleteReminder = ({ reminder, onClose, afterDelete }) => {
	const [loading, setLoading] = useState(false)

	const onDelete = useCallback(async () => {
			try {
				setLoading(true)
					const resp = await deleteReminder(reminder._id)
					 toast.success("Reminder deleted successfully!");
					 afterDelete && afterDelete()
					 onClose()
			} catch (e) {
	 toast.error("Oops, Something went wrong!");
			} finally {
					setLoading(false)
			}
	}, [reminder])

	return (
		<Modal title="Delete" onClose={onClose}>
			<p>
				Are you sure you want to delete reminder "{reminder?.title}" ?
			</p>
			<div className={styles.ctaWrapper}>
				<Button onClick={onClose} variant="secondary">
					Cancel
				</Button>
				<Button loading={loading} onClick={onDelete} variant="primary">
					Delete
				</Button>
			</div>
		</Modal>
	)
}

export default DeleteReminder