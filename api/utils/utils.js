exports.createError = (next, msg, status) => {
  const err = new Error(msg);
  err.status = status ?? 400;
  return next(err);
};

exports.combineJson = (...jsonList) => {
    return Object.assign({}, ...jsonList);
}