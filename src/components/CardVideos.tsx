'use client'

import { Videos } from '../types/types'

interface Props {
	handleCategory: (category: string) => void
	downloads: number
	views: number
	videos: Videos
	tags: string
	id: number
	pageURL: string
}

export const CardVideos = ({
	downloads,
	id,
	tags,
	videos,
	views,
	pageURL,
	handleCategory
}: Props) => {
	const downloadHandler = async (
		url: string,
		id: number,
		resolution: number
	) => {
		const extension = url.split('.').pop()
		const filename = `${id}-${resolution}p.${extension}`
		try {
			const response = await fetch(url)
			const blob = await response.blob()
			const urlBlob = URL.createObjectURL(blob)
			const a = document.createElement('a')
			a.href = urlBlob
			a.download = filename
			a.click()
		} catch (error: unknown) {
			if (error instanceof Error) {
				throw new Error(error.message)
			}
		}
	}

	return (
		<article
			key={id}
			className='dark:bg-blue-700/10 bg-slate-100 border w-full rounded'>
			<figure>
				<div className='md:aspect-video'>
					<video
						className='object-contain md:aspect-video rounded-lg '
						controls
						aria-label={`Video ${id}`}
						poster={videos.large.thumnail}>
						<source
							src={videos.large.url}
							type='video/mp4'
						/>
						Su navegador no soporta el elemento <code>video</code>.
					</video>
				</div>

				<figcaption className='mx-2'>
					<div className='grid grid-cols-2 gap-4'>
						<div className='flex flex-col justify-center items-center'>
							<span className='font-semibold'>Vistas</span>
							<a
								href={pageURL}
								target='_blank'
								rel='noreferrer'
								className='hover:underline hover:text-sky-200'
								aria-label='Ver vistas'>
								{views}
							</a>
						</div>
						<div className='flex flex-col justify-center items-center'>
							<span className='font-semibold'>Descargas</span>
							<small className='hover:underline hover:text-sky-200'>
								{downloads}
							</small>
						</div>
					</div>

					<div className='grid place-content-center justify-items-center mt-2'>
						<span className='font-semibold'>Tags</span>
						<div className='flex flex-wrap justify-center gap-2'>
							{tags.split(', ').map((tag, index) => (
								<button
									className='hover:underline hover:text-sky-200 text-sm'
									type='button'
									onClick={() => handleCategory(tag)}
									key={index}
									aria-label={`Filtrar por ${tag}`}>
									{tag}
								</button>
							))}
						</div>
					</div>

					<div className='grid grid-cols-2 gap-4 justify-center  items-center mt-4 pb-2'>
						<button
							type='button'
							onClick={() =>
								downloadHandler(videos.large.url, id, videos.large.height)
							}
							className='bg-blue-600 text-white hover:text-white/70 hover:bg-blue-800 rounded-lg text-sm grid'
							aria-label='Descargar video'>
							<span>Descargar</span>
							<span>{videos.large.height}p</span>
						</button>
						<button
							type='button'
							onClick={() =>
								downloadHandler(videos.medium.url, id, videos.medium.height)
							}
							className='bg-blue-600 text-white hover:text-white/70 hover:bg-blue-800 rounded-lg text-sm grid'
							aria-label='Descargar video'>
							<span>Descargar </span>
							<span>{videos.medium.height}p</span>
						</button>
						<button
							type='button'
							onClick={() =>
								downloadHandler(videos.small.url, id, videos.small.height)
							}
							className='bg-blue-600 text-white hover:text-white/70 hover:bg-blue-800 rounded-lg text-sm grid'
							aria-label='Descargar video'>
							<span>Descargar </span>
							<span>{videos.small.height}p</span>
						</button>
						<button
							type='button'
							onClick={() =>
								downloadHandler(videos.tiny.url, id, videos.tiny.height)
							}
							className='bg-blue-600 text-white hover:text-white/70 hover:bg-blue-800 rounded-lg  text-sm grid'
							aria-label='Descargar video'>
							<span>Descargar </span>
							<span>{videos.tiny.height}p</span>
						</button>
					</div>
				</figcaption>
			</figure>
		</article>
	)
}
