import { TypeNavigation } from "../types/types.d"
interface NavigationProps {
	handleNavigation: (nav: TypeNavigation) => void
	PageNumber: number
}

export const Navigation = ({ PageNumber, handleNavigation }: NavigationProps) => {
	return (
		<>
			<p className="grid justify-items-center py-1 ">
				<span className=" text-black dark:text-black ">
					Mostrando <span className="font-semibold text-gray-900 dark:text-blue-500">{PageNumber}</span> de
					<span className="font-semibold text-gray-900 dark:text-blue-500"> 200</span> Páginas
				</span>
			</p>
			<nav className="flex justify-center">
				<ul className="grid grid-flow-col auto-cols-max justify-items-center mx-auto py-1">
					<li>
						<button
							onClick={() => handleNavigation(TypeNavigation.PREV)}
							className="flex items-center justify-center px-4 py-2 mr-3 text-base font-medium text-blue-50 bg-white border border-blue-300 rounded-lg hover:bg-blue-100 hover:text-blue-700 dark:bg-blue-800 dark:border-blue-700 dark:text-blue-50 dark:hover:bg-blue-700 dark:hover:text-white"
						>
							<svg
								className="w-3.5 h-3.5 mr-2"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 14 10"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M13 5H1m0 0 4 4M1 5l4-4"
								/>
							</svg>
							Previous
						</button>
					</li>
					<li>
						{" "}
						<button
							onClick={() => handleNavigation(TypeNavigation.NEXT)}
							className="flex items-center justify-center px-4 py-2 text-base font-medium text-blue-50 bg-white border border-blue-300 rounded-lg hover:bg-blue-100 hover:text-blue-700 dark:bg-blue-800 dark:border-blue-700 dark:text-blue-50 dark:hover:bg-blue-700 dark:hover:text-white"
						>
							Next
							<svg
								className="w-3.5 h-3.5 ml-2"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 14 10"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M1 5h12m0 0L9 1m4 4L9 9"
								/>
							</svg>
						</button>
					</li>
				</ul>
			</nav>
		</>
	)
}
