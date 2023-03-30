import Error404Page from "./Error404Page";

export const Error404PageConfig = {
  routes: [
    {
      path: "/404",
      exact: "true",
      component: Error404Page,
    },
  ],
};
