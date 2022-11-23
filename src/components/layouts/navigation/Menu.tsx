import { useState } from "react";
import MenuItem from "./MenuItem";
import { EllipsisVerticalIcon, UserIcon, CogIcon, UserPlusIcon, ArrowRightOnRectangleIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import Router from "next/router";

export default function DropdownMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const handleViewProfile = () => {
        undefined
    }

    const handleSettings = () => {
        Router.push("/settings");
    }

    const handleAddFriend = () => {
        undefined
    }

    const handleHelp = () => {
        undefined
    }

    const handleLogout = () => {
        undefined
    }

    const closeMenu = (fn: () => void) => {
        setIsOpen(false);
        fn();
    }

    return (
        <div className="relative inline-block ">
            <button className="block"
                type="button"
                title="Menu"
                onClick={() => setIsOpen(!isOpen)}
            >
                <EllipsisVerticalIcon className="w-8" />
            </button>

            <div className={`absolute right-0 w-48 py-2 border mt-2 bg-darker rounded-md shadow-xl
                    ${isOpen ? "" : "hidden"}
                `}
            >
                <MenuItem icon={<UserIcon className="w-5" />} label="View Profile" onClick={() => closeMenu(handleViewProfile)} />
                <MenuItem icon={<CogIcon className="w-5" />} label="Settings" onClick={() => closeMenu(handleSettings)} />
                <hr className="border-gray-200" />
                <MenuItem icon={<UserPlusIcon className="w-5" />} label="Invite Friends" onClick={() => closeMenu(handleAddFriend)} />
                <hr className="border-gray-200" />
                <MenuItem icon={<QuestionMarkCircleIcon className="w-5" />} label="Help" onClick={() => closeMenu(handleHelp)} />
                <MenuItem icon={<ArrowRightOnRectangleIcon className="w-5" />} label="Sign Out" onClick={() => closeMenu(handleLogout)} />
            </div>
        </div>
    );
}