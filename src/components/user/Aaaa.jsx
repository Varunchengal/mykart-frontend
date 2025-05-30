import React, { useEffect, useState } from 'react';
import { Pagination, CircularProgress, Box, Typography } from '@mui/material';

const Aaaa = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${itemsPerPage}`);
      const result = await res.json();
      const totalCount = res.headers.get('x-total-count');
      setTotalPages(Math.ceil(totalCount / itemsPerPage));
      setData(result);
      setLoading(false);
    };

    fetchData();
  }, [page]);

  const handleChange = (_, value) => {
    setPage(value);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h5" gutterBottom>Server-Side Pagination</Typography>
      {loading ? (
        <Box textAlign="center"><CircularProgress /></Box>
      ) : (
        <ul>
          {data.map(post => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination count={totalPages} page={page} onChange={handleChange} color="primary" />
      </Box>
    </Box>
  );
};

export default Aaaa;
