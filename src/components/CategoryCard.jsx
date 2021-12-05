import React from "react";
import { withRouter } from "react-router";
import Image from '../assets/images/image1.jpg';

const CategoryCard = ({id,title, history}) => {
  return (
    <div className="image" style={{cursor:"pointer"}} onClick={() => {
      history.push(`/category/${id}`);
    }}>
    <img className="image__img" src={Image} alt="Bricks"/>
     <p className="title">{title}</p>
    <div className="image__overlay image__overlay--primary">
        <div className="image__title">{title}</div>  
        <p className="image__description">
            we have a discount here.
        </p>     
    </div>
   </div>
  );
 };

export default withRouter(CategoryCard);