const dateTime = document.querySelector('.date-time');

const getCurrentDate = () => {
  const today = new Date();
  const currentDate = {
    year: today.getFullYear(),
    month: new Intl.DateTimeFormat('en', { month: 'short' }).format(today),
    date: today.getDate(),
    day: new Intl.DateTimeFormat('en', { weekday: 'long' }).format(today),
    hours: today.getHours(),
    minutes: (today.getMinutes() < 10 ? '0' : '') + today.getMinutes(),
  };
  return currentDate;
};

export const renderDate = () => {
  const { month, date, day, hours, minutes } = getCurrentDate();
  dateTime.innerHTML = `
  <div class="date-time--current-date">
    <span>Today</span>
    <span>${date} ${day} ${month}</span>
  </div>
  <div class="date-time--current-time">
    <span>Today</span>
    <span>${hours % 12}:${minutes} ${hours > 13 ? 'PM' : 'AM'} </span>
  </div>
  `;
};
