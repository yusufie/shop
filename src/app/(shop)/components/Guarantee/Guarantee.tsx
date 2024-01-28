import Image from 'next/image'
import Link from 'next/link'
import styles from './guarantee.module.css'

const Guarantee: React.FC = () => {
  return (
    <section className={styles.guarantee} >

      <div className={styles.guaranteeBody}>

        <div className={styles.guaranteeHeader}>
          <Link href={'/'}>
            <h3>100 % FORNØYD ELLER PENGENE TILBAKE</h3>
          </Link>
        </div>

        <div className={styles.guaranteeCards}>

          <div className={styles.guaranteeCard}>
            <Image src="/images/guarantee-1.png" alt="guarantee" width={125} height={80} />
            <span className={styles.cardText}>Grand Bazaar - Norges storste utvalg av matvarer</span>
          </div>

          <div className={styles.guaranteeCard}>
            <Image src="/images/guarantee-2.png" alt="guarantee" width={125} height={80} />
            <span className={styles.cardText}>Alltid ferskest</span>
          </div>

          <div className={styles.guaranteeCard}>
            <Image src="/images/guarantee-3.png" alt="guarantee" width={125} height={80} />
            <span className={styles.cardText}>Vare beste priser</span>
          </div>

          <div className={styles.guaranteeCard}>
            <Image src="/images/guarantee-4.png" alt="guarantee" width={125} height={80} />
            <span className={styles.cardText}>Alltid punktlig</span>
          </div>

        </div>

        <div className={styles.guaranteeFooter} >
          <p className={styles.customParagraph}>
              Finn din&nbsp; 
              <Link href="/">
                nærmeste butikk
              </Link>
              &nbsp;eller få maten levert&nbsp;
              <Link href="/">hjem</Link>!
          </p>
        </div>

      </div>

    </section>
  )
}

export default Guarantee