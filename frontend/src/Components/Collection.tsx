import React, { useContext, useEffect, useReducer, useState } from "react";
import { useeNavigate, useNavigate } from "react-router-dom";
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, Tooltip, Modal, Stack, Typography, styled } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LaunchIcon from '@mui/icons-material/Launch';
import AddCollection from "./AddCollection";
import axios from "axios";
import MyContext from "../../MyContext";
import { format } from 'date-fns';
import { Link } from "react-router-dom";
import CollectionDesList from "./CollectionDesList";
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import { Trip } from "../propTypes/propTypes";
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import Zoom from '@mui/material/Zoom';
import useFetch from './../hooks/useFetch';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  zIndex: 10,
};

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

const Collection = () => {
  const { user, setIsLoggedIn, setUser, isLoggedIn } = useContext(MyContext);
  const [ selectedTrip, setSelectedTrip ] = useState<Trip>({});
  const [openAddTripModal, setOpenManageModal] = useState(false);
  const [ openConfirmDel, setOpenConfirmDel ] = useState(false);
  const handleTripModal = (value: boolean) => {setOpenManageModal(value)};
  const handleClickDelOpen = (trip: any) => {
    setSelectedTrip(trip);
    setOpenConfirmDel(true);
  };
  const navigate = useNavigate();
  const { data, refetch } = useFetch("https://pasiar-travel-logs-api.vercel.app/api/v1/trips");
  const handleDelClose = () => setOpenConfirmDel(false);
  const [ trips, setTrips ] = useState<Trip[]>([]);

  useEffect(() => {
    if (data){
      setTrips(data);
    }
  }, [data]);

  const handleConfirmDel = async() => {
    await axios.delete(`https://pasiar-travel-logs-api.vercel.app/api/v1/trips/${selectedTrip._id}/${selectedTrip.image?.filename.split("/")[1]}`, { headers: { Authorization: `Bearer ${user.token}` } });
    const filtertrip = trips.filter((trip) => trip._id !== selectedTrip._id);
    handleDelClose();
    setTrips(filtertrip);
    refetch();
  };

const handleImageFile = async(e: React.ChangeEvent<HTMLInputElement>, trip: React.SetStateAction<Trip>) => {
    if (e !== undefined){
      const file = e.target.files[0];
      const data = new FormData();
      data.append("image", file);

      const response = await axios.patch(
        `http://localhost:8080/api/v1/trips/${trip._id}`,
        data,
        { headers: { Authorization: `Bearer ${user.token}` } });

        const updatedTrip = response.data;
        setSelectedTrip(updatedTrip.data);
        setTrips((prevTrips) =>
          prevTrips.map((t) => (t._id === updatedTrip.data._id ? updatedTrip.data : t))
        );
    }
  }

const handleLogout = () => {
  setIsLoggedIn(false);
  localStorage.removeItem("pasiar_user");
  setUser({});
  navigate("/");
}

return (
  <Container>
    <Stack
      sx={{
        borderRadius: "40px",
        padding: "20px",
        color: "#FFF",
        gap: "10px"
        }}
      >
      <Stack 
        sx={{
          flexDirection:"row",
          justifyContent: "space-between",
          padding: "20px 30px",
          flexWrap: "wrap"
        }}>
        <Stack sx={{ flexDirection: "row", justifyContent: "center", height: "auto"}}>
          <Typography variant="h4" sx={{fontWeight: 600, color: "#202020"}}> 
            DASHBOARD 
          </Typography>
          <Button
              sx={{ padding: "0 7px", minWidth: 0 }} 
              onClick={handleLogout} 
            >
              <MeetingRoomIcon/>
              Logout
          </Button>
        </Stack>
        <Button variant="contained" sx={{backgroundColor: "#FF9448"}} onClick={()=>handleTripModal(true)}>+ Create Trip</Button>
      </Stack>
      
      <Stack sx={{ alignItems: "center", flexDirection: "row", justifyContent: "space-evenly", flexWrap: "wrap",}}>
        {
          trips.map((trip) => {
            const dateObject = new Date(trip.date);
            const formattedDate = format(dateObject, "MMMM dd, yyyy");
            return(
              <Stack
                key={trip._id}
                className="cards"
                sx={{
                  padding: "15px 15px 0",
                  boxShadow: '0 4px 8px 0 rgba(14, 13, 25, 0.2)',
                  width: "280px",
                  height: "auto",
                  borderRadius: "10px",
                  backgroundImage: "linear-gradient(340deg, rgba(137, 49, 3, 0.52), rgba(20, 20, 20, 0.75), rgba(10, 10, 10, 1)), var(--img)",
                  color: "#cfd8dc",
                  margin: "20px",
                  alignItems: "center",
                  "--img": `url(${trip.image !== undefined ? trip.image.path: 'https://images.pexels.com/photos/1816602/pexels-photo-1816602.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}), linear-gradient(#e66465, #9198e5)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center"
                }}
              >

                <Stack sx={{flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "start"}}>
                  <Stack textAlign="left">
                    <Typography variant="h4"> {trip.name}</Typography>
                    <Typography>{formattedDate}</Typography>
                  </Stack>
                  <Stack sx={{gap: "5px"}}>
                    <Button sx={{minWidth: 0, padding: 0 }} onClick={()=>handleClickDelOpen(trip)}>
                      <Tooltip title= "Delete" placement="left" TransitionComponent={Zoom}>
                        <DeleteForeverIcon sx={{color:"#6E7C7A"}}/>
                      </Tooltip>
                    </Button>
                    <Button
                      component="label"
                      role={undefined} 
                      tabIndex={-1}
                      sx={{minWidth: 0, padding: 0 }}
                    >
                      <Tooltip title= "Change Cover" placement= "left" TransitionComponent={Zoom}>
                        <InsertPhotoOutlinedIcon sx={{color:"#6E7C7A"}}/>
                      </Tooltip>
                      <VisuallyHiddenInput type="file"
                      onChange={(e)=> handleImageFile(e, trip)}/>
                    </Button>
                </Stack>
                </Stack>
                <Stack 
                  sx={{
                    flexDirection: "row", 
                    color: "#FF9448",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "85%"
                  }}>
                    <CollectionDesList 
                      tripId={trip._id}
                    />
                  <Stack sx={{justifyContent: "center", marginBottom: "10px", marginRight: "10px"}}>
                    <Link to={`/trips/${trip._id}`} style={{ textDecoration: 'none' }} >
                      <Button sx={{padding:0}}><LaunchIcon sx={{color:"#FF9448", fontSize: "60px"}}/></Button>
                      <Typography variant= "subtitle1" sx={{color: "#FF9448"}}>VIEW</Typography>
                    </Link>
                  </Stack>
                </Stack>
              </Stack>
          )})
        }
      </Stack>
    </Stack>
    <Modal
      open={openAddTripModal}
      onClose={()=>handleTripModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
          <AddCollection
          handleClose={setOpenManageModal}
          refetch={refetch}
          />
      </Box>
    </Modal>

    <Dialog
      open={openConfirmDel}
      onClose={handleDelClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete "{selectedTrip.name}"?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleDelClose}>Cancel</Button>
        <Button onClick={handleConfirmDel} autoFocus color="error">
          Delete
        </Button>
      </DialogActions>

    </Dialog>
  </Container>
)
}

export default Collection;