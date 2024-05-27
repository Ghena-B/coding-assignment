import React, {memo} from 'react';
import {createPortal} from 'react-dom';

import cls from './Modal.module.scss';
import {useModal} from "../../hooks/useModal";
const ANIMATION_DELAY = 300;

const Overlay = memo(({ className, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`${cls.Overlay} ${className ?? ''}`}
        />
    );
});

const Portal = ({ children, element = document.body }) => {
    return createPortal(children, element);
};

export const Modal = (props) => {
    const { className, children, isOpen, onClose } = props;
    const { close, isClosing, isMounted } = useModal({
        animationDelay: ANIMATION_DELAY,
        isOpen,
        onClose,
    });

    const baseClass = cls.Modal;
    const isOpenedClass = isOpen ? cls.opened : '';
    const isClosingClass = isClosing ? cls.isClosing : '';
    const additionalClasses = className ? className : '';

    const combinedClassName = [
        baseClass,
        isOpenedClass,
        isClosingClass,
        'app_modal',
        additionalClasses,
    ]
        .filter(Boolean)
        .join(' ');

    if (!isMounted) {
        return null;
    }

    return (
        <Portal element={document.getElementById('app') ?? document.body}>
            <div className={combinedClassName}>
                <Overlay onClick={close} />
                <div className={cls.content}>{children}</div>
            </div>
        </Portal>
    );
};
