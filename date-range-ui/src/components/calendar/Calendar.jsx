import React, { useState, useEffect } from 'react';
import Month from './../month/Month'
import {getYear, addMonths, subMonths, format, getMonth} from 'date-fns'
import style from './Calendar.module.css'

const Calendar = props => {

    const {dayInterval, setInterval, year, setYear, 
           month, setMonth, previewState, setPreview, setSelect} = props

    const [yearArr, setYearArr] = useState([]);

    const monthNames = [ "January", "February", "March", "April", 
                         "May", "June", "July", "August", 
                         "September", "October", "November", "December" ];
    useEffect(() => {

      let yearArr = [];
    
      for (let i = 2019; i <= getYear(new Date()); i++) {
        yearArr.push(i);
      }
            
      setYearArr(yearArr);
    }, []); 

    const addMonth = () => {

      const currentDate = new Date();

      if (year == getYear(currentDate) && month == 11) {
        return;
      }

      const newDate = addMonths(new Date(year, month), 1);
      setMonthYear(newDate);
    }

    const minusMonth = () => {

      if (year == 2019 && month == 0) {
        return;
      }

      const newDate = subMonths(new Date(year, month), 1);
      setMonthYear(newDate);
    }

    const setMonthYear = newDate => {
      const newMonth = getMonth(newDate);
      const newYear = getYear(newDate);

      setMonth(newMonth);
      setYear(newYear);
    }

    const nextDate = () => {
        return addMonths(new Date(year, month), 1);
    }

    const monthSelectorHandler = event => {
        setMonth(event.target.value);
    }

    const yearSelectorHandler = event => {
        setYear(event.target.value);
    }

    const dateDisplay = date => {
        return format(date, 'PPP');
    }

    return (
        <React.Fragment>
        <div className={style.DateRangerContainer}>

          <div className={style.DateDisplayWrapper}>
            <div className={style.DateDisplay}>
                <input value={dayInterval.startDate === null ? '' : dateDisplay(dayInterval.startDate)} readOnly></input>
            </div>
            <div className={style.DateDisplay}>
                <input value={dayInterval.endDate === null ? '' : dateDisplay(dayInterval.endDate)} readOnly></input>
            </div>
          </div>

          <div className={style.monthPickerHeaderContainer}>
            <div className={style.monthPickerButtonContainer}>
                <div className={style.monthPickerButton} onClick={minusMonth}>
                    <i className={`${style['arrow']} ${style.left}`}></i>
                </div>

                <div className={style.yearHeaderContainer}>
                  <div className={style.selectDiv}>
                    <select value={month} onChange={monthSelectorHandler}>
                    {monthNames.map((mon, idx) => {
                        return (<option key={idx} value={idx}>{mon}</option>)
                        })}
                    </select>
                  </div>
                </div>

             </div>

            <div className={style.monthPickerButtonContainer}>

                <div className={style.monthHeaderContainer}>
                  <div className={style.selectDiv}>
                    <select value={year} onChange={yearSelectorHandler}>
                      {yearArr.map(yr => {return (<option key={yr} value={yr}>{yr}</option>)})}
                    </select>
                  </div>
                </div>

                <div className={style.monthPickerButton} onClick={addMonth}>
                    <i className={`${style['arrow']} ${style.right}`}></i>
                </div>
            </div>

            </div>
            <div className={style.DateRangeMonthContainer}>
              <Month month={month} year={year} 
                     dayInterval={dayInterval} 
                     setInterval={setInterval}
                     previewState={previewState}
                     setPreview={setPreview}
                     setSelect={setSelect}/>
                     
              <Month month={getMonth(nextDate())} 
                     year={getYear(nextDate())} 
                     dayInterval={dayInterval} 
                     setInterval={setInterval}
                     previewState={previewState}
                     setPreview={setPreview}
                     setSelect={setSelect}/>
            </div>
        </div>
        </React.Fragment>
    );
}

export default Calendar;