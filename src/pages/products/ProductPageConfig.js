import AddProductPage from "./AddProductPage";
import AllProductsPage from "./AllProductsPage";

export const ProductPageConfig = {
  routes: [
    {
      path: "/products",
      exact: true,
      element: <AllProductsPage />,
    },
    {
      path: "/product/add-product",
      exact: true,
      element: <AddProductPage />,
    },
    {
      path: "/product/:id",
      element: <AddProductPage />,
    },
  ],
};
