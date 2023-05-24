export default class DailyService {
  startOfToday = new Date();
  endOfToday = new Date();
  startOfTodayInMilliseconds = this.startOfToday.getTime();
  endOfTodayInMilliseconds = this.endOfToday.getTime();

  constructor() {
    this.startOfToday.setHours(0, 0, 0, 0);
    this.endOfToday.setHours(23, 59, 59, 999);
  }
}
