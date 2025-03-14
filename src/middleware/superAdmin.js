import store from "../store";

export default function superAdmin({ next, router }) {
  if (!store.getters.isAuthenticated) {
    return router.push({ name: "Dashboard" });
  }

  return next();
}
