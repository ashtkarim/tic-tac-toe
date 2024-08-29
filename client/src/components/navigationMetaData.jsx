import { FaRobot } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { FaInfoCircle, FaRandom } from "react-icons/fa";

const navigation = [
    { id: 1, name: "Play vs random", href: '/arena', icon: <FaRandom />, current: true },
    { id: 2, name: 'Play vs robot', href: '/robot', icon: <FaRobot />, current: false },
    { id: 3, name: 'LeaderBoard', href: '/leaderboard', icon: <MdLeaderboard />, current: false },
    { id: 4, name: 'About', href: '/about', icon: <FaInfoCircle />, current: false },
];

export default navigation;
