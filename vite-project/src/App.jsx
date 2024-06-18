import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  IoMdSunny,
  IoMdCloudy,
  IoMdRainy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from 'react-icons/io';
import {
  BsCloudHazeFill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from 'react-icons/bs';

import {TbTemperatureCelsius} from 'react-icons/tb';
import {ImSpinner8} from 'react-icons/im';
import './index.css';

//API key
const APIkey = 'a6263cf78b718b52f66b665fea94c12a';

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState('roma');
  const [inputValue, setInputValue] = useState('');
  const [animation, setAnimation] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInput = e => {
    setInputValue(e.target.value);
  };

  const handleSubmit = e => {
    //prevent default
    e.preventDefault();

    //set inputvalue to location state
    if (inputValue !== '') {
      //set location
      setLocation(inputValue);
    }

    // select input
    const input = document.querySelector('input');

    //if input value is empty
    if (input.value === '') {
      //set animation to true
      setAnimation(true);
      //after 500 ms set animate to false
      setTimeout(() => {
        setAnimation(false);
      }, 500);
    }

    //clear input
    input.value = '';
  };

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;

    axios
      .get(url)
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        setErrorMsg(err);
      });
  }, [location]);

  //erro message
  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg('');
    }, 2000);
    //clear timer
    return () => clearTimeout(timer);
  }, [errorMsg]);

  // if data is false show the loader
  if (!data) {
    return (
      <div
        className="w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col
      justify-center items-center"
      >
        <div>
          <ImSpinner8 className="text-5xl animate-spin text-white" />
        </div>
      </div>
    );
  }

  // set icon according to th weather
  let icon;

  switch (data.weather[0].main) {
    case 'Clouds':
      icon = <IoMdCloudy />;
      break;
    case 'Haze':
      icon = <BsCloudHazeFill />;
      break;
    case 'Rain':
      icon = <IoMdRainy />;
      break;
    case 'Clear':
      icon = <IoMdSunny />;
      break;
    case 'Drizzle':
      icon = <BsCloudDrizzleFill />;
      break;
    case 'Snow':
      icon = <IoMdSnow />;
      break;
    case 'Thunderstorm':
      icon = <IoMdThunderstorm />;
      break;

    default:
      break;
  }

  // get date
  const date = new Date();

  return (
    <div
      className="w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center 
     flex flex-col items-center justify-center px-4 lg:px-0 "
    >
      {errorMsg && (
        <div
          className="w-full max-w-[450px] bg-[#d962dd] text-white p-3
         capitalize rounded-full text-center
        "
        >{`${errorMsg.response.data.message}`}</div>
      )}
      {/* form */}
      <form
        className={` ${animation ? 'animate-shake' : 'animate-none'}
      h-15 w-full max-w-[450px] bg-black/30 blackdrop-blur-[32px] rounded-full mb-6`}
      >
        <div className="h-full relative flex items-center justify-between p-2">
          <input
            onChange={e => handleInput(e)}
            className="flex-1 bg-transparent placeholder:text-white text-white outline-none text-[1rem]
            text-light pl-6"
            type="text"
            placeholder="Seacrch by city"
          />
          <button
            onClick={e => handleSubmit(e)}
            className="w-20 bg-[#1ab8ed] hover:bg-[#15abdd] h-12 rounded-full flex items-center 
          justify-center transition"
          >
            <IoMdSearch className="text-2xl text-white" />
          </button>
        </div>
      </form>
      {/* card */}
      <div
        className="w-[50%] max-w-[450px] bg-black/20 min-h-[584px] text-white
       backdrop-blur-[32px] rounded-[32px] py-12 px-6"
      >
        <div>
          {/* card top */}
          <div className="flex items-center gap-x-5">
            {/* icon */}
            <div className="text-[5.5rem]">{icon}</div>
            <div>
              {/* city/country name */}
              <div className="text-3xl font-medium">
                {data.name}, {data.sys.country}
              </div>
              {/* date */}
              <div>
                {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                {date.getUTCFullYear()}
              </div>
            </div>
          </div>
          {/* card body */}
          <div className="my-20">
            <div className="flex items-center justify-center">
              {/* temperature */}
              <div className="text-[9rem] leading-none font-light relative ">
                {parseInt(data.main.temp)}
                <span className="text-[5rem] leading-none absolute top-[1rem] ">
                  &deg;
                </span>
              </div>
            </div>
            {/* weather description */}
            <div className="capitalize text-center">
              {data.weather[0].description}
            </div>
            {/* max and min temperature  */}
            <div>
              <div className="capitalize text-center">
                <span>h:{parseInt(data.main.temp_min)}&deg;</span>
                <span className="ml-2">
                  l:{parseInt(data.main.temp_max)}&deg;
                </span>
              </div>
            </div>
          </div>
          {/* card bottom */}
          <div className="flex flex-col gap-y-6 max-w-[90%] mx-auto">
            <div className="flex justify-between">
              <div className="flex items-center gap-x-2">
                {/* icon */}
                <div className="text-[20px]">
                  <BsEye />
                </div>
                <div>
                  Visibility
                  <span className="ml-2">{data.visibility / 1000} km</span>
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                {/* icon */}
                <div className="text-[20px]">
                  <BsThermometer />
                </div>
                <div>
                  Feels like
                  <span className="ml-2">
                    {parseInt(data.main.feels_like)}&deg;
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-x-2">
                {/* icon */}
                <div className="text-[20px]">
                  <BsWater />
                </div>
                <div className="flex">
                  Humidity
                  <div className="ml-2">{data.main.humidity} %</div>
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                {/* icon */}
                <div className="text-[20px]">
                  <BsWind />
                </div>
                <div>
                  Wind
                  <span className="ml-1">
                    {parseInt(data.wind.speed * 3.6)}km/h
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
