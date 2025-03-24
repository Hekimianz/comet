import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import styles from './css/Login.module.css';
import logo from '../assets/NAME.png';
const Register = () => {
  const { user, register } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPass, setConfPass] = useState('');
  const [invalid, setInvalid] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      password !== confPass ||
      !password ||
      !confPass ||
      !email ||
      !username
    ) {
      setInvalid(true);
    } else {
      setInvalid(false);
    }
  }, [username, password, confPass, email]);

  if (user) {
    navigate('/user');
    return;
  }
  return (
    <section className={styles.login_cont}>
      <img src={logo} alt="logo" className={styles.logo} />
      <p className={styles.welcome_text}>Welcome!</p>
      <p className={styles.subtitle}>We're so excited to have you here!</p>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await register(username, email, password);
          navigate('/sign-in');
        }}
        className={styles.login_form}
      >
        <label htmlFor="username">
          display name <span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="email">
          email address <span className={styles.required}>*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">
          password <span className={styles.required}>*</span>
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="confPass">
          confirm password <span className={styles.required}>*</span>
        </label>
        <input
          type="password"
          id="confPass"
          name="confPass"
          className={styles.input}
          value={confPass}
          onChange={(e) => setConfPass(e.target.value)}
        />
        <button disabled={invalid} className={styles.button}>
          continue
        </button>
        <p className={styles.redirect}>
          Have an account?{' '}
          <Link className={styles.redirect_text} to="/sign-in">
            Sign in
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Register;
