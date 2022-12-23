import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
    publicRoutes,
    privateAdminRoutes,
    privateAgencyRoutes,
    privateGuaranteeRoutes,
    privateFactoryRoutes,
} from './routes';
import './App.css';
import SideBarAdmin from './components/Admin/components/SideBar';
import TopBarAdmin from './components/Admin/components/TopBar';
import SideBarFactory from './components/Factory/components/SideBar';
import TopBarFactory from './components/Factory/components/TopBar';
import SideBarAgency from './components/Agency/components/SideBar';
import TopBarAgency from './components/Agency/components/TopBar';
import SideBarGuarantee from './components/Guarantee/components/SideBar';
import TopBarGuarantee from '~/components/Guarantee/components/TopBar';


function App() {
    return (
        <Router>
            <div className="App">
                {localStorage.getItem('role') === 'admin' ? (
                    <>
                        <SideBarAdmin />
                        <TopBarAdmin />
                        <Routes>
                            {privateAdminRoutes.map((route, i) => {
                                return <Route key={i} path={route.path} element={<route.component />} />;
                            })}
                        </Routes>
                    </>
                ) : localStorage.getItem('role') === 'agency' ? (
                    <>
                        <SideBarAgency />
                        <TopBarAgency />
                        <Routes>
                            {privateAgencyRoutes.map((route, i) => {
                                return <Route key={i} path={route.path} element={<route.component />} />;
                            })}
                        </Routes>
                    </>
                ) : localStorage.getItem('role') === 'guarantee' ? (
                    <>
                        <SideBarGuarantee />
                        <TopBarGuarantee />
                        <Routes>
                            {privateGuaranteeRoutes.map((route, i) => {
                                return <Route key={i} path={route.path} element={<route.component />} />;
                            })}
                        </Routes>
                    </>
                ) : localStorage.getItem('role') === 'factory' ? (
                    <>
                        <SideBarFactory />
                        <TopBarFactory />
                        <Routes>
                            {privateFactoryRoutes.map((route, i) => {
                                return <Route key={i} path={route.path} element={<route.component />} />;
                            })}
                        </Routes>
                    </>
                ) : (
                    <Routes>
                        {publicRoutes.map((route, i) => {
                            return <Route key={i} path={route.path} element={<route.component />} />;
                        })}
                    </Routes>
                )}
            </div>
        </Router>
    );
}

export default App;
