import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Container, List, ListItem, Stack, TextField, Typography } from "@mui/material";
import MyContext from "../../MyContext";
import axios from "axios";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import UpdateDesName from "./../Components/UpdateDesName";
import { validateField } from "./AddCollection";
import CloseIcon from '@mui/icons-material/Close';
import { Destination } from "../propTypes/propTypes";

type ManageCollectionProps = {
  handleClose: (v: boolean) => void;
  updateDestination: () => void;
  date: string;
  fetchTrips: () => void;
}

const ManageCollection = ({ handleClose, updateDestination, date, fetchTrips }: ManageCollectionProps) => {
  const { user, trip } = useContext(MyContext);
  const [ tripName, setTripName] = useState(trip.name);
  const [ destinations, setDestinations] = useState([]);
  const [ destIdToDelete, setDesToDelete ] = useState([]);
  const [ tripSched, setTripSched] = useState<Date | null>(new Date());
  const [ updatedDesList, setUpdatedDesList ] = useState([]);
  const [ error, setError ]  = useState("");
  const [ isFormValid, setIsFormValid ] = useState(true);
  const [ success, setSuccess ] = useState("");
  const [ desError, setDesError ] = useState([]);
  
  useEffect(()=> {
    (async () => {
      const  { data: { data } } = await axios.get(`https://pasiar-travel-logs-api.vercel.app/api/v1/trips/destinations/${trip._id}`, { headers: {Authorization: `Bearer ${user.token}`}});

      setDestinations(data);
      setUpdatedDesList(data);
      setDesToDelete([]);
    })();
  }, [])

  const handleDesDelete = (desId) => {
    const updateDestination = destinations.filter((destination) => destination._id !== desId);

    const isIdPresent = updatedDesList.some((destination)=> destination._id == desId);
    if(isIdPresent){
      const filterDesError = desError.filter((des)=> des !== desId);
    setDesError(filterDesError);
    }
    const updateDestinationCopy = updatedDesList.filter((destination) => destination._id !== desId);
    
    setUpdatedDesList(updateDestinationCopy);
    setDestinations(updateDestination);
    destIdToDelete.push(desId);
  }

 const handleSubmitUpdate = async (e) => {
  e.preventDefault();
  validateField(tripName, "trip", setError);

  if (!isFormValid || desError.length) {
  return; 
  }

  const UpdatedTrip = await axios.patch(
    `https://pasiar-travel-logs-api.vercel.app/api/v1/trips/${trip._id}`,
    {name: tripName, date: tripSched},
    { headers: { Authorization: `Bearer ${user.token}` } });

    if (updatedDesList !== destinations){
      try {
        for ( const destination of updatedDesList) {
          const updateDesInfo = await axios.patch(`https://pasiar-travel-logs-api.vercel.app/api/v1/destinations/${destination._id}`, {name: destination.name}, { headers: { Authorization: `Bearer ${user.token}`}});
        }
      } catch (error) {
        console.error('Error updating.', error);
      }
    }

    if (destIdToDelete){
      try {
        for (const destinationId of destIdToDelete) {
          const updateDesList = await axios.delete(`https://pasiar-travel-logs-api.vercel.app/api/v1/destinations/${destinationId}`, {headers: {Authorization: `Bearer ${user.token}`}});
        }
      } catch (error) {
        console.error('Error deleting destinations:', error);
      }
    }
    fetchTrips();
    updateDestination();
    setSuccess("Updated Successfully");
    setTimeout(() => {
      setSuccess("");
    }, 1000);
 }

  const handleOnChange = (date: Date | null) => {
    if (date !== null) {
      setTripSched(date);
    }
  }

  const handleSelectedDes = (desName, desId) => {
    const updatedList = updatedDesList.map((des) => {
      if(des._id === desId){
        return {... des, name: desName}
      }
      return des;
    })
    setUpdatedDesList(updatedList);
  }

  useEffect(() => {
    if (tripName) {
        setIsFormValid(error == '' && !Boolean(desError.length));
      } else {
        setIsFormValid(false);
      }
    }, [tripName, error, desError]);

  return (
    <Container>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack component="form" sx={{textAlign: "left", gap: "15px"}} 
        onSubmit={(e) => {
          handleSubmitUpdate(e);
          }}>
          <Box
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px"
            }}>
            <Button sx={{minWidth: 0, padding: 0}} onClick={() =>handleClose(false)}><CloseIcon/></Button>
          </Box>
          <Stack 
            sx={{ 
              width:"100%", 
              flexDirection: "row", 
              justifyContent:"space-between", 
              alignItems: "center"
            }}>
            <Typography variant="h6">MANAGE TRIP</Typography>
            <Typography
              sx={{
                fontSize: "0.7rem",
                color: "green",
              }}
            >{success}</Typography>
          </Stack>

          <TextField
              label="Trip"
              type="text"
              variant="standard"
              value={tripName}
              onChange={(e)=>setTripName(e.target.value)}
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

            <Stack>
              <Typography sx={{fontWeight: "bold"}}>DESTINATIONS:</Typography>
              <List sx={{padding:0}}>
                {
                  destinations.map((destination) => (
                    <ListItem key={destination.name} sx={{padding: "2px 4px"}}>
                      <UpdateDesName  
                        desError={desError}
                        setDesError={setDesError}
                        destination={destination}
                        handleDesDelete={handleDesDelete}
                        handleSelectedDes={handleSelectedDes}
                      />
                    </ListItem>
                  ))
                }
              </List>
            </Stack>
            <Stack flexDirection="row" gap="8px">
              <Button variant="contained" sx={{width: "100%"}} type="submit">Update</Button>
            </Stack>
        </Stack>
      </LocalizationProvider>  
    </Container>
  )
}

export default ManageCollection;