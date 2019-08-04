export function customeErrMessage(cb, message) {
  cb(message);
  setTimeout(() => {
    cb("");
  }, 5000);
}
