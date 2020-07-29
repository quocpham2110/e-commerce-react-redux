import React from "react";
import { useDispatch } from "react-redux";
import { fetchProductsList } from "../redux/reducer/productsList";

const Sidebar = (props) => {
  const url = "";
  const dispatch = useDispatch();

  const clearFilter = (e) => {
    e.preventDefault();
    dispatch(fetchProductsList(""));
  };

  return (
    <aside className="sidebar">
      <a
        href={url}
        className="sidebar__clear btn hover hide"
        onClick={clearFilter}
      >
        <i className="fa fa-eraser"></i>
        <span>Clear all filters</span>
      </a>
      <p className="sidebar__title">Show results for</p>
      <div className="sidebar__category">
        {props.type.map((el, i) => (
          <SidebarType key={i} type={el} />
        ))}
      </div>
    </aside>
  );
};

const SidebarType = (props) => {
  const url = "";
  const dispatch = useDispatch();

  const handleSidebar = (e) => {
    e.preventDefault();
    dispatch(fetchProductsList(props.type));
  };
  return (
    <a href={url} className="sidebar__link hover" onClick={handleSidebar}>
      <i className="fas fa-angle-right"></i>
      <span>{props.type}</span>
    </a>
  );
};

export default Sidebar;
