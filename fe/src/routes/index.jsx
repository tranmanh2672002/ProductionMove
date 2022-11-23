import AdminPage from "~/pages/AdminPage";
import AgencyPage from "~/pages/AgencyPage";
import GuaranteePage from "~/pages/GuaranteePage";
import LoginPage from "~/pages/LoginPage";

const publicRoutes = [
    {
        path: '/',
        component: LoginPage,
    },
];

const privateAdminRoutes = [
    {
        path: '/Admin',
        component: AdminPage,
    },
];

const privateAgencyRoutes = [
    {
        path: '/Agency',
        component: AgencyPage,
    },
];

const privateGuaranteeRoutes = [
    {
        path: '/Guarantee',
        component: GuaranteePage,
    },
];



export { publicRoutes, privateAdminRoutes, privateAgencyRoutes,  privateGuaranteeRoutes};
