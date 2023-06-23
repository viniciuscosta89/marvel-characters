import { useState, FocusEvent, KeyboardEvent, useContext } from 'react';
import { useNameStartsWithCharacter } from '../../hooks/useCharacter';
import { CharacterContext } from '../../contexts/CharacterContext';
import styled from 'styled-components';
import { Comic } from '../../components/Comic';

const InputWrapper = styled.div`
	background-color: ${({ theme }) => theme.colors.red[400]};
	box-shadow: 0 2px 8px 2px hsl(357.96deg 84.43% 52.16% / 0.5);
	display: flex;
	flex-direction: column;
	padding: var(--size-24) var(--size-16);
	position: relative;
`;

const Label = styled.label`
	position: absolute;
	color: ${({ theme }) => theme.colors.black[400]};
	font-size: var(--step--1);
	pointer-events: none;
	transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
	z-index: 0;
`;

const Input = styled.input`
	background-color: ${({ theme }) => theme.colors.red[400]};
	border: 2px solid transparent;
	color: ${({ theme }) => theme.colors.white};
	font-size: var(--step-0);
	position: relative;
	transition: all 0.5s ease-in-out;

	&:focus-within,
	&:focus,
	&:valid {
		border-bottom-color: ${({ theme }) => theme.colors.white};

		+ Label {
			color: ${({ theme }) => theme.colors.white};
			font-size: var(--step--2);
			transform: translateY(-100%);
		}
	}
`;

const ComicsGrid = styled.ul`
	display: grid;
	list-style: none;
	gap: var(--size-16);
	padding: var(--size-48) var(--size-32);

	@media (width >= 768px) {
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	}

	> li {
		display: flex;
	}
`;

const GridSpan = styled.div`
	grid-column: span 3;
`;

export default function Home() {
	const [character, setCharacter] = useState('');
	const { handleCharacterInfo } = useContext(CharacterContext);

	const handleBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
		setCharacter(e.target.value);
	};

	const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			setCharacter((e.target as HTMLInputElement).value);
		}
	};

	const handleClick = (characterInfo: { name: string; id: number }) => {
		handleCharacterInfo(characterInfo);
	};

	const { data: charactersList, isLoading, isSuccess } = useNameStartsWithCharacter(character);

	return (
		<>
			<InputWrapper>
				<Input onBlur={handleBlur} onKeyUp={handleKeyUp} type="text" required />
				<Label>Name starts with...</Label>
			</InputWrapper>

			<ComicsGrid>
				{character && isLoading ? <div>Loading characters...</div> : null}

				{!character && <GridSpan>Type your character's name above</GridSpan>}

				{isSuccess && charactersList?.data.results.length === 0 ? (
					<div>🚫 Try another name...</div>
				) : (
					charactersList?.data.results.map((character) => (
						<li key={character.id}>
							<Comic
								to={`character/${character.name
									.toLowerCase()
									.replace(/[^a-zA-Z0-9 ]/gi, '')
									.replace(/ /gi, '-')}`}
								onClick={() => handleClick({ name: character.name, id: character.id })}
							>
								<img
									src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
									alt={character?.name}
									loading="lazy"
								/>
								<span>{character?.name}</span>
							</Comic>
						</li>
					))
				)}
			</ComicsGrid>
		</>
	);
}
