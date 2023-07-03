import { ReactNode } from 'react';
import styled from 'styled-components';

interface CardRootProps {
	children: ReactNode;
}

const Root = styled.article`
	display: flex;
`;

export default function CardRoot({ children }: CardRootProps) {
	return <Root>{children}</Root>;
}
