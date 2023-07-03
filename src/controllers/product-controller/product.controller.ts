import logger from "@utils/logger";
import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import db from "@models/index";
import { seedProducts } from "@src/helper/product-db";
const Product = db.productdb;

interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}
export const ListProduct = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Extract the query parameters
    const { before, order } = req.query;
    const after: string = req.query.after?.toString() || "";
    const first: string = req.query.first?.toString() || "";
    const last: string = req.query.last?.toString() || "";
    const sort: string = req.query.sort?.toString() || "";

    // Build the pagination options
    const paginationOptions: any = {};

    // if (first) {
    //   paginationOptions.limit = parseInt(first, 10);
    // }

    // if (last) {
    //   paginationOptions.limit = parseInt(last, 10);
    // }

    if (after) {
      console.log(after);
      paginationOptions.startAfter = { price_id: after };
    }

    if (before) {
      paginationOptions.startBefore = { price_id: before };
    }

    // Build the sorting options
    const sortOptions: any = {};

    if (sort && order) {
      sortOptions[sort] = order === "desc" ? -1 : 1;
    }

    // Query the products
    const products = await Product.find({}, null, paginationOptions).sort(
      sortOptions
    );

    // Create the response object
    const response = {
      products: products.map((product) => ({
        product,
        // product_ids: product._id,
        cursor: generateOpaqueCursor(product._id),
      })),
      pageInfo: {
        startCursor: generateOpaqueCursor(products[0]?._id),
        endCursor: generateOpaqueCursor(products[products.length - 1]?._id),
        hasNextPage: false, // Modify this based on your pagination logic
        hasPreviousPage: false, // Modify this based on your pagination logic
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
  // Logic to generate an opaque cursor based on the ID
  // You can use any method or algorithm to generate a unique cursor
  return `cursor_${id}`;
};

export const CreateProduct = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, price } = req.body;
    const user = req.user;
    const newProduct = await Product.create({
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
