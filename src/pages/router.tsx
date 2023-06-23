import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from './error-page';
import Home from './Home';
import Character from './Character';
import Layout from '../layouts/Layout';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				Component: Home,
			},
			{
				path: '/character/:characterName',
				Component: Character,
				errorElement: <ErrorPage />,
			},
		],
	},
]);
