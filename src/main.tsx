import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import QueryProvider from './providers/QueryProvider.tsx';

import { router } from './pages/router.tsx';
import GlobalStyles from './styles/GlobalStyles.ts';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/Theme';
import { CharacterProvider } from './contexts/CharacterContext.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<QueryProvider>
			<ThemeProvider theme={theme}>
				<CharacterProvider>
					<GlobalStyles />
					<RouterProvider router={router} />
				</CharacterProvider>
			</ThemeProvider>
		</QueryProvider>
	</React.StrictMode>
);
