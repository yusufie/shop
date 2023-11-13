import Image from 'next/image'
import styles from './search.module.css'

const Search: React.FC = () => {
  return (
    <section className={styles.search}>
        <form className={styles.searchForm}>
            <input className={styles.searchInput} type="text" placeholder="Search your products from here" />
            <button className={styles.searchButton} type="submit">
              <Image src="/icons/search.svg" alt="search" width={20} height={20} />
              <span>Search</span>
            </button>
        </form>
    </section>
  )
}

export default Search