
import styles from './change.module.css'

const Change: React.FC = () => {
  return (
    <section className={styles.change}>
      <form className={styles.changePassword}>

        <h1 className={styles.changeTitle}>Change Password</h1>

        <div className={styles.passwordField}>
          <label htmlFor="old">Old Password</label>
          <input type="text"  className={styles.passwordInput}/>
        </div>

        <div className={styles.passwordField}>
          <label htmlFor="new">New Password</label>
          <input type="text"  className={styles.passwordInput}/>
        </div>

        <div className={styles.passwordField}>
          <label htmlFor="confirm">Confirm Password</label>
          <input type="text"  className={styles.passwordInput}/>
        </div>

        <button className={styles.submitButton}>Submit</button>

      </form>
      
    </section>
  )
}

export default Change