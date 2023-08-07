import LogoIcon from "../../../assets/logo.png";
const Logo = ({ classes = "ml-2 text-xl font-semibold" }) => {
  return (
    <div className="flex flex-wrap justify-center items-center">
      <img src={LogoIcon} alt="LagIS-online" />
      <span className={classes}>LagIS-online</span>
    </div>
  );
};

export default Logo;
