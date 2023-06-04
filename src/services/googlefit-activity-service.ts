import fetch from "node-fetch";
import Variables from "../types/variables";
import ActivityType from "../types/activity-types";
import FileSystemHelper from "../helpers/file-system-helper";
import DailyService from "../models/daily-service";

export default class GoogleFitActivityService extends DailyService {
  private activityCode: ActivityType;
  private variables: Variables;

  private readonly baseUri: string = FileSystemHelper.getActivityBaseUri();

  constructor(variables: Variables, activityCode: ActivityType) {
    super();
    this.activityCode = activityCode;
    this.variables = variables;
  }

  getActivityToday = async () => {
    let url = new URL(this.baseUri);

    url.searchParams.append("startTime", this.startOfTodayInISO);
    url.searchParams.append("endTime", this.endOfTodayInISO);
    url.searchParams.append("activityType", this.activityCode.toString());

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.variables.authToken}`,
      },
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  };
}
