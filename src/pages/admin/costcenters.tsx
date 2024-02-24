import CostCentersComponent from '~/components/CostCenters';
import SidebarComponent from '~/components/Sidebar';
import { NextPageWithLayout } from '~/types/next';

const CostCentersPage: NextPageWithLayout = () => {
    return (
        <div>
            <SidebarComponent>
                <CostCentersComponent />
            </SidebarComponent>
        </div>
    );
};

export default CostCentersPage;
