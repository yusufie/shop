import Image from "next/image";
import styles from "./CategoryForm.module.css";

interface DatabaseEntry {
  _id: string;
  title: string;
  description: string;
  slug: string;
  status: string;
  isActive: boolean;
  products: any[];
  coverImage: string;
  parent: string;
}

// data as props
interface CategoryFormProps {
  categoriesData: DatabaseEntry[];
}

const CategoryForm: React.FC<CategoryFormProps> = ({categoriesData}) => {

  // console.log("hey hey:", categoriesData)

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

        <div className={styles.descriptionInputs}>

          <div className={styles.titleField}>
              <label htmlFor="title">Title</label>
              <select name="title" id="title" className={styles.titleSelect}>
                <option value="">Select Title</option>
                {categoriesData.map((category) => (
                  <option key={category._id} value={category.title}>
                    {category.title}
                  </option>
                ))}
              </select>
          </div>

          <div className={styles.slugField}>
            <label htmlFor="slug">Slug</label>
            <input type="text" className={styles.slugInput}  />
          </div>

          <div className={styles.detailsField}>
            <label htmlFor="details">Details</label>
            <textarea name="details" id="details" className={styles.detailsTextarea}></textarea>
          </div>

          <div className={styles.iconField}>
            <label htmlFor="status">Status</label>
            <select name="status" id="status" className={styles.iconSelect}>
              <option value="status">Select Status</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div className={styles.typesField}>
            <label htmlFor="isActive">isActive</label>
            <select name="isActive" id="isActive" className={styles.typesSelect}>
              <option value="isActive">Select</option>
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </div>

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