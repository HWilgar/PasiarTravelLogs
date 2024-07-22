import React, {useContext, useEffect, useState} from 'react';
import {APIProvider, AdvancedMarker, ControlPosition, Map, MapMouseEvent, Marker} from '@vis.gl/react-google-maps';
import MyContext from "../../MyContext";
import {CustomMapControl} from './map-autocomplete/map-control';
import MapHandler from './map-autocomplete/map-handler';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { validateField } from './AddCollection';
import CloseIcon from '@mui/icons-material/Close';

type UpdateDesProps = {
  handleClose: (v: boolean) => void;
  desId: string;
}

const API_KEY = process.env.REACT_APP_API_KEY;

const UpdateDestination = ({ handleClose, desId }: UpdateDesProps) => {
  const { user, trip } = useContext(MyContext);
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [markerPosition, setMarkerPosition] = useState<number[]>([0,0]);
  const [desNameField, setDesNameField] = useState<string>("");
  const [ error, setError ]  = useState("");
  const [ isFormValid, setIsFormValid ] = useState(true);
  const [ success, setSuccess ] = useState("");

  const handleSelectPlace = (event: MapMouseEvent) => {
    const lat = event?.detail?.latLng?.lat;
    const lng = event?.detail?.latLng?.lng;
    if(lat && lng) setMarkerPosition([lat, lng]);
  }

  const handleDragMarker = (e: { latLng: { lat: () => any; lng: () => any; }; }) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setMarkerPosition([lat, lng]);
  }

  useEffect(() => {
    (async () => {
      const { data : { data } } = await axios.get(`https://pasiar-travel-logs-api.vercel.app/api/v1/destinations/${desId}`, { headers: { Authorization: `Bearer ${user.token}` } });
      setDesNameField(data.name);
      setMarkerPosition([data.location[0], data.location[1]]);
    })();
  },[]);
  
  useEffect(()=> {
    const lat = selectedPlace?.geometry?.location?.lat();
    const lng = selectedPlace?.geometry?.location?.lng();
    if(lat && lng){
      setMarkerPosition([lat, lng]);
    }
    if(selectedPlace?.name){
      setDesNameField(selectedPlace?.name);
    }

  },[selectedPlace]);

  const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setDesNameField(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateField(desNameField, "trip", setError);

    if (!isFormValid) {
      return; 
      }

    const newDestination = await axios.patch(
      `https://pasiar-travel-logs-api.vercel.app/api/v1/destinations/${desId}`,
      {name: desNameField, location: markerPosition},
      { headers: { Authorization: `Bearer ${user.token}` } 
    });

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
  }}>
  <Box
    sx={{
      position: "absolute",
      top: "10px",
      right: "10px",
      gap: "10px"
    }}>
    <Button sx={{minWidth: 0, padding: 0}} onClick={() =>handleClose(false)}><CloseIcon/></Button>
  </Box>
  {
    markerPosition[0] &&
    <>
    <APIProvider apiKey={API_KEY}>
    <Map
      defaultZoom={12}
      defaultCenter={{lat: markerPosition[0], lng: markerPosition[1]}}
      mapId='44308dee98f455be'
      gestureHandling={'greedy'}
      disableDefaultUI={true}
      onClick={handleSelectPlace}
      mapTypeControl={false}>
      {markerPosition && <AdvancedMarker position={{lat: markerPosition[0], lng: markerPosition[1]}}/>}
    </Map>

    <CustomMapControl
      controlPosition={ControlPosition.TOP}
      onPlaceSelect={setSelectedPlace}
    />

    <MapHandler place={selectedPlace} />
  </APIProvider>

  <Stack component="form" onSubmit={ (e)=>{
    handleSubmit(e);
    }}>
    <TextField 
      value={desNameField} 
      onChange={handleInputChange} 
      label="Destination Name"
      size="small"
      onBlur={(e)=> validateField(e.target.value, "trip", setError)}
      ></TextField>
    <Typography
      sx={{
        fontSize: "0.7rem",
        color: "#EF5350",
        width: "100%",
        textAlign: "right"
      }}
    >{error}</Typography>
    <Button variant="contained" type="submit">
      Update Destination
    </Button>
    <Typography
    sx={{
      fontSize: "0.7rem",
      color: "green",
    }}
  >{success}</Typography>
  </Stack>
  </>
    }
    {!markerPosition[0] &&
      <Typography>Loading ...</Typography>
    }
  </Stack>
);
}

export default UpdateDestination;