import styled from 'styled-components';

interface CardTitleProps {
	text: string;
}

const Text = styled.span`
	display: flex;
	align-items: center;
	height: 100%;
	padding: var(--size-8);
`;

export default function CardTitle({ text }: CardTitleProps) {
	return <Text>{text}</Text>;
}
