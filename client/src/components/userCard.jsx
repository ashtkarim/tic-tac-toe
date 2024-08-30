
import { FaAt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function UserCard({ avatar, username, rate, rank }) {
    return (
        <div className="flex flex-col bg-white text-center w-52 relative border-secondary border-2 shadow-lg shadow-primary" >
            <div className="flex flex-1 flex-col p-4">
                <img className="mx-auto flex-shrink-0 border-2 border-primary" src={avatar} alt="avatar of the user" />
                <Link className="mt-6 text-2xl font-bold text-secondary truncate flex justify-center hover:text-primary" to={`/${username}`}>
                    <FaAt />{username}
                </Link>
                <dl className="mt-1 flex flex-grow flex-col justify-between">
                    <div className="flex justify-center items-center gap-1">
                        <dt className="text-primaryDark">Rate:</dt>
                        <dd className="text-sm text-gray-500"><span className="font-bold">{rate}</span></dd>
                    </div>
                    <dt className="sr-only">Leader board rank</dt>
                    <dd>
                        <span className="absolute bg-secondary px-2 py-1 text-xs font-medium text-white -right-[2px] top-[-15px]">
                            #{rank}
                        </span>
                    </dd>
                </dl>
            </div>
        </div>
    )

}
