import Image from 'next/image'
import Link from 'next/link'
import styles from './guarantee.module.css'

const Guarantee: React.FC = () => {
  return (
    <section className={styles.guarantee} >

      <div className={styles.guaranteeCard}>

        <div className={styles.guaranteeHeader}>
          <Link href={'/'}>
            <h3>100 % FORNØYD ELLER PENGENE TILBAKE</h3>
          </Link>
        </div>

        <div className={styles.guaranteeBody}>
          <Image src="/images/guarantee.webp" alt="guarantee" width={1024} height={384} />
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