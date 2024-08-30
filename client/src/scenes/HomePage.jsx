import './HomePage.css'
import UserCard from "../components/userCard.jsx";
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function CardsBrand() {
  return <div class="cardsBrand__container">
    <div className="floatCard" id="c1"><UserCard avatar="/user_avatar1.jpg" /></div>
    <div className="floatCard" id="c2"><UserCard avatar="/user_avatar2.png" /></div>
    <div className="floatCard" id="c3"><UserCard avatar="/user_avatar3.jpg" /></div>
    <div className="floatCard" id="c4"><UserCard avatar="/user_avatar1.jpg" /></div>
  </div>
}

function HomePage({ setTitle }) {
    useEffect(() => {
      setTitle('Welcome on the tic tac toe game!');
    }, [setTitle])

  return (
      <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="floating-stars">
              {[...Array(50)].map((_, index) => (
                  <div
                      key={index}
                      className= {`star ${Math.random() >= 0.5 ? 'text-secondary' : 'text-white'}`}
                      symbol = {`${Math.random() >= 0.5 ? 'x' : 'o'}`}

                  style={{
                          fontSize: `${Math.random() * 28 + 2}px`,

                          // height: `${Math.random() * 5 + 2}px`,
                          top: `${Math.random() * 100}vh`,
                          left: `${Math.random() * 100}vw`,
                          animationDuration: `${Math.random() * 10 + 5}s`,
                          animationDelay: `${Math.random() * 10}s`,
                          filter: `blur(${Math.random() * 2}px)`,
                      }}
                  ></div>
              ))}
          </div>
          <div className="flex flex-col">
              <div className='px-14 md:px-32 mb-16'>
                  <img src="/brand_logo.svg"/>
              </div>
              <Link to="/arena"
                    className='w-full text-center font-bold text-xl border border-secondary bg-primary rounded-full py-2 text-white hover:bg-primaryLighter focus:border-white'>Let's
                  play</Link>
          </div>
          <div className="relative flex mt-14 md:block hidden">
              <CardsBrand/>
          </div>
      </div>
  )
}

export default HomePage;
