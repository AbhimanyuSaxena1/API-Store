export const successResponse = (
  res,
  {
    status = 200,
    message = "Success",
    data = null,
    user = null,
    token = null,
  } = {}
) => {
  return res.status(status).json({
    success: true,
    message,
    ...(data && { data }),
    ...(user && { user }),
    ...(token && { token }),
  });
};

export const errorResponse = (
  res,
  {
    status = 500,
    message = "Something went wrong",
    error = null,
  } = {}
) => {
  return res.status(status).json({
    success: false,
    message,
    ...(error && { error }),
  });
};