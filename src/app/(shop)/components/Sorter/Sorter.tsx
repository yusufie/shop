import styles from "./Sorter.module.css";

interface SorterProps {
  handleSortChange: (sortType: "asc" | "desc" | "") => void;
  value: "asc" | "desc" | "";
}

const Sorter: React.FC<SorterProps> = ({ handleSortChange, value }) => {
  return (
    <section className={styles.sorts}>

      <select
        id="sortSelect"
        onChange={(e) => handleSortChange(e.target.value as "asc" | "desc" | "")}
        value={value}
      >
        <option value="">Sort by Price</option>
        <option value="asc">Low to High</option>
        <option value="desc">High to Low</option>
      </select>
    </section>
  );
};

export default Sorter;
