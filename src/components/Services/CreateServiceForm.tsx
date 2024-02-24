import { Typography } from 'antd';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeData } from '~/redux/reducers/data/dataSlice';
import { Services } from '~/types/types';

interface Interface {
    toEditValues?: Partial<Services> | null;
    closeModal: () => void;
}

const CreateServiceForm: React.FC<Interface> = ({
    toEditValues,
    closeModal,
}): React.ReactElement => {
    const [initialValues, setInitialValues] = useState<Partial<Services>>({
        serviceId: 2,
        code: '1231',
        name: 'service 123',
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (toEditValues) setInitialValues(toEditValues);
    }, [toEditValues, initialValues]);

    const createService = async ({ code, name }: Partial<Services>) => {
        await axios.post('/api/services', {
            code,
            name,
        });

        alert('Servicio Creado');
    };

    const updateService = async ({
        serviceId,
        code,
        name,
    }: Partial<Services>) => {
        await axios.put('/api/services', {
            serviceId,
            code,
            name,
        });

        alert('Servicio Actualizado');
    };

    const handleSubmit = async ({
        serviceId,
        code,
        name,
    }: Partial<Services>) => {
        try {
            if (!toEditValues) {
                createService({
                    code,
                    name,
                });
                return;
            }

            updateService({
                serviceId,
                code,
                name,
            });
            return;
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(changeData());
            closeModal();
        }
    };
    const ServiceSchema = yup.object({
        code: yup.string().required('El código es requerido'),
        name: yup.string().required('El nombre es requerido'),
    });
    return (
        <>
            <Formik
                initialValues={toEditValues ? toEditValues : initialValues}
                onSubmit={handleSubmit}
                validationSchema={ServiceSchema}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className="space-y-4 my-2 flex flex-col justify-center items-center mt-4">
                            <section>
                                <Typography.Text className="font-bold text-blue-500">
                                    Código
                                </Typography.Text>
                                <Field
                                    type="text"
                                    placeholder="Código"
                                    className="shadow appearance-none border rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    name="code"
                                />
                                {errors.code && touched.code && (
                                    <div>
                                        <span className="text-red-500 text-xs font-bold">
                                            {errors.code}
                                        </span>
                                    </div>
                                )}
                            </section>

                            <section>
                                <Typography.Text className="font-bold text-blue-500">
                                    Nombre
                                </Typography.Text>
                                <Field
                                    type="text"
                                    placeholder="Nombre"
                                    className="shadow appearance-none border rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    name="name"
                                />
                                {errors.name && touched.name && (
                                    <div>
                                        <span className="text-red-500 text-xs font-bold">
                                            {errors.name}
                                        </span>
                                    </div>
                                )}
                            </section>

                            <div className="space-y-2">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                                    {toEditValues
                                        ? 'Editar Servicio'
                                        : 'Agregar Servicio'}
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default CreateServiceForm;
