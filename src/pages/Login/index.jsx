import { useCallback, useMemo, useState } from "react";
import { Bell } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./style.module.css";
import Input from "../../components/common/Input/index";
import Button from "../../components/common/Button/index";

const Login = () => {
	const [isLogin, setIsLogin] = useState(true);
	const { login, register } = useAuth();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');

	const handleEmailChange = useCallback((e) => {
		setEmail(e.target.value)
	}, [])

	const handlePasswordChange = useCallback((e) => {
		setPassword(e.target.value)
	}, [])

	const handleNameChange = useCallback((e) => {
		setName(e.target.value)
	}, [])

	const handleLoginViewChange = useCallback(() => {
		setIsLogin(!isLogin)
		setEmail('')
		setName('')
		setPassword('')
	}, [isLogin])

	const handleSubmit = useCallback(async () => {
		try {
			setLoading(true);
			const payload = { email, password, name };

			const response = isLogin
				? await login(payload)
				: await register(payload);

			if (response.success) {
				navigate("/dashboard");
			} else {
				toast.error(response.message || "Oops, Something went wrong!");
			}
		} catch (e) {
			toast.error("Oops, Something went wrong!");
		} finally {
			setLoading(false);
		}
	}, [email, password, isLogin]);

	const isSubmitBtnDisable = useMemo(() => {
		if (isLogin) return !email || !password

		return !email || !password || !name
	}, [email, password, name])


	return (
		<div className={styles.container}>
			<div className={styles.logoSection}>
				<div className={styles.logoIconContainer}>
					<Bell className={styles.logoIcon} />
				</div>
				<h1 className={styles.brand}>Remindly</h1>
				<p className={styles.tagline}>Never miss a moment</p>
			</div>

			<div className={styles.card}>
				<h2 className={styles.title}>
					{isLogin ? "Welcome back" : "Create account"}
				</h2>

				<p className={styles.subtitle}>
					{isLogin
						? "Sign in to access your reminders"
						: "Sign up to start creating reminders"}
				</p>

				<form className={styles.form}>

					{!isLogin ? <Input
						label="Name"
						type="name"
						placeholder="John Doe"
						value={name}
						onChange={handleNameChange}
						required
					/> : <></>}

					<Input
						label="Email"
						type="email"
						placeholder="you@example.com"
						value={email}
						onChange={handleEmailChange}
						required
					/>

					<Input
						label="Password"
						type="password"
						placeholder=""
						value={password}
						onChange={handlePasswordChange}
						required
					/>

					<Button type="submit" loading={loading} disabled={isSubmitBtnDisable} variant="primary" onClick={handleSubmit}>
						{isLogin ? "Sign in" : "Sign up"}
					</Button>
				</form>
				<p className={styles.switchText}>
					{isLogin ? "Don't have an account?" : "Already have an account?"}
					<span
						className={styles.switchLink}
						onClick={handleLoginViewChange}
					>
						{isLogin ? " Sign up" : " Sign in"}
					</span>
				</p>
			</div>
		</div>
	);
}

export default Login