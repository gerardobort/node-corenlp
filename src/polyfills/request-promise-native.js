// eslint-disable-next-line no-undef
export default req => fetch(encodeURI(req.uri), {
  ...req,
  withCredentials: true,
})
  .then(response => response.json());
