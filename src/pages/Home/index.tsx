import { useState, FocusEvent, KeyboardEvent, useContext } from 'react';
import { useNameStartsWithCharacter } from '../../hooks/useCharacter';
import { CharacterContext } from '../../contexts/CharacterContext';
import styled from 'styled-components';
import { Card } from '../../components/Card';
import { motion, Variants } from 'framer-motion';

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

const ComicsGrid = styled(motion.ul)`
	display: grid;
	list-style: none;
	gap: var(--size-16);
	padding: var(--size-48) var(--size-32);
	grid-template-columns: repeat(auto-fill, minmax(min(100%, 200px), 1fr));

	li {
		display: flex;
	}
`;

const GridSpan = styled(motion.div)`
	grid-column: span 3;
`;

export default function Home() {
	const [character, setCharacter] = useState('');
	const { handleCharacterInfo } = useContext(CharacterContext);

	const previousSearchCharacter = sessionStorage.getItem('searchCharacter');

	if (!character && previousSearchCharacter) {
		setCharacter(previousSearchCharacter);
	}

	const handleBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
		setCharacter(e.target.value);
		sessionStorage.setItem('searchCharacter', e.target.value);
	};

	const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			setCharacter((e.target as HTMLInputElement).value);
			sessionStorage.setItem('searchCharacter', (e.target as HTMLInputElement).value);
		}
	};

	const handleClick = (characterInfo: { name: string; id: number }) => {
		handleCharacterInfo(characterInfo);
	};

	const { data: charactersList, isLoading, isSuccess } = useNameStartsWithCharacter(character);

	// Framer Motion Variants
	const listVariants: Variants = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants: Variants = {
		hidden: {
			opacity: 0,
			y: -150,
		},
		show: {
			opacity: 1,
			y: 0,
		},
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 0.25, duration: 0.5, ease: 'easeOut' }}
			exit={{ opacity: 0 }}
		>
			<InputWrapper>
				<Input id="search" onBlur={handleBlur} onKeyUp={handleKeyUp} type="search" required />
				<Label htmlFor="search">Name starts with...</Label>
			</InputWrapper>

			{charactersList && (
				<ComicsGrid variants={listVariants} initial="hidden" animate="show">
					{isSuccess && charactersList.data.results.length === 0 ? (
						<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
							🚫 Try another name...
						</motion.div>
					) : (
						charactersList.data.results.map((character) => (
							<motion.li key={character.id} variants={itemVariants}>
								<Card.Root>
									<Card.Link
										type="link"
										url={`character/${character.name
											.toLowerCase()
											.replace(/[^a-zA-Z0-9 ]/gi, '')
											.replace(/ /gi, '-')}`}
										onClick={() => handleClick({ name: character.name, id: character.id })}
									>
										<Card.Image
											src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
											alt={character?.name}
											aspectRatio="3 / 4"
										/>

										<Card.Title text={character?.name} />
									</Card.Link>
								</Card.Root>
							</motion.li>
						))
					)}
				</ComicsGrid>
			)}

			{character && isLoading && (
				<ComicsGrid>
					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
						Loading characters...
					</motion.div>
				</ComicsGrid>
			)}

			{!character && (
				<ComicsGrid>
					<GridSpan initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
						Type your character's name above
					</GridSpan>
				</ComicsGrid>
			)}
		</motion.div>
	);
}
