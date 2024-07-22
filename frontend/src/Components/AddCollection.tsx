import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Container, List, ListItem, Stack, TextField, Typography, styled } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import axios from "axios";
import MyContext from "../../MyContext";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { validateInput, validatePassword } from "./validators/Validators";
import CloseIcon from '@mui/icons-material/Close';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const validateField = (input: string, field: string, setError: (v: string)=> void) =>{
  if (validateInput(input)) {
    if (field === 'trip' && !validatePassword(input)) {
      setError('Must be 2 or more characters.');
    } else{
      setError('');
    }
  }else{
    setError('This field is required.');
  }
};

const AddCollection = ({ handleClose}: {handleClose: (v: boolean) => void} ) => {
  const { user } = useContext(MyContext);
  const [ tripName, setTripName ] = useState("");
  const [ tripSched, setTripSched ] = useState<Date | null>(new Date());
  const [ imageFile, setImageFile ] = useState<any | null>({});
  const [ hasImage, setHasImage ] = useState(false);
  const [ error, setError ]  = useState("");
  const [ isFormValid, setIsFormValid ] = useState(true);
  const [ isSaving, setIsSaving ] = useState(false);

  const handleOnChange = (date: Date | null) => {
      if (date !== null) {
        setTripSched(date);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateField(tripName, "trip", setError);

    if (!isFormValid) {
    return; 
    }

    const stringDate = tripSched ? tripSched.toISOString() : "";

    if(hasImage){
      setIsSaving(true);
      const data = new FormData();
      data.append("name", tripName);
      data.append("date", stringDate);
      data.append("image", imageFile);

      await axios.post(
        "https://pasiar-travel-logs-api.vercel.app/api/v1/trips",
        data,
        { headers: { Authorization: `Bearer ${user.token}` } });

      setImageFile({});
    } else {
      await axios.post(
        "https://pasiar-travel-logs-api.vercel.app/api/v1/trips",
        {name: tripName, date: stringDate},
        { headers: { Authorization: `Bearer ${user.token}` } });
    }
    setIsSaving(false);
    setHasImage(false);
    handleClose(false);
  }

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | null = e.target.files ? e.target.files[0] : null;
    if(file){
      setImageFile(file);
      setHasImage(true);
    }
  }

  useEffect(() => {
  if (tripName) {
      setIsFormValid(error == '');
    } else {
      setIsFormValid(false);
    }
  }, [tripName, error]);

  return (
    <Container>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack component="form" sx={{textAlign: "left", gap: "15px"}} onSubmit={(e)=>{
          handleSubmit(e);
          }}>
          <Box
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px"
            }}>
            <Button sx={{minWidth: 0, padding: 0}} onClick={() =>handleClose(false)}><CloseIcon/></Button>
          </Box>
          <Typography variant="h6">MANAGE TRIP</Typography>

          <TextField
              label="Trip's Name"
              type="text"
              variant="standard"
              value={tripName}
              onChange={(e)=> setTripName(e.target.value)}
              onBlur={(e)=> validateField(e.target.value, "trip", setError)}
            />

          <Typography
            sx={{
              fontSize: "0.7rem",
              color: "#EF5350",
              width: "100%",
              textAlign: "right"
            }}
          >{error}</Typography>

          <DatePicker 
            label= "Schedule"
            value= {tripSched}
            onChange={(newDate) => handleOnChange(newDate)}
          />

          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput type="file"
            onChange={(e)=> handleImageFile(e)}/>
          </Button>
          {
            imageFile.name !== undefined &&
            <Typography sx={{fontSize: "0.8rem", textAlign: "center"}}>{imageFile.name}</Typography>
          }
          <Stack flexDirection="row" gap="8px">
            <Button variant="outlined" sx={{width: "100%"}} onClick={() =>handleClose(false)}>Cancel</Button>
              {
                isSaving ?
                <Button type="submit" variant="contained" sx={{width: "100%", pointerEvents: 'none',
                  opacity: 0.8,}}>Saving...</Button> :
                <Button type="submit" variant="contained" sx={{width: "100%"}}>Save</Button>
              }
          </Stack>
            
        </Stack>
        </LocalizationProvider>
    </Container>
  )
}

export default AddCollection;