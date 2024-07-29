import React, { useContext, useEffect, useState } from "react";
import { Modal, Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, Container, List, ListItem, Stack, TextField, Typography, useMediaQuery, Tooltip } from "@mui/material";
import { useTheme } from "@mui/material";
import {APIProvider, AdvancedMarker, ControlPosition, Map, Marker, Pin} from '@vis.gl/react-google-maps';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import EditIcon from '@mui/icons-material/Edit';
import ManageCollection from '../Components/ManageCollection';
import AddDestination from "../Components/AddDestination";
import MyContext from "../../MyContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UpdateDestination from "../Components/UpdateDestination";
import DestinationActivity from "../Components/DestinationActivity";
import { format } from "date-fns";
import { convertFieldResponseIntoMuiTextFieldProps } from "@mui/x-date-pickers/internals";
import BeenhereIcon from '@mui/icons-material/Beenhere';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const API_KEY = process.env.REACT_APP_API_KEY;

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  zIndex: 10,
};

const Trip = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const [markerPosition, setMarkerPosition] = useState<number[]>([0,0]);
  const [ destinations, setDestinations ] = useState([]);
  const [ selectedDestination, setSelectedDestination ] = useState({});
  const { tripId } = useParams();
  const navigate = useNavigate();

  const [openAddDesModal, setOpenAddDesModal] = useState(false);
  const handleOpenAddDesModal = () => setOpenAddDesModal(true);
  const handleCloseAddDesModal = () => {
    setOpenAddDesModal(false);
  }

  const [openManageModal, setOpenManageModal] = useState(false);
  const handleOpenManageModal = () => setOpenManageModal(true);
  const handleCloseManageModal = () => setOpenManageModal(false);

  const [openUpdateLocModal, setOpenUpdateLocModal] = useState(false);
  const handleOpenUpdateLocModal = () => setOpenUpdateLocModal(true);
  const handleCloseUpdateLocModal = () => setOpenUpdateLocModal(false);

  const position = {lat: 53.54992, lng: 10.00678};
  const { user, setTrip, trip } = useContext(MyContext);
  const [ tripDate, setTripDate ] = useState("");

  useEffect(() => {
    fetchTrips();
    fetchDestinations();
  }, [openAddDesModal, openManageModal, openUpdateLocModal]);

  const fetchTrips = () => {
    (async () => {
      const { data : { data } } = await axios.get(`https://pasiar-travel-logs-api.vercel.app/api/v1/trips/${tripId}`, { headers: { Authorization: `Bearer ${user.token}` } });
      setTrip(data);

      const dateObject = new Date(data.date);
      const formattedDate = format(dateObject, "MMMM dd, yyyy");
      setTripDate(formattedDate);
    })();
  }

  const fetchDestinations = () => {
    (async () => {
      const { data : { data } } = await axios.get(`https://pasiar-travel-logs-api.vercel.app/api/v1/trips/destinations/${tripId}`, { headers: { Authorization: `Bearer ${user.token}` } });
      const sortDestination = data.sort((a,b) => (a.visited === b.visited? 0 : a.visited ? -1 : 1)).reverse();
      setDestinations(sortDestination);

      if(data[0] !== undefined){
        setMarkerPosition([data[0].location[0], data[0].location[1]])
      }
    })();
  }

  const handleChangeLoc = (desId) => {
  setSelectedDestination(desId);
  handleOpenUpdateLocModal();
  }

  const handleDesStatus = async (des) => {
    const status = !des.visited;

    await axios.patch(`https://pasiar-travel-logs-api.vercel.app/api/v1/destinations/${des._id}`, {visited: status}, { headers:{ Authorization:`Bearer ${user.token}`}} );

    fetchDestinations();
  }

  const handleBackButton = () => {
    navigate("/dashboard");
  }

  return (
    <Container>
      <Stack 
        sx={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
          marginTop: "20px",
        }}
      >
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "start",
            justifyContent: "space-between",
            marginBottom: "5px"
          }}
        >
          <Stack flexDirection="row">
            <Button onClick={handleBackButton} sx={{ padding: "0 3px", minWidth: 0, marginRight: "5px" }}>
              <Tooltip title="Back" placement="top">
                <ArrowBackIosNewIcon />
              </Tooltip>  
            </Button>
            <Stack
              sx={{
                alignItems: "start",
              }}
            >
              <Typography 
                variant="h5"
                sx={{
                  fontWeight: 600,
                }}
              >
                {trip.name}
              </Typography>
              <Typography>{tripDate}</Typography>
            </Stack>
          </Stack>

          <Button onClick={handleOpenManageModal}><EditIcon/> Manage Trip</Button>
        </Stack>
        <Stack
          sx={{
            flexDirection: isMdUp ? 'row-reverse' : 'column',
            gap: "15px"
          }}>
          { markerPosition[0] !== 0 &&
          <Box sx={{width: "100%", height: '400px'}}>
            <APIProvider apiKey={API_KEY}>
                <Map
                style={{width: '100%', minHeight: '400px'}}
                defaultCenter={{lat: markerPosition[0], lng: markerPosition[1]}}
                defaultZoom={9}
                gestureHandling={'greedy'}
                mapId='44308dee98f455be'
                mapTypeControlOptions={{
                  position:ControlPosition.BLOCK_START_INLINE_END
                  
                }}
                fullscreenControlOptions={{
                  position:ControlPosition.RIGHT_TOP
                }}
              >
                { destinations &&
                  destinations.map((destination) => (
                    <AdvancedMarker key={destination._id} position={{lat:destination.location[0], lng:destination.location[1]}}>
                      {
                        destination.visited ? 
                        <Pin
                          background={'#ffab40'}
                          borderColor={'#fb8c00'}
                          glyphColor={'#ef6c00'}
                        /> :
                        <Pin
                          background={'#e65100'}
                          borderColor={'#dd2c00'}
                          glyphColor={'#d50000'}
                        />
                      }
                      </AdvancedMarker>
                  ))
                }          
              </Map>
            </APIProvider>
          </Box>
          }
          <Stack
            sx={{
              marginLeft: isMdUp ? "15px" : "0px",
              marginTop: "10px",
              width: "100%",
              textAlign: "left",
              paddingX: "10px",
              justifyContent: isMdUp ? "start" : "center",
            }}  
          >
            <Stack flexDirection="row" justifyContent="space-between" alignItems="center" sx={{ width: isMdUp ? "100%" : "95%" }}>
              <Typography variant="h6">DESTINATION:</Typography>
              <Button variant="contained" onClick={handleOpenAddDesModal}> Add {isSmUp? "Destination" : ""} </Button>
            </Stack>
            {
              destinations.map((destination) => (
                <Stack 
                  key={destination._id}
                  sx={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    marginTop: "10px"
                  }}
                >
                  <Accordion
                    sx={{
                      marginTop: "10px",
                      width: isMdUp ? "100%" : "95%",
                      boxShadow: '0 4px 8px 0 rgba(14, 13, 25, 0.2)',
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2-content"
                      id="panel2-header"
                    >
                      <Stack sx={{
                        flexDirection: "row",
                        width: "100%",
                        alignItems: "center"
                      }}>
                        <Checkbox sx={{padding: "0 5px"}}
                          icon={<BookmarkBorderIcon sx={{color: '#dd2c00'}}/>}
                          checkedIcon={<BeenhereIcon sx={{color: '#ff9800'}}/>}
                          checked={destination.visited}
                          onClick={(e)=>{
                            handleDesStatus(destination)
                            e.stopPropagation()
                          }}
                        />
                        <Typography variant="h6">{destination.name}</Typography>
                      </Stack>
                    </AccordionSummary>
                    <AccordionDetails sx={{textAlign: "left"}}>
                      <Stack sx={{ flexDirection: "row", justifyContent: "space-between"}}>
                        <Typography sx={{fontWeight: "bold"}}>ACTIVITIES:</Typography>
                        <Button onClick={() => {
                          setSelectedDestination(destination._id)
                          handleChangeLoc(destination._id);
                          }}>
                          <Typography>Edit Location</Typography></Button>
                      </Stack>
                      <Stack>
                          <DestinationActivity
                            destination={destination}
                          />
                      </Stack>
                    </AccordionDetails>
                  </Accordion>
                </Stack>
              ))
            }
          </Stack>    
        </Stack>
      </Stack>
      <Modal
        open={openAddDesModal}
        onClose={handleCloseAddDesModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: isMdUp ? "400px" : "80%" }}>
            <AddDestination
              handleClose={setOpenAddDesModal}
              fetchTrips={fetchTrips}
            />
        </Box>
      </Modal>
      <Modal
        open={openUpdateLocModal}
        onClose={handleCloseUpdateLocModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: isMdUp ? "400px" : "80%" }}>
            <UpdateDestination
              handleClose={setOpenUpdateLocModal}
              desId={selectedDestination}
            />
        </Box>
      </Modal>
      <Modal
        open={openManageModal}
        onClose={handleCloseManageModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: isMdUp ? "400px" : "70%" }}>
            <ManageCollection
              handleClose={setOpenManageModal}
              updateDestination={fetchDestinations}
              date={trip.date}
              fetchTrips={fetchTrips}
            />
        </Box>
      </Modal>
    </Container>
  )
}

export default Trip;