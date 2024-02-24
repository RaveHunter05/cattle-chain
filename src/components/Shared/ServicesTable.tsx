import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import useModal from '~/hooks/useModal';
import { Services } from '~/types/types';
import CreateServiceForm from '../Services/CreateServiceForm';

interface Interface {
    data: Services[];
}

const ServicesTable = ({ data }: Interface) => {
    const [selectedValues, setSelectedValues] =
        useState<Partial<Services> | null>(null);

    const handleEditClick = ({ serviceId, code, name }: Partial<Services>) => {
        setSelectedValues({
            serviceId,
            code,
            name,
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
            title: 'Código',
            dataIndex: 'code',
        },
        {
            title: 'Nombre',
            dataIndex: 'name',
        },
        {
            title: 'Editar',
            key: '',
            render: (_: any, { serviceId, code, name }: Services) => {
                return (
                    <CiEdit
                        onClick={() =>
                            handleEditClick({
                                serviceId,
                                code,
                                name,
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
            <ModalWrapper title="Editar Servicio">
                <CreateServiceForm
                    toEditValues={selectedValues}
                    closeModal={closeModal}
                />
            </ModalWrapper>
            <Table rowKey="serviceId" dataSource={data} columns={columns} />
        </>
    );
};

export default ServicesTable;
