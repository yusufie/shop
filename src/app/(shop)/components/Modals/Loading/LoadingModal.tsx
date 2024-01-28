import styles from "./LoadingModal.module.css";

const LoadingModal: React.FC = () => {

  return (

    <div className={styles.loadingmodal}>
      <div className={styles.loading}>
        <span className={styles.spinner} /> {/* spinner */}
      </div>
    </div>
    
  )
}

export default LoadingModal