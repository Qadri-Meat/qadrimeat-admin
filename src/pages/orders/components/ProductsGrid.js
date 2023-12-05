import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { getImageUrl } from 'helper/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from 'store/cart';
import { getProducts } from 'store/product';
import { debounce } from 'lodash';
import { buildURLQuery } from '@core/utils/buildURLQuery';

const ProductsGrid = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState({ page: 1, limit: 10 });
  const { results, page, totalPages } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getProducts(buildURLQuery(query)));
  }, [dispatch, query]);

  const debouncedSearch = debounce(async (search) => {
    setQuery({
      ...query,
      search,
    });
  }, 1000);

  const handleAddToCart = (product) => {
    const newItem = {
      id: product.id,
      name: product.name,
      category: product.category[0],
      quantity: 1,
      weight: product.weight,
      price: product.price,
      discount: product.discount,
      image: product.image,
      product: product.id,
    };

    dispatch(addToCart(newItem));
  };

  const handleInputChange = (event) => {
    debouncedSearch(event.target.value);
  };
  const handleResetFilter = () => {
    setQuery({ page: 1, limit: 10 });
  };
  const handlePageChange = (event, page) => {
    setQuery({
      ...query,
      page,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item>
            <FormControl sx={{ minWidth: 150 }} size="small">
              <InputLabel id="demo-simple-select-label">
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                label="Category"
                variant="outlined"
                value={query.category}
                onChange={(e) =>
                  setQuery({ ...query, category: e.target.value })
                }
              >
                <MenuItem value={'chicken'}>Chicken</MenuItem>
                <MenuItem value={'mutton'}>Mutton</MenuItem>
                <MenuItem value={'beef'}>Beef</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Button
              onClick={handleResetFilter}
              variant="outlined"
              color="primary"
              size="small"
            >
              Clear Filter
            </Button>
          </Grid>
          <Grid item>
            <FormControl>
              <TextField
                size="small"
                label="Search"
                variant="outlined"
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      {results?.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
          <Card
            sx={{ cursor: 'pointer' }}
            onClick={() => handleAddToCart(product)}
          >
            <CardMedia
              sx={{ minHeight: 100, objectFit: 'contain' }}
              image={
                product.image && product.image.length > 0
                  ? getImageUrl(product.image[0])
                  : '/default.png'
              }
              title={product.title}
            />

            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="body1">{product.name}</Typography>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                PKR: {product.price}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Pagination
          style={{ margin: 'auto' }}
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Grid>
    </Grid>
  );
};

export default ProductsGrid;
