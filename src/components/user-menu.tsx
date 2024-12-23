'use client';

import Link from 'next/link';
import { User, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserAvatar } from '@/components/user-avatar';
import { UserRoles } from '@/components/user-roles';
import { Role, SessionPayload } from '@/lib/definitions';

type UserMenu = {
    session?: SessionPayload;
    onLogout: () => void;
};

export function UserMenu({ session, onLogout }: UserMenu) {
    if (!session) {
        return (
            <nav className="flex items-center gap-2">
                <Button asChild variant="secondary">
                    <Link href="/account/register">Register</Link>
                </Button>

                <Button asChild variant="secondary">
                    <Link href="/account/login">Login</Link>
                </Button>
            </nav>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <UserAvatar session={session}>
                    <span className="sr-only">Toggle profile menu</span>
                </UserAvatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel className="flex flex-col gap-2">
                    <span className="truncate">
                        {session.firstName} {session.lastName}
                    </span>
                    <span className="truncate text-sm text-muted-foreground">
                        {session.emailAddress}
                    </span>
                    <UserRoles roles={session.roles} />
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                    <Link href="/profile">
                        <User />
                        <span>My Account</span>
                    </Link>
                </DropdownMenuItem>

                {[Role.SYSTEM_ADMINISTRATOR, Role.USER_ADMINISTRATOR].some(
                    (value) => session.roles?.includes(value)
                ) && (
                    <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/user">
                                <Settings />
                                <span>User Management</span>
                            </Link>
                        </DropdownMenuItem>
                    </>
                )}

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={onLogout}>
                    <LogOut />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
