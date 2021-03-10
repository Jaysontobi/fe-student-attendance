import React, { useState, useEffect } from 'react';
import moment from 'moment';
// import TimeKeepingService from "../timeKeeping/timeKeepingService";
const TimeKeepingAction = (initial = { searchRequest: {} }) => {
    const locale = 'en';
    const [today, setDate] = useState(moment(new Date()).format('MMMM Do YYYY, h:mm:ss a')); // Save the current date to be able to trigger an update

  useEffect(() => {
    const timer = setInterval(() => { // Creates an interval which will update the current data every minute
        // This will trigger a rerender every component that uses the useDate hook.
        setDate(moment(new Date()).format('MMMM Do YYYY, h:mm:ss a'));
      }, 1000);
      return () => {
        clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
      }
  }, []);


  return {
    today
  }
};

export default TimeKeepingAction;