import { useQuery } from '@tanstack/react-query';
import md5 from 'blueimp-md5';
import { Character } from '../types/character';
const { VITE_PUBLIC_KEY, VITE_PRIVATE_KEY } = import.meta.env;

type useCharacterTypes = {
	nameStarts?: string;
	characterName?: string;
};

const timestamp = Math.floor(Date.now() / 1000);
const hash = md5(`${timestamp}${VITE_PRIVATE_KEY}${VITE_PUBLIC_KEY}`);

const getCharacter = async ({ nameStarts, characterName }: useCharacterTypes): Promise<Character> => {
	const partOrFullName = nameStarts ? `nameStartsWith=${nameStarts}` : `name=${characterName}`;
	console.log(partOrFullName);

	const response = await fetch(
		`https://gateway.marvel.com/v1/public/characters?${partOrFullName}&ts=${timestamp}&apikey=${VITE_PUBLIC_KEY}&hash=${hash}`
	);

	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	return response.json();
};

export const useNameStartsWithCharacter = (character: string) => {
	const { data, isLoading, isSuccess } = useQuery(
		['character', character],
		() => getCharacter({ nameStarts: character }),
		{
			enabled: !!character,
		}
	);

	return { data, isLoading, isSuccess };
};

export const useFullNameCharacter = (character: string) => {
	const { data, isLoading } = useQuery(['character', character], () => getCharacter({ characterName: character }), {
		enabled: !!character,
	});

	return { data, isLoading };
};
