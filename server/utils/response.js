const response = (res, success, msg, data = {}) => {
  try {
    return res.status(500).json({
      success,
      msg,
      data,
    });
  } catch (err) {
    console.error(err.message);
  }
};

export default response;
