// export function getFormattedDate(date) {
//     return date.toISOString().slice(0, 10);
//   }
  
  
  export function getDateMinusDays(date, days) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
  }
  
// export function getFormattedDate(date) {
//     if (!(date instanceof Date)) {
//       throw new Error('Invalid date object');
//     }
//     return date.toISOString().slice(0, 10);
//   }
  

  export function getFormattedDate(date) {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      throw new Error('Invalid date string');
    }
    return dateObj.toISOString().slice(0, 10);
  }
  