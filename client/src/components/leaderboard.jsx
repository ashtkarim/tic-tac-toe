import React from "react";
import avatar from '../images/cat_avatar.png'
const players = [
    {
        id: 1,
        name: 'Luise',
        avatar: avatar,
        flag: '/path/to/germany-flag.png',
        wins: 17,
        losses: 0,
        draws: 102,
        timePlayed: '00h 12m',
        score: 2242,
    },
    {
        id: 2,
        name: '_Alex_',
        avatar: avatar,
        flag: '/path/to/venezuela-flag.png',
        wins: 44,
        losses: 1,
        draws: 70,
        timePlayed: '00h 14m',
        score: 1910,
    },
    // Add more players...
];

const Leaderboard = () => {
    return (
        <div className="flex flex-col items-center  min-h-screen  p-4">
            <div className="w-full max-w-4xl bg-gray-800 rounded-xl shadow-lg">
                {/*<h2 className="text-3xl font-bold text-center text-white py-6">*/}
                {/*    Tic-Tac-Toe Leaderboard*/}
                {/*</h2>*/}
                <table className="w-full bg-gray-800 text-white rounded-lg overflow-hidden">
                    <thead>
                        <tr className="text-gray-400 border-b border-gray-700">
                            <th className="py-4 px-6 text-left">#</th>
                            <th className="py-4 px-6 text-left">Player</th>
                            <th className="py-4 px-6 text-center  hidden md:table-cell">W/L/D</th>
                            <th className="py-4 px-6 text-center hidden md:table-cell">
                                <span role="img" aria-label="time">⏳</span>
                            </th>
                            <th className="py-4 px-6 text-right">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player, index) => (
                            <tr
                                key={player.id}
                                className="border-b border-gray-700 hover:bg-gray-700 transition-all duration-200 bg-gray-900"
                            >
                                <td className="py-4 px-6 text-lg font-medium">
                                    {index + 1}
                                </td>
                                <td className="py-4 px-6 text-lg flex items-center">
                                    <img
                                        src={player.avatar}
                                        alt={`${player.name} avatar`}
                                        className="w-8 h-8 rounded-full mr-3"
                                    />
                                    <span>{player.name}</span>
                                </td>
                                <td className="py-4 px-6 text-lg text-center hidden md:table-cell">
                                    <span className="text-green-400">{player.wins}</span> /
                                    <span className="text-red-400"> {player.losses}</span> /
                                    <span className="text-gray-400"> {player.draws}</span>
                                </td>
                                <td className="py-4 px-6 text-lg text-center hidden md:table-cell">
                                    {player.timePlayed}
                                </td>
                                <td className="py-4 px-6 text-lg text-right font-bold">
                                    {player.score}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;
