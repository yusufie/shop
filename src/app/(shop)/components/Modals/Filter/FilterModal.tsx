import Image from 'next/image';
import Link from 'next/link';
import styles from './FilterModal.module.css';
import Accordion from '@/app/(shop)/components/Accordion/Accordion';

interface Category {
  _id: string;
  name: string;
  slug: string;
  parent: string | null;
  children: Category[];
}

interface AccordionProps {
  tree: {
    categories: Category[];
  };
  handleCategoryClick: (categoryId: string | null) => void;
  onClose: () => void;
}

const FilterModal: React.FC<AccordionProps> = ({tree, handleCategoryClick, onClose}) => {

  return (
    <section className={`${styles.filtermodal} ${styles.open}`}>

        <div className={styles.modalTop}>
          <Link href={"/"}>
            <Image src="/images/grand.png" alt="logo" width={163} height={45} />
          </Link>
          <button className={styles.closeButton} onClick={onClose}>x</button>
        </div>

        <Accordion 
          tree={tree}
          handleCategoryClick={handleCategoryClick}
        />

    </section>
  )
}

export default FilterModal