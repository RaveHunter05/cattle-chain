import { Modal } from 'antd';
import { useState } from 'react';

const AddIncomeModal = () => {
    const [openedModal, setOpenedModal] = useState<boolean>(false);
    return (
        <>
            <Modal
                title="Create an Income"
                centered
                open={openedModal}
                onOk={() => setOpenedModal(false)}
                onCancel={() => setOpenedModal(true)}
            ></Modal>
        </>
    );
};

export default AddIncomeModal;
