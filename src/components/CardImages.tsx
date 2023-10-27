"use client"
import { type HitPhotos } from "../types/types"
import { Loading } from "./Loading"
interface Props {
	data: HitPhotos[]
}

export const CardImages = ({ data }: Props) => {
	

if (data.length === 0) return <Loading />

	return data.map(({ downloads, views, largeImageURL, tags }, index) => (
		<section key={index} className="bg-blue-700/5 border w-full rounded lg:w-1/4 sm:w-1/2">
			<figure className="pt-2">
				<img
					className="w-full h-60 object-cover hover:object-scale-down transition-all duration-75 ease-in-out rounded-sm"
					loading="lazy"
					src={largeImageURL}
					alt={tags}
				/>
				<figcaption className="flex justify-center items-center gap-1">
					<span className="font-semibold text-center">
						Tags
						<small className="font-normal flex justify-center">{tags}</small>
					</span>
					<span className="font-semibold">
						Vistas
						<small className="font-normal flex justify-center">{views}</small>
					</span>
					<span className="font-semibold">
						Descargas
						<small className="font-normal flex justify-center">{downloads}</small>
					</span>
					<a href={largeImageURL} download target="_blank" rel="noopener noreferrer">
						<button className="bg-blue-600 text-white hover:text-white/70 hover:bg-blue-800 rounded-lg p-1">
							Download
						</button>
					</a>
				</figcaption>
			</figure>
		</section>
	))
}
