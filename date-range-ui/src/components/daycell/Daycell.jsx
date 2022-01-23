import React from 'react';
import {isToday, 
        isWithinInterval, 
        isBefore, 
        subDays, 
        addDays,
        isEqual } from 'date-fns';
import style from './Daycell.module.css';

const Daycell = props => {

  console.log("cell rendered");

  const {previewState, setPreview, setSelect} = props;

  const isCurrentDay = date => {
     return isToday(new Date(date.currYear, date.currMonth, date.day));
  };

  const dayDisabled = date => {

    if (!date.isCurrentM) {
      return true;
    }

    return false;
  }

  const selectHandler = () => {

    if (dayDisabled(props.date)) {
      return;
    }

    const interval = props.interval;
    const newDate = new Date(props.date.currYear, 
                             props.date.currMonth,
                             props.date.day);

    if (interval.rangeSelected) {
      props.setInterval(({startDate: newDate,  endDate: newDate, rangeSelected: false}))
      setPreview(prevState => ({...prevState,  preview: true}))
      setSelect(-1);
      return
    }

    if (isBefore(newDate, props.interval.startDate) ) {
      props.setInterval(prevState => 
        ({...prevState,  startDate: newDate, rangeSelected: true}))
    }
    else {
      props.setInterval(prevState => 
        ({...prevState,  endDate: newDate, rangeSelected: true}))
    }

    setPreview(({startDate: null,  endDate: null, preview: false}))
  }

  const highlight = interval => {

    if (interval.startDate == null || interval.endDate == null) {
      return false;
    }

    const currDate = new Date(props.date.currYear, 
                              props.date.currMonth, 
                              props.date.day)

    
    const isWithin = isWithinInterval(currDate, {start: interval.startDate, end: interval.endDate})

    return isWithin;
  }

  const isSelected = () => {
    return highlight(props.interval);
  }

  const showPreview = () => {
    return highlight(previewState);
  }

  const previewHandler = () => {
    const newDate = new Date(props.date.currYear, 
                             props.date.currMonth,
                             props.date.day);

    if (!previewState.preview || 
        dayDisabled(props.date) || 
        isEqual(newDate, props.interval.startDate)) {
      return;
    }

    if (isBefore(newDate, props.interval.startDate) ) {
      setPreview(prevState => 
        ({...prevState,  startDate: newDate, endDate: subDays(props.interval.endDate, 1)}))
    }
    else {
      setPreview(prevState => 
        ({...prevState, startDate: addDays(props.interval.startDate, 1), endDate: newDate}))
    }
  }

  return (
    <React.Fragment>
    <div className={`${style['daycellcontainer']}
                     ${dayDisabled(props.date) && style.disabled}
                     ${isSelected() && style['highlight-cyan']}
                     ${showPreview() && style['highlight-hover']}`} key={props.index}>
      <div className={style.cdcday}>
        <span className={`${isCurrentDay(props.date) && style.highlight}
                          ${isSelected() && style['highlight-white']}`} 
                          onClick={selectHandler} 
                          onMouseEnter={previewHandler}>
                          {props.date.day}
        </span>
      </div>
    </div>  
    </React.Fragment>
   );
}

export default Daycell;