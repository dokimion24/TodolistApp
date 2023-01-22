const dateTime = document.querySelector(".date-time");

const getCurrentDate = () => {
  const today = new Date();
  const currentDate = {
    year: today.getFullYear(),
    month: new Intl.DateTimeFormat("en", { month: "short" }).format(today),
    date: today.getDate(),
    day: new Intl.DateTimeFormat("en", { weekday: "short" }).format(today),
    hours: today.getHours(),
    minutes: (today.getMinutes() < 10 ? "0" : "") + today.getMinutes(),
  };
  return currentDate;
};

export const renderDate = () => {
  const { year, month, date, day, hours, minutes } = getCurrentDate();
  dateTime.innerHTML = `
  <div class="date-container">
    <span class="date">${date}</span>
    <div class="year">
      <span>${month}</span>
      <span>${year}</span>
    </div>
    <span class="day">${day}</span>
  </div>
  <span class="time">  
    ${hours % 12 === 0 ? hours : hours % 12}:${minutes} ${
    hours > 11 ? "PM" : "AM"
  } 
  </span>
  `;
};
