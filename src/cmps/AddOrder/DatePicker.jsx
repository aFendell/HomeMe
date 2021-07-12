import React, { useState, useEffect } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TableDatePicker(props) {
  const [startDate, setStartDate] = useState(props.startDate || new Date());
  const [endDate, setEndDate] = useState(props.endDate || new Date());
  // console.log(props)
  
  useEffect(() =>{
    props.setDates(startDate, endDate);
  },[startDate, endDate]);
  
  return (
    <div className="date-picker">
      <DatePicker className="start-date"
        selected={startDate}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        onChange={(date) => {
          setStartDate(date)
        }} />
      <DatePicker className="end-date"
        selected={endDate}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        onChange={(date) => {
          setEndDate(date)
        }} />
    </div>
  );
}
