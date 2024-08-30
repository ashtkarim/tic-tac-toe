import { useState, createContext } from 'react';
import navigation from '../components/navigationMetaData';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { FaCircleArrowRight, FaCircleArrowLeft } from "react-icons/fa6";
import { useAuth } from '../components/AuthProvider';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function AsideNav({ children, title }) {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [navPage, setNavPage] = useState(navigation);
	const [expand, setExpand] = useState(false);
	const { user, setUser } = useAuth();

	console.log(user)

	function updateCurrentPage(id) {
		const updatedPages = [...navPage].map(page => {
			if (page.id === id) {
				page.current = true;
			} else {
				page.current = false;
			}
			return page;
		});
		setNavPage(updatedPages);
	}

	function NoPageSelected() {
		const updatedPages = navPage.map(page => {
			page.current = false;
			return page;
		});
		setNavPage(updatedPages);
	}
	return (
		<div>
			<div className={`hidden md:fixed md:inset-y-0 md:flex ${expand ? 'md:w-64' : 'md:w-16'} `}>
				<div className="flex min-h-0 flex-1 flex-col bg-primary">
					<div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
						<div className={`flex flex-shrink-0 items-center ${expand ? 'px-4' : 'px-2'}`}>
							<Link to='/'>
								<img
									className={`w-full ${expand ? 'p-5' : 'p-0'}`}
									src="/brand_logo.svg"
									alt="logo contains X vs O"
								/>
							</Link>
						</div>
						<nav className={`flex-1 space-y-1 px-2 ${expand ? 'mt-0' : 'mt-16'}`}>
							{navPage.map((item) => (
								<Link
									to={item.href}
									className={classNames(
										item.current ? 'bg-secondaryLight text-white' : 'text-white hover:bg-primaryLighter hover:bg-opacity-75',
										'group flex gap-2 px-2 py-2 text-xl font-bold items-center', expand ? '' : 'justify-center'
									)}
									onClick={() => updateCurrentPage(item.id)}
									key={item.id}
								>
									{<div className='text-2xl'>{item.icon}</div>}
									{expand ? item.name : ''}
								</Link>
							))}
						</nav>
					</div>
					<div className={`flex border-t-2 flex-shrink-0 border-secondary ${expand ? 'p-3' : 'p-1'}`}>
						{user ?( <Link to="/profile" onClick={NoPageSelected} className="group block w-full flex-shrink-0 hover:bg-primaryLight p-1">
							<div className="flex items-center">
								<div>
									<img
										className="inline-block w-14 rounded-full"
										src="/user_avatar1.jpg"
										alt=""
									/>
								</div>
								{expand ? (
									<div className="ml-3">
										<p className="text-lg font-mono text-white">alien</p>
										<p className="text-xs text-white group-hover:text-white">View profile</p>
									</div>
								) : null}
							</div>
						</Link>) : (
                            <>
                                <Link
                                    to="/login"
                                    className="border-gray-900 dark:border-white border-2 rounded-md hover:rounded-xl hover:bg-amber-50 dark:hover:text-gray-700 transition-all duration-300 ease-in-out p-2 ml-auto"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="border-gray-900 dark:border-white border-2 rounded-md hover:rounded-xl hover:bg-amber-50 dark:hover:text-gray-700 transition-all duration-300 ease-in-out p-2"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
					</div>
				</div>
				<button
					className="absolute bg-primary rounded-full text-white hover:bg-primaryLighter text-bold top-1/2 right-[-20px] p-3"
					onClick={() => setExpand(!expand)}
				>
					{expand ? <FaCircleArrowLeft /> : <FaCircleArrowRight />}
				</button>
			</div>
			<div className={`flex flex-1 flex-col w-100`}>
				<div className="sticky flex top-0 z-50 bg-primary py-2 px-5 md:hidden justify-between items-center">

					<div className={`flex flex-shrink-0`}>
						{user !== null ? (<Link href="/profile" onClick={NoPageSelected} className="group block flex-shrink-0 hover:bg-primaryLight p-1">
							<div className="flex items-center ">
								<div>
									<img
										className="inline-block w-14 rounded-full"
										src="/user_avatar1.jpg"
										alt=""
									/>
								</div>

								<div className="ml-3">
									<p className="text-lg font-mono text-white"></p>
									<p className="text-xs text-white group-hover:text-white">View profile</p>
								</div>

							</div>
						</Link>) :
						(<div className="login">
							erregrg
						</div>)
						}
					</div>

					<button
						type="button"
						onClick={() => setSidebarOpen(!sidebarOpen)}
						className={`-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center text-3xl justify-center bg-primaryLight text-white hover:bg-primaryLighter focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary`}

					>
						<span className="sr-only">Open sidebar</span>
						{sidebarOpen ? <IoClose /> : <GiHamburgerMenu />}
					</button>
				</div>
				{/* mobile nav */}
				{sidebarOpen ? <div className='sticky top-14 md:hidden bg-primary px-5 pb-5 border-t-2 z-30'>
					<nav className='flex-1 space-y-1 px-2 mt-5'>
						{navPage.map((item) => (
							<Link
								to={item.href}
								className={classNames(
									item.current ? 'bg-secondaryLight text-white' : 'text-white hover:bg-primaryLighter hover:bg-opacity-75',
									'group flex gap-2 px-2 py-2 text-xl items-center'
								)}
								onClick={() => updateCurrentPage(item.id)}
								key={item.id}
							>
								{item.icon}
								{item.name}
							</Link>
						))}
					</nav>
				</div> : null}
				<main className={`flex-1 min-h-screen bg-primaryLight ${expand ? 'md:pl-64' : 'md:pl-16'}`}>
					<div className="px-1 md:px-10 pt-16">
						<div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 mb-5">
							<h1 className="text-4xl font-semibold text-white text-center sm:text-start">{title}</h1>
						</div>
						<div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
							<div className="py-4">
								{children}
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
