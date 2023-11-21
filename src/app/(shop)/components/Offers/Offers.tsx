import Image from "next/image";
import cupons from "../../../../../public/datas/cupon.json";
import styles from "./offers.module.css";

const Offers = () => {
  return (
    <section className={styles.offers}>
      <div className={styles.cupons}>
        {cupons.map((cupon) => (
          <div className={styles.cuponCard} key={cupon._id}>
            <div className={styles.cuponHeader}>
              <Image src={cupon.image} alt="cupon" width={270} height={200} />
            </div>

            <div className={styles.cuponInfo}>
              <h4 className={styles.cuponCode}>{cupon.code}</h4>
              <button className={styles.cuponButton}>Copy</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Offers;
