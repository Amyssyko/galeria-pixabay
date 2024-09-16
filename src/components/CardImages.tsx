'use client'

import { useState } from 'react'

interface Props {
	largeImageURL: string
	tags: string
	views: number
	downloads: number
	id: number
	pageURL: string
	handleCategory: (category: string) => void
}

export const CardImages = ({
	downloads,
	id,
	largeImageURL,
	tags,
	views,
	pageURL,
	handleCategory
}: Props) => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
	const [isHovered, setIsHovered] = useState(false)

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
	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
		const x = ((e.clientX - left) / width) * 100
		const y = ((e.clientY - top) / height) * 100

		setMousePosition({ x, y })
	}
	return (
		<section
			key={id}
			className='bg-blue-700/20 border w-full rounded text-sky-100'>
			<figure>
				<div
					className='aspect-video overflow-hidden'
					onMouseMove={handleMouseMove}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}>
					<img
						className={`object-contain aspect-video duration-200 rounded-sm ${
							isHovered ? 'scale-150 contrast-125' : 'scale-100'
						}`}
						src={largeImageURL}
						alt={`Imagen con tags: ${tags}`}
						onBlur={() => setIsHovered(false)}
						aria-label={`Imagen relacionada con ${tags}`}
						style={{
							transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
						}}
					/>
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
						<div className='flex flex-wrap justify-center gap-2 pt-4'>
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
							onClick={() => downloadHandler(largeImageURL, id)}
							className='bg-blue-600 text-white px-4 hover:text-white/70 hover:bg-blue-800 rounded-lg p-1'
							aria-label='Descargar imagen'>
							Descargar
						</button>
					</div>
				</figcaption>
			</figure>
		</section>
	)
}
