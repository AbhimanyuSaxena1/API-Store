import API from "../models/api.model.js";
import { successResponse, errorResponse } from "../utils/response.handler.js";

export const createAPI = async (req, res) => {
  try {
    const { title, description, baseUrl, category } = req.body;

    const api = await API.create({
      title,
      description,
      baseUrl,
      category,
      author: req.user._id,
    });

    return successResponse(res, {
      status: 201,
      message: "API created successfully",
      data: api,
    });
  } catch (error) {
    return errorResponse(res, {
      message: error.message,
    });
  }
};

export const getAllAPIs = async (req, res) => {
  try {
    const apis = await API.find().populate("author", "name email");

    return successResponse(res, {
      message: "APIs fetched successfully",
      data: apis,
    });
  } catch (error) {
    return errorResponse(res, {
      message: error.message,
    });
  }
};

export const getAPIById = async (req, res) => {
  try {
    const api = await API.findById(req.params.id).populate(
      "author",
      "name email"
    );

    if (!api) {
      return errorResponse(res, {
        status: 404,
        message: "API not found",
      });
    }

    return successResponse(res, {
      message: "API fetched successfully",
      data: api,
    });
  } catch (error) {
    return errorResponse(res, {
      message: error.message,
    });
  }
};

export const updateAPI = async (req, res) => {
  try {
    let api = await API.findById(req.params.id);

    if (!api) {
      return errorResponse(res, {
        status: 404,
        message: "API not found",
      });
    }

    if (api.author.toString() !== req.user._id.toString()) {
      return errorResponse(res, {
        status: 403,
        message: "Not authorized",
      });
    }

    api = await API.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return successResponse(res, {
      message: "API updated successfully",
      data: api,
    });
  } catch (error) {
    return errorResponse(res, {
      message: error.message,
    });
  }
};

export const deleteAPI = async (req, res) => {
  try {
    const api = await API.findById(req.params.id);

    if (!api) {
      return errorResponse(res, {
        status: 404,
        message: "API not found",
      });
    }

    if (api.author.toString() !== req.user._id.toString()) {
      return errorResponse(res, {
        status: 403,
        message: "Not authorized",
      });
    }

    await api.deleteOne();

    return successResponse(res, {
      message: "API deleted successfully",
    });
  } catch (error) {
    return errorResponse(res, {
      message: error.message,
    });
  }
};