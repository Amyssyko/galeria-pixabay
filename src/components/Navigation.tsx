import { TypeNavigation } from '../types/types.d'
interface NavigationProps {
	handleNavigation: (nav: TypeNavigation) => void
	PageNumber: number
}

export const Navigation = ({
	PageNumber,
	handleNavigation
}: NavigationProps) => {
	return (
		<>
			<p className='flex justify-center items-center gap-x-4 py-1 '>
				<span className='font-semibold text-gray-900 dark:text-blue-500'>
					{PageNumber}
				</span>
				<strong> de </strong>
				<span className='font-semibold text-gray-900 dark:text-blue-500'>
					200
				</span>
			</p>
			<nav className='flex justify-center gap-4'>
				<button
					type='button'
					onClick={() => handleNavigation(TypeNavigation.PREV)}
					className='flex items-center justify-center px-4 py-2 text-base font-medium text-blue-50 bg-white border border-blue-300 rounded-lg hover:bg-blue-100 hover:text-blue-700 dark:bg-blue-800 dark:border-blue-700 dark:text-blue-50 dark:hover:bg-blue-700 dark:hover:text-white space-x-2'>
					<svg
						className='size-4'
						aria-hidden='true'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 14 10'>
						<path
							stroke='currentColor'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M13 5H1m0 0 4 4M1 5l4-4'
						/>
					</svg>
					<span>Atras</span>
				</button>
				<button
					type='button'
					onClick={() => handleNavigation(TypeNavigation.NEXT)}
					className='flex items-center justify-center px-4 py-2 text-base font-medium text-blue-50 bg-white border border-blue-300 rounded-lg hover:bg-blue-100 hover:text-blue-700 dark:bg-blue-800 dark:border-blue-700 dark:text-blue-50 dark:hover:bg-blue-700 dark:hover:text-white space-x-2'>
					<span>Siguiente</span>
					<svg
						className='size-4'
						aria-hidden='true'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 14 10'>
						<path
							stroke='currentColor'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M1 5h12m0 0L9 1m4 4L9 9'
						/>
					</svg>
				</button>
			</nav>
		</>
	)
}
