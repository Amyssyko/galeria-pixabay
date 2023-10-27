"use client"

import { type HitVideos } from "../types/types"
import { Loading } from "./Loading"

interface Props {
	data: HitVideos[]
}

export const CardVideos = ({ data }: Props) => {
if (data.length === 0) return <Loading />




	return data.map(({ downloads, views, videos, tags }, index) => (
		<section key={index} className="bg-blue-700/5 border w-full rounded lg:w-1/4 sm:w-1/2">
			<figure className="pt-2">
				<video
					className="w-full h-60 object-cover hover:object-scale-down transition-all duration-75 ease-in-out rounded-sm"
					src={videos.large.url}
					onPlay={(e) => e.currentTarget.play()}
					onPause={(e) => e.currentTarget.pause()}
					onVolumeChange={(e) => {
						const { volume } = e.currentTarget
						console.log(volume)
						if (volume === 0) {
							e.currentTarget.muted = true
						} else {
							e.currentTarget.volume = volume
						}
					}}
					controls
				></video>
				<figcaption className="flex justify-center items-center gap-4">
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
					<a href={videos.large.url} download target="_blank" rel="noopener noreferrer">
						<button className="bg-blue-600 text-white hover:text-white/70 hover:bg-blue-800 rounded-lg p-1">
							Download
						</button>
					</a>
				</figcaption>
			</figure>
		</section>
	))
}
