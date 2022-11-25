import AdminPage from "~/pages/AdminPage";
import AgencyDetails from "~/pages/AdminPage/AgencyPage";
import FactoryDetails from "~/pages/AdminPage/GuaranteePage";
import UserDetails from "~/pages/AdminPage/UserPage";
import UserAdminDetails from "~/pages/AdminPage/UserPage/UserAdminPage";
import UserAgencyDetails from "~/pages/AdminPage/UserPage/UserAgencyPage";
import UserGuaranteeDetails from "~/pages/AdminPage/UserPage/UserGuaranteePage";
import AgencyPage from "~/pages/AgencyPage";
import GuaranteeDetails from "~/pages/GuaranteePage";
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
    {
        path: '/Admin/user',
        component: UserDetails,
    },
    {
        path: '/Admin/adminUsers',
        component: UserAdminDetails,
    },
    {
        path: '/Admin/agencyUsers',
        component: UserAgencyDetails,
    },
    {
        path: '/Admin/guaranteeUsers',
        component: UserGuaranteeDetails,
    },
    {
        path: '/Admin/agency',
        component: AgencyDetails,
    },
    {
        path: '/Admin/guarantee',
        component: GuaranteeDetails,
    },
    {
        path: '/Admin/factory',
        component: FactoryDetails,
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
