import OutcomeComponent from '~/components/Outcome';
import SidebarComponent from '~/components/Sidebar';
import { NextPageWithLayout } from '~/types/next';

const IncomePage: NextPageWithLayout = () => {
    return (
        <div>
            <SidebarComponent>
                <OutcomeComponent />
            </SidebarComponent>
        </div>
    );
};

export default IncomePage;
