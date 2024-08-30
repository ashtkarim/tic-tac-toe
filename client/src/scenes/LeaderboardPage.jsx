import React, {useEffect} from 'react';
import Leaderboard from "../components/leaderboard.jsx";
import AsideNav from "./AsideNav.jsx";

const LeaderboardPage = ({ setTitle }) => {


    useEffect(() => {
        setTitle('Meet the Goats!');
    }, [setTitle]);
    return <>
        <Leaderboard />
    </>
}

export default LeaderboardPage;
