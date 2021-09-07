export const toValidDate = (date) => {
    // date = 01.01.2021 to 2021-01-01 (valid in new Date)
    return date.split('.').reverse().join('-');
}

export const toValidTime = (time) => {
    // new Date (year, month, day, hours, minutes, seconds, milliseconds)
    return new Date(0, 0, 0, time.split(':')[0], time.split(':')[1]);
}

export const msToTime = (duration) => {
  let minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;

  return hours + ":" + minutes;
}

export const timeToMs = (time) => {
 return  Number(time.split(':')[0]) * 60 * 60 * 1000 + Number(time.split(':')[1]) * 60 * 1000;
}