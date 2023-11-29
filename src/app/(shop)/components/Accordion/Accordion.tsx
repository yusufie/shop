import React from "react";
import Image from "next/image";
import styles from './accordion.module.css'

interface AccordionProps {
  categories: any;
}

const Accordion: React.FC<AccordionProps> = ({ categories }) => {

  return (
    <section className={styles.accordion}>
      {categories.categories.map((category:any) => (
        <div className={styles.accordionContainer} key={category._id}>

          <div className={`${styles.accordionItem}`} >

            <div className={styles.accordionTitle}>
              <Image src={category.coverImage} alt={category.title} width={20} height={20} />
              <span>{category.title}</span>
            </div>

            <Image src="/icons/arrow-down.svg" alt="arrow-down" width={8} height={8} />
          </div>
          
        </div>
      ))}
    </section>
  );
};

export default Accordion;