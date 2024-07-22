import React, { useContext, useEffect, useState } from "react";
import { List, ListItem, Typography, Button, TextField, Stack } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import MyContext from "../../MyContext";
import axios from "axios";
import { Destination } from "../propTypes/propTypes";

const DestinationActivity = ({ destination }:{ destination: Destination } ) => {
  const { user, trip } = useContext(MyContext);
  const [activityField, setActivityField] = useState("");
  const [ activityList, setActivityList ] = useState<string[]>(destination.activities);
 
  const handleActivity = () => {
    if(activityField && !activityList.includes(activityField)){
      setActivityList([activityField, ...activityList]);
      setActivityField("");
    }
  }

  const handleActDel = (currentActivity: string) => {
    const updatedActivity = activityList.filter((activity: string) => activity !== currentActivity);

    setActivityList(updatedActivity);
    ( async () => {
      await axios.patch(`https://pasiar-travel-logs-api.vercel.app/api/v1/destinations/${destination._id}`,{activities: updatedActivity}, { headers: { Authorization: `Bearer ${user.token}`}});
    })();
  }

  useEffect(()=> {
    if(activityList.length){
      (async () => {
        await axios.patch(`https://pasiar-travel-logs-api.vercel.app/api/v1/destinations/${destination._id}`,{activities: activityList}, { headers:{ Authorization: `Bearer ${user.token}`}});
      })();
    }
  }, [activityList]);
  
return (
  <List sx={{padding:0}}>
  {
    activityList.map((activity) => (
      <ListItem key={activity} sx={{padding: "2px 4px"}}>
        <Stack sx={{ flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center"}}>
          <Typography >
            {activity}
          </Typography>
          < Button size= "small" onClick={()=>handleActDel(activity)}><CloseIcon/></Button>
        </Stack>
      </ListItem>
    ))
  }
    <ListItem>
      <Stack sx={{ flexDirection: "row", width: "100%", gap: "5px"}}>
      <TextField label="Activity" size="small" sx={{ flexGrow: 1 }} value={activityField} onChange={(e)=>setActivityField(e.target.value)}/>
        <Button variant= "contained" size= "small" onClick={handleActivity} > Add </Button>
      </Stack>
    </ListItem>
</List>
)
}

export default DestinationActivity;