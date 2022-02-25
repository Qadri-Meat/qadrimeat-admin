import React, { useEffect, useState } from 'react';
import AdminLayout from 'components/AdminLayout/AdminLayout';
import AdminBreadcrumbs from 'components/AdminBreadcrumbs/AdminBreadcrumbs';
import { Typography, Grid, makeStyles, Avatar } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from 'state/ducks/category/actions';
import { deletePlatform } from 'state/ducks/platform/actions';
import * as types from 'state/ducks/category/types';
import * as platformTypes from 'state/ducks/platform/types';
import CategoryForm from './components/CategoryForm';
import PlatformForm from './components/PlatformForm';
import MUIDataTable from 'mui-datatables';

import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  my3: {
    margin: '1.3rem 0',
  },
  mRight: {
    marginRight: '.85rem',
  },
}));

const columns = [
  {
    name: 'id',
    label: 'Id',
    options: {
      filter: true,
      sort: true,
      display: false,
    },
  },
  {
    name: 'image',
    label: 'Image',
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        console.log(process.env.REACT_APP_API_URL + value);
        return (
          <Avatar
            variant="rounded"
            src={value === '' ? '' : process.env.REACT_APP_API_URL + value}
          />
        );
      },
    },
  },
  {
    name: 'title',
    label: 'Title',
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: 'headline',
    label: 'Headline',
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: 'type',
    label: 'Type',
    options: {
      filter: true,
      sort: false,
    },
  },
];

const UpdateCategoryPage = (props) => {
  const { history, match } = props;
  const categoryId = match.params.id;
  const classes = useStyles();
  const dispatch = useDispatch();

  const [platform, setPlatform] = useState({});
  const [key, setKey] = useState(Math.random());

  const { success, selectedCategory } = useSelector((state) => state.category);
  const { success: platformSuccess } = useSelector((state) => state.platform);

  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      if (success) {
        dispatch({ type: types.CATEGORY_RESET });
        history.push('/categories');
      }
      if (platformSuccess) {
        dispatch({ type: platformTypes.PLATFORM_RESET });
        setPlatform({});
        setKey(Math.random());
        dispatch(getCategory(categoryId));
      } else if (!selectedCategory) {
        dispatch(getCategory(categoryId));
      }
    } else {
      history.push('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    history,
    success,
    isLoggedIn,
    categoryId,
    selectedCategory,
    platformSuccess,
  ]);
  const options = {
    filterType: 'checkbox',
    onRowsDelete: (rowsDeleted, dataRows) => {
      rowsDeleted.data.forEach((row) => {
        dispatch(deletePlatform(selectedCategory.platforms[row.dataIndex].id));
      });
    },
    onRowClick: (rowData, rowState) => {
      const platform1 = {
        ...selectedCategory.platforms[rowState.dataIndex],
      };
      delete platform1.image;
      setPlatform(platform1);
      setKey(Math.random());
    },
  };
  return (
    <AdminLayout>
      <Grid container className={classes.my3} alignItems="center">
        <Grid item className={classes.mRight}>
          <Typography variant="h5" component="h1">
            Update Category
          </Typography>
        </Grid>
      </Grid>
      <AdminBreadcrumbs path={history} />
      <div className={classes.root}>
        {selectedCategory ? (
          <CategoryForm preloadedValues={selectedCategory} />
        ) : (
          <></>
        )}
      </div>

      <Grid container className={classes.my3} alignItems="center">
        <Grid item className={classes.mRight}>
          <Typography variant="h5" component="h1">
            Platforms
          </Typography>
        </Grid>
      </Grid>

      <div className={classes.root} key={key}>
        {platform.id ? (
          <PlatformForm preloadedValues={platform} />
        ) : (
          <>
            {categoryId ? (
              <PlatformForm preloadedValues={{ category: categoryId }} />
            ) : (
              <></>
            )}
          </>
        )}

        {selectedCategory && selectedCategory.platforms.length > 0 ? (
          <MUIDataTable
            title={'Platforms List'}
            className={classes.my3}
            data={selectedCategory.platforms}
            columns={columns}
            options={options}
          />
        ) : (
          <></>
        )}
      </div>
    </AdminLayout>
  );
};

export default UpdateCategoryPage;
