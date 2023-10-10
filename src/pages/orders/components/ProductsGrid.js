import React, { useEffect, useState } from 'react';
import {
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

const ProductsGrid = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('page=1&limit=12');
  const [category, setCategory] = useState(''); // State to track the selected category
  const { results, page, totalPages } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    // When the category changes, update the query
    setQuery(`page=1&limit=12${category && `&category=${category}`}`);
  }, [category]);

  useEffect(() => {
    dispatch(getProducts(query));
  }, [dispatch, query]);

  const debouncedSearch = debounce(async (text) => {
    setQuery(
      `page=1&limit=12${text && text !== '' && `&search=${text}`}`
    );
  }, 1000);

  const handleAddToCart = (product) => {
    const newItem = {
      id: product.id,
      name: product.name,
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
  const handlePageChange = (event, page) => {
    setQuery(`page=${page}&limit=12`);
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
                value={category} // Bind the selected category
                onChange={(event) => setCategory(event.target.value)} // Update category when it changes
              >
                <MenuItem value={'chicken'}>Chicken</MenuItem>
                <MenuItem value={'mutton'}>Mutton</MenuItem>
                <MenuItem value={'beef'}>Beef</MenuItem>
              </Select>
            </FormControl>
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
              image={getImageUrl(
                product.image.length > 0
                  ? product.image[0]
                  : '/default.png'
              )}
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
