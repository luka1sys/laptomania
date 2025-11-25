
import { useState } from "react"
export const UseForm = (initValues)=>{
    const [formData, setFormData] = useState({});

    const handleChange = (e) =>{
        const {name,value} = e.target;
        setFormData(prev =>({...prev,[name]:value}))

    }
    return [formData,handleChange]
}