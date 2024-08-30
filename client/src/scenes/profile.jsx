import { AiFillPlusSquare, AiFillMinusSquare } from "react-icons/ai";
import { PiEqualsFill } from "react-icons/pi";
import { FaAt } from "react-icons/fa";
import UserCard from "../components/userCard";
import { Link } from "react-router-dom";
import {useAuth} from "../components/PrivatRoute.jsx";
const gamesHistory = [
    {
        OpponentUsername: 'doomsday',
        OpponentAvatar: '/user_avatar1.jpg',
        userScore: 1,
        OpponentScore: 1,
        date: '24 abril, 2024',
    },
    {
        OpponentUsername: 'killer',
        OpponentAvatar: '/user_avatar2.png',
        userScore: 6,
        OpponentScore: 1,
        date: '24 abril, 2024',
    },
    {
        OpponentUsername: 'Dexter',
        OpponentAvatar: '/user_avatar3.jpg',
        userScore: 1,
        OpponentScore: 4,
        date: '24 abril, 2024',
    },
]



export default function Profile({ setTitle }) {
    setTitle('Hello you :)');
    const { user, logout } = useAuth();

    return <>
        <div className="flex items-center justify-center md:justify-start">
            <UserCard
                username={user.username}
                avatar={'/user_avatar1.jpg'}
                rate={'12'}
                rank={'15'}
            />
        </div>

        <div className="px-4 sm:px-6 lg:px-8">
            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full  divide-secondary divide-y-2">
                                <thead className="bg-primary text-white">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6">
                                            Opponent
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">
                                            Result
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">
                                            Date
                                        </th>

                                    </tr>
                                </thead>
                                <tbody className=" divide-gray-200 bg-primaryDark text-white">
                                    {gamesHistory.length ? gamesHistory.map((game) => (
                                        <tr className="hover:bg-primaryLighter">
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 border-b border-primary">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 flex-shrink-0">
                                                        <img className="h-10 w-10 rounded-full border border-primary" src={game.OpponentAvatar} alt="" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <Link to={`/${game.OpponentUsername}`} className="font-medium text-white flex items-center hover:text-secondary">
                                                            <span className="text-secondary"><FaAt /></span>{game.OpponentUsername}
                                                        </Link>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="whitespace-nowrap px-3 py-4 text-sm item text-white border-b border-primary">
                                                <div className="text-white flex gap-3 font-bold text-xl items-center">
                                                    <span>{game.OpponentScore + ' - ' + game.userScore}</span>
                                                    {
                                                        game.userScore > game.OpponentScore ?
                                                            <span className="text-3xl text-green-700"> <AiFillPlusSquare /></span>
                                                            : game.userScore !== game.OpponentScore ?
                                                                <span className="text-3xl text-red-700"><AiFillMinusSquare /> </span> :
                                                                <span className="text-3xl text-yellow-700"><PiEqualsFill /> </span>
                                                    }
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-whait border-b border-primary">
                                                {game.date}
                                            </td>
                                        </tr>
                                    )) : null}
                                </tbody>
                            </table>
                            {gamesHistory.length ? null : <h1 className="flex w-full justify-center p-9 text-2xl bg-primaryDark text-white">No games yes!</h1>}
                        </div>
                    </div>
                </div>
            </div>
        </div >

    </>
}
