import Logo from "./Logo";
import ThemeControler from "./ThemeControler";

type Props = {};

export default function Header({  }: Props) {
  return <header className="navbar ">
    <div className="navbar-start"><Logo/></div>
    <div className="navbar-center"></div>
    <div className="navbar-end">
        <ThemeControler/>
    </div>
  </header>;
}
