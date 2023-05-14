import FileSystemHelper from "./helpers/file-system-helper";
import AuthHelper from "./helpers/auth-helper";
import tokenStatus from "./types/token-status";

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

const main = async () => {
  const variables = FileSystemHelper.getVariables();
  const authHelper = new AuthHelper(variables);

  await checkTokenNeedsRefresh(authHelper);

  console.log("GOT HERE");
};

main();
