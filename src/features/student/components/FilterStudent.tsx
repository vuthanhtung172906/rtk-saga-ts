import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { City, ListParams } from 'models';
import * as React from 'react';

export interface FilterStudentProps {
  cityList: City[];
  filterParams: ListParams;
  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

export default function FilterStudent({
  cityList,
  filterParams,
  onSearchChange,
  onChange,
}: FilterStudentProps) {
  const handleOnChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return '';
    const newFilter: ListParams = {
      ...filterParams,
      _page: 1,
      name_like: event.target.value,
    };
    return onSearchChange(newFilter);
  };
  const handleChangeCity = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    if (!onChange) return;
    const newFilter: ListParams = {
      ...filterParams,
      _page: 1,
      city: event.target.value || undefined,
    };
    return onChange(newFilter);
  };
  const handleSortChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    if (!onChange) return;
    const value = event.target.value;
    const [_sort, _order] = (value as string).split('.');

    const newFilter: ListParams = {
      ...filterParams,
      _sort: _sort || undefined,
      _order: (_order as 'asc' | 'desc') || undefined,
    };
    return onChange(newFilter);
  };
  const searchRef = React.useRef<HTMLInputElement>();
  const handleClear = () => {
    if (!onChange) return;
    const newFilter: ListParams = {
      ...filterParams,
      _page: 1,
      _order: undefined,
      _sort: undefined,
      name_like: undefined,
      city: undefined,
    };
    if (searchRef.current) {
      searchRef.current.value = '';
    }

    onChange(newFilter);
  };
  return (
    <Box marginY={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel htmlFor="Search Name Student">
              Search Name Student
            </InputLabel>
            <OutlinedInput
              inputRef={searchRef}
              id="Search Name Student"
              endAdornment={<Search />}
              label="Search Name Student"
              onChange={handleOnChangeSearch}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="search-by-city">Filter by City</InputLabel>
            <Select
              labelId="search-by-city"
              value={filterParams.city || ''}
              onChange={handleChangeCity}
              label="Filter by City"
            >
              <MenuItem value="">--all--</MenuItem>
              {cityList.map((city, idx) => (
                <MenuItem key={city.code} value={city.code}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="search-by-city">Sort</InputLabel>
            <Select
              labelId="search-by-city"
              value={
                filterParams._sort
                  ? `${filterParams._sort}.${filterParams._order}`
                  : ''
              }
              onChange={handleSortChange}
              label="Sort"
            >
              <MenuItem value="">No Sort</MenuItem>
              <MenuItem value="name.asc">Name ASC</MenuItem>
              <MenuItem value="name.desc">Name DESC</MenuItem>
              <MenuItem value="mark.asc">MARK ASC</MenuItem>
              <MenuItem value="mark.desc">MARK DESC</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <Button
            variant="outlined"
            size="large"
            onClick={handleClear}
            color="primary"
          >
            Clear
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
