import AuxiliaryComponent from '~/components/Auxiliary';
import SidebarComponent from '~/components/Sidebar';
import { NextPageWithLayout } from '~/types/next';

const AuxiliaryPage: NextPageWithLayout = () => {
    return (
        <div>
            <SidebarComponent>
                <AuxiliaryComponent />
            </SidebarComponent>
        </div>
    );
};

export default AuxiliaryPage;
