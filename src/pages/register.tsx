import Image from 'next/image';
import posImage from 'public/cattlechain-logo.png';

import { Formik, Field, Form } from 'formik';

import * as yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

import { useRouter } from 'next/router';
import Link from 'next/link';

interface RegisterInterface {
    username: string;
    email: string;
    password: string;
    confirmpassword: string;
}

const LoginSchema = yup.object({
    username: yup.string().required('Nombre de usuario es requerido'),
    email: yup
        .string()
        .email('Correo inválido')
        .required('El correo es requerido'),
    password: yup.string().required('Contraseña es requerida'),
    confirmpassword: yup
        .string()
	.required('Confirmación de contraseña requerida')
        .oneOf([yup.ref('password')], 'Contraseñas deberían concidir'),
});

export default function Login() {
    const router = useRouter();
    const [registerError, setRegisterError] = useState<string>();
    const handleLogin = async ({
        username,
        email,
        password,
    }: RegisterInterface) => {
        try {
            const result = await axios.post('/api/signup', {
                username,
                email,
                password,
            });

            if (result.data?.access_token) {
                localStorage.setItem('auth-token', result.data.access_token);

                toast.success('Registrado exitosamente', {
                    position: 'top-right',
                });
                router.push('/admin/dashboard');
            } else {
                toast.error('Error en registro', {
                    position: 'top-right',
                });
            }

            return result;
        } catch (error) {
            if (typeof error === 'string') {
                setRegisterError(error);
            }
            if (error instanceof Error) {
                setRegisterError(error.message);
            }
        }
    };

    const validateConfirmPassword = (pass: string, value: string) => {
        let error = '';
        if (pass && value) {
            if (pass !== value) {
                error = 'Password not matched';
            }
        }
        return error;
    };
    return (
        <div className="">
            <div className="flex flex-row w-screen h-screen">
                <Toaster />
                <div className="w-2/5 bg-neutral-300 h-100 flex justify-center items-center flex flex-col space-y-4">
                    <Image src={posImage} alt="POS Image" height="300" />
                </div>

                <div className="w-3/5 bg-main-green flex flex-col justify-center items-center ">
                    <div className="text-left">
                        <h5 className="text-white text-xs font-bold">
                            Sistema de Trazabilidad con Blockchain
                        </h5>
                        <h2 className="text-main-blue text-2xl font-bold">
                            Registrarse
                        </h2>
                        <Formik
                            initialValues={{
                                username: 'Roberto',
                                email: 'roberto981@gmail.com',
                                password: 'cattlechain',
                            }}
                            onSubmit={handleLogin}
                            validationSchema={LoginSchema}
                        >
                            {({ errors, touched }) => (
                                <Form>
                                    <div className="space-y-2 my-2 flex flex-col">
                                        <Field
                                            type="text"
                                            placeholder="Nombre de Usuario"
                                            className="shadow appearance-none border rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            name="username"
                                        />
                                        {errors.username &&
                                            touched.username && (
                                                <span className="text-red-500 text-xs font-bold">
                                                    {errors.username}
                                                </span>
                                            )}
                                        <Field
                                            type="text"
                                            placeholder="Correo Electrónico"
                                            className="shadow appearance-none border rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            name="email"
                                        />
                                        {errors.email && touched.email && (
                                            <span className="text-red-500 text-xs font-bold">
                                                {errors.email}
                                            </span>
                                        )}
                                        <Field
                                            type="password"
                                            placeholder="Contraseña"
                                            name="password"
                                            className="shadow appearance-none border rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                        {errors.password &&
                                            touched.password && (
                                                <span className="text-red-500 text-xs font-bold">
                                                    {errors.password}
                                                </span>
                                            )}

                                        <Field
                                            type="password"
                                            placeholder="Confirmar Contraseña"
                                            name="confirmpassword"
                                            className="shadow appearance-none border rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />

                                        {errors.confirmpassword &&
                                            touched.confirmpassword && (
                                                <span className="text-red-500 text-xs font-bold">
                                                    {errors.confirmpassword}
                                                </span>
                                            )}

                                        {registerError && (
                                            <span className="text-red-500 text-xs font-bold">
                                                {registerError}
                                            </span>
                                        )}

                                        <div className="space-y-2 my-2">
                                            <Link
                                                href="login"
                                                className="text-white hover:text-gray-200 text-xs font-bold cursor-pointer"
                                            >
                                                ¿Ya tienes una cuenta? Inicia
                                                Sesión
                                            </Link>

                                            <p className="text-main-blue hover:text-sky-600 text-xs font-bold cursor-pointer"></p>
                                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                                Registrarse
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
}
