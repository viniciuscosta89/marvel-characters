import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface CardLinkProps {
	children: ReactNode;
	onClick?: () => void;
	url: string;
	type: 'link' | 'a';
}

const DefaultLink = styled.span`
	background-color: var(--primary-color);
	border-radius: var(--size-8);
	box-shadow: 0 6px 6px -2px hsl(0deg 0% 0% / 0.5);
	color: var(--text);
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow: hidden;
	text-align: center;
	text-decoration: none;
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

	> span {
		display: flex;
		align-items: center;
		height: 100%;
		padding: var(--size-8);
	}
`;

const RootLink = styled(DefaultLink).attrs({
	as: Link,
})``;

const RootAnchor = styled(DefaultLink).attrs({
	as: 'a',
})``;

export default function CardLink({ children, url, type, onClick }: CardLinkProps) {
	return (
		<>
			{type === 'link' ? (
				<RootLink to={url} onClick={onClick}>
					{children}
				</RootLink>
			) : (
				<RootAnchor href={url} target="_blank" title="Click for more info on Marvel.com">
					{children}
				</RootAnchor>
			)}
		</>
	);
}
