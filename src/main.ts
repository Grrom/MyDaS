import FileSystemHelper from "./helpers/file-system-helper";
import AuthHelper from "./helpers/auth-helper";
import tokenStatus from "./types/token-status";
import MeditationService from "./services/meditation-service";

const getTodayData = ({ meditation }: { meditation: MeditationService }) => {
  const startOfToday = new Date();
  const endOfToday = new Date();

  startOfToday.setHours(0, 0, 0, 0);
  endOfToday.setHours(23, 59, 59, 999);

  const startOfTodayMilliseconds = startOfToday.getTime();
  const endOfTodayMilliseconds = endOfToday.getTime();

  const startOfTodayInISO = startOfToday.toISOString();
  const endOfTodayInISO = endOfToday.toISOString();

  meditation.getMeditations(startOfTodayInISO, endOfTodayInISO);
};

const main = async () => {
  let variables = FileSystemHelper.getVariables();
  let authHelper = new AuthHelper(variables);

  if (await authHelper.needsToReInitializeToken(authHelper)) {
    variables = FileSystemHelper.getVariables();
    authHelper = new AuthHelper(variables);
  }

  const meditation = new MeditationService(variables);

  getTodayData({ meditation: meditation });
};

main();
