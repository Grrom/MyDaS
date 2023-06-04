import fetch from "node-fetch";
import DailyService from "../models/daily-service";
import aggregateDataSource from "../types/aggregate-data-source";
import TokenDetails from "../types/token-details";
import LogsHelper from "../helpers/logs-helper";

export default class GoogleFitAggregateDataService extends DailyService {
  private tokenDetails: TokenDetails;
  private dataTypeName: string;
  private dataSourceId: string;

  private readonly baseUri: string =
    "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate";

  constructor({
    tokenDetails,
    dataSource,
  }: {
    tokenDetails: TokenDetails;
    dataSource: aggregateDataSource;
  }) {
    super();
    this.tokenDetails = tokenDetails;
    this.dataTypeName = dataSource.dataTypeName;
    this.dataSourceId = dataSource.dataSourceId;
  }

  getAggregateDataToday = async () => {
    const logger = LogsHelper.getInstance().getLogger();

    logger.info("Getting aggregate data for today.");
    let url = new URL(this.baseUri);

    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.tokenDetails.authToken}`,
      },
      body: JSON.stringify({
        aggregateBy: [
          {
            dataTypeName: this.dataTypeName,
            dataSourceId: this.dataSourceId,
          },
        ],
        startTimeMillis: this.startOfTodayInMilliseconds,
        endTimeMillis: this.endOfTodayInMilliseconds,
      }),
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  };
}
