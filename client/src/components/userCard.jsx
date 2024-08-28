
import { FaAt } from "react-icons/fa";

export default function UserCard({ avatar, username, rate, rank }) {
    return (
        <div className="col-span-1 flex flex-col bg-white text-center shadow w-52 relative border border-secondary border-2" >
            <div className="flex flex-1 flex-col p-4">
                <img className="mx-auto flex-shrink-0" src={avatar} alt="avatar of the user" />
                <h3 className="mt-6 text-2xl font-bold text-secondary truncate flex justify-center"><FaAt />{username}</h3>
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
