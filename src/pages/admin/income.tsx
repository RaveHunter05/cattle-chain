import IncomeComponent from '~/components/Income';
import SidebarComponent from '~/components/Sidebar';
import { NextPageWithLayout } from '~/types/next';

const IncomePage: NextPageWithLayout = () => {
    return (
        <div>
            <SidebarComponent>
                <IncomeComponent />
            </SidebarComponent>
        </div>
    );
};

export default IncomePage;
