import Link from 'next/link';
import type { SearchUsersItem } from '@/app/user/user-types';
import { Badge } from '@/components/ui/badge';
import { roleDetails } from '@/lib/session-types';

type UserCardProps = {
    user: SearchUsersItem;
};

export function UserCard({ user }: UserCardProps) {
    return (
        <Link
            key={user.id}
            href={`/user/${user.id}`}
            className="block space-y-2 rounded-lg border p-3 transition-all focus-within:bg-accent hover:bg-accent"
        >
            <div className="truncate text-sm font-medium leading-tight">
                {user.firstName} {user.lastName}
            </div>
            <div className="truncate text-sm text-muted-foreground">
                {user.emailAddress}
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
                {user.isLockedOut && (
                    <Badge variant="destructive" className="justify-center">
                        Locked
                    </Badge>
                )}
                {user.roles?.map((role) => (
                    <Badge key={role} className="justify-center">
                        {roleDetails[role].title}
                    </Badge>
                ))}
            </div>
        </Link>
    );
}
