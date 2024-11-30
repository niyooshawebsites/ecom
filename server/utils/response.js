const response = (success, msg, data = {}) => {
  return res.status(500).json({
    success,
    msg,
    data,
  });
};

export default response;
