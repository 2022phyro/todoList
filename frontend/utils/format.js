import { format, isValid, parseISO } from 'date-fns';

export const formatDate = (dateString, mode = 'date-human') => {
  let date;
  if (dateString && isValid(parseISO(dateString))) {
    date = parseISO(dateString);
  } else {
    date = new Date();
  }

  switch (mode) {
    case 'date-human':
      return format(date, 'EEEE, MMMM d yyyy');
    case 'time-human':
      return format(date, 'h:mm a');
    default:
      return format(date, 'MMMM d yyyy, h:mm a');
  }
}