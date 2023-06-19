import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import { SearchIcon } from '@/components/Icons/SearchIcon';

const schema = z.object({
    search: z.string().optional()
});

export type SearchUserFormValues = z.infer<typeof schema>;

type SearchUserFormProps = {
    isLoading?: boolean;
    values: SearchUserFormValues;
    onSubmit: (values: SearchUserFormValues) => void;
};

export const SearchUserForm = ({
    onSubmit,
    values,
    isLoading
}: SearchUserFormProps) => {
    const {
        handleSubmit,
        control,
        formState: { isSubmitting }
    } = useForm<SearchUserFormValues>({
        values,
        resolver: zodResolver(schema)
    });

    return (
        <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full gap-1"
        >
            <Input
                label="Search Term"
                hideLabel={true}
                name="search"
                type="search"
                placeholder="Search Users..."
                disabled={isLoading}
                control={control}
                onClear={handleSubmit(onSubmit)}
            />
            <div>
                <Button
                    type="submit"
                    variant="secondary"
                    aria-label="Search"
                    disabled={isLoading}
                    loading={isSubmitting}
                >
                    <SearchIcon className="h-4 w-4" />
                </Button>
            </div>
        </form>
    );
};
