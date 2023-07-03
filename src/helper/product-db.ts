import db from "@models/index";
const Product = db.productdb;

export const seedProducts = async (): Promise<void> => {
  try {
    // Define the product data
    const products = Array.from({ length: 50 }, (_, index) => ({
      name: `Product ${index + 1}`,
      price: "10.99", // You can set the desired price here
    }));

    // Create the products
    await Product.create(products);

    console.log("Products seeded successfully");
  } catch (error) {
    console.error("Error seeding products:", error);
  }
};
