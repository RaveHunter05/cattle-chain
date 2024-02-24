import SidebarComponent from '~/components/Sidebar';
import SpentsComponent from '~/components/Spents';
import { NextPageWithLayout } from '~/types/next';

const IncomePage: NextPageWithLayout = () => {
    return (
        <div>
            <SidebarComponent>
                <SpentsComponent />
            </SidebarComponent>
        </div>
    );
};

export default IncomePage;
