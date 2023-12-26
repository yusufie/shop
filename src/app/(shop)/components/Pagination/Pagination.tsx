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

  // Number of buttons to display (excluding start, end, and ellipses)
  const maxVisibleButtons = 7;

  const halfVisibleButtons = Math.floor(maxVisibleButtons / 2);

  let startPage = 1;
  let endPage = pageNumbers;

  if (pageNumbers > maxVisibleButtons) {
    if (currentPage <= halfVisibleButtons) {
      startPage = 1;
      endPage = maxVisibleButtons;
    } else if (currentPage >= pageNumbers - halfVisibleButtons) {
      startPage = pageNumbers - maxVisibleButtons + 1;
      endPage = pageNumbers;
    } else {
      startPage = currentPage - halfVisibleButtons;
      endPage = currentPage + halfVisibleButtons;
    }
  }

  const ellipsisStart = startPage > 1;
  const ellipsisEnd = endPage < pageNumbers;

  const getPageButtons = () => {
    const buttons = [];
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          disabled={currentPage === i}
          className={styles.pageButton}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className={styles.pagination}>
      {pageNumbers > 1 && (
        <>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={styles.prevButton}
          >
            <Image
              src="/icons/arrow-prev.svg"
              width={16}
              height={16}
              alt="arrow-left"
            />
          </button>

          <button
            onClick={() => paginate(1)}
            disabled={currentPage === 1}
            className={`${styles.pageButton} ${styles.firstButton}`}
          >
            First
          </button>

          {ellipsisStart && (
            <button disabled className={styles.pageButton}>
              ...
            </button>
          )}

          {getPageButtons()}

          {ellipsisEnd && (
            <button disabled className={styles.pageButton}>
              ...
            </button>
          )}

          <button
            onClick={() => paginate(pageNumbers)}
            disabled={currentPage === pageNumbers}
            className={`${styles.pageButton} ${styles.lastButton}`}
          >
            Last
          </button>

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === pageNumbers}
            className={styles.nextButton}
          >
            <Image
              src="/icons/arrow-next.svg"
              width={16}
              height={16}
              alt="arrow-next"
            />
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;
