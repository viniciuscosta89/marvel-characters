import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import marvelLogo from '../../assets/marvel-logo.png';

const HeaderGrid = styled.div`
	display: grid;
	grid-template-columns: 8rem 1fr;
	align-items: center;
	padding: var(--size-16);
`;

const Navigation = styled.nav`
	display: flex;
	justify-content: flex-end;

	ul {
		list-style: none;
	}

	a {
		color: var(--text);
		text-decoration: none;

		&:hover,
		&:focus {
			&::after {
				transform: scaleX(1);
			}
		}

		&::after {
			content: '';
			display: block;
			width: 100%;
			height: 2px;
			background-color: var(--primary-color);
			transform: scaleX(0);
			transition: transform 0.3s ease-in-out;
		}
	}
`;

export default function Header() {
	return (
		<header>
			<HeaderGrid>
				<img src={marvelLogo} alt="Marvel logo" />

				<Navigation>
					<ul>
						<li>
							<NavLink to="/">Home</NavLink>
						</li>
					</ul>
				</Navigation>
			</HeaderGrid>
		</header>
	);
}
