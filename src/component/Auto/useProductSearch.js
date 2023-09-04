import React, { useEffect, useState } from "react";

function useProductSearch({ query, pageNumber }) {
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setError(false)
    
  }, [query, pageNumber])

  return { error, products, hasMore }
}

export default useProductSearch;
