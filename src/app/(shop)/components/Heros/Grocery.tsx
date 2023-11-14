import Searchbox from "@/app/(shop)/components/Search/Searchbox/Searchbox";
import styles from "./grocery.module.css";

const Grocery: React.FC = () => {
  return (
    <section className={styles.groceryBackground}>
      <h1 className={styles.groceryTitle}>Groceries Delivered in 90 Minute</h1>
      <p className={styles.groceryText}>
        Get your healthy foods & snacks delivered at your doorsteps all day
        everyday
      </p>
      <Searchbox />
    </section>
  );
};

export default Grocery;
