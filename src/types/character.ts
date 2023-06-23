export type Character = {
	code: number;
	status: string;
	copyright: string;
	attributionText: string;
	attributionHTML: string;
	etag: string;
	data: {
		offset: number;
		limit: number;
		total: number;
		count: number;
		results: CharacterItem[];
	};
};

export type CharacterItem = {
	id: number;
	name: string;
	description: '';
	modified: string;
	thumbnail: { path: string; extension: string };
	resourceURI: string;
	comics: {
		available: number;
		collectionURI: string;
		items: [];
		returned: number;
	};
	series: {
		available: number;
		collectionURI: string;
		items: {
			resourceURI: string;
			name: string;
		}[];
		returned: number;
	};
	stories: {
		available: number;
		collectionURI: string;
		items: [];
		returned: number;
	};
	events: {
		available: number;
		collectionURI: string;
		items: [];
		returned: number;
	};
	urls: [
		{
			type: string;
			url: string;
		}[]
	];
};
