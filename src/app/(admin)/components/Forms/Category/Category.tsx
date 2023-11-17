import Image from "next/image";
import styles from "./Category.module.css";

const CategoryForm: React.FC = () => {

  return (
    <section className={styles.category}>
      <h1 className={styles.categoryTitle}>Create New Category</h1>

      <form className={styles.categoryForm}>

        <div className={styles.categoryImage}>

          <div className={styles.uploadInfo}>
            <h2>Image</h2>
            <p>Upload image</p>            
          </div>

          <div className={styles.upload}>
            <input type="file" className={styles.customFileinput} />
            <div className={styles.image}>
            <Image src="/icons/upload.svg" alt="upload" width={40} height={30} />
              <p><span>Upload an image</span> or drag and drop PNG, JPG</p>
            </div>
          </div>

        </div>

        <div className={styles.categoryDescription}>

          <div className={styles.categoryInfo}>
            <h2>Description</h2>
            <p>Add your category details and necessary information from here</p>        
          </div>

          <div className={styles.categoryField}>
            <label htmlFor="name">Name</label>
            <input type="text"  className={styles.categoryInput}/>
            <label htmlFor="slug">Slug</label>
            <input type="text"  className={styles.categoryInput}/>
            <textarea name="details" id="details" ></textarea>
            <label htmlFor="icon">Select Icon</label>

            <select name="icon" id="icon">
              <option value="icon">Icon</option>
            </select>

            <label htmlFor="types">Types</label>
            <select name="types" id="types">
              <option value="types">Types</option>
            </select>

            <label htmlFor="parent">Parent Category</label>
            <select name="parent" id="parent">
              <option value="parent">Parent Category</option>
            </select>
          </div>
          
        </div>

        <button className={styles.categoryButton}>
          Add Category
        </button>

      </form>

    </section>
  )
}

export default CategoryForm