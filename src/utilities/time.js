function convertFromEpoch(epoch) {
  debugger;
  return (epoch - (epoch % 1000)) / 1000
}

module.exports = {
  convertFromEpoch,
};