function formatDate(date: Date): string {
  const today = new Date();
  const argDate = new Date(date);
  const isToday =
    argDate.getDate() === today.getDate() &&
    argDate.getMonth() === today.getMonth() &&
    argDate.getFullYear() === today.getFullYear();

  if (isToday) {
    const hours = argDate.getHours().toString().padStart(2, '0');
    const minutes = argDate.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  const formattedDate = argDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
  });
  const hours = argDate.getHours().toString().padStart(2, '0');
  const minutes = argDate.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes} ${formattedDate}`;
}

export default formatDate;
