import React, { useState, useEffect} from 'react';
import Calendar from './../calendar/Calendar'
import RangeSelectUtil from '../rangeselectutil/RangeSelectUtil'
import style from './DateRangerPicker.module.css'
import {getYear,getMonth} from 'date-fns'

const DateRangePicker = props => {

  const [dayInterval, setInterval] = useState({startDate: null, 
                                               endDate: null, 
                                               rangeSelected: true});

  const [previewState, setPreview] = useState({startDate: null, 
                                               endDate: null, 
                                               preview: false});

  const [year, setYear] = useState(getYear(new Date()));
  const [month, setMonth] = useState(getMonth(new Date()));
  const [state, setState] = useState("CA");
  const [select, setSelect] = useState(-1);

  return (
      <React.Fragment>
        <div className={style.DateRangePickerContainer}>
          <RangeSelectUtil setInterval={setInterval}
                           year={year}
                           setYear={setYear}
                           month={month}
                           setMonth={setMonth}
                           state={state}
                           setState={setState}
                           setPreview={setPreview}
                           select={select}
                           setSelect={setSelect}/>

          <Calendar dayInterval={dayInterval} 
                    setInterval={setInterval}
                    year={year}
                    setYear={setYear}
                    month={month}
                    setMonth={setMonth}
                    previewState={previewState}
                    setPreview={setPreview}
                    setSelect={setSelect}/>
        </div>
      </React.Fragment>
    );
}

export default DateRangePicker;