import React, { useContext, useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import MyContext from "../../MyContext";
import axios from "axios";
import { Destination } from "../propTypes/propTypes";

const CollectionDesList = ({ tripId }: { tripId: string }) => {
  const { user } = useContext(MyContext);
  const [ destinationList, setDestinationList ] = useState<Destination[]>([]);
  const [ visited, setVisited ] = useState([]);

  useEffect(() => {
    (async () => {
      const desList = await axios.get(`https://pasiar-travel-logs-api.vercel.app/api/v1/trips/${tripId}/destinations`, {headers: { Authorization: `Bearer ${user}`}});
      
      setDestinationList(desList.data);
      const visitedDes = desList.data.filter((destination) => destination.visited);

      setVisited(visitedDes);
    })();
  }, [])

  return(  
  <Stack 
    sx={{
      justifyContent: "flex-end",  
      flexDirection: "row", 
      boxSizing: "border-box",
      color: "#cfd8dc",
    }}>
    <Typography variant="h1"> {visited.length} </Typography>
    <Typography variant="h2">/</Typography>
    <Typography variant="h2">{destinationList.length}</Typography>
  </Stack>
  )
}

export default CollectionDesList;