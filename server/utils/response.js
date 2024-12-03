const response = (
  res,
  statusCode,
  success,
  msg,
  data = null,
  totalPagesCount = null
) => {
  try {
    return res.status(statusCode).json({
      success,
      msg,
      data,
      totalPagesCount,
    });
  } catch (err) {
    console.error(err.message);
  }
};

export default response;
