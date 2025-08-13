import { format, toZonedTime } from 'date-fns-tz';

export const formatTime = (timezone: string | undefined): string => {
  if (!timezone) return '--:--';

  try {
    let offset = '';
    
    if (timezone.startsWith('UTC')) {
      offset = timezone.replace('UTC', '');
    } 
    else if (/^[+-]\d{2}:\d{2}$/.test(timezone)) {
      offset = timezone;
    }
    else {
      const now = new Date();
      const zonedTime = toZonedTime(now, timezone);
      return format(zonedTime, 'hh:mm a', { timeZone: timezone });
    }

    if (offset) {
      const now = new Date();
      const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
      
      const sign = offset[0] === '-' ? -1 : 1;
      const [hours, minutes] = offset.slice(1).split(':').map(Number);
      const totalOffset = sign * (hours + minutes / 60) * 3600000;
      
      const targetTime = new Date(utcTime + totalOffset);
      return format(targetTime, 'hh:mm a');
    }

    return '--:--';
  } catch (e) {
    console.warn(`Error formatting time for timezone ${timezone}:`, e);
    return '--:--';
  }
};