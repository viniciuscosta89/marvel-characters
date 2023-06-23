import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import styled from 'styled-components';

const Error = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
`;

export default function ErrorPage() {
	const error = useRouteError();
	console.error(error);

	if (!isRouteErrorResponse(error)) {
		return null;
	}

	return (
		<Error>
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<i>{error.statusText || error.error?.message}</i>
			</p>
		</Error>
	);
}
