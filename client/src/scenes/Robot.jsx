import React, {useEffect} from 'react'
// import AsideNav from "./AsideNav";
// import Board from "../components/board.jsx";
import RobotBoard from '../components/RobotBot.jsx';

function Robot({setTitle}) {
    useEffect(() => {
        setTitle('Meet our Goat, the Bot!!')
    }, [setTitle]);
  return (
    <div>
      <RobotBoard/>
    </div>
  )
}

export default Robot