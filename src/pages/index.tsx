import type { RootState } from '../redux';
import { useDispatch, useSelector } from 'react-redux';
import { SET_NAME } from '../redux/reducers/profileSlice';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
    const name = useSelector((state: RootState) => state.profile.name);
    const dispatch = useDispatch();
    const router = useRouter();

    let userToken: string | null;

    useEffect(() => {
        userToken = localStorage.getItem('auth-token');
    }, []);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(SET_NAME(e.target.value));
    };

    const redirectByToken = (): void => {
        if (userToken) {
            router.push('/admin/dashboard');
        }
        router.push('/login');
    };
    useEffect(() => {
        redirectByToken();
    }, []);
    return (
        <div>
            <h2 className="text-blue">
                This is the main page for the $quotcorreos de Nicaragua$quot system
            </h2>

            <input onChange={handleNameChange} type="text" value={name} />
        </div>
    );
}
