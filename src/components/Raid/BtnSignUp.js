import React from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
export default function BtnSignUp(props){
    const navigate = useNavigate();
    function PageMove(obj,e){
        console.log(obj);
        navigate(obj.path);
     }
     return(
        <Button variant="contained" onClick={(e)=>{PageMove(props,e)}}>Contained</Button>
     )
}