import fetch from "node-fetch";
import ActivityType from "../types/activity-types";
import FileSystemHelper from "../helpers/file-system-helper";
import DailyService from "../models/daily-service";
import TokenDetails from "../types/token-details";
import RequestHelper from "../helpers/request-helper";

export default class GoogleFitActivityService extends DailyService {
  private activityCode: ActivityType;

  private readonly baseUri: string =
    "https://www.googleapis.com/fitness/v1/users/me/sessions";

  constructor(activityCode: ActivityType) {
    super();
    this.activityCode = activityCode;
  }

  getActivityToday = async () => {
    let url = new URL(this.baseUri);

    url.searchParams.append("startTime", this.startOfTodayInISO);
    url.searchParams.append("endTime", this.endOfTodayInISO);
    url.searchParams.append("activityType", this.activityCode.toString());

    RequestHelper.get({ url: url })
      .then((res) => res.json())
      .then((json) => console.log(json));
  };
}
