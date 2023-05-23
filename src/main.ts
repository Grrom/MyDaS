import FileSystemHelper from "./helpers/file-system-helper";
import AuthHelper from "./helpers/auth-helper";
import GoogleFitActivityService from "./services/googlefit-activity-service";
import ActivityType from "./types/activity-types";
import Variables from "./types/variables";

const getTodayData = (variables: Variables) => {
  const meditation = new GoogleFitActivityService(
    variables,
    ActivityType.meditation
  );
  const sleep = new GoogleFitActivityService(variables, ActivityType.sleep);
  const startOfToday = new Date();
  const endOfToday = new Date();

  startOfToday.setHours(0, 0, 0, 0);
  endOfToday.setHours(23, 59, 59, 999);

  const startOfTodayMilliseconds = startOfToday.getTime();
  const endOfTodayMilliseconds = endOfToday.getTime();

  const startOfTodayInISO = startOfToday.toISOString();
  const endOfTodayInISO = endOfToday.toISOString();

  meditation.getActivityToday(startOfTodayInISO, endOfTodayInISO);
  sleep.getActivityToday(startOfTodayInISO, endOfTodayInISO);
};

const main = async () => {
  let variables = FileSystemHelper.getVariables(); // TODO: turn this into a singleton
  let authHelper = new AuthHelper(variables); // TODO: turn this into a singleton

  if (await authHelper.needsToReInitializeToken(authHelper)) {
    // TODO: after turning authHelper into a singleton decouple this from the main function and invoke when needed
    variables = FileSystemHelper.getVariables();
    authHelper = new AuthHelper(variables);
  }

  getTodayData(variables);
};

main();
