import store from "../store";

export default function auth({ next, router }) {
  let permission = store.getters["profile/currentPermissions"];
  console.log(permission);
  // console.log(permission.independent);
  // let independent = store.dispatch("independents/independent", permission.independent);
  // console.log(independent);
  console.log("permission from cashier middleware");

  // let currentIndependent = this.$store.getters["independents/independent"];
  if (!store.getters.isAuthenticated && permission.auth_level > 3)
    // && permission.independent_id !== currentIndependent.id 
     
  {
    return router.push({ name: "login" });
  }

  return next();
}
