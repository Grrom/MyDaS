import express from "express";
import FileSystemHelper from "./helpers/file-system-helper";
import AuthHelper from "./helpers/auth-helper";

const app = express();

const PORT = FileSystemHelper.getAuthListenerPort();

app.get("/", async (req, res) => {
  const authHelper = new AuthHelper(FileSystemHelper.getVariables());
  FileSystemHelper.saveAuthToken(
    await authHelper.exchangeAuthCodeForTokens(req.query.code as string)
  );

  res.send("Authentication Successful!");
});

app.listen(PORT, () => {
  console.log(`⚡Server is running here 👉 http://localhost:${PORT}`);
});
