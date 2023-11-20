import Image from 'next/image'
import styles from './contact.module.css'

const Contact: React.FC = () => {
  return (
    <section className={styles.contact}>

        <div className={styles.contactInfo}>
            <Image src="/icons/contact.svg" alt="contact" width={344} height={266} />
            <div className={styles.contactAddress}>
                <h4>Address</h4>
                <span>NY, United States</span>
            </div>

            <div className={styles.contactPhone}>
                <h4>Phone</h4>
                <span>+123456789</span>
            </div>

            <div className={styles.contactWebsite}>
                <h4>Website</h4>
                <div className={styles.websiteLink}>
                    <span>www.website.com</span>
                    <span>Visit This Site</span>
                </div>
            </div>

            <div className={styles.contactSocial}>
                <h4>Follow Us</h4>
                <div className={styles.socialLinks}>
                    <Image src="/icons/facebook.svg" alt="facebook" width={16} height={16} />
                    <Image src="/icons/twitter.svg" alt="twitter" width={16} height={16} />
                </div>
            </div>
        </div>

        <div className={styles.contactDiv}>

            <form className={styles.contactForm}>
                <h1 className={styles.contactTitle}>Questions, Comments, Or Concerns?</h1>

                <div className={styles.nameEmail}>
                    <div className={styles.nameField}>
                        <label htmlFor="name">Name</label>
                        <input type="text"  className={styles.nameInput}/>
                    </div>

                    <div className={styles.emailField}>
                        <label htmlFor="email">Email</label>
                        <input type="text"  className={styles.emailInput}/>
                    </div>
                </div>

                <div className={styles.subjectField}>
                    <label htmlFor="subject">Subject</label>
                    <input type="text"  className={styles.subjectInput}/>
                </div>

                <div className={styles.descriptionField}>
                    <label htmlFor="description">Description</label>
                    <textarea name="description" className={styles.descriptionTextarea}></textarea>
                </div>

                <button className={styles.submitButton}>Submit</button>

            </form>
            
        </div>
        
    </section>
  )
}

export default Contact