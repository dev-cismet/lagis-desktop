import HeaderSelectors from "../ui/filters/HeaderSelectors";
import UserBarActions from "../ui/control-board/UserBarActions";
import UserName from "./UserName";

const UserBar = () => {
  return (
    <div className="flex items-center">
      <div>
        <HeaderSelectors />
      </div>
      <div className="ml-10">
        <UserBarActions />
      </div>
      <div className="ml-auto">
        <UserName />
      </div>
    </div>
  );
};
export default UserBar;
