import Image from "next/image";
import styles from "./pagination.module.css";

interface PaginationProps {
  currentPage: number;
  productsPerPage: number;
  totalProducts: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  productsPerPage,
  totalProducts,
  paginate,
}) => {
  const pageNumbers = Math.ceil(totalProducts / productsPerPage);

  return (
    <div className={styles.pagination}>
      {pageNumbers > 1 && (
        <>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={styles.prevButton}
          >
            <Image src="/icons/arrow-prev.svg" width={16} height={16} alt="arrow-left" />
          </button>

          {Array.from({ length: pageNumbers }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              disabled={currentPage === index + 1}
              className={styles.pageButton}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === pageNumbers}
            className={styles.nextButton}
          >
            <Image src="/icons/arrow-next.svg" width={16} height={16} alt="arrow-next" />
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;
