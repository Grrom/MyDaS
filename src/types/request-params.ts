enum AuthType {
  pubsub,
  gcalendar,
}

type RequestParams = {
  url: URL;
  body?: object;
};

export { AuthType };
export default RequestParams;
