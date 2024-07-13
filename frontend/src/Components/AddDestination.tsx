import React, {useContext, useEffect, useState} from 'react';
import {APIProvider, AdvancedMarker, ControlPosition, Map, MapMouseEvent, Marker} from '@vis.gl/react-google-maps';
import MyContext from "../../MyContext";
import {CustomMapControl} from './map-autocomplete/map-control';
import MapHandler from './map-autocomplete/map-handler';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { validateField } from './AddCollection';
import CloseIcon from '@mui/icons-material/Close';

type AddDesProps = {
  handleClose: (v: boolean) => void;
  fetchTrips: () => void;
}

const AddDestination = ({ handleClose, fetchTrips }: AddDesProps) => {
  const { user, trip } = useContext(MyContext);
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [markerPosition, setMarkerPosition] = useState<number[]>([0,0]);
  const [desNameField, setDesNameField] = useState<string>("");
  const [ displayMarker, setDisplayMarker ] = useState(false);
  const [ error, setError ]  = useState("");
  const [ isFormValid, setIsFormValid ] = useState(true);
  const [ success, setSuccess ] = useState("");
  const [API_KEY, setAPI_KEY] = useState("");

  const handleSelectPlace = (event: MapMouseEvent) => {
    const lat = event?.detail?.latLng?.lat;
    const lng = event?.detail?.latLng?.lng;
    if(lat && lng) setMarkerPosition([lat, lng]);
  }

  useEffect(() => {
    if(process.env.API_KEY){
      setAPI_KEY(process.env.API_KEY);
    }
 }, []);

  useEffect(()=> {
    const lat = selectedPlace?.geometry?.location?.lat();
    const lng = selectedPlace?.geometry?.location?.lng();

    if(lat && lng){
      setMarkerPosition([lat, lng]);
    }
    if(selectedPlace?.name){
      setDesNameField(selectedPlace?.name);
    }

    setDisplayMarker(true);
  },[selectedPlace]);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDesNameField(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateField(desNameField, "trip", setError);

    if (!isFormValid || (!markerPosition[0] && !markerPosition[1])) {
    return; 
    }

    const newDestination = await axios.post(
      `https://pasiartravellogs-api.onrender.com/api/v1/trips/${trip._id}/destinations`,
      {name: desNameField, location: markerPosition, visited: false},
      { headers: { Authorization: `Bearer ${user}` } });
  
    setSuccess("Updated Successfully");
    setTimeout(() => {
      setSuccess("");
    }, 1000);

    handleClose(false);
  }

  useEffect(() => {
    if (desNameField) {
        setIsFormValid(error == '');
      } else {
        setIsFormValid(false);
      }
    }, [desNameField, error]);

return (
  <Stack
  sx={{
    width: "100%",
    height: "75vh",
    zIndex: 100,
    gap: "10px"
  }}
>
  <Box
    sx={{
      position: "absolute",
      top: "10px",
      right: "10px"
    }}>
    <Button sx={{minWidth: 0, padding: 0}} onClick={() =>handleClose(false)}><CloseIcon/></Button>
  </Box>

  <APIProvider apiKey={API_KEY}>
    <Map
      defaultZoom={12}
      defaultCenter={{lat: 16.4124, lng: 120.5930}}
      mapId='44308dee98f455be'
      gestureHandling={'greedy'}
      onClick={handleSelectPlace}
      mapTypeControl={false}
    >
      {displayMarker && <AdvancedMarker position={{lat: markerPosition[0], lng: markerPosition[1]}}/>}
    </Map>

    <CustomMapControl
      controlPosition={ControlPosition.TOP}
      onPlaceSelect={setSelectedPlace}
    />

    <MapHandler place={selectedPlace} />
  </APIProvider>

  <Stack component="form" onSubmit={(e) => {
    handleSubmit(e)
    fetchTrips()
    }} gap="10px">
    <TextField 
      value={desNameField} 
      onChange={(e)=>handleInputChange(e)} 
      label="New Destination" 
      size="small"
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
    
    <Button variant="contained" type="submit">
      Add Destination
    </Button>
    <Typography
    sx={{
      fontSize: "0.7rem",
      color: "green",
    }}
  >{success}</Typography>
  </Stack>
  </Stack>
);
}

export default AddDestination;