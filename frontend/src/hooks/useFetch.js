import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import MyContext from "./../../MyContext";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useContext(MyContext);

  const fetchData = useCallback( async() => {
    setError(null);
    try{
      const { 
        data: { data },
      } = await axios.get(url, { headers: { Authorization: `Bearer ${user.token}` } });
      setData(data);
    } catch (err){
      setError(err.response?.data?.message || 'An error occurred.');
      console.error(err.response?.data?.message || 'An error occured.');
    }
  }, [url, user]);

  useEffect(()=> {
    fetchData();
  }, [fetchData]);

  return { data, error, refetch: fetchData };
} 

export default useFetch;