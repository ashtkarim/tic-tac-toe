import { useEffect, useState } from "react";
import { FaAt } from "react-icons/fa";
import { Link } from "react-router-dom";

const team = [
    'ila36IX',
    'Badr-Annabi',
    'ashtkarim',
    'RadouaneAbn',
    'naanaa59',
]

function TeamCard({ avatar, username }) {
    return (
        <div className="col-span-1 flex flex-col bg-white text-center shadow w-52 relative border-secondary border-2" >
            <div className="flex flex-1 flex-col p-4">
                <img className="mx-auto flex-shrink-0 border border-primaryLighter" src={avatar} alt={`${username}'s avatar`} />
                <Link className="mt-6 text-lg font-bold text-secondary truncate flex justify-center items-center hover:text-primary" to={`https:github.com/${username}`}>
                    <FaAt />{username}
                </Link>
                <span className="absolute bg-secondary px-2 py-1 text-xs font-medium text-white -right-[2px] top-[-15px]">
                    #
                </span>
            </div>
        </div>
    )

}

export default function About({ setTitle }) {
    const [gitInfo, setGitInfo] = useState([]);

    useEffect(() => {
        setTitle('About the team!');

        async function fetchInfos() {
            const data = await Promise.all(
                team.map(async (username) => {
                    const response = await fetch(`https://api.github.com/users/${username}`);
                    const data = await response.json();
                    await console.log(data);
                    return {
                        avatar: data.avatar_url,
                        username: username,
                    };
                })
            );
            setGitInfo(data);
        }

        fetchInfos();
    }, [setTitle]);

    return (
        <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1  grid-wrap justify-items-center m-auto w-fit gap-6'>
            {gitInfo.map((user) => (
                <TeamCard key={user.username} avatar={user.avatar} username={user.username} />
            ))}
        </div>
    );
}
