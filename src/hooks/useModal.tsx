import { Modal } from 'antd';
import { useState } from 'react';

const useModal = () => {
    interface CustomModalInterface {
        children: React.ReactNode;
        title: string;
        footer?: React.ReactNode;
    }
    const [openedModal, setOpenedModal] = useState<boolean>(false);

    const openModal = () => {
        setOpenedModal(true);
    };

    const closeModal = () => {
        setOpenedModal(false);
    };

    const ModalWrapper = ({
        children,
        title,
        footer = null,
    }: CustomModalInterface): React.ReactElement => {
        return (
            <Modal
                title={title}
                centered
                open={openedModal}
                onOk={() => setOpenedModal(false)}
                onCancel={() => setOpenedModal(false)}
                width={300}
                footer={footer}
            >
                {children}
            </Modal>
        );
    };

    return { openModal, closeModal, ModalWrapper };
};

export default useModal;
