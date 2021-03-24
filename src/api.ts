//TODO: (go to origin server and proxy?)
console.assert(process.env.REACT_APP_API_BASE, "Need api base env var");
const apiBaseURL = process.env.REACT_APP_API_BASE;
export default apiBaseURL;