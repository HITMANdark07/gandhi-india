import React from "react";
import Image from '../assets/images/image1.jpg';

const CategoryCard = () => {
  return (
    <div className="image">
    <img className="image__img" src={Image} alt="Bricks"/>
     <p className="title">Men's wear</p>
    <div className="image__overlay image__overlay--primary">
        <div className="image__title">Men's wear</div>  
        <p className="image__description">
            we have a discount here.
        </p>     
    </div>
   </div>
  );
 };

export default CategoryCard;