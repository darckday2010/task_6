import React from "react";
import ReactDOM from "react-dom/client";
import { Global, css } from "@emotion/react";
import { QueryProvider } from "@/app/providers/QueryProvider";
import { RouterProvider } from "@/app/providers/RouterProvider";

const globalStyles = css`
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}
	body {
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
		background-color: #f5f7fa;
		color: #333;
		padding: 20px;
	}
	a {
		color: #007bff;
		text-decoration: none;
	}
	a:hover {
		text-decoration: underline;
	}
`;

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Global styles={globalStyles} />
		<QueryProvider>
			<RouterProvider />
		</QueryProvider>
	</React.StrictMode>,
);
