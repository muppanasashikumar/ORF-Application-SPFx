/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import commonStyles from "../styles/Common.module.scss";
import checkBoxStyles from "../styles/CheckBox.module.scss";



interface IInputProps {
    title: string;
    checked?: boolean;
    value?:string
    updatefields:any;
    internalName:string;
    cbFunc?:any;
    handleChange?:any;
    ariallabel?: string;
    formDisable?:boolean
}

const CheckBox = ({title,value, checked, internalName, formDisable,updatefields,cbFunc,handleChange,ariallabel
 }: IInputProps) => {
  return (internalName==="BA_SameAS_PA"?
     (
        <div className='d-flex align-items-center gap-2'>
                  <input
                    id={title}
                    className={checkBoxStyles.checkBox}
                    type="checkbox"
                    //value={value}
                    checked={checked}
                    title={ariallabel}
                    onChange={(e)=>{cbFunc(e.target.checked)}}
                    disabled={formDisable?formDisable:false}
                  />
                  <label htmlFor={title} className={commonStyles.label}>
                    {title}
                  </label>
        </div>
      ):
       (
        <div className='d-flex align-items-center gap-2'>
                  <input
                    id={title}
                    className={checkBoxStyles.checkBox}
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange}
                    aria-label={ariallabel}
                    disabled={formDisable?formDisable:false}
                   // onChange={(e:any)=>updatefields(internalName,e.target.value)}
                  />
                  <label htmlFor={title} className={commonStyles.label}>
                    {title}
                  </label>
        </div>
      ))
}

export default CheckBox