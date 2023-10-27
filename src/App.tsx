import { useEffect, useRef, useState } from "react"
import { TypeSort, TypeSearch, TypeNavigation, type HitPhotos, type HitVideos } from "./types/types.d"
import { CardVideos } from "./components/CardVideos"
import { CardImages } from "./components/CardImages"
import { Navigation } from "./components/Navigation"
const api = import.meta.env.VITE_API_KEY
const urlPhoto = import.meta.env.VITE_URL_PHOTO
const urlVideo = import.meta.env.VITE_URL_VIDEO

function App() {
	const [page, setPage] = useState<number>(1)
	const [sort, setSort] = useState<TypeSort>(
    (localStorage.getItem("sort") as TypeSort) || TypeSort.POPULAR
  )
	const [dataPhotos, setDataPhotos] = useState<HitPhotos[]>([])
	const [dataVideos, setDataVideos] = useState<HitVideos[]>([])
	const [search, setSearch] = useState<string>("")
	const [type, setType] = useState<TypeSearch>(
    (localStorage.getItem("type") as TypeSearch) || TypeSearch.PHOTO
  )



	useEffect(() => {
		//if (search === "") return

		const fetchData = async () => {
			try {
				console.log("fetching data")
				const url =
					type === TypeSearch.PHOTO
						? `${urlPhoto}/?key=${api}&q=${encodeURIComponent(search)}&image_type=photo&lang=es&order=${sort}&per_page=9&page=${page}`
						: `${urlVideo}/?key=${api}&q=${encodeURIComponent(search)}&video_type=all&lang=es&order=${sort}&per_page=9&page=${page}`

				const response = await fetch(url)
				const result = await response.json()
console.log(result)
				if (type === TypeSearch.PHOTO) {
					
						
						setDataPhotos( result.hits)
				
		
					//setDataPhotos(DataPhotos)
				} else if (type === TypeSearch.VIDEO) {
					
						setDataVideos (result.hits)
					
					//setDataVideos(result.hits)
				}
			} catch (error) {
				console.log(error)
				console.error("Error fetching data:", error)
			}
		}

		fetchData()
		//setSort(localStorage.getItem("sort") as TypeSort)
		//setType(localStorage.getItem("type") as TypeSearch)


	
	}, [search, type, page, sort])

  // Update sort and type values from localStorage on initial render
  // useEffect(() => {
  //   const storedSort = localStorage.getItem("sort") as TypeSort;
  //   const storedType = localStorage.getItem("type") as TypeSearch;

  //   if (storedSort) {
  //     setSort(storedSort);
  //   }
  //   if (storedType) {
  //     setType(storedType);
  //   }
  // }, []);

  // Listen for changes in localStorage
	useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "sort") {
        setSort(event.newValue as TypeSort);
      } else if (event.key === "type") {
        setType(event.newValue as TypeSearch);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);


console.log(localStorage.getItem("sort"))
console.log(localStorage.getItem("type"))

	const toggleType = () => {
		const newType = type === TypeSearch.PHOTO ? TypeSearch.VIDEO : TypeSearch.PHOTO
		setType(newType)
		localStorage.setItem("type", newType)
	}

	//console.log(sort)
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
const newSort = sort === TypeSort.POPULAR ? TypeSort.LATEST : TypeSort.POPULAR
		setSort(newSort)
		localStorage.setItem("sort", newSort)
	}

	console.log(sort, type)
	return (
		<div className="w-full min-h-screen max-h-full px-12 mx-auto">
			<h3 className="w-full text-center text-sky-950 py-2 my-1 font-semibold bg-red-800/20">
				{type === TypeSearch.PHOTO ? "Photos" : "Videos"}
			</h3>
			<fieldset className="flex justify-center gap-4 ">
				<label htmlFor="buscar">Buscar</label>
				<input
					className="w-1/12 border border-gray-400 placeholder:text-center rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					placeholder="something"
					type="search"
					name="buscar"
					id="buscar"
					value={search}
					onChange={(e ) => setSearch(e.target.value)}
				/>
				<label className="" htmlFor="tipo">
					{type}
				</label>
				<input type="checkbox" name="data" checked={type === TypeSearch.PHOTO} onChange={toggleType} />
				<label className="" htmlFor="tipo">
					{sort}
				</label>
				<input type="checkbox" name="data" checked={sort === TypeSort.POPULAR} onChange={toggleSorting} />
			</fieldset>

			<div className="flex flex-wrap mt-2 gap-4 mx-auto justify-center ">
				{((type === TypeSearch.PHOTO && dataPhotos.length === 0) ||
					(type === TypeSearch.VIDEO && dataVideos.length === 0)) && (
					<p className="text-center">
						No hay resultados de {type === TypeSearch.PHOTO ? "imagenes" : "videos"}
					</p>
				)}

				{type === TypeSearch.PHOTO && <CardImages data={dataPhotos} />}
				{type === TypeSearch.VIDEO && <CardVideos data={dataVideos} />}
			</div>
			<Navigation PageNumber={page} handleNavigation={HandleNavigation} />
		</div>
	)
}

export default App
