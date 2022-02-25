import AllUsersPage from './AllUsersPage';
import AddUserPage from './AddUserPage';
import UpdateUserPage from './UpdateUserPage';

export const UsersPageConfig = {
  routes: [
    {
      path: '/users',
      exact: true,
      component: AllUsersPage,
    },
    {
      path: '/users/add-user',
      exact: true,
      component: AddUserPage,
    },
    {
      path: '/users/:id',
      exact: true,
      component: UpdateUserPage,
    },
  ],
};
