import { Place, Weather } from "@/Types";
import convertTime from "@/utils/convertTime12Hours";
import { useCookies } from "next-client-cookies";
import useSWR from "swr";

type Props = {};

export default function WeatherPanel({  }: Props) {
  const cookies = useCookies();
  let seleced: Place = JSON.parse(cookies.get("selectedItem") || "{}");
  console.log("seleced", seleced);
  const fetcher = (url: string) => fetch(url).then(res => res.json());
  const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${seleced.lat}&longitude=${
    seleced.lon
  }&current=apparent_temperature,is_day&daily=weather_code,apparent_temperature_max,apparent_temperature_min,sunrise,sunset&forecast_days=1`;
  const { data, error, isLoading }: { data: Weather; error: any; isLoading: boolean } = useSWR(weatherApiUrl, fetcher);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="w-full max-w-xs  p-2 h-max z-10 card shadow-lg  backdrop-blur-md backdrop-brightness-50	 ">
      <article className="p-4">
        {/* Temperature and Icon */}
        <p className="text-2xl font-bold flex gap-2 items-center">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current" viewBox="0 0 512 512">
              <rect x="0" y="0" className="h-6 w-6 " fill="none" stroke="none" />
              <path
                fill="currentColor"
                d="M448 96a32 32 0 1 0-64 0a32 32 0 1 0 64 0zm-128 0a96 96 0 1 1 192 0a96 96 0 1 1-192 0zM144 64c-26.5 0-48 21.5-48 48v164.5c0 17.3-7.1 31.9-15.3 42.5C70.2 332.6 64 349.5 64 368c0 44.2 35.8 80 80 80s80-35.8 80-80c0-18.5-6.2-35.4-16.7-48.9c-8.2-10.6-15.3-25.2-15.3-42.5V112c0-26.5-21.5-48-48-48zM32 112C32 50.2 82.1 0 144 0s112 50.1 112 112v164.5c0 .1.1.3.2.6c.2.6.8 1.6 1.7 2.8c18.9 24.4 30.1 55 30.1 88.1c0 79.5-64.5 144-144 144S0 447.5 0 368c0-33.2 11.2-63.8 30.1-88.1c.9-1.2 1.5-2.2 1.7-2.8c.1-.3.2-.5.2-.6V112zm160 256c0 26.5-21.5 48-48 48s-48-21.5-48-48c0-20.9 13.4-38.7 32-45.3V272c0-8.8 7.2-16 16-16s16 7.2 16 16v50.7c18.6 6.6 32 24.4 32 45.3z"
              />
            </svg>
          </span>{" "}
          {data.current.apparent_temperature} <strong>{data.current_units.apparent_temperature}</strong>
        </p>

        {Array(1)
          .fill(0)
          .map((_, index) => (
            <>
              <div key={"apparent_temperature_max" + index} className="flex gap-4">
                {/* apparent_temperature_max and Icon */}
                <p className="text-2xl font-bold inline-flex gap-2 items-center">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current" viewBox="0 0 576 512">
                      <rect x="0" y="0" className="h-6 w-6 " fill="none" stroke="none" />
                      <path
                        fill="currentColor"
                        d="M128 112c0-26.5 21.5-48 48-48s48 21.5 48 48v164.5c0 17.3 7.1 31.9 15.3 42.5c10.5 13.6 16.7 30.5 16.7 49c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-18.5 6.2-35.4 16.7-48.9c8.2-10.6 15.3-25.2 15.3-42.5V112zM176 0C114.1 0 64 50.1 64 112v164.4c0 .1-.1.3-.2.6c-.2.6-.8 1.6-1.7 2.8C43.2 304.2 32 334.8 32 368c0 79.5 64.5 144 144 144s144-64.5 144-144c0-33.2-11.2-63.8-30.1-88.1c-.9-1.2-1.5-2.2-1.7-2.8c-.1-.3-.2-.5-.2-.6V112C288 50.1 237.9 0 176 0zm0 416c26.5 0 48-21.5 48-48c0-20.9-13.4-38.7-32-45.3V112c0-8.8-7.2-16-16-16s-16 7.2-16 16v210.7c-18.6 6.6-32 24.4-32 45.3c0 26.5 21.5 48 48 48zm304-256h32c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-64-64c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8h32v288c0 17.7 14.3 32 32 32s32-14.3 32-32V160z"
                      />
                    </svg>
                  </span>{" "}
                  {data.daily.apparent_temperature_max[index]}{" "}{data.daily_units.apparent_temperature_max}
                </p>
                {/* apparent_temperature_min and Icon */}
                <p className="text-2xl font-bold inline-flex gap-2 items-center">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current" viewBox="0 0 576 512">
                      <rect x="0" y="0" className="h-6 w-6 " fill="none" stroke="none" />
                      <path
                        fill="currentColor"
                        d="M128 112c0-26.5 21.5-48 48-48s48 21.5 48 48v164.5c0 17.3 7.1 31.9 15.3 42.5c10.5 13.6 16.7 30.5 16.7 49c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-18.5 6.2-35.4 16.7-48.9c8.2-10.6 15.3-25.2 15.3-42.5V112zM176 0C114.1 0 64 50.1 64 112v164.4c0 .1-.1.3-.2.6c-.2.6-.8 1.6-1.7 2.8C43.2 304.2 32 334.8 32 368c0 79.5 64.5 144 144 144s144-64.5 144-144c0-33.2-11.2-63.8-30.1-88.1c-.9-1.2-1.5-2.2-1.7-2.8c-.1-.3-.2-.5-.2-.6V112C288 50.1 237.9 0 176 0zm0 416c26.5 0 48-21.5 48-48c0-20.9-13.4-38.7-32-45.3V272c0-8.8-7.2-16-16-16s-16 7.2-16 16v50.7c-18.6 6.6-32 24.4-32 45.3c0 26.5 21.5 48 48 48zm336-64h-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v288h-32c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l64 64c6 6 14.1 9.4 22.6 9.4s16.6-3.4 22.6-9.4l64-64c9.2-9.2 11.9-22.9 6.9-34.9S524.8 352 511.8 352z"
                      />
                    </svg>
                  </span>{" "}
                  {data.daily.apparent_temperature_min[index]}{" "}{data.daily_units.apparent_temperature_min}
                </p>
              </div>
              <div key={"sun" + index} className="flex gap-4">
                {/* Sunrise and Icon */}
                <p className="text-2xl font-bold inline-flex gap-2 items-center">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current" viewBox="0 0 16 16">
                      <rect x="0" y="0" className="h-6 w-6 " fill="none" stroke="none" />
                      <path
                        fill="currentColor"
                        d="M7.646 1.146a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 0 1-.708.708L8.5 2.707V4.5a.5.5 0 0 1-1 0V2.707l-.646.647a.5.5 0 1 1-.708-.708zM2.343 4.343a.5.5 0 0 1 .707 0l1.414 1.414a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707m11.314 0a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0M8 7a3 3 0 0 1 2.599 4.5H5.4A3 3 0 0 1 8 7m3.71 4.5a4 4 0 1 0-7.418 0H.499a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10m13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"
                      />
                    </svg>
                  </span>{" "}
                  {convertTime(data.daily.sunrise[index].split("T")[1])}
                </p>
                {/* Sunset and Icon */}
                <p className="text-2xl font-bold inline-flex gap-2 items-center">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current" viewBox="0 0 16 16">
                      <rect className="h-6 w-6 " fill="none" stroke="none" />
                      <path
                        fill="currentColor"
                        d="M7.646 4.854a.5.5 0 0 0 .708 0l1.5-1.5a.5.5 0 0 0-.708-.708l-.646.647V1.5a.5.5 0 0 0-1 0v1.793l-.646-.647a.5.5 0 1 0-.708.708l1.5 1.5zm-5.303-.51a.5.5 0 0 1 .707 0l1.414 1.413a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707zm11.314 0a.5.5 0 0 1 0 .706l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zM8 7a3 3 0 0 1 2.599 4.5H5.4A3 3 0 0 1 8 7m3.71 4.5a4 4 0 1 0-7.418 0H.499a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10m13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"
                      />
                    </svg>
                  </span>{" "}
                  {convertTime(data.daily.sunset[index].split("T")[1])}
                </p>
              </div>
            </>
          ))}
      </article>
    </div>
  );
}
