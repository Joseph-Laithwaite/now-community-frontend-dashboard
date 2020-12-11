import DashboardLayout from "@/pages/Dashboard/Layout/DashboardLayout.vue";
import AuthLayout from "@/pages/Dashboard/Pages/AuthLayout.vue";

// Dashboard pages
import Dashboard from "@/pages/Dashboard/Dashboard.vue";
// Profile
import UserProfile from "@/pages/Dashboard/Examples/UserProfile.vue";
import EditUserCard from "@/pages/Dashboard/Examples/UserProfile/EditUserCard.vue";
import EditIndependentCard from "@/components/EditIndependentCard.vue";
import EditItemCard from "@/components/EditItemCard.vue";
import ImageSelectCard from "@/components/ImageSelectCard.vue";

import EditBrandCard from "@/components/EditBrandCard.vue";

// User Management
import ListUserPage from "@/pages/Dashboard/Examples/UserManagement/ListUserPage.vue";

import ProductList from "@/pages/Dashboard/Pages/ProductList.vue";
import ProductStockList from "@/pages/Dashboard/Pages/ProductStockList.vue";

// Pages
import Login from "@/pages/Dashboard/Pages/Login.vue";
import Logout from "@/pages/Dashboard/Pages/Logout.vue";
import Register from "@/pages/Dashboard/Pages/Register.vue";
import RegisterBusiness from "@/pages/Dashboard/Pages/RegisterBusiness.vue";

// Components pages
import Notifications from "@/pages/Dashboard/Components/Notifications.vue";

// TableList pages
import OrdersTable from "@/pages/Dashboard/Tables/OrdersTable.vue";

// Locations pages
import FullScreenLocation from "@/pages/Dashboard/Locations/FullScreenLocation.vue";

//import middleware
import auth from "@/middleware/auth";
import guest from "@/middleware/guest";
import cashier from "@/middleware/cashier";

//import customer pages
import Home from "@/pages/Home.vue";

//inputs
import AddressLookup from "../components/InputBlocks/AddressLookup.vue"


//Vuelidate
import {
  helpers,
  required,
  email,
  minLength,
  maxLength,
  alphaNum,
  decimal,
  integer,
  url,
} from 'vuelidate/lib/validators'

const slug = helpers.regex('alpha', /^[-a-zA-Z0-9_]+$/);




let authPages = {
  path: "/",
  component: AuthLayout,
  name: "Authentication",
  children: [
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: { middleware: guest }
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
      meta: { middleware: guest }
    },
    {
      path: "/logout",
      name: "Logout",
      component: Logout,
      meta: {middleware:auth},
    },
    {
      path: "/register-business",
      name: "Register Business",
      component: RegisterBusiness,
      // redirect:{name:"Register Business", hash:"#basics"}
      // meta: { middleware: [guest] }
    },
  ]
};

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/",
    component: DashboardLayout,
    meta: { middleware: auth },
    props: true,
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        components: { default: Dashboard },
        meta: { middleware: auth }
      },
      {
        path: "dashboard/independent-profile",
        name: "Independent Profile",
        components: {default: EditIndependentCard} ,
        meta: { middleware: cashier }
      },
      {
        path: "dashboard/user-profile",
        name: "User Profile",
        components: { default: EditUserCard },
        meta: { middleware: auth }
      },
      {
        path: "dashboard/users",
        name: "Users",
        components: { default: ListUserPage },
        meta: { middleware: auth }
      },
      {
        path: "dashboard/products",
        name: "Products",
        components: { default: ProductList },
        meta: { middleware: auth }
      },
      {
        path: "dashboard/product-stock",
        name: "Product Stock",
        components: { default: ProductStockList },
        meta: { middleware: auth }
      },
      {
        path: "dashboard/brands",
        name: "Brands",
        components: { default: EditBrandCard },
        meta: { middleware: auth }
      },
      {
        path: "dashboard/orders",
        name: "Orders",
        components: { default: ProductList },
        meta: { middleware: auth }
      },
      {
        path: "dashboard/table",
        name: "Table",
        components: { default: OrdersTable },
        meta: { middleware: auth }
      },
      {
        path: "dashboard/settings/locations",
        name: "Locations",
        meta: {
          // hideContent: true,
          // hideFooter: true,
          // navbarAbsolute: true,
          middleware: auth
        },
        // components: { default: FullScreenLocation }
        components: { default: AddressLookup }
      },
      {
        path: "notifications",
        name: "Notifications",
        components: { default: Notifications },
        meta: { middleware: auth }
      },
    ]
  },
  authPages
];

export default routes;
