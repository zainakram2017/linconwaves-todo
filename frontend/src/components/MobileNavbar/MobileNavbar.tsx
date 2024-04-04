import { Disclosure } from '@headlessui/react'
import { Link } from 'react-router-dom'

const MobileNavbar = ({logout}: {logout: () => void}) => {
  return (
    <Disclosure.Panel className="md:hidden">
    <div className="space-y-1 pb-3 pt-2">
      <Disclosure.Button
        as={Link}
        to={"/home"}
        className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700 sm:pl-5 sm:pr-6"
      >
        Home
      </Disclosure.Button>
      <Disclosure.Button
        as={Link}
        to="/users"
        className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
      >
        Users
      </Disclosure.Button>
      <Disclosure.Button
        as={Link}
        to="/tasks"
        className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
      >
        Tasks
      </Disclosure.Button>
      <Disclosure.Button
        as="span"
        className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-rose-400 hover:border-gray-300 hover:bg-gray-50 hover:text-red-700 sm:pl-5 sm:pr-6"
        onClick={logout}
      >
        Sign out
      </Disclosure.Button>
    </div>
  </Disclosure.Panel>
  )
}

export default MobileNavbar