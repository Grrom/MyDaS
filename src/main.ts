import FileSystemHelper from "./helpers/file-system-helper";
import AuthHelper from "./helpers/auth-helper";
import GoogleFitActivityService from "./services/googlefit-activity-service";
import ActivityType from "./types/activity-types";
import GoogleFitAggregateDataService from "./services/googlefit-aggregate-data-service";
import TokenDetails from "./types/token-details";

const getTodayData = () => {
  const meditation = new GoogleFitActivityService(ActivityType.meditation);

  const sleep = new GoogleFitActivityService(ActivityType.sleep);
  const heartPoints = new GoogleFitAggregateDataService({
    dataSource: {
      dataTypeName: "com.google.heart_minutes",
      dataSourceId:
        "derived:com.google.heart_minutes:com.google.android.gms:merge_heart_minutes",
    },
  });
  const nutrition = new GoogleFitAggregateDataService({
    dataSource: {
      dataTypeName: "com.google.nutrition",
      dataSourceId:
        "derived:com.google.heart_minutes:com.google.android.gms:merge_heart_minutes",
    },
  });

  heartPoints.getAggregateDataToday();
  meditation.getActivityToday();
  sleep.getActivityToday();
};

const main = async () => {
  getTodayData();
};

main();
