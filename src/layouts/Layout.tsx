import styled from 'styled-components';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';

const Wrapper = styled.div`
	display: flex;
	min-height: 100vh;
	flex-direction: column;
	justify-content: flex-start;
`;

const MainSection = styled.main``;

export default function Layout() {
	return (
		<Wrapper>
			<Header />
			<MainSection>
				<Outlet />
			</MainSection>
			<Footer />
		</Wrapper>
	);
}
