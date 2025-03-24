import { Link } from 'react-router-dom';
import styles from './css/Login.module.css';
import logo from '../assets/NAME.png';
const Register = () => {
  return (
    <section className={styles.login_cont}>
      <img src={logo} alt="logo" className={styles.logo} />
      <p className={styles.welcome_text}>Welcome!</p>
      <p className={styles.subtitle}>We're so excited to have you here!</p>
      <form className={styles.login_form}>
        <label htmlFor="username">
          display name <span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className={styles.input}
        />
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
        <label htmlFor="confPass">
          confirm password <span className={styles.required}>*</span>
        </label>
        <input
          type="password"
          id="confPass"
          name="confPass"
          className={styles.input}
        />
        <button className={styles.button}>continue</button>
        <p className={styles.redirect}>
          Have an account?{' '}
          <Link className={styles.redirect_text} to="/">
            Sign in
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Register;
