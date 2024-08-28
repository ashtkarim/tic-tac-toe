import { useState } from 'react';
import { FaUserFriends } from "react-icons/fa";
import { FaRobot } from "react-icons/fa6";
import { TfiCup } from "react-icons/tfi";
import { MdLeaderboard } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";

const icon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="currentColor"
		className="size-6"
	>
		<path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
	</svg>
);

const navigation = [
	{
		name: "Play vs friend",
		href: '#',
		icon: <FaUserFriends title="Play vs friend" />,
		current: true
	},
	{
		name: 'Play vs robot',
		href: '#',
		icon: <FaRobot title="Play vs robot" />,
		current: false
	},
	{
		name: 'LeaderBoard',
		href: '/leaderboard',
		icon: <MdLeaderboard title="LeaderBoard" />,
		current: false
	},
	{
		name: 'About',
		href: '#',
		icon: <FaInfoCircle title="About" />,
		current: false
	},
];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function AsideNav({ children }) {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [expand, setExpand] = useState(true);

	return (
		<div>
			<div className={`hidden md:fixed md:inset-y-0 md:flex md:${expand ? 'w-64' : 'w-16'} ${expand ? 'w-64' : 'w-16'}`}>
				<div className="flex min-h-0 flex-1 flex-col bg-primary">
					<div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
						<div className={`flex flex-shrink-0 items-center px-${expand ? '4' : '2'}`}>
							<img
								className={`w-full ${expand ? 'p-5' : 'p-0'}`}
								src="/brand_logo.svg"
								alt="logo contains X vs O"
							/>
						</div>
						<nav className={`flex-1 space-y-1 px-2 ${expand ? 'mt-0' : 'mt-16'}`}>
							{navigation.map((item) => (
								<>

									<a
										key={item.name}
										href={item.href}
										className={classNames(
											item.current ? 'bg-secondaryLight text-white' : 'text-white hover:bg-primaryLighter hover:bg-opacity-75',
											'group flex gap-2 px-2 py-2 text-xl font-bold items-center', expand ? '' : 'justify-center'
										)}
									>
										{<div class='text-2xl'>{item.icon}</div>}
										{expand ? item.name : ''}
									</a>
								</>

							))}
						</nav>
					</div >
					<div className={`flex border-t-2 flex-shrink-0 border-secondary ${expand ? 'p-3' : 'p-1'}`}>
						<a href="#" className="group block w-full flex-shrink-0 hover:bg-primaryLight p-1">
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
						</a>
					</div>
				</div>
				<button
					className="absolute bg-primary text-white text-bold top-1/2 right-[-20px] rounded w-8 h-8"
					onClick={() => setExpand(!expand)}
				>
					{expand ? '<<' : '>>'}
				</button>
			</div>
			<div className={`flex flex-1 flex-col w-100 md:${expand ? 'pl-64' : 'pl-16'} ${expand ? 'pl-64' : 'pl-16'}`}>
				<div className="sticky top-0 z-10 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
					<button
						type="button"
						className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
						onClick={() => setSidebarOpen(true)}
					>
						<span className="sr-only">Open sidebar</span>
						x
					</button>
				</div>
				<main className="flex-1 min-h-screen bg-primaryLight">
					<div className="py-6">
						<div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 mb-5">
							<h1 className="text-4xl font-semibold text-white">Leaderboard</h1>
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
