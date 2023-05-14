import FileSystemHelper from "./helpers/file-system-helper";
import AuthHelper from "./helpers/auth-helper";

const main = async () => {
  const variables = FileSystemHelper.getVariables();
  const authHelper = new AuthHelper(variables);
  const url = authHelper.generateAuthLink();

  console.log(url.href);
};

main();
