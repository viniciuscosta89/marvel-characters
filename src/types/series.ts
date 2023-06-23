export type CharacterSeries = {
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
		results: CharacterSeriesResult[];
	};
};

export type CharacterSeriesResult = {
	id: number;
	title: string;
	description: string;
	resourceURI: string;
	urls: [];
	startYear: number;
	endYear: number;
	rating: string;
	type: string;
	modified: string;
	thumbnail: {
		path: string;
		extension: string;
	};
	creators: {
		available: number;
		collectionURI: string;
		items: [];
		returned: number;
	};
	characters: {
		available: number;
		collectionURI: string;
		items: [];
		returned: number;
	};
	stories: {
		available: number;
		collectionURI: string;
		items: [];
		returned: number;
	};
	comics: {
		available: number;
		collectionURI: string;
		items: [];
		returned: number;
	};
	events: {
		available: number;
		collectionURI: string;
		items: [];
		returned: 0;
	};
	next: null;
	previous: null;
};
