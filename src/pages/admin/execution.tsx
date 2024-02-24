import ExecutionComponent from '~/components/Execution';
import SidebarComponent from '~/components/Sidebar';
import { NextPageWithLayout } from '~/types/next';

const CostCentersPage: NextPageWithLayout = () => {
    return (
        <div>
            <SidebarComponent>
                <ExecutionComponent />
            </SidebarComponent>
        </div>
    );
};

export default CostCentersPage;
