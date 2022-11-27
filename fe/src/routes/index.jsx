import AdminPage from "~/pages/AdminPage";
import AdminAgency from "~/pages/AdminPage/AdminAgency";
import AdminFactory from "~/pages/AdminPage/AdminFactory";
import FactoryDetails from "~/pages/AdminPage/AdminFactory/AdminFactoryDetails";
import AdminGuarantee from "~/pages/AdminPage/AdminGuarantee";
import Products from "~/pages/AdminPage/AdminProduct";
import AdminUser from "~/pages/AdminPage/AdminUser";
import UserAdminDetails from "~/pages/AdminPage/AdminUser/UserAdminPage";
import UserAgencyDetails from "~/pages/AdminPage/AdminUser/UserAgencyPage";
import UserFactoryDetails from "~/pages/AdminPage/AdminUser/UserFactoryPage";
import UserGuaranteeDetails from "~/pages/AdminPage/AdminUser/UserGuaranteePage";
import AgencyPage from "~/pages/AgencyPage";
import FactoryPage from "~/pages/FactoryPage";
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
        component: AdminUser,
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
        path: '/Admin/factoryUsers',
        component: UserFactoryDetails,
    },
    {
        path: '/Admin/factory',
        component: AdminFactory,
    },
    {
        path: '/Admin/factory/:id',
        component: FactoryDetails,
    },
    {
        path: '/Admin/agency',
        component: AdminAgency,
    },
    {
        path: '/Admin/guarantee',
        component: AdminGuarantee,
    },
    {
        path: '/Admin/products',
        component: Products,
    },
];

const privateFactoryRoutes = [
    {
        path: '/Factory',
        component: FactoryPage,
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



export { publicRoutes, privateAdminRoutes, privateFactoryRoutes, privateAgencyRoutes,  privateGuaranteeRoutes};
