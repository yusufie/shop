import styles from "../../Whishlist/whishlist.module.css";

const CardLoading = () => {
  return (
    <section className={styles.wishlist}>
        <div className={styles.loading}>
            <span className={styles.spinner} /> {/* spinner */}
        </div>
    </section>
  );
};

export default CardLoading;
