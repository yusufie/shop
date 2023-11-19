"use client";
import React, { useState } from 'react';
import Image from 'next/image'
import styles from './faq.module.css'

const Faq: React.FC = () => {

  const [expandedAccordions, setExpandedAccordions] = useState<number[]>([]);

  const handleAccordionClick = (index: number) => {
    if (expandedAccordions.includes(index)) {
      setExpandedAccordions(expandedAccordions.filter(item => item !== index));
    } else {
      setExpandedAccordions([...expandedAccordions, index]);
    }
  };

  const isAccordionExpanded = (index: number) => {
    return expandedAccordions.includes(index);
  };

  const faqData = [
    {
      question: "How to contact with Customer Service?",
      answer: "Our Customer Experience Team is available 7 days a week and we offer 2 ways to get in contact: Email and Chat. We try to reply quickly, so you need not to wait too long for a response!."
    },
    {
      question: "App installation failed, how to update system information?",
      answer: "Please read the documentation carefully. We also have some online video tutorials regarding this issue. If the problem remains, please open a ticket in the support forum."
    },
    {
      question: "Website response taking time, how to improve?",
      answer: "At first, please check your internet connection. We also have some online video tutorials regarding this issue. If the problem remains, please open a ticket in the support forum."
    },
    {
      question: "How do I create an account?",
      answer: "If you want to open an account for personal use you can do it over the phone or online. Opening an account online should only take a few minutes."
    }
  ];

  return (
    <section className={styles.faq}>

        <div className={styles.faqHeader}>
          <h1>FAQ</h1>
        </div>

        <div className={styles.faqBody}>
        {faqData.map((faq, index) => (
          <div
            key={index}
            className={`${styles.faqAccordion} ${isAccordionExpanded(index) ? styles.expanded : ''}`}
            onClick={() => handleAccordionClick(index)}
            onKeyDown={() => handleAccordionClick(index)}
          >
            <div className={styles.accordionHeader}>
              <h5 className={styles.accordionTitle}>{faq.question}</h5>
              <Image src={`/icons/${isAccordionExpanded(index) ? 'minus' : 'plus'}.svg`} width={12} height={12} alt={"icon"} />
            </div>
            {isAccordionExpanded(index) && (
              <div className={styles.additionalContent}>
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
        
    </section>
  )
}

export default Faq