"use client";
import {
  homeItems,
  blogItems,
  listingItems,
  propertyItems,
  pageItems,
} from "@/data/navItems";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MainMenu = () => {
  const pathname = usePathname();
  const [topMenu, setTopMenu] = useState("");
  const [submenu, setSubmenu] = useState("");
  const [activeLink, setActiveLink] = useState("");

  return (
    <ul className="ace-responsive-menu">
      <li className="visible_list">
        <Link href={`/`}>
          <span className={topMenu == "home" ? "title menuActive" : "title"}>
            Home
          </span>
        </Link>
      </li>
      <li className="visible_list">
        <Link href={`/properties`}>
          <span className={topMenu == "home" ? "title menuActive" : "title"}>
            Properties
          </span>
        </Link>
      </li>
    </ul>
  );
};

export default MainMenu;
