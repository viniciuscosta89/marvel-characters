import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Comic = styled(Link)`
	background-color: var(--primary-color);
	border-radius: var(--size-8);
	box-shadow: 0 6px 6px -2px hsl(0deg 0% 0% / 0.5);
	color: var(--text);
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	text-decoration: none;
	overflow: hidden;
	transition: all 0.5s ease-in-out;
	width: 100%;

	&:hover,
	&:focus {
		box-shadow: 0 4px 8px -2px hsl(0deg 0% 0% / 0.3);
		color: var(--text-inverse);
		transform: scale(1.05);

		> img {
			filter: grayscale(1);
		}
	}

	> img {
		object-fit: cover;
		object-position: top center;
		width: 100%;
		aspect-ratio: 3 / 4;
		transition: filter 0.5s ease-in-out;
	}

	> span {
		display: flex;
		align-items: center;
		height: 100%;
		padding: var(--size-8);
	}
`;
