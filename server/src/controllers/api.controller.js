import API from "../models/api.model.js";
import { successResponse } from "../utils/response.handler.js";

export const createAPI = async (req, res, next) => {
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
    next(error);
  }
};

export const getAllAPIs = async (req, res, next) => {
  try {
    const apis = await API.find().populate("author", "name email");

    return successResponse(res, {
      message: "APIs fetched successfully",
      data: apis,
    });
  } catch (error) {
    next(error);
  }
};

export const getAPIById = async (req, res, next) => {
  try {
    const api = await API.findById(req.params.id).populate(
      "author",
      "name email"
    );

    if (!api) {
      const err = new Error("API not found");
      err.status = 404;
      return next(err);
    }

    return successResponse(res, {
      message: "API fetched successfully",
      data: api,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAPI = async (req, res, next) => {
  try {
    let api = await API.findById(req.params.id);

    if (!api) {
      const err = new Error("API not found");
      err.status = 404;
      return next(err);
    }

    if (api.author.toString() !== req.user._id.toString()) {
      const err = new Error("Not authorized");
      err.status = 403;
      return next(err);
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
    next(error);
  }
};

export const deleteAPI = async (req, res, next) => {
  try {
    const api = await API.findById(req.params.id);

    if (!api) {
      const err = new Error("API not found");
      err.status = 404;
      return next(err);
    }

    if (api.author.toString() !== req.user._id.toString()) {
      const err = new Error("Not authorized");
      err.status = 403;
      return next(err);
    }

    await api.deleteOne();

    return successResponse(res, {
      message: "API deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};