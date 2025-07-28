import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'

import AppContextProvider from './context-global/store';
import AppRoutes from './routing/AppRoutes';
import TopPanel from './components/components-general/TopPanel';

import './index.css';
import styled from './index.styled';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	// <React.StrictMode>
	<AppContextProvider>
		<BrowserRouter basename="/">
			<styled.Body>{/* So this is a main div, whole box of application, everything that user sees */}
				<TopPanel />{/*Panel that includes login info, current page context and navigation */}
				<styled.MainApp>{/*a box that has the app and all the scrolling inside it */}
					<AppRoutes />
				</styled.MainApp>
			</styled.Body>
		</BrowserRouter>
	</AppContextProvider>
	//   </React.StrictMode>
);


