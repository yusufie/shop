import React from 'react'
import Image from 'next/image'
import styles from './middlebar.module.css'

const Middlebar: React.FC = () => {
  return (
    <section className={styles.middlebar}>
        <button>
          <Image src={'/icons/equalizer.svg'} width={18} height={18} alt="filter" />
          <span>Filter</span>
        </button>

        <button>
          <span>Grocery</span>
        </button>
    </section>
  )
}

export default Middlebar