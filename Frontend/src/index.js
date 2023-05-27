import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'

import AppContextProvider from 'context-global/store';
import AppRoutes from 'routing/AppRoutes';
import TopPanel from 'components/components-global/TopPanel';

import './index.css';
import { indexStyles as styles } from 'indexStyles';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	// <React.StrictMode>
		<AppContextProvider>
		<BrowserRouter basename="/">
		<styles.Body>
			<TopPanel/>
			<styles.MainApp>
				<AppRoutes/>
			</styles.MainApp>
		</styles.Body>
		</BrowserRouter>
		</AppContextProvider>
//   </React.StrictMode>
);


