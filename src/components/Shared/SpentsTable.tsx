import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import useModal from '~/hooks/useModal';

import { Spents } from '~/types/types';
import CreateSpentForm from '../Spents/CreateSpentForm';

interface Interface {
    data: Spents[];
}

const SpentsTable = ({ data }: Interface) => {
    const [selectedValues, setSelectedValues] =
        useState<Partial<Spents> | null>(null);

    const handleEditClick = ({
        spentId,
        category,
        denomination,
    }: Partial<Spents>) => {
        setSelectedValues({
            spentId,
            category,
            denomination,
        });
    };

    useEffect(() => {
        if (selectedValues !== null) {
            openModal();
        }
    }, [selectedValues]);

    const { openModal, ModalWrapper, closeModal } = useModal();

    const columns = [
        {
            title: 'Rubro',
            dataIndex: 'category',
        },
        {
            title: 'Denominación',
            dataIndex: 'denomination',
        },
        {
            title: 'Editar',
            key: '',
            render: (_: any, { spentId, category, denomination }: Spents) => {
                return (
                    <CiEdit
                        onClick={() =>
                            handleEditClick({
                                spentId,
                                category,
                                denomination,
                            })
                        }
                        className="text-2xl text-amber-500 rounded-lg cursor-pointer"
                    />
                );
            },
        },
    ];
    return (
        <>
            <ModalWrapper title="Editar Rubro">
                <CreateSpentForm
                    toEditValues={selectedValues}
                    closeModal={closeModal}
                />
            </ModalWrapper>
            <Table rowKey="spentId" dataSource={data} columns={columns} />
        </>
    );
};

export default SpentsTable;
