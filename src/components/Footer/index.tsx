import styled from 'styled-components';
import { Container } from '../Container';

const FooterEl = styled.footer`
	background-color: ${({ theme }) => theme.colors.red[800]};
	margin-block-start: auto;
	padding-block: var(--size-16);
`;

const FooterGrid = styled.div`
	display: grid;
	text-align: center;
	color: ${({ theme }) => theme.colors.white};

	a {
		color: var(--primary-color);
		font-weight: var(--fw-bold);
		text-decoration: none;
	}
`;

export default function Footer() {
	return (
		<FooterEl>
			<Container>
				<FooterGrid>
					<p>Data provided by Marvel. © 2014 Marvel</p>
					<p>
						Developed by{' '}
						<a href="https://github.com/viniciuscosta89" target="_blank">
							Vinicius Costa
						</a>
					</p>
				</FooterGrid>
			</Container>
		</FooterEl>
	);
}
