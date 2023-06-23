import { ReactNode, createContext, useState } from 'react';

interface CharacterProviderType {
	children: ReactNode;
}

interface CharacterContextData {
	characterInfo: {
		name: string;
		id: number;
	};
	handleCharacterInfo(info: { name: string; id: number }): void;
}

export const CharacterContext = createContext({} as CharacterContextData);

export function CharacterProvider({ children }: CharacterProviderType) {
	const [characterInfo, setcharacterInfo] = useState({ name: '', id: 0 });

	function handleCharacterInfo(info: { name: string; id: number }) {
		localStorage.setItem('characterInfo', JSON.stringify(info));
		setcharacterInfo(info);
	}

	return (
		<CharacterContext.Provider value={{ characterInfo, handleCharacterInfo }}>{children}</CharacterContext.Provider>
	);
}
