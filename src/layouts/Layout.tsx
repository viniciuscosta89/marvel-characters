import styled from 'styled-components';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Wrapper = styled(motion.div)`
	display: flex;
	min-height: 100vh;
	flex-direction: column;
	justify-content: flex-start;
`;

const MainSection = styled.main``;

export default function Layout() {
	return (
		<AnimatePresence mode={'wait'}>
			<Wrapper>
				<Header />
				<MainSection>
					<Outlet />
				</MainSection>
				<Footer />
			</Wrapper>
		</AnimatePresence>
	);
}
