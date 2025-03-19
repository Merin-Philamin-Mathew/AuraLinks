import Home from '@/components/site/Home';
import LogoShowcase from '@/components/site/LogoShowCase';
import AuraLinksLoader from '@/components/utils/Loaders/AuraLinksLoader';
import AuraLinksLoader2 from '@/components/utils/Loaders/AuraLinksLoader2';
import CorsTest from '@/components/utils/testingcodes/CORSTest';
import DashboardPage from '@/pages/MainPages/DashboardPage';
import HomePage from '@/pages/MainPages/HomePage';
import { lazy, Suspense } from 'react';

const LoginPage = lazy(() => import('@/pages/MainPages/LoginPage'));
const siteRoutes = [
    {
        path: "/",
        element: (
            <Suspense fallback={<AuraLinksLoader2/>}>
                <LoginPage/>
                {/* <Home/> */}
                {/* <AuraLinksLoader/> */}
                {/* <AuraLinksLoader/> */}
                {/* <MainApp/> */}
                {/* <LogoShowcase/> */}
            </Suspense>
        ),
    },
    {
        path: "/home",
        element: (
            <Suspense fallback={<AuraLinksLoader/>}>
                     <HomePage/>
            </Suspense>
        ),
    },
    {
        path: "/cors-test",
        element: (
            <Suspense fallback={<AuraLinksLoader2/>}>
                     <CorsTest/>
            </Suspense>
        ),
    },
    {
        path: "/dashboard",
        element: (
            <Suspense fallback={<AuraLinksLoader2/>}>
                     <DashboardPage/>
            </Suspense>
        ),
    },
    
];

export default siteRoutes;
