import { useEffect, useState } from "react";
import spinner from "./gif/Spin.gif";

function App() {
  let [city, setCity] = useState("");
  let [wdetails, setWdetails] = useState();
  let [isLoading, SetIsLoading] = useState(false);

  let getData = (event) => {
    SetIsLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=62096d888894816f12e1b7085f62d1f2&units=metric`
    )
      .then((res) => res.json())
      .then((finalRes) => {
        if (finalRes.cod === "404") {
          setWdetails(undefined);
        } else {
          setWdetails(finalRes); 
        }
        SetIsLoading(false);
      });

    event.preventDefault();
    setCity("");
  };

  return (
    <div className="w-[100%] h-[100vh] flex justify-center items-center bg-[#A9B5DF]">
      <div className="min-w-[35%] bg-[#7886C7] p-8">
        <h1 className="text-4xl font-bold font-mono text-center py-4 border-2 border-[#A9B5DF]">
          WEATHER APP
        </h1>

        <form onSubmit={getData}>
          <div className="flex items-center my-10">
            <input
              type="text"
              placeholder="City Name"
              className="w-[100%] h-[35px] px-2 outline-none bg-[#FFF2F2]"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button className="bg-[#2D336B] h-[35px] px-4 text-[#FFF2F2]">
              Search
            </button>
          </div>
        </form>

        {isLoading ? (
          <div className="flex justify-center mb-2">
            <img src={spinner} width={100} alt="Loading..." />
          </div>
        ) : wdetails !== undefined ? (
          <div className="flex justify-center mb-2">
            <div className="w-[90%] bg-[#49519e] p-6">
              <h3 className="text-center font-bold text-2xl text-[#FFF2F2] border-b pb-4">
                {wdetails.name}
                <span className="ml-[0.8rem] text-[#A9B5DF]">
                  ({wdetails.sys.country})
                </span>
              </h3>

              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="bg-[#2D336B] p-4">
                  <h2 className="text-4xl text-[#FFF2F2]">
                    {wdetails.main.temp} ℃
                  </h2>
                </div>

                <div className="bg-[#2D336B] px-4 pb-4 pt-2 flex flex-col items-center">
                  <img
                    src={`http://openweathermap.org/img/w/${wdetails.weather[0].icon}.png`}
                    width={70}
                    alt="Weather Icon"
                  />
                  <p className="text-xl text-center text-[#FFF2F2]">
                    {wdetails.weather[0].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center mb-2">
            <div className="w-[75%] bg-[#49519e] p-6">
              <h2 className="text-2xl text-center font-bold text-[#FFF2F2]">
                Search for valid city
              </h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
