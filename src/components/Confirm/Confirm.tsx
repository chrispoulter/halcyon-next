import React, { useState } from 'react';

export type ConfirmProps = React.PropsWithChildren<{
    onConfirm: () => void | Promise<any>;
    content: (onOk: () => void, onCancel: () => void) => JSX.Element;
    children: React.ReactElement<
        { onClick: () => void },
        string | React.JSXElementConstructor<any>
    >;
}>;

export const Confirm = ({ children, onConfirm, content }: ConfirmProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const onOk = async () => {
        onClose();

        try {
            await onConfirm();
        } catch (error) {
            console.warn(
                'An unhandled error was caught from onConfirm()',
                error
            );
        }
    };

    const onOpen = () => setIsOpen(true);

    const onClose = () => setIsOpen(false);

    return (
        <>
            {React.cloneElement(children, { onClick: onOpen })}
            {isOpen && <>{content(onOk, onClose)}</>}
        </>
    );
};
