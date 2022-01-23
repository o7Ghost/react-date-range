import React, { useState } from 'react';
import style from './RangeSelectUtil.module.css'
import {startOfDay, 
        endOfDay, 
        addDays,
        startOfWeek,
        endOfWeek,
        startOfMonth,
        endOfMonth,
        addQuarters,
        subMonths,
        startOfYear,
        endOfYear,
        getMonth,
        getYear} from 'date-fns';

const RangeSelectUtil = props => {

  const {setInterval, year, setYear, 
         month, setMonth, state, 
         setState, setPreview, select,
         setSelect} = props

  // const [select, setSelect] = useState(-1);
  
  const BUTTONNAMES = ["Today", "Yesterday", "This Week", "Month", "Quarter", "Year"];

  const STATEABBR = ["ALL","AA","AE","AK","AL","AP","AR","AS","AZ","CA","CO","CT","DC","DE","FL","GA",
                     "GU","HI","IA", "ID","IL","IN","KS","KY","LA","MA","MD","ME","MI","MN","MO","MS",
                     "MT","NC","ND","NE","NH","NJ","NM","NV","NY","OH","OK","OR","PA","PR","RI","SC",
                     "SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY"]

  const STATENAMES = ["All States", "U.S. Armed Forces (Americas)", "U.S. Armed Forces (Europe)", 
                      "Alaska", "Alabama", "U.S. Armed Forces (Pacific)", "Arkansas", 
                      "American Samoa", "Arizona", "California", "Colorado", "Connecticut", 
                      "District of Columbia", "Delaware", "Florida", "Georgia", "Guam", "Hawaii", 
                      "Iowa", "Idaho", "Illinois", "Indiana", "Kansas", "Kentucky", "Louisiana", 
                      "Massachusetts", "Maryland", "Maine", "Michigan", "Minnesota",
                      "Missouri", "Mississippi", "Montana", "North Carolina", "North Dakota", "Nebraska",
                      "New Hampshire", "New Jersey", "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma",
                      "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota",
                      "Tennessee", "Texas", "Utah", "Virginia", "Virgin Islands", "Vermont", "Washington",
                      "Wisconsin", "West Virginia", "Wyoming"]


  const setRange = (newStartDate, newEndDate) => {
    setInterval(({startDate: newStartDate,  endDate: newEndDate, rangeSelected: true}))
  }

  const isSelected = idx => {
    return idx == select;
  }

  const stateChangeHandler = event => {
    setState(event.target.value)
  }

  const dateRangeClickHandler = event => {

    const dateRange = event.currentTarget.id;
    setSelect(dateRange);
    setPreview(({startDate: null,  endDate: null, preview: false}))

    switch(dateRange) {
      case "0":
        const currStartDay = startOfDay(new Date());
        const currEndDay = endOfDay(new Date());
        setRange(currStartDay, currEndDay);
        setMonth(getMonth(currStartDay));
        setYear(getYear(currStartDay));
        break;
      case "1":
        const startOfYesterday = startOfDay(addDays(new Date(), -1));
        const endOfYesterday = endOfDay(addDays(new Date(), -1));
        setRange(startOfYesterday, endOfYesterday);
        setMonth(getMonth(startOfYesterday));
        setYear(getYear(startOfYesterday));
        break;
      case "2":
        const startofWeek = startOfWeek(new Date())
        const endofWeek = endOfWeek(new Date())
        setRange(startofWeek, endofWeek);
        setMonth(getMonth(startofWeek));
        setYear(getYear(endofWeek));
        break;
      case "3":
        const startofMonth = startOfMonth(new Date(year, month));
        const endofMonth = endOfMonth(new Date(year, month));
        setRange(startofMonth, endofMonth);
        break;
      case "4":
        const startofQuarter = startOfMonth(new Date(year, month));
        const getQuarter = subMonths(addQuarters(startofQuarter, 1), 1);
        const endofQuarter = endOfMonth(getQuarter);
        setRange(startofQuarter, endofQuarter);
        break;
      case "5":
        const startofyear = startOfYear(new Date(year, month));
        const endofyear = endOfYear(new Date(year, month));
        setRange(startofyear, endofyear);
        setMonth(0);
        break;
      default:
    } 
  }

  return (
    <React.Fragment>
      <div className={style.RangeSelectUtilContainer}>
        <div className={style.buttonContainer}>
          {BUTTONNAMES.map((item, idx) => {
            return (
              <button type="button" 
                      id={idx} 
                      key={idx}
                      onClick={dateRangeClickHandler}>
                <span className={`${style['buttonText']} ${isSelected(idx) && style.spanSelected}`}>{item}</span>
              </button>
          )})}
        </div>
        <div className={style.stateNameContainer}>
          <div className={style.selectorContainer}>
            <div className={style.selectArrowContainer}>
             &#8964;
            </div>
            <div className={style.selectDiv}>
              <select value={state} onChange={stateChangeHandler}>
                {STATEABBR.map((abbr,idx) => {return (
                                           <option key={abbr} 
                                                   value={abbr}> 
                                                   {abbr} - {STATENAMES[idx]}
                                           </option>)})}
              </select>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default RangeSelectUtil;