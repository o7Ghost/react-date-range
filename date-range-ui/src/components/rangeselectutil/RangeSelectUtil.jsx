import React from 'react';
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
         month, setMonth, setPreview, select,
         setSelect} = props

  // const [select, setSelect] = useState(-1);
  
  const BUTTONNAMES = ["Today", "Yesterday", "This Week", "Month", "Quarter", "Year"];

  const setRange = (newStartDate, newEndDate) => {
    setInterval(({startDate: newStartDate,  endDate: newEndDate, rangeSelected: true}))
  }

  const isSelected = idx => {
    return idx == select;
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

        const isCurrYear = getYear(new Date());
        const startofQuarter = startOfMonth(new Date(year, month));
        let getQuarter;
        let  endofQuarter;

        if (year == isCurrYear && month == 11) {
          getQuarter = subMonths(addQuarters(startofQuarter, 1), 3);
          endofQuarter = endOfMonth(getQuarter);
        }
        else if (year == isCurrYear && month == 10) {
          getQuarter = subMonths(addQuarters(startofQuarter, 1), 2);
          endofQuarter = endOfMonth(getQuarter);
        }
        else {
          getQuarter = subMonths(addQuarters(startofQuarter, 1), 1);
          endofQuarter = endOfMonth(getQuarter);
        }
        
       
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
      </div>
    </React.Fragment>
  );
}

export default RangeSelectUtil;