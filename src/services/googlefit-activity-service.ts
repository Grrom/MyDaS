import fetch from "node-fetch";
import ActivityType from "../types/activity-types";
import FileSystemHelper from "../helpers/file-system-helper";
import DailyService from "../models/daily-service";
import TokenDetails from "../types/token-details";

export default class GoogleFitActivityService extends DailyService {
  private activityCode: ActivityType;
  private tokenDetails: TokenDetails;

  private readonly baseUri: string = FileSystemHelper.getActivityBaseUri();

  constructor(tokenDetails: TokenDetails, activityCode: ActivityType) {
    super();
    this.activityCode = activityCode;
    this.tokenDetails = tokenDetails;
  }

  getActivityToday = async () => {
    let url = new URL(this.baseUri);

    url.searchParams.append("startTime", this.startOfTodayInISO);
    url.searchParams.append("endTime", this.endOfTodayInISO);
    url.searchParams.append("activityType", this.activityCode.toString());

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.tokenDetails.authToken}`,
      },
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  };
}
