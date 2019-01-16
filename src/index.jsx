import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "unistore/full/preact"; // For SSR: 'unistore/full/react'
import Routes from "routes/index";

import store from "store/store";

const ClientSideApp = () => {
	return (
		<BrowserRouter location={store.getState().url}>
			<Routes initialRoute={store.getState().url} />
		</BrowserRouter>
	);
};

ReactDOM.render(<ClientSideApp />, document.querySelector("#root"));

// For SSR, use:
// ReactDOM.hydrate(<ClientSideApp />, document.querySelector('#root'));
