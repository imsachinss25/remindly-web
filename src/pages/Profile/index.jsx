import { useCallback, useEffect, useState } from "react";
import { User } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import styles from "./Profile.module.css";
import Input from "../../components/common/Input/index";
import Button from "../../components/common/Button/index";
import Header from "../../components/common/Header";
import { updateUser } from "../../services/auth";

const Profile = () => {
	const { user, logout } = useAuth();
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState(user?.name);

	const handleNameChange = useCallback((e) => {
		setName(e.target.value)
	}, [])

	const handleSubmit = useCallback(async () => {
		try {
			setLoading(true);
			const payload = { name };
			const response = await updateUser(payload)
			const updatedUser = response?.data?.user
			if (updatedUser) {
				toast.success("Profile updated successfully!");
				const data = {
					email: updatedUser?.email,
					id: updatedUser?._id,
					name: updatedUser?.name
				}
				localStorage.setItem("user", JSON.stringify(data));
			}

		} catch (e) {
			toast.error("Oops, Something went wrong!");
		} finally {
			setLoading(false);
		}
	}, [name]);

	useEffect(() => {
		setName(user?.name)
	}, [user?.name])


	return (
		<>
			<Header showCreateReminderCta={false} />
			<div className={styles.container}>
				<div className={styles.logoSection}>
					<div className={styles.logoIconContainer}>
						<User className={styles.logoIcon} />
					</div>
					<h1 className={styles.brand}>{"User Profile"}</h1>
				</div>
				<div className={styles.card}>
					<form className={styles.form}>
						<Input
							label="Name"
							type="name"
							placeholder="John Doe"
							value={name}
							onChange={handleNameChange}
							required
						/>

						<Input
							label="Email"
							type="email"
							placeholder="you@example.com"
							value={user?.email}
							disabled
							required
						/>

						<div className={styles.ctaWrapper}>
							<Button disabled={!name} loading={loading} type="submit" variant="primary" onClick={handleSubmit}>
								{"Update"}
							</Button>
							<Button loading={loading} type="submit" variant="outline" onClick={logout}>
								{"Logout"}
							</Button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default Profile