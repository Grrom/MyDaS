import fetch from "node-fetch";
import DailyService from "../models/daily-service";
import aggregateDataSource from "../types/aggregate-data-source";
import FileSystemHelper from "../helpers/file-system-helper";
import DependencyContainer from "./dependency-container";
import Dependencies from "../types/dependencies";
import TokenDetails from "../types/token-details";

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
    const container = DependencyContainer.getInstance();
    const logger = container.resolve(Dependencies.logger);

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
