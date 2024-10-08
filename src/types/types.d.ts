export interface PixabayPhotos {
	total: number
	totalHits: number
	hits: HitPhotos[]
}

export interface HitPhotos {
	id: number
	pageURL: string
	type: TypeImage
	tags: string
	previewURL: string
	previewWidth: number
	previewHeight: number
	webformatURL: string
	webformatWidth: number
	webformatHeight: number
	largeImageURL: string
	imageWidth: number
	imageHeight: number
	imageSize: number
	views: number
	downloads: number
	collections: number
	likes: number
	comments: number
	user_id: number
	user: string
	userImageURL: string
}

export enum TypeImage {
	Photo = 'photo'
}
export enum TypeSearch {
	PHOTO = 'Fotos',
	VIDEO = 'Videos'
}
export enum TypeNavigation {
	NONE = 'none',
	PREV = 'prev',
	NEXT = 'next'
}
export enum TypeSort {
	POPULAR = 'popular',
	LATEST = 'latest'
}

export interface PixabayVideos {
	total: number
	totalHits: number
	hits: HitVideos[]
}

export interface HitVideos {
	id: number
	pageURL: string
	type: TypeVideo
	tags: string
	duration: number
	picture_id: string
	videos: Videos
	views: number
	downloads: number
	likes: number
	comments: number
	user_id: number
	user: string
	userImageURL: string
}

export enum TypeVideo {
	Film = 'film'
}

export interface Videos {
	large: Large
	medium: Large
	small: Large
	tiny: Large
}

export interface Large {
	url: string
	width: number
	height: number
	size: number
	thumnail: string
	size: number
}
