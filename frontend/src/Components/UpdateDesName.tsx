import React, { useEffect, useState } from "react";
import { Stack, TextField, Button, Typography } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { validateField } from "./AddCollection";
import { Destination } from "../propTypes/propTypes";

type DesNameProps = {
  desError: Array<string>;
  setDesError: (v: string[]) => void;
  destination: Destination;
  handleDesDelete: (v: string) => void;
  handleSelectedDes: (desName: string, desId: string) => void;
}

const UpdateDesName = ({ desError, setDesError, destination, handleDesDelete, handleSelectedDes }: DesNameProps) => {
  const [ desName, setDesName ] = useState(destination.name);
  const [ error, setError ] = useState("");

  const handleDesName = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDesName(e.target.value)
    handleSelectedDes(e.target.value, destination._id);
  }

 useEffect(()=>{
  if(error !== ""){
    setDesError([...desError, destination._id]);
  } else {
    const filterDesError = desError.filter((des)=> des !== destination._id);
    setDesError(filterDesError);
  }
 },[error])


  return(
    <Stack sx={{width: "100%"}}>
      <Stack sx={{ flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center"}}>
        <TextField 
        value={desName} 
        sx={{width:"100%"}} 
        size= "small" 
        variant="filled" 
        onChange={(e)=>handleDesName(e)}
        onBlur={(e)=> {
          validateField(e.target.value, "destination", setError)
        }}
        />
        < Button size= "small" sx={{minWidth: 0 }} color="error" onClick={()=>handleDesDelete(destination._id)}><DeleteOutlineIcon/></Button>
      </Stack>
      <Typography
      sx={{
        fontSize: "0.7rem",
        color: "#EF5350",
        width: "100%",
        textAlign: "right"
      }}
    >{error}</Typography>
    </Stack>
  )
}

export default UpdateDesName;