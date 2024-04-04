import { Link, NavLink } from "react-router-dom";
import { Disclosure } from "@headlessui/react";

import ProfileDropdown from "./ProfileDropdown";
import { useAuth } from "../../contexts/AuthContext";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "../../assets/logo.png";
import MobileNavbar from "../MobileNavbar/MobileNavbar";

const Navbar = () => {
  const { logout, user } = useAuth();
  const menuItems = [
    {
      label: "Sign out",
      onClick: logout,
    },
  ];

  const navLinks = [
    {
      label: "Home",
      to: "/home",
    },
    {
      label: "Users",
      to: "/users",
    },
    {
      label: "Tasks",
      to: "/tasks",
    },
  ];

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-autopx-4 sm:px-6 lg:px-12">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/home">
                    <img src={Logo} alt="Logo" className="w-8 h-8 mt-2" />
                  </Link>
                </div>
                <div className="hidden md:ml-20 md:flex md:space-x-8">
                  {navLinks?.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className={({ isActive }) => {
                        return `inline-flex items-center border-b-2 ${
                          isActive
                            ? "border-b-2 border-indigo-500"
                            : "hover:border-gray-300"
                        } px-1 pt-1 text-sm font-medium text-gray-900`;
                      }}
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                  <ProfileDropdown name={user?.name} menuItems={menuItems} />
                </div>
              </div>
            </div>
          </div>
          <MobileNavbar logout={logout} />
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
