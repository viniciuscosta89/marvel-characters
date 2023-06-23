export type Comics = {
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
		results: ComicItem[];
	};
};

export type ComicItem = {
	id: number;
	digitalId: number;
	title: string;
	issueNumber: number;
	variantDescription: string;
	description: string;
	modified: string;
	isbn: string;
	upc: string;
	diamondCode: string;
	ean: string;
	issn: string;
	format: string;
	pageCount: number;
	textObjects: [];
	resourceURI: string;
	urls: {
		type: string;
		url: string;
	}[];
	series: {
		resourceURI: string;
		name: string;
	};
	variants: [];
	collections: [];
	collectedIssues: [];
	dates: {
		type: string;
		date: string;
	}[];
	prices: {
		type: string;
		price: number;
	}[];
	thumbnail: {
		path: string;
		extension: string;
	};
	images: {
		path: string;
		extension: string;
	}[];
	creators: {
		available: number;
		collectionURI: string;
		items: {
			resourceURI: string;
			name: string;
			role: string;
		}[];
		returned: number;
	};
	characters: {
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
		items: {
			resourceURI: string;
			name: string;
			type: string;
		}[];
		returned: number;
	};
	events: {
		available: number;
		collectionURI: string;
		items: [];
		returned: number;
	};
};
