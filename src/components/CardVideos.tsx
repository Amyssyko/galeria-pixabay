'use client'

interface Props {
	handleCategory: (category: string) => void
	downloads: number
	views: number
	videos: {
		large: {
			url: string
		}
	}
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
	const downloadHandler = async (url: string, id: number) => {
		const extension = url.split('.').pop()
		const filename = `${id}.${extension}`
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
			className='bg-blue-700/5 border w-full rounded'>
			<figure>
				<div className='aspect-video'>
					<video
						className='object-contain aspect-video rounded-sm'
						src={videos.large.url}
						controls
						onPlay={(e) => e.currentTarget.play()}
						onPause={(e) => e.currentTarget.pause()}
						onVolumeChange={(e) => {
							const { volume } = e.currentTarget
							e.currentTarget.muted = volume === 0
						}}
						aria-label='Video player'></video>
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

					<div className='grid place-content-center justify-items-center mt-4'>
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

					<div className='flex justify-center items-center mt-4 pb-4'>
						<button
							type='button'
							onClick={() => downloadHandler(videos.large.url, id)}
							className='bg-blue-600 text-white hover:text-white/70 hover:bg-blue-800 rounded-lg p-1 px-2'
							aria-label='Descargar video'>
							Descargar
						</button>
					</div>
				</figcaption>
			</figure>
		</article>
	)
}
