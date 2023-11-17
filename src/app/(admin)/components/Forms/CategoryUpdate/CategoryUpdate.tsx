"use client";
import { useUserStore } from "@/stores/userStore";
import { useForm } from "react-hook-form";
import Image from "next/image";
import styles from './CategoryUpdate.module.css'

interface FormInputs {
  title: string;
  slug: string;
}

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
interface UpdateFormProps {
  categoryData: DatabaseEntry[];
}

const CategoryUpdate: React.FC<UpdateFormProps> = ({categoryData}) => {

  const accessToken = useUserStore((state) => state.accessToken);
  console.log("accessToken:", accessToken);

  return (
    <section className={styles.categoryUpdate}>
        <h1 className={styles.categoryTitle}>Edit Category</h1>
        <form className={styles.categoryForm}>
        <div className={styles.categoryImage}>
          <div className={styles.uploadInfo}>
            <h4 className={styles.uploadTitle}>Image</h4>
            <p>Upload your category image here</p>
          </div>

          <div className={styles.upload}>
            <input type="file" className={styles.customFileinput} />
            <div className={styles.image}>
              <Image
                src="/icons/upload.svg"
                alt="upload"
                width={40}
                height={30}
              />
              <p>
                <span>Upload an image</span> or drag and drop PNG, JPG
              </p>
            </div>
          </div>
        </div>

        <div className={styles.categoryDescription}>
          <div className={styles.categoryInfo}>
            <h4 className={styles.descriptionTitle}>Description</h4>
            <p>Edit your category details and necessary information from here</p>
          </div>

          <div className={styles.descriptionInputs}>
            <div className={styles.titleField}>
              <label htmlFor="title">Title</label>
              <select
                // {...register("title")}
                id="title"
                className={styles.titleSelect}
              >
                <option value="">Select Title</option>
                {/* {categoryData.map((category) => ( */}
                  <option 
                  // key={category._id} 
                  // value={category.title}
                  >
                    {/* {category.title} */}
                    Select Title
                  </option>
                {/* ))} */}
              </select>
            </div>

            <div className={styles.slugField}>
              <label htmlFor="slug">Slug</label>
              <input
                // {...register("slug")}
                type="text"
                className={styles.slugInput}
              />
            </div>

            {/*           <div className={styles.detailsField}>
            <label htmlFor="details">Details</label>
            <textarea name="details" id="details" className={styles.detailsTextarea}></textarea>
          </div> */}

            {/*         <div className={styles.iconField}>
        <label htmlFor="status">Status</label>
              <select {...register('status')} id="status" className={styles.iconSelect}>
                <option value="status">Select Status</option>
                <option value="draft">Draft</option>
              </select>
        </div> */}

            {/*         <div className={styles.typesField}>
        <label htmlFor="isActive">isActive:</label>
          <Controller
            name="isActive"
            control={control}
            defaultValue={true}
            render={({ field }) => (
              <select {...field} id="isActive">
                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>
            )}
          />
        </div> */}
          </div>
        </div>

        <button className={styles.categoryButton} type="submit">
          Update Category
        </button>
      </form>
    </section>
  )
}

export default CategoryUpdate