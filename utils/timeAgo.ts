export function timeAgo(date: string) {
  const now = new Date();
  const diffInMs = now.getTime() - new Date(date).getTime();

  const diffInSecs = Math.floor(diffInMs / 1000);
  const diffInMins = Math.floor(diffInSecs / 60);
  const diffInHours = Math.floor(diffInMins / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInWeeks / 4);
  const diffInYears = Math.floor(diffInMonths / 12);

  if (diffInSecs < 60) {
    return diffInSecs + "s";
  } else if (diffInMins < 60) {
    return diffInMins + " min " + diffInSecs%60 + "s";
  } else if (diffInHours < 24) {
    return diffInHours + "h " +  diffInMins%60 + " min ";
  
  } else if (diffInDays < 7) {
    return diffInDays+"days " + diffInHours%24 + "h ";
  } else if (diffInWeeks <4) {
    return diffInWeeks + "Weeks " + diffInDays%7 +"days " ;
  } else if (diffInMonths<12) {
    return diffInMonths + "Months " + diffInWeeks%4 + "Weeks " ;
  } else {
    return diffInYears + " Yrs " + diffInMonths%12 + "Months ";
  }
}