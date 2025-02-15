import Layout from "../comps/Layout";
import Card from "../comps/Card";
import Sidebar from "../comps/ShopSidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { sortSliceActions } from "../store/slices/sortSlice";
import NoData from "../comps/NoData";
import ProductSkeleton from "../comps/ProductSkeleton";

const Shop = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [productsData, setProductsData] = useState([]);
  const [sortedProductData, setSortedProductData] = useState([]);
  const { sortBasis } = useSelector((state) => state.sort_Slice);
  const [filterText, setFilterText] = useState("");
  const {
    activeFilterId, // cid
    filteredCategory,
    filteredPriceRangeMinimum,
    filteredPriceRangeMaximum,
    filteredProductSlug,
  } = useSelector((state) => state.filter_Slice);

  const fetchProductsData = async () => {
    setLoading(true);
    try {
      let res;

      // if all the filtered data is null
      if (
        activeFilterId === null &&
        filteredCategory === null &&
        filteredPriceRangeMaximum === null &&
        filteredProductSlug === null
      ) {
        res = await axios.get(
          `http://localhost:8000/api/v1/fetch-all-products/1`,
          { withCredentials: true }
        );
      }

      // if category filter is not null
      if (activeFilterId !== null && filteredCategory !== null) {
        res = await axios.get(
          `http://localhost:8000/api/v1/fetch-all-products-by-category/${activeFilterId}`,
          { withCredentials: true }
        );

        setFilterText("Filter: " + filteredCategory);
      }

      // if the price range filter is not null
      if (filteredPriceRangeMaximum !== null) {
        res = await axios.get(
          `http://localhost:8000/api/v1/fetch-all-products-by-price-range/${filteredPriceRangeMinimum}/${filteredPriceRangeMaximum}`,
          { withCredentials: true }
        );

        setFilterText(
          `Filter: Min price: ${
            filteredPriceRangeMinimum < 10
              ? "0" + filteredPriceRangeMinimum
              : filteredPriceRangeMinimum
          } | Max price: ${
            filteredPriceRangeMaximum < 10
              ? "0" + filteredPriceRangeMaximum
              : filteredPriceRangeMaximum
          }`
        );
      }

      // if the product slug filter is not null
      if (filteredProductSlug !== null) {
        res = await axios.get(
          `http://localhost:8000/api/v1/fetch-all-products-by-slug/${filteredProductSlug}`,
          { withCredentials: true }
        );

        setFilterText("Filter: " + filteredProductSlug);
      }

      if (res.data.success) {
        setProductsData(res.data.data);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.msg);
      setLoading(false);
    }
  };

  const sortProducts = (e) => {
    try {
      const selectedSortBasis = e.target.value;

      dispatch(
        sortSliceActions.populateSortBasis({
          sortBasis: selectedSortBasis,
        })
      );

      const sortedData = [...productsData];

      if (selectedSortBasis === "lowToHigh") {
        sortedData.sort((a, b) => a.price - b.price);
      }

      if (selectedSortBasis === "highToLow") {
        sortedData.sort((a, b) => b.price - a.price);
      }

      setSortedProductData(sortedData);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchProductsData();
  }, [
    activeFilterId,
    filteredCategory,
    filteredPriceRangeMinimum,
    filteredPriceRangeMaximum,
    filteredProductSlug,
    sortBasis,
  ]);

  const displayProducts = sortBasis ? sortedProductData : productsData;

  return (
    <Layout>
      <main className="flex">
        <Sidebar />
        <div className="w-full flex flex-col px-2">
          <div className="flex justify-between my-3">
            {filterText || <span></span>}
            <select name="sortBy" id="sortBy" onChange={sortProducts}>
              <option defaultChecked>Sort by</option>
              <option value="lowToHigh">Low to high</option>
              <option value="highToLow">High to low</option>
            </select>
          </div>
          <section className="w-10/12 flex flex-wrap">
            {loading ? (
              <ProductSkeleton />
            ) : displayProducts.length > 0 ? (
              displayProducts.map((product) => {
                return (
                  <Card
                    key={product._id}
                    pid={product._id}
                    name={product.name}
                    price={product.price}
                    img={product.img}
                    category={product.category?.name}
                    shortDesc={product.shortDesc}
                    longDesc={product.longDesc}
                  />
                );
              })
            ) : (
              <NoData data={"Products"} />
            )}
          </section>
        </div>
      </main>
    </Layout>
  );
};

export default Shop;
