import React, { useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout/AdminLayout';
import AdminBreadcrumbs from '../../components/AdminBreadcrumbs/AdminBreadcrumbs';
import { useSelector } from 'react-redux';

const DashboardPage = (props) => {
  const { history } = props;

  const auth = useSelector((state) => state.auth);
  const { isLoggedIn, user } = auth;

  useEffect(() => {
    if (!isLoggedIn) {
      history.push('/login');
    }
  }, [history, user, isLoggedIn]);

  return (
    <AdminLayout>
      <h1>Dashboard</h1>
      <AdminBreadcrumbs path={history} />
    </AdminLayout>
  );
};

export default DashboardPage;
