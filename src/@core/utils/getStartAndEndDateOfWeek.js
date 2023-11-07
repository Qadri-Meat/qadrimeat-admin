export const getStartAndEndDateOfWeek = () => {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const startDate = new Date(currentDate);
  startDate.setDate(currentDate.getDate() - currentDay);
  const endDate = new Date(currentDate);
  endDate.setDate(currentDate.getDate() + (6 - currentDay));

  return {
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
  };
};
