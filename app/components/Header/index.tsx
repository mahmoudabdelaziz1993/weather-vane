import Logo from "./Logo";
import ThemeControler from "./ThemeControler";

type Props = {};

export default function Header({  }: Props) {
  return <header className="navbar bg-base-200 text-base-content shadow-lg">
    <div className="navbar-start"><Logo/></div>
    <div className="navbar-center"></div>
    <div className="navbar-end">
        <ThemeControler/>
    </div>
  </header>;
}
