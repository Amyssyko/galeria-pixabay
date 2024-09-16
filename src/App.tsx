import { Suspense, useEffect, useState } from 'react'
import { CardImages } from './components/CardImages'
import { CardVideos } from './components/CardVideos'
import Footer from './components/Footer'
import { Loading } from './components/Loading'
import { Navigation } from './components/Navigation'
import {
	TypeNavigation,
	TypeSearch,
	TypeSort,
	type HitPhotos,
	type HitVideos
} from './types/types.d'

const API = import.meta.env.VITE_API_KEY! as string
const URL_PHOTO = import.meta.env.VITE_URL_PHOTO! as string
const URL_VIDEO = import.meta.env.VITE_URL_VIDEO! as string
const PER_PAGES = [12, 24, 36, 48, 60, 72, 84, 96, 108, 120] as const

function App() {
	const [error, setError] = useState(false)
	const [page, setPage] = useState<number>(1)
	const [perPage, setPerPage] = useState<number>(12)
	const [category, setCategory] = useState<string | undefined>(undefined)
	const [sort, setSort] = useState<TypeSort>(
		(localStorage.getItem('sort') as TypeSort) || TypeSort.POPULAR
	)
	const [dataPhotos, setDataPhotos] = useState<HitPhotos[]>([])
	const [dataVideos, setDataVideos] = useState<HitVideos[]>([])
	const [search, setSearch] = useState<string>('')
	const [type, setType] = useState<TypeSearch>(
		(localStorage.getItem('type') as TypeSearch) || TypeSearch.PHOTO
	)

	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			const typeMedia = type === TypeSearch.PHOTO ? URL_PHOTO : URL_VIDEO

			const newCategory = category
				? `&category=${encodeURIComponent(category)}`
				: ''

			const query = `&image_type=photo&lang=es&order=${sort}&per_page=${perPage}&page=${page}&lang=es${newCategory}`

			try {
				const url = `${typeMedia}/?key=${API}&q=${encodeURIComponent(
					search
				)}${query}`

				const response = await fetch(url)
				const result = await response.json()

				if (response.ok === false) {
					setError(true)
					throw new Error(result.message)
				}
				if (type === TypeSearch.PHOTO) {
					setDataPhotos(result.hits)
				}

				if (type === TypeSearch.VIDEO) {
					setDataVideos(result.hits)
				}
			} catch (e: unknown) {
				if (e instanceof Error) {
					setError(true)
					throw new Error(e.message)
				}
			} finally {
				setError(false)
				setLoading(false)
			}
		}

		fetchData()
	}, [search, type, page, sort, category, perPage])

	// Listen for changes in localStorage
	useEffect(() => {
		const handleStorageChange = (event: StorageEvent) => {
			if (event.key === 'sort') {
				setSort(event.newValue as TypeSort)
			} else if (event.key === 'type') {
				setType(event.newValue as TypeSearch)
			}
		}

		window.addEventListener('storage', handleStorageChange)

		return () => {
			window.removeEventListener('storage', handleStorageChange)
		}
	}, [])

	const handlePerPage = (perPage: number) => {
		if (!perPage) return
		setPerPage((prevState: number) => {
			if (prevState === perPage) {
				return perPage
			}
			return perPage
		})
	}

	const handleCategory = (category: string) => {
		if (!category) return

		setCategory((prevState) => {
			if (prevState === category) {
				return undefined
			}
			return category
		})
	}

	const toggleType = () => {
		const newType =
			type === TypeSearch.PHOTO ? TypeSearch.VIDEO : TypeSearch.PHOTO
		setType(newType)
		localStorage.setItem('type', newType)
	}

	const HandleNavigation = (nav: TypeNavigation) => {
		if (nav === TypeNavigation.PREV) {
			if (page === 1) return
			setPage((prevPage) => prevPage - 1)
		}
		if (nav === TypeNavigation.NEXT) {
			setPage((prevPage) => prevPage + 1)
		}
	}

	const toggleSorting = () => {
		const newSort =
			sort === TypeSort.POPULAR ? TypeSort.LATEST : TypeSort.POPULAR
		setSort(newSort)
		localStorage.setItem('sort', newSort)
	}

	return (
		<div className='w-full grid grid-rows-[auto_1fr_auto] h-dvh py-2 mx-auto font-poppins px-12 '>
			<header>
				<h1 className='text-center text-sky-950 dark:text-white my-1 font-semibold'>
					Busca imágenes y videos de alta calidad
				</h1>
				<div className='flex lg:flex-row flex-col justify-center items-center gap-4 pt-2'>
					<fieldset>
						<label className='flex justify-center items-center'>
							Buscar
							<input
								className='ml-2 py-1 lg:py-1 w-full border border-gray-400 placeholder:text-center rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
								placeholder='Ingrese su búsqueda'
								type='search'
								name='buscar'
								id='buscar'
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								aria-label='Campo de búsqueda'
							/>
						</label>
					</fieldset>

					<fieldset>
						<label className='w-full flex justify-center items-center'>
							{type}
							<input
								title='Buscar fotos o videos'
								className='accent-sky-800 ml-2'
								type='checkbox'
								name='data-photo'
								checked={type === TypeSearch.PHOTO}
								onChange={toggleType}
								aria-label='Buscar fotos o videos'
							/>
						</label>
					</fieldset>

					<fieldset>
						<label className='flex justify-center items-center capitalize'>
							{sort}
							<input
								title='Ordenar por popular o más reciente'
								className='accent-sky-800 ml-2'
								type='checkbox'
								name='data-sort'
								checked={sort === TypeSort.POPULAR}
								onChange={toggleSorting}
								aria-label='Ordenar por popular o más reciente'
							/>
						</label>
					</fieldset>

					<fieldset>
						<label>
							Por página
							<select
								name='perPage'
								className='ml-2 border border-gray-400 placeholder:text-center rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 capitalize'
								value={perPage}
								onChange={(e) => handlePerPage(Number(e.target.value))}
								aria-label='Seleccionar resultados por página'>
								{PER_PAGES.map((per) => (
									<option
										className='text-base'
										key={per}
										value={per}>
										{per}
									</option>
								))}
							</select>
						</label>
					</fieldset>
				</div>
			</header>

			<main className='py-2'>
				{error && (
					<div className='w-full grid justify-items-center place-content-center items-center justify-center h-dvh'>
						<p className='text-red-600'>Error al cargar la información</p>
					</div>
				)}

				<section className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4'>
					{loading &&
						Array.from({ length: 12 }, (_, i) => (
							<Suspense
								key={i}
								fallback={<Loading />}>
								<CardImages
									id={i}
									largeImageURL='https://via.placeholder.com/500'
									tags='Loading...'
									views={0}
									downloads={0}
									pageURL='https://via.placeholder.com/500'
									handleCategory={handleCategory}
								/>
							</Suspense>
						))}
				</section>

				{((type === TypeSearch.PHOTO && dataPhotos.length === 0) ||
					(type === TypeSearch.VIDEO && dataVideos.length === 0)) && (
					<section className='grid justify-items-center place-content-center items-center justify-center h-dvh'>
						<p className='text-center'>
							No hay resultados de{' '}
							{type === TypeSearch.PHOTO ? 'imágenes' : 'videos'}
						</p>
					</section>
				)}

				<section className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4'>
					{!loading && type === TypeSearch.PHOTO
						? dataPhotos.map(
								({ id, largeImageURL, tags, views, downloads, pageURL }) => (
									<Suspense
										key={id}
										fallback={<Loading />}>
										<CardImages
											id={id}
											largeImageURL={largeImageURL}
											tags={tags}
											views={views}
											downloads={downloads}
											pageURL={pageURL}
											handleCategory={handleCategory}
										/>
									</Suspense>
								)
						  )
						: dataVideos.map(
								({ id, videos, tags, views, downloads, pageURL }) => (
									<Suspense
										key={id}
										fallback={<Loading />}>
										<CardVideos
											id={id}
											videos={videos}
											tags={tags}
											views={views}
											downloads={downloads}
											pageURL={pageURL}
											handleCategory={handleCategory}
										/>
									</Suspense>
								)
						  )}
				</section>

				{!loading && (dataPhotos.length > 0 || dataVideos.length > 0) ? (
					<Navigation
						PageNumber={page}
						handleNavigation={HandleNavigation}
					/>
				) : (
					<Loading />
				)}
			</main>
			<Footer />
		</div>
	)
}

export default App
