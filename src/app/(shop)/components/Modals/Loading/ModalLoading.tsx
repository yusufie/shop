import styles from "../Product/productmodal.module.css";

const ModalLoading = () => {
  return (
    <article className={styles.productmodal}>
      <div className={styles.modalContent}>
        <div className={styles.loading}>
            <span className={styles.spinner} /> {/* spinner */}
        </div>
      </div>
    </article>
  );
};

export default ModalLoading;
