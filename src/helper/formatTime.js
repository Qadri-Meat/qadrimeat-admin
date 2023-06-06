export const formatTime = (time) => {
  const date = new Date();
  const [hours, minutes] = time.split(":");
  date.setHours(hours);
  date.setMinutes(minutes);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};
