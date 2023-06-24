import { useContext } from 'react';
import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';
import { useFullNameCharacter } from '../../hooks/useCharacter';
import { CharacterContext } from '../../contexts/CharacterContext';
import { useCharacterComics } from '../../hooks/useComics';
import { Container } from '../../components/Container';
import { Comic } from '../../components/Comic';

interface CharacterInfoType {
	name: string;
	id: number;
}

const CharacterInfo = styled.div`
	display: grid;
	gap: var(--size-8);
	grid-template-rows: auto 1fr;
	align-items: flex-start;
	margin-block-end: var(--size-32);

	@media (min-width: 768px) {
		gap: var(--size-16);
		grid-template-columns: 1fr 1fr;
	}
`;

const CharacterPicture = styled(motion.img)`
	border-radius: var(--size-8);
	box-shadow: 0 8px 16px -4px hsl(0deg 0% 0% / 0.6);
	grid-row: span 2;
`;

const CharacterName = styled.h1`
	font-size: var(--fs-600);
	line-height: normal;
`;

const LatestComicsTitle = styled.h2`
	font-size: var(--fs-500);
	margin-block-end: var(--size-16);
`;

const LatestComicsGrid = styled(motion.ul)`
	display: grid;
	gap: var(--size-8);
	grid-template-columns: repeat(2, 1fr);
	list-style: none;
	margin-block-end: var(--size-48);

	@media (min-width: 768px) {
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	}

	> li {
		display: flex;
	}
`;

const LatestComicsItem = styled(Comic).attrs({
	as: 'a',
})`
	> img {
		aspect-ratio: 663 / 1024;
	}
`;

export default function Character() {
	const { characterInfo } = useContext(CharacterContext);

	const characterInfoFromStorage: string = localStorage.getItem('characterInfo') || '';
	const characterInfoObjectFromStorage: CharacterInfoType = JSON.parse(characterInfoFromStorage);

	const { data: characterComics, isLoading: isLoadingComics } = useCharacterComics(
		characterInfoObjectFromStorage.id || characterInfo.id
	);
	const { data: fetchCharacter, isLoading: isLoadingCharacter } = useFullNameCharacter(
		characterInfoObjectFromStorage.name || characterInfo.name
	);

	const character = fetchCharacter?.data.results[0];
	document.title = `${character?.name} | Marvel Characters`;

	// Framer Motion

	const listVariants: Variants = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				type: 'spring',
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
			type: 'spring',
		},
	};

	const ImgVariants: Variants = {
		hidden: {
			opacity: 0,
			scale: 0.5,
		},
		show: {
			opacity: 1,
			scale: 1,
			type: 'spring',
			transition: {
				delay: 0.8,
			},
		},
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 0.25, duration: 0.5, ease: 'easeOut' }}
			exit={{ opacity: 0 }}
		>
			<Container>
				{isLoadingCharacter ? (
					<div>Loading character info...</div>
				) : (
					<CharacterInfo>
						<CharacterPicture
							src={`${character?.thumbnail.path}.${character?.thumbnail.extension}`}
							alt={character?.name}
							initial={{ opacity: 0, scale: 1.5 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: 0.25, duration: 0.5, ease: 'easeInOut' }}
							exit={{ opacity: 0, scale: 1.5 }}
						/>
						<CharacterName>{character?.name}</CharacterName>
						<p>{character?.description || 'No description 🙁'}</p>
					</CharacterInfo>
				)}

				<LatestComicsTitle>Latest Comics</LatestComicsTitle>
				{characterComics && (
					<LatestComicsGrid variants={listVariants} initial="hidden" animate="show">
						{characterComics?.data.results.slice(0, 5).map(({ id, title, thumbnail, urls }) => (
							<motion.li key={id} variants={itemVariants}>
								<LatestComicsItem
									href={urls.filter((url) => url.type === 'detail')[0].url}
									target="_blank"
									title="Click for more info on Marvel.com"
								>
									<motion.img
										src={`${thumbnail.path}.${thumbnail.extension}`}
										alt={`${title} cover`}
										loading="lazy"
										variants={ImgVariants}
									/>
									<span>{title}</span>
								</LatestComicsItem>
							</motion.li>
						))}
					</LatestComicsGrid>
				)}

				{isLoadingComics && (
					<LatestComicsGrid>
						<div>Loading latest comics...</div>
					</LatestComicsGrid>
				)}

				{characterComics?.data.results.length === 0 && (
					<LatestComicsGrid>
						<p>No comics for this character 😅</p>
					</LatestComicsGrid>
				)}
			</Container>
		</motion.div>
	);
}
