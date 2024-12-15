import response from "../utils/response.js";

const checkAccessController = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log("userId", userId);
    const { uid } = req.params;
    console.log("uid", uid);
    if (uid !== userId) return response(res, 401, false, "Unauthorized access");

    return response(res, 200, true, "Access granted");
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

export { checkAccessController };
