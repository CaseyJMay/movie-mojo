const getYearFromDate = (dateString: string): string => {
    const dateParts = dateString.split('-'); // Splitting the string by '-'
    const year = dateParts[0]; // The first part is the year
    return year;
  };
  
  export default getYearFromDate;