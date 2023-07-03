import logger from "@utils/logger";
import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import db from "@models/index";
import mongoose from "mongoose";
import { seedProducts } from "@src/helper/product-db";
const Product = db.productdb;

interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}
interface ProductResponse {
  product: any; // Update the type of the product object with your product schema
  cursor: string;
}

interface PageInfo {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalCount: number;
}

interface ListProductResponse {
  products: ProductResponse[];
  pageInfo: PageInfo;
}

export const ListProduct = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log(req.params.userId);
    const { first, last, after, before, order } = req.query;
    const userId = req.params.userId;
    const user = req.user;
    const sort: string = req.query.sort?.toString() || "";

    // Create the filter based on the cursor, user ID, and sort parameters
    const filter: any = {
      user: userId, // Filter by the user ID
    };
    if (after) {
      filter._id = { $gt: after };
    } else if (before) {
      filter._id = { $lt: before };
    }

    // Fetch the products from the database with pagination and sorting
    const query = Product.find(filter)
      .sort({ [sort]: order === "desc" ? -1 : 1 })
      .limit(Number(first || last));

    const products = await query.exec();

    // Generate cursors for pagination
    const startCursor = products.length > 0 ? products[0]._id.toString() : "";
    const endCursor =
      products.length > 0 ? products[products.length - 1]._id.toString() : "";

    const hasNextPage = !!after || products.length > Number(first || last);
    const hasPreviousPage = !!before;

    const totalCount = await Product.countDocuments(filter);

    const productResponse: ProductResponse[] = products.map((product) => ({
      product,
      cursor: product._id.toString(),
    }));

    const pageInfo: PageInfo = {
      startCursor,
      endCursor,
      hasNextPage,
      hasPreviousPage,
      totalCount,
    };

    const response: ListProductResponse = {
      products: productResponse,
      pageInfo,
    };

    res.json(response);
  } catch (error: unknown) {
    logger.error("Error in ListProduct:", error);
    next(error);
  }
};
// Test 1 just for backuo data no actual route
export const ListProduct2 = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Extract the query parameters
    const { order } = req.query;
    const after: string = req.query.after?.toString() || "";
    const before: string = req.query.before?.toString() || "";
    console.log(before);

    const first: string = req.query.first?.toString() || "";
    const last: string = req.query.last?.toString() || "";
    const sort: string = req.query.sort?.toString() || "";

    // Build the pagination options
    const paginationOptions: any = {};

    if (first) {
      paginationOptions.limit = parseInt(first, 10);
    }

    if (last) {
      paginationOptions.limit = parseInt(last, 10);
    }

    if (after) {
      paginationOptions.startAfter = new mongoose.Types.ObjectId(after);
    }

    if (before) {
      paginationOptions.startBefore = new mongoose.Types.ObjectId(before);
    }

    // Build the sorting options
    const sortOptions: any = {};

    if (sort && order) {
      sortOptions[sort] = order === "desc" ? -1 : 1;
    }
    console.log(before);
    console.log(paginationOptions.startBefore);
    // Query the products
    const products = await Product.find({}, null, paginationOptions).sort(
      sortOptions
    );

    // Determine the values of hasNextPage and hasPreviousPage
    const hasNextPage = products.length === paginationOptions.limit;
    const hasPreviousPage = paginationOptions.startBefore !== undefined;

    // Create the response object
    const response = {
      products: products.map((product) => ({
        product,
        cursor: generateOpaqueCursor(product.id),
      })),
      pageInfo: {
        startCursor: generateOpaqueCursor(products[0]?.id),
        endCursor: generateOpaqueCursor(products[products.length - 1]?.id),
        hasNextPage,
        hasPreviousPage,
        totalCount: products.length,
      },
    };

    res.json(response);
  } catch (error: unknown) {
    logger.error("Error in ListProduct:", error);
    next(error);
  }
};
// Helper function to generate an opaque cursor
const generateOpaqueCursor = (id: string): string => {
  return `cursor_${id}`;
};

export const CreateProduct = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    seedProducts();
    const { name, price } = req.body;
    const user = req.user;
    console.log(user.userId);
    const newProduct = await Product.create({
      user: user.userId,
      name,
      price,
    });

    res.json(newProduct);
  } catch (error: unknown) {
    next(error);
  }
};

export const UpdateProduct = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user;
    console.log(user);

    const { id } = req.params;

    const { name, price } = req.body;

    const product = await Product.findById(id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    product.name = name;
    product.price = price;

    await product.save();

    res.json(product);
  } catch (error: unknown) {
    logger.error("Error in UpdateProduct:", error);
    next(error);
  }
};

export const DeleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Extract the required data from the request parameters
    const { id } = req.params;

    // Find and delete the product
    const deletedProduct = await Product.findOneAndDelete({ _id: id });

    if (!deletedProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.json({ message: "Product deleted successfully", deletedProduct });
  } catch (error: unknown) {
    logger.error("Error in DeleteProduct:", error);
    next(error);
  }
};
