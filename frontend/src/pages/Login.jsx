import { Link } from 'react-router-dom';
import styles from './css/Login.module.css';
import logo from '../assets/NAME.png';
const Login = () => {
  return (
    <section className={styles.login_cont}>
      <img src={logo} alt="logo" className={styles.logo} />
      <p className={styles.welcome_text}>Welcome back!</p>
      <p className={styles.subtitle}>We're so excited to see you again!</p>
      <form className={styles.login_form}>
        <label htmlFor="email">
          email address <span className={styles.required}>*</span>
        </label>
        <input type="email" id="email" name="email" className={styles.input} />
        <label htmlFor="password">
          password <span className={styles.required}>*</span>
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className={styles.input}
        />
        <button className={styles.button}>login</button>
        <p className={styles.redirect}>
          Need an account?{' '}
          <Link className={styles.redirect_text} to="/register">
            Register
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
