import React from 'react';
import {categories} from "../utils/categories"
import {dummy} from "../utils/materialDummy"
import "../styles/materials.css"
import Material from '../components/Material';

export default function Materials() {
  return (
    <div className="materials-timeline">
    {/* the list of categories */}
      <div className="material-category-sec">
        {categories.map((el,index)=>{
          return(
            <div>
              <span></span>
             <span>{el.title}</span>
            </div>
          )
        })}
      </div>
      {/* the uploaded materials */}
      <Material data={dummy}/>
    </div>
  );
}
