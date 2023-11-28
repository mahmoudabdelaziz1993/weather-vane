import dynamic from 'next/dynamic'

const SearchMap = dynamic(() => import("./components/SearchMap"), { ssr: false });

export default function Home() {
  return (
    <SearchMap/>
  );
}
