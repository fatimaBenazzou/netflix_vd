declare enum Netflix_Ratings {
	PG_13 = "PG-13",
	TV_MA = "TV-MA",
	PG = "PG",
	TV_14 = "TV-14",
	TV_PG = "TV-PG",
	TV_Y = "TV-Y",
	TV_Y7 = "TV-Y7",
	R = "R",
	TV_G = "TV-G",
	G = "G",
	NC_17 = "NC-17",
	NR = "NR",
	TV_Y7_FV = "TV-Y7-FV",
	UR = "UR",
}
declare enum Netflix_Type {
	Movie = "Movie",
	TV_Show = "TV Show",
}
declare interface NetflixData {
	show_id: string;
	type: Netflix_Type;
	title: string;
	director: string[];
	cast: string[];
	country: string;
	date_added: string;
	release_year: number;
	rating: Netflix_Ratings;
	duration: string;
	listed_in: string[];
	description: string;
}
declare interface FilterDataCol {
	errored: number;
	valid: number;
}
declare interface FilterDataColTotal extends FilterDataCol {
	corrected: number;
}
declare interface FilterDataI {
	original: number;
	all: FilterDataColTotal;
	show_id: FilterDataCol;
	type: FilterDataCol;
	title: FilterDataCol;
	director: FilterDataCol;
	cast: FilterDataCol;
	country: FilterDataCol;
	date_added: FilterDataCol;
	release_year: FilterDataCol;
	rating: FilterDataCol;
	duration: FilterDataCol;
	listed_in: FilterDataCol;
	description: FilterDataCol;
}
declare interface MapDataI {
	title: string;
	description: string;
	url: string;
}
// ["International Movies","Dramas","Comedies","International TV Shows","Documentaries","Action & Adventure","TV Dramas","Independent Movies","Children & Family Movies","Romantic Movies","Thrillers","TV Comedies","Crime TV Shows","Kids' TV","Docuseries","Music & Musicals","Romantic TV Shows","Horror Movies","Stand-Up Comedy","Reality TV","British TV Shows","Sci-Fi & Fantasy","Sports Movies","Anime Series","Spanish-Language TV Shows","TV Action & Adventure","Korean TV Shows","Classic Movies","LGBTQ Movies","TV Mysteries","Science & Nature TV","TV Sci-Fi & Fantasy","TV Horror","Anime Features","Cult Movies","Teen TV Shows","Faith & Spirituality","TV Thrillers","Stand-Up Comedy & Talk Shows","Movies","Classic & Cult TV","TV Shows"]
type Genres =
	| "International Movies"
	| "Dramas"
	| "Comedies"
	| "International TV Shows"
	| "Documentaries"
	| "Action & Adventure"
	| "TV Dramas"
	| "Independent Movies"
	| "Children & Family Movies"
	| "Romantic Movies"
	| "Thrillers"
	| "TV Comedies"
	| "Crime TV Shows"
	| "Kids' TV"
	| "Docuseries"
	| "Music & Musicals"
	| "Romantic TV Shows"
	| "Horror Movies"
	| "Stand-Up Comedy"
	| "Reality TV"
	| "British TV Shows"
	| "Sci-Fi & Fantasy"
	| "Sports Movies"
	| "Anime Series"
	| "Spanish-Language TV Shows"
	| "TV Action & Adventure"
	| "Korean TV Shows"
	| "Classic Movies"
	| "LGBTQ Movies"
	| "TV Mysteries"
	| "Science & Nature TV"
	| "TV Sci-Fi & Fantasy"
	| "TV Horror"
	| "Anime Features"
	| "Cult Movies"
	| "Teen TV Shows"
	| "Faith & Spirituality"
	| "TV Thrillers"
	| "Stand-Up Comedy & Talk Shows"
	| "Movies"
	| "Classic & Cult TV"
	| "TV Shows";
declare interface GenreDataI {
	genre: Genres;
	count: number;
	correlation: Record<Genres, number>;
}
declare interface DurationDataI {
	"TV-shows": Record<number, number[]>;
	Movies: Record<number, number[]>;
}
