import { useState } from "react";
import DatePicker from "react-multi-date-picker";
export const DatePickerComponent = () => {
  const [dates, setDates] = useState([]);
  const [allDates, setAllDates] = useState([]);
  return (
    <div>
      <DatePicker range weekPicker />
      {dates.length > 1 && (
        <div>
          <h4>
            All Dates between {dates[0].format()} and {dates[1].format()}:
          </h4>
          <ul>
            {allDates.map((date, index) => (
              <li key={index}>{date.format()}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
