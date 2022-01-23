import React, { useState, useEffect} from 'react';
import Dayecell from '../daycell/Daycell'
import style from './Month.module.css';
import {
    startOfMonth,
    endOfMonth,
    getDaysInMonth,
    getDay,
    format
  } from 'date-fns';

const MONTHHEADER = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const Month = props => {

  const [days, setDays] = useState([]);
  const { dayInterval, setInterval, previewState, setPreview, setSelect} = props;

  useEffect(() => {
    initializeDates();
  }, [props.month, props.year]);

  console.log("month rendered");

  const initializeDates = () => {
    let lastMonthDays;
    const currMonth = props.month
    const currYear = props.year

    const currMonthDays = getDaysInMonth(new Date(currYear, currMonth)) + 1;

    if (currMonth === 1) {
        lastMonthDays = getDaysInMonth(new Date(currYear-1, 12))
    }
    else {
        lastMonthDays = getDaysInMonth(new Date(currYear, currMonth-1))
    }

    const startDay = getMonthStart(new Date(currYear, currMonth));
    const dayOfWeek = getDay(new Date(currYear, currMonth, startDay))

    let startDate = dayOfWeek === 0 ? 1 : (lastMonthDays - dayOfWeek) + 1;

    let temp = [];
    const isCurrentM = false;

    //previous month days
    for (let i = 0; i < dayOfWeek; i++) {
      let day = startDate;
      temp.push({currYear, currMonth, day, isCurrentM});
      startDate++;
    }

    //current month days
    for (let k = 1; k < currMonthDays; k++) {
      let day = k   
      temp.push({currYear, currMonth, day, isCurrentM: true});
    }

    //next month days
    for (let i = 1; i <= (42-currMonthDays-dayOfWeek+1); i++) {
      let day = i;
      temp.push({currYear, currMonth, day, isCurrentM});
    }

    setDays(temp);
  }

  const getDate = () => {
      return new Date();
  }

  const getMonthEnd = date => {
    return endOfMonth(date);
  }

  const getMonthStart = date => {
      return startOfMonth(date).getDate();
  }

  const getMonthHeader = MONTHHEADER.map((d,i)=> <div key={i} className={style.monthHeaderName}>
                                                   {d}
                                                 </div>)
  
  return (
    <React.Fragment>
      <div className={style.monthBody}>
        <div className={style.monthContainer}>
          <div className={style.monthYearHeader}>{format(new Date(props.year, props.month), 'MMMM')} {props.year}</div>
          <div className={style.monthHeader}>
          {getMonthHeader}
          </div>
          <div className={style.ccbody}>
          {days.map((item,key) => {return (<Dayecell key={key}
                                                     date={item} 
                                                     index={key}
                                                     interval={dayInterval}
                                                     setInterval={setInterval}
                                                     previewState={previewState}
                                                     setPreview={setPreview}
                                                     setSelect={setSelect}/>)})}
          </div>
        </div>
      </div>
    </React.Fragment>
   );
}

export default Month;