import styles from "./Skeleton.module.css";

const Skeleton = () => {
  return (
    <article className={`${styles.cards} ${styles['skeleton_cards']}`}>
        
    {/* Create multiple skeleton cards based on the desired number */}
    {[...Array(12)].map((_, index) => (
      <div className={`${styles.card} ${styles['skeleton_card']}`} key={index}>
        <div className={`${styles.cardImage} ${styles['skeleton_cardImage']}`}></div>
        <div className={`${styles.cardContent} ${styles['skeleton_cardContent']}`}>
          <div className={`${styles.cardPrice} ${styles['skeleton_cardPrice']}`}></div>
          <div className={`${styles.cardTitle} ${styles['skeleton_cardTitle']}`}></div>
          <div className={`${styles.beforeButton} ${styles['skeleton_beforeButton']}`}></div>
        </div>
      </div>
    ))}

  </article>
  )
}

export default Skeleton