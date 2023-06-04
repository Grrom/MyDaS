import FileSystemHelper from "./helpers/file-system-helper";
import AuthHelper from "./helpers/auth-helper";
import GoogleFitActivityService from "./services/googlefit-activity-service";
import ActivityType from "./types/activity-types";
import GoogleFitAggregateDataService from "./services/googlefit-aggregate-data-service";
import TokenDetails from "./types/token-details";

const getTodayData = (tokenDetails: TokenDetails) => {
  const meditation = new GoogleFitActivityService(
    tokenDetails, //TODO: token details should be in request helper only
    ActivityType.meditation
  );

  const sleep = new GoogleFitActivityService(tokenDetails, ActivityType.sleep);
  const heartPoints = new GoogleFitAggregateDataService({
    tokenDetails: tokenDetails,
    dataSource: {
      dataTypeName: "com.google.heart_minutes",
      dataSourceId:
        "derived:com.google.heart_minutes:com.google.android.gms:merge_heart_minutes",
    },
  });

  heartPoints.getAggregateDataToday();
  meditation.getActivityToday();
  sleep.getActivityToday();
};

const main = async () => {
  let tokenDetails = FileSystemHelper.getTokenDetails(); // TODO: turn this into a singleton
  let authHelper = AuthHelper.getInstance(); // TODO: turn this into a singleton

  if (await AuthHelper.needsToReInitializeToken(authHelper)) {
    // TODO: after turning authHelper into a singleton decouple this from the main function and invoke when needed
    tokenDetails = FileSystemHelper.getTokenDetails();
    authHelper = AuthHelper.getInstance();
  }

  getTodayData(tokenDetails);
};

main();
