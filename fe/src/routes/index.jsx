import AdminPage from "~/pages/AdminPage";
import AdminAgency from "~/pages/AdminPage/AdminAgency";
import AgencyDetails from "~/pages/AdminPage/AdminAgency/AdminAgencyDetails";
import AdminFactory from "~/pages/AdminPage/AdminFactory";
import FactoryDetails from "~/pages/AdminPage/AdminFactory/AdminFactoryDetails";
import AdminGuarantee from "~/pages/AdminPage/AdminGuarantee";
import GuaranteeDetails from "~/pages/AdminPage/AdminGuarantee/AdminGuaranteeDetails";
import Products from "~/pages/AdminPage/AdminProduct";
import AdminUser from "~/pages/AdminPage/AdminUser";
import UserAdminDetails from "~/pages/AdminPage/AdminUser/UserAdminPage";
import UserAgencyDetails from "~/pages/AdminPage/AdminUser/UserAgencyPage";
import UserFactoryDetails from "~/pages/AdminPage/AdminUser/UserFactoryPage";
import UserGuaranteeDetails from "~/pages/AdminPage/AdminUser/UserGuaranteePage";
import AgencyPage from "~/pages/AgencyPage";
import AgencyDelivery from "~/pages/AgencyPage/AgencyDelivery";
import AgencyGuarantee from "~/pages/AgencyPage/AgencyGuarantee";
import AgencyImport from "~/pages/AgencyPage/AgencyImport";
import AgencyProduct from "~/pages/AgencyPage/AgencyProduct";
import AgencySold from "~/pages/AgencyPage/AgencySold";
import AgencyStorage from "~/pages/AgencyPage/AgencyStorage";
import FactoryPage from "~/pages/FactoryPage";
import FactoryDelivery from "~/pages/FactoryPage/FactoryDelivery";
import FactoryExport from "~/pages/FactoryPage/FactoryExport";
import FactoryGuarantee from "~/pages/FactoryPage/FactoryGuarantee";
import FactoryImport from "~/pages/FactoryPage/FactoryImport";
import FactoryStorage from "~/pages/FactoryPage/FactoryStorage";
import GuaranteePage from "~/pages/GuaranteePage";
import GuaranteeDelivery from "~/pages/GuaranteePage/GuaranteeDelivery";
import GuaranteeProduct from "~/pages/GuaranteePage/GuaranteeProduct";
import LoginPage from "~/pages/LoginPage";

const publicRoutes = [
    {
        path: '/',
        component: LoginPage,
    },
];

const privateAdminRoutes = [
    // Admin page
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
        path: '/Admin/agency/:id',
        component: AgencyDetails,
    },
    {
        path: '/Admin/guarantee',
        component: AdminGuarantee,
    },
    {
        path: '/Admin/guarantee/:id',
        component: GuaranteeDetails,
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
    {
        path: '/Factory/storage',
        component: FactoryStorage,
    },
    {
        path: '/Factory/import',
        component: FactoryImport,
    },
    {
        path: '/Factory/export',
        component: FactoryExport,
    },
    {
        path: '/Factory/delivery',
        component: FactoryDelivery,
    },
    {
        path: '/Factory/guarantee',
        component: FactoryGuarantee,
    },
];

const privateAgencyRoutes = [
    {
        path: '/Agency',
        component: AgencyPage,
    },
    {
        path: '/Agency/product',
        component: AgencyProduct,
    },
    {
        path: '/Agency/storage',
        component: AgencyStorage,
    },
    {
        path: '/Agency/import',
        component: AgencyImport,
    },
    {
        path: '/Agency/sold',
        component: AgencySold,
    },
    {
        path: '/Agency/delivery',
        component: AgencyDelivery,
    },
    {
        path: '/Agency/guarantee',
        component: AgencyGuarantee,
    },
];

const privateGuaranteeRoutes = [
    {
        path: '/',
        component: GuaranteePage,
    },
    {
        path: '/Guarantee',
        component: GuaranteePage,
    },
    {
        path: '/Guarantee/delivery',
        component: GuaranteeDelivery,
    },
    {
        path: '/Guarantee/product',
        component: GuaranteeProduct,
    },
];



export { publicRoutes, privateAdminRoutes, privateFactoryRoutes, privateAgencyRoutes,  privateGuaranteeRoutes};
