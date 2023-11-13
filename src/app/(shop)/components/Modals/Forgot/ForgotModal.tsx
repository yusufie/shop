import Image from 'next/image';
import styles from './forgotmodal.module.css'

interface ForgotModalProps {
  onClose: () => void;
}

const ForgotPasswordModal: React.FC<ForgotModalProps> = ({ onClose }) => {
  return (
    <section className={styles.forgotmodal}>
      <div className={styles.forgotModalContent}>
      {
          <Image
            className={styles.logo}
            src={"/images/logo.png"}
            alt="logo"
            width={160}
            height={26}
          />
        }
        <p>We will send you a link to reset your password</p>

        <form>

          <div className={styles.email}>
            <label htmlFor="email">Email</label>
            <input id="email" placeholder="Enter your email" />            
          </div>

          <button className={styles.btn}>
            Submit Email
          </button>

        </form>

        <div className={styles.horizontal}>
          <hr />
          <span>Or</span>
        </div>

        <div className={styles.account}>
          Back to <button onClick={onClose}>Login</button>
        </div>

        <button onClick={onClose} className={styles.closeForgot}>x</button>
      </div>
    </section>
  )
}

export default ForgotPasswordModal