import md5 from 'blueimp-md5';
import { Comics } from '../types/comics';
import { useQuery } from '@tanstack/react-query';
const { VITE_PUBLIC_KEY, VITE_PRIVATE_KEY } = import.meta.env;

const timestamp = Math.floor(Date.now() / 1000);
const hash = md5(`${timestamp}${VITE_PRIVATE_KEY}${VITE_PUBLIC_KEY}`);

const fetchComics = async (id: number): Promise<Comics> => {
	const response = await fetch(
		`https://gateway.marvel.com/v1/public/comics?characters=${id}&ts=${timestamp}&apikey=${VITE_PUBLIC_KEY}&hash=${hash}`
	);

	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	return response.json();
};

export const useCharacterComics = (characterId: number) => {
	const { data, isLoading } = useQuery(['character', characterId], () => fetchComics(characterId), {
		enabled: !!characterId,
	});

	return { data, isLoading };
};
