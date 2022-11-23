import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateAdminRoutes, privateAgencyRoutes, privateGuaranteeRoutes } from './routes';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                {localStorage.getItem('role') === 'admin' ? (
                    <Routes>
                        {privateAdminRoutes.map((route, i) => {
                            return <Route key={i} path={route.path} element={<route.component />} />;
                        })}
                    </Routes>
                ) : localStorage.getItem('role') === 'agency' ? (
                    <Routes>
                        {privateAgencyRoutes.map((route, i) => {
                            return <Route key={i} path={route.path} element={<route.component />} />;
                        })}
                    </Routes>
                ) : localStorage.getItem('role') === 'guarantee' ? (
                    <Routes>
                        {privateGuaranteeRoutes.map((route, i) => {
                            return <Route key={i} path={route.path} element={<route.component />} />;
                        })}
                    </Routes>
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
