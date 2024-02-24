import { NextPageWithLayout } from '~/types/next';
import SidebarComponent from '~/components/Sidebar';

const Dashboard: NextPageWithLayout = () => {
    return (
        <div>
            <SidebarComponent>
                <h2>Dashboard</h2>
            </SidebarComponent>
        </div>
    );
};

export default Dashboard;
