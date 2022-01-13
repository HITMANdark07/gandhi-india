import React from "react";
import { withRouter } from "react-router";
import { API } from "../config";

const CategoryCard = ({id,title,slug, history}) => {
  return (
    <div className="image" style={{cursor:"pointer"}} onClick={() => {
      history.push(`/category/${slug}`);
    }}>
    <img className="image__img" src={`${API}/category/photo/${id}`} alt="Bricks"/>
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