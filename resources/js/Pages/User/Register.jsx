import React, { useEffect, useRef } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import UserLayout from "@/Layouts/UserLayout";
import styles from "../../../css/User/Register.module.css";

export default function Register() {
    const wrapperRef = useRef(null);
    const loginLinkRef = useRef(null);
    const registerLinkRef = useRef(null);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const loginLink = loginLinkRef.current;
        const registerLink = registerLinkRef.current;
        
        if (registerLink && loginLink && wrapper) {
            registerLink.addEventListener('click', () => {
                wrapper.classList.add(styles.active);
            });
        
            loginLink.addEventListener('click', () => {
                wrapper.classList.remove(styles.active);
            });
        }
        
        // Cleanup event listeners on component unmount
        return () => {
            if (registerLink && loginLink) {
                registerLink.removeEventListener('click', () => {
                    wrapper.classList.add(styles.active);
                });
        
                loginLink.removeEventListener('click', () => {
                    wrapper.classList.remove(styles.active);
                });
            }
        };
    }, []);

    const { data, setData, post, errors } = useForm({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting form with data:', data); // Tambahkan log ini untuk memastikan data yang dikirim
        post('/register'); // Pastikan rute ini benar
    };

    return (
        <UserLayout>
            <main>
                <article>
                    <section className={`${styles.section} ${styles["login-register"]}`}>
                        <div className={styles.container}>
                            <div className={styles.wrapper} ref={wrapperRef}>
                                <div className={`${styles["form-box"]} ${styles.login}`}>
                                    <h2>Login</h2>
                                    <form action="#">
                                        <div className={styles["input-box"]}>
                                            <span className={styles.icon}>
                                                <i className={`${styles.bx} ${styles["bxs-envelope"]}`}></i>
                                            </span>
                                            <input type="email" required />
                                            <label>Email</label>
                                        </div>
                                        <div className={styles["input-box"]}>
                                            <span className={styles.icon}>
                                                <i className={`${styles.bx} ${styles["bxs-lock-alt"]}`}></i>
                                            </span>
                                            <input type="password" required />
                                            <label>Password</label>
                                        </div>
                                        <div className={styles["remember-forgot"]}>
                                            <label>
                                                <input type="checkbox" /> Remember me
                                            </label>
                                            <a href="#">Forgot Password?</a>
                                        </div>
                                        <button type="submit" className={styles["btn-login"]}>
                                            Login
                                        </button>
                                        <div className={styles["login-register"]}>
                                            <p>
                                                Don't have an account?
                                                <a href="#" className={styles["register-link"]} ref={registerLinkRef}>
                                                    Register
                                                </a>
                                            </p>
                                        </div>
                                    </form>
                                </div>

                                <div className={`${styles["form-box"]} ${styles.register}`}>
                                    <h2>Registration</h2>
                                    <form onSubmit={handleSubmit}>
                                        <div className={styles["input-box"]}>
                                            <span className={styles.icon}>
                                                <i className={`${styles.bx} ${styles["bxs-user"]}`}></i>
                                            </span>
                                            <input 
                                                type="text" 
                                                name="username" 
                                                value={data.username}
                                                onChange={handleChange}
                                                required 
                                            />
                                            <label>Username</label>
                                            {errors.username && <p className="error">{errors.username}</p>}
                                        </div>
                                        <div className={styles["input-box"]}>
                                            <span className={styles.icon}>
                                                <i className={`${styles.bx} ${styles["bxs-envelope"]}`}></i>
                                            </span>
                                            <input 
                                                type="email" 
                                                name="email"
                                                value={data.email}
                                                onChange={handleChange}
                                                required 
                                            />
                                            <label>Email</label>
                                            {errors.email && <p className="error">{errors.email}</p>}
                                        </div>
                                        <div className={styles["input-box"]}>
                                            <span className={styles.icon}>
                                                <i className={`${styles.bx} ${styles["bxs-lock-alt"]}`}></i>
                                            </span>
                                            <input 
                                                type="password" 
                                                name="password"
                                                value={data.password}
                                                onChange={handleChange}
                                                required 
                                            />
                                            <label>Password</label>
                                            {errors.password && <p className="error">{errors.password}</p>}
                                        </div>
                                        <div className={styles["remember-forgot"]}>
                                            <label>
                                                <input type="checkbox" /> I agree to the terms & conditions
                                            </label>
                                        </div>
                                        <button type="submit" className={styles["btn-register"]}>
                                            Register
                                        </button>
                                        <div className={styles["login-register"]}>
                                            <p>
                                                Already have an account?
                                                <a href="#" className={styles["login-link"]} ref={loginLinkRef}>
                                                    Login
                                                </a>
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                </article>
            </main>
        </UserLayout>
    );
}
