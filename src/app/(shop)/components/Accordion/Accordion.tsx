"use client"
import React, { useState } from "react";
import Image from "next/image";
import accordion from '../../../../../public/datas/accordion.json'
import styles from './accordion.module.css'

const Accordion: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index:any) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className={styles.accordion}>
      {accordion.map((item, index) => (
        <div className={styles.accordionContainer} key={index}>

          <div className={`${styles.accordionItem} ${index === activeIndex ? styles.active : ""}`}
            onClick={() => handleClick(index)} >
              <div className={styles.accordionTitle}>
                <Image src={item.image} alt={item.title} width={20} height={20} />
                <span>{item.title}</span>
              </div>
              <Image src="/icons/arrow-down.svg" alt="arrow-down" width={8} height={8} />
          </div>

          {index === activeIndex && (
            <div className={styles.accordionContent}>
              {item.contents.map((content, index) => (
                <p key={index}>{content}</p>
              ))}
            </div>
          )}
        </div>
      ))}
    </section>
  );
}


export default Accordion;