import React from 'react';
import Leaderboard from "../components/leaderboard.jsx";
import AsideNav from "./AsideNav.jsx";

const LeaderboardPage = () => {
    return (
        <div>
            <AsideNav>
                <Leaderboard/>
            </AsideNav>
        </div>
    )
}

export default LeaderboardPage;