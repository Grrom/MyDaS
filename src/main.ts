import FileSystemHelper from "./helpers/file-system-helper";
import AuthHelper from "./helpers/auth-helper";
import tokenStatus from "./types/token-status";
import MeditationService from "./services/meditation-service";

const checkTokenNeedsRefresh = async (authHelper: AuthHelper) => {
  switch (authHelper.checkTokenStatus()) {
    case tokenStatus.expired:
      await authHelper.refreshAuthToken();
      break;
    case tokenStatus.expiringSoon:
      authHelper.refreshAuthToken();
      break;
    case tokenStatus.active:
    default:
  }
};

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
  const variables = FileSystemHelper.getVariables();
  const authHelper = new AuthHelper(variables);

  await checkTokenNeedsRefresh(authHelper);

  const meditation = new MeditationService(variables);

  getTodayData({ meditation: meditation });

  console.log("GOT HERE");
};

main();
