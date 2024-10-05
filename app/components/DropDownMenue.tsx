import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { signIn, signOut, useSession } from 'next-auth/react';

const DropDownMenu = () => {
  const { data: session, status } = useSession();

  return (
    <div>
      <DropdownMenu>
        {/* If the user is not signed in, clicking will trigger signIn() */}
        <DropdownMenuTrigger className="flex items-center gap-2 bg-gradient-to-r  py-2 px-4 rounded-full shadow-md !hover:from-indigo-400 hover:to-purple-400 transition duration-200 ease-in-out" onClick={() => !session && signIn()}>
          {session ? session.user?.name : 'Sign In'}
        </DropdownMenuTrigger>

        {/* If the user is signed in, show the dropdown content */}
        {session ? (
          <DropdownMenuContent>
            <DropdownMenuLabel>{session.user?.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        ) : null}
      </DropdownMenu>
    </div>
  );
};

export default DropDownMenu;
