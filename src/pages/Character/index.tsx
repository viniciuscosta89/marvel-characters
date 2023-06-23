import { useContext } from 'react';
import { useFullNameCharacter } from '../../hooks/useCharacter';
import { CharacterContext } from '../../contexts/CharacterContext';
import { useCharacterComics } from '../../hooks/useComics';
import { Container } from '../../components/Container';
import styled from 'styled-components';
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

const CharacterPicture = styled.img`
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

const LatestComicsGrid = styled.ul`
	display: grid;
	gap: var(--size-8);
	grid-template-columns: repeat(2, 1fr);
	list-style: none;
	margin-block-end: var(--size-48);

	@media (min-width: 768px) {
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
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

	return (
		<Container>
			{isLoadingCharacter ? (
				<div>Loading character info...</div>
			) : (
				<CharacterInfo>
					<CharacterPicture
						src={`${character?.thumbnail.path}.${character?.thumbnail.extension}`}
						alt={character?.name}
					/>
					<CharacterName>{character?.name}</CharacterName>
					<p>{character?.description || 'No description 🙁'}</p>
				</CharacterInfo>
			)}

			<LatestComicsTitle>Latest Comics</LatestComicsTitle>
			<LatestComicsGrid>
				{isLoadingComics ? (
					<div>Loading latest comics...</div>
				) : (
					characterComics?.data.results.slice(0, 5).map(({ id, title, thumbnail, urls }) => {
						return (
							<LatestComicsItem
								key={id}
								href={urls.filter((url) => url.type === 'detail')[0].url}
								target="_blank"
								title="Click for more info on Marvel.com"
							>
								<img src={`${thumbnail.path}.${thumbnail.extension}`} alt={`${title} cover`} loading="lazy" />
								<span>{title}</span>
							</LatestComicsItem>
						);
					})
				)}
			</LatestComicsGrid>
		</Container>
	);
}
