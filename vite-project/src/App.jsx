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

function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState('sao jose do rio preto');

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIkey}`;

    axios.get(url).then(res => {
      setData(res.data);
    });
  }, [location]);

  if (!data) {
    return (
      <div>
        <div>
          <ImSpinner8 className="text-5xl animate-spin" />
        </div>
      </div>
    );
  }

  // set icon according to th weather
  let icon;
  console.log(data);
  console.log(data.weather[0].main);

  switch (data.weather[0].main) {
    case 'Clauds':
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

  return <>react </>;
}

export default App;
