import ServiceComponent from '~/components/Services';
import SidebarComponent from '~/components/Sidebar';
import { NextPageWithLayout } from '~/types/next';

const IncomePage: NextPageWithLayout = () => {
    return (
        <div>
            <SidebarComponent>
                <ServiceComponent />
            </SidebarComponent>
        </div>
    );
};

export default IncomePage;
