"use client"
import React, { useState } from 'react'
import styles from '@/app/(admin)/components/Category/Category.module.css';

const Category = () => {
    const [selectedOption, setSelectedOption] = useState("option1");
    const [isFocused, setIsFocused] = useState(false)

  const handleSelectChange = (event:any) => {
    setSelectedOption(event.target.value);
};
  const handleInputFocus =()=>{
      setIsFocused(true);
  }
  const handleInputBlur =()=>{
    setIsFocused(false);
}

const [isChecked, setIsChecked] = useState(false);
 const handleCheckboxChange = () => {
   setIsChecked(!isChecked);
 };

  return (
    <>   
    <div className={styles.topcontainer}>

   
      <div  className={styles.container} >
     <div style={{
      color:"#161F6A",
      fontWeight:"bold"
     }} >
      Category
     </div>
    <div>
      <select className={styles.select} value={selectedOption} onChange={handleSelectChange}>
        <option value="option1">Category Type</option>
        <option value="option2">Grocery</option>
        <option value="option3">Women Cloth</option>
        <option value="option4">Bags</option>
        <option value="option5">Makeup</option>
      </select>
    </div>
    <div>
      <input type="text" id={styles.myInput}    className={isFocused ? styles.focused : ""}    onFocus={handleInputFocus}
          onBlur={handleInputBlur} placeholder='Ex:Search By Name' />
    </div>
   <div>     </div>
    <button className={styles.button} >+ Add Category</button>
    </div>
    <div className={styles.container2} >
               <ul  >
    <li>  <input
        type="checkbox"
        id="myCheckbox"
        name="myCheckbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      /></li>
    <li>ID</li>
    <li>Image</li>
    <li>Time</li>
    <li>Name</li>
    <li>Slug</li>
    <li>Type</li>    
   </ul>
    </div>
     </div>
    </>
  )
}

export default Category