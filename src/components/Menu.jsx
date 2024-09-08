import { useState } from "react";
import { format } from "date-fns";
import { IoMenuOutline, IoSettingsOutline } from "react-icons/io5";
import {
  setShowPreferencePopup,
  setShowMenuSearch,
} from "../store/slices/articlesSlice";
import { useDispatch, useSelector } from "react-redux";

const Menu = () => {
  const { showPreferencePopup } = useSelector((state) => state.articles);

  const [toggleMenu, setToggleMenu] = useState(false);
  const now = new Date();
  const formattedDate = format(now, "EEEE, MMMM d, yyyy");
  const dispatch = useDispatch();

  const handleSettingsClick = () => {
    localStorage.removeItem("preferences");
    dispatch(setShowPreferencePopup(!showPreferencePopup));
  };
  const handleMenuClick = () => {
    dispatch(setShowMenuSearch(toggleMenu));
    setToggleMenu(!toggleMenu);
  };

  return (
    <div className="menu top-header">
      <span>
        <IoMenuOutline
          title="Show Search"
          style={{ cursor: "pointer" }}
          onClick={handleMenuClick}
        />
      </span>
      <span>{formattedDate}</span>
      <span>
        <IoSettingsOutline
          title="Set Your Preferences"
          style={{ cursor: "pointer" }}
          onClick={handleSettingsClick}
        />
      </span>
    </div>
  );
};

export default Menu;
