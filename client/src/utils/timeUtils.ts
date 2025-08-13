import { format } from 'date-fns-tz';

export const formatTime = (timezone: string) => {
  try {
    // Convert UTC offset to minutes (e.g., "UTC+05:30" -> 330)
    const offset = timezone.replace('UTC', '');
    const sign = offset.charAt(0) === '-' ? -1 : 1;
    const [hours, minutes] = offset.substring(1).split(':').map(Number);
    const totalMinutes = sign * (hours * 60 + minutes);
    
    // Create a date with the specified offset
    const now = new Date();
    const localTime = now.getTime();
    const localOffset = now.getTimezoneOffset();
    const utc = localTime + localOffset * 60000;
    const targetTime = utc + totalMinutes * 60000;
    
    return format(new Date(targetTime), 'hh:mm a');
  } catch (e) {
    console.error('Error formatting time:', e);
    return '--:--';
  }
};