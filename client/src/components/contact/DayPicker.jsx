import useContextProvider from "@/hooks/useAppContextProvider";
import axios from "axios"
import { useEffect, useState } from "react"

const DAYS_OF_WEEK = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA']
const MONTHS = { JAN: 1, FEB: 2, MAR: 3, APR: 4, MAY: 5, JUN: 6, JUL: 7, AUG: 8, SEP: 9, OCT: 10, NOV: 11, DEC: 12 };

const getDaysInMonth = (year, month) => {

  // Creates a date with last day of current month
  const lastDayOfMonth = new Date(year, month, 0);
  
  // gets the last day of month
  const lastDayNumber = lastDayOfMonth.getDate();
  const firstDayOfMonth = new Date(year, month-1, 1).getDay();

  const nullArr = Array.from({length: firstDayOfMonth}, (_, i) => null)
  const numsArr = Array.from({length: lastDayNumber}, (_, i) => i + 1)

  return [...nullArr, ...numsArr]
}

const getFormattedDate = (dateString, asObject = false, noDay = false) => {
  const date = dateString ? new Date(dateString) : new Date()

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = noDay ? "*" : date.getDate()

  return asObject ? {year, month, day} : day + "/" + month + "/" + year 
}

export default function DayPicker ({ setDate, setHour, date, hour }) {
  const { darkMode } = useContextProvider()

  const [videocalls, setVideocalls] = useState([])
  const [currentDate] = useState(getFormattedDate(null, true))
  const [selectedDate, setSelectedDate] = useState(getFormattedDate(null, true, true))
  
  useEffect(() => {
    // fetching of past pending and active videocall dates

    async function getPendingActiveVideocalls() {
      const pendingVideocalls = {}

      const { data } = await axios.get("/api/listActiveVideocalls")
      data.forEach(videocall => {
        const formattedDate = getFormattedDate(videocall.date)

        if(!pendingVideocalls[formattedDate]){
          pendingVideocalls[formattedDate] = []
        }

        pendingVideocalls[formattedDate].push(videocall.hour)
      })
      setVideocalls(pendingVideocalls)
    }

    getPendingActiveVideocalls()
  },[])

  const isDaySelectable = (day) => {
    if(!day) {
      return false
    }
    if(currentDate.month !== selectedDate.month){
      return true
    }
    if(currentDate.day + 4 <= day){
      return true
    }
    return false
  }
  const isHourAvailable = (hour) => {
    const datesArr = videocalls[`${selectedDate.day}/${selectedDate.month}/${selectedDate.year}`]
    if(datesArr){
      const match = datesArr.find(date => date === hour)
      if(match) {
        return false 
      }
    }
    return true
  }
  const decrementMonth = () => {
    if(selectedDate.month === currentDate.month) return
    if(selectedDate.month === 1){
      setSelectedDate({ month: 12, year: selectedDate.year-1, day: "*" })
    } else {
      setSelectedDate(state => ({ ...state, month: state.month-1, day: "*" }))
    }
    setHour("")
  }
  const incrementMonth = () => {
    if(selectedDate.month + 1 === currentDate.month + 4) return
    if(selectedDate.month === 12){
      setSelectedDate({ month: 1, year: selectedDate.year+1, day: "*" })
    } else {
      setSelectedDate(state => ({ ...state, month: state.month+1, day: "*"  }))
    }
    setHour("")
  }

  return <div className="flex max-md:flex-col gap-x-6 gap-y-4">
    <div className="h-[320px] w-full max-w-[400px] max-sm:mx-auto text-sm mx-auto">
      <div className={`${darkMode ? "bg-zinc-800": "bg-zinc-300"} rounded-md`}>
        <div className="px-3 py-1 flex items-center justify-between">
          <p>
            {new Date(2000, selectedDate.month-1).toLocaleString('en-US', { month: 'long' })}
            {" "}{selectedDate.year}
          </p>

          {/* month controls */}
          <div className="flex gap-2 -mr-2">
          <button type="button" onClick={decrementMonth} disabled={selectedDate.month === currentDate.month} className={darkMode ? "disabled:text-zinc-600" : "disabled:text-zinc-400"}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 m-1" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M15 6l-6 6l6 6"></path>
            </svg>
          </button>
          <button type="button" onClick={incrementMonth} disabled={selectedDate.month + 1 === currentDate.month + 4} className={darkMode ? "disabled:text-zinc-600" : "disabled:text-zinc-400"}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 m-1" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M9 6l6 6l-6 6"></path>
            </svg>
          </button>
          </div>
        </div>
        <div className="head-row grid grid-cols-7 place-items-center gap-1">
          {DAYS_OF_WEEK.map((day, i) => (
            <div key={i} className="py-1">{day}</div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-7 place-items-center gap-1 mt-2">
        {getDaysInMonth(selectedDate.year, selectedDate.month).map((dayNumber, i) => (
          <button type="button" key={i} 
          onClick={() => {
            setSelectedDate({...selectedDate, day: dayNumber})
            setDate(new Date(selectedDate.year, selectedDate.month-1, dayNumber))
            setHour("")
          }}
          className={`hover:text-primary ${darkMode ? "hover:bg-zinc-800" : "hover:bg-zinc-300" } transition-colors ease-out duration-100 w-9 aspect-square rounded-full grid place-content-center
            ${!isDaySelectable(dayNumber) && `pointer-events-none ${darkMode ? "text-zinc-700" : "text-zinc-400" }`} 
            ${videocalls[`${dayNumber}/${selectedDate.month}/${selectedDate.year}`]?.length >= 3 && `pointer-events-none ${darkMode ? "text-zinc-700" : "text-zinc-400"}`}
            ${dayNumber === selectedDate.day && "bg-primary-2 text-zinc-200"}
          `}>
            {dayNumber}
          </button>
        ))}
      </div>
    </div>
    <div className="flex flex-col gap-3 max-md:px-2 w-full md:max-w-[200px] mx-auto">
      <button type="button" className={`border border-zinc-700 w-full py-3 rounded-md ${darkMode ? "hover:bg-zinc-800" : "hover:bg-zinc-300" } transition-colors duration-75 ease-out ${(isHourAvailable("14:00") && date) ? "" : "opacity-40 pointer-events-none"} ${hour === "14:00" && `${darkMode? "bg-zinc-800" : "bg-zinc-400"}`}`}
        onClick={() => setHour("14:00")}
      >14:00</button>
      <button type="button" className={`border border-zinc-700 w-full py-3 rounded-md ${darkMode ? "hover:bg-zinc-800" : "hover:bg-zinc-300" } transition-colors duration-75 ease-out ${(isHourAvailable("16:00") && date) ? "" : "opacity-40 pointer-events-none"} ${hour === "16:00" && `${darkMode? "bg-zinc-800" : "bg-zinc-400"}`}`}
        onClick={() => setHour("16:00")}
      >16:00</button>
      <button type="button" className={`border border-zinc-700 w-full py-3 rounded-md ${darkMode ? "hover:bg-zinc-800" : "hover:bg-zinc-300" } transition-colors duration-75 ease-out ${(isHourAvailable("20:00") && date) ? "" : "opacity-40 pointer-events-none"} ${hour === "20:00" && `${darkMode? "bg-zinc-800" : "bg-zinc-400"}`}`}
        onClick={() => setHour("20:00")}
      >20:00</button>
    </div>
  </div>
}