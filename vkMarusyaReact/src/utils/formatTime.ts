export const formatMovieDuration = (minutes: number): string => {  
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) {
      return `${mins} мин`;
    } else if (mins === 0) {
      return `${hours} ч`;
    } else {
      return `${hours} ч ${mins} мин`;
    }
  };
  