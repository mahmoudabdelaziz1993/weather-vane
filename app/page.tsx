import CityAutocomplete from "./components/CityAutocomplete";
import MapComponent from "./components/BingMap";

export default function Home() {
  return (
    <div className="grid  w-full  relative ">
      <CityAutocomplete />
      <MapComponent/>
    </div>
  );
}
