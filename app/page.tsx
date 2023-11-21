import Image from "next/image";
import CityAutocomplete from "./components/CityAutocomplete";

export default function Home() {
  return (
    <div className="grid  w-full p-2 ">
      <CityAutocomplete />
    </div>
  );
}
