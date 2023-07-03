import fetch from "node-fetch";
import DailyService from "../models/daily-service";
import aggregateDataSource from "../types/aggregate-data-source";
import LogsHelper from "../helpers/logs-helper";
import RequestHelper from "../helpers/request-helper";

export default class GoogleFitAggregateDataService extends DailyService {
  private dataTypeName: string;
  private dataSourceId: string;

  private readonly baseUri: string =
    "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate";

  constructor({ dataSource }: { dataSource: aggregateDataSource }) {
    super();
    this.dataTypeName = dataSource.dataTypeName;
    this.dataSourceId = dataSource.dataSourceId;
  }

  getAggregateDataToday = async () => {
    const logger = LogsHelper.getInstance().getLogger();

    logger.info("Getting aggregate data for today.");
    let url = new URL(this.baseUri);

    RequestHelper.post({
      url: url,
      body: {
        aggregateBy: [
          {
            dataTypeName: this.dataTypeName,
            dataSourceId: this.dataSourceId,
          },
        ],
        startTimeMillis: this.startOfTodayInMilliseconds,
        endTimeMillis: this.endOfTodayInMilliseconds,
      },
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  };
}
