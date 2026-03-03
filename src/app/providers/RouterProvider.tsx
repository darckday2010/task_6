import { createHashRouter, RouterProvider as ReactRouterProvider } from "react-router-dom";
import { CartsPage } from "@/pages/carts-page/ui/CartsPage";
import { CartDetailsPage } from "@/pages/cart-details-page/ui/CartDetailsPage";

const router = createHashRouter([
	{
		path: "/",
		element: <CartsPage />,
	},
	{
		path: "/carts/:id",
		element: <CartDetailsPage />,
	},
]);

export const RouterProvider = () => {
	return <ReactRouterProvider router={router} />;
};
