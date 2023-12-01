export const getStartAndEndDateOfPastWeek = () => {
  const currentDate = new Date();
  const endDate = new Date(currentDate);
  const startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - 6); // Start date is 6 days before the end date

  return {
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
  };
};

const { startDate, endDate } = getStartAndEndDateOfPastWeek();
console.log('Start Date:', startDate);
console.log('End Date:', endDate);
