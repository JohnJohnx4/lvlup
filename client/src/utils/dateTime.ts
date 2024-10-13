export const showDaysOrLocaleDate = (date: Date | undefined) => {
  if (!date) return "N/A";
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays < 1) return "Today";
  if (diffDays < 15) return `in ${diffDays} days`;
  if (diffDays === 1) return "Yesterday";
  return "on " + date.toLocaleDateString();
};
