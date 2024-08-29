import React from 'react';
import Leaderboard from "../components/leaderboard.jsx";
import AsideNav from "./AsideNav.jsx";

const LeaderboardPage = ({ setTitle }) => {
    setTitle('Meet the Goats!');
    return <>
        <Leaderboard />
    </>
}

export default LeaderboardPage;
