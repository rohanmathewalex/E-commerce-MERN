import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Icon, Col, Card, Row } from "antd";
import ImageSlider from "../../utils/ImageSlider";
import Checkbox from "./Sections/CheckBox";

const { Meta } = Card;

function LandingPage() {
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState(0)

  const [Filters, setFilters] = useState({
    continents: [],
    price: []
  })

  useEffect(() => {
    const variables = {
      skip: Skip,
      limit: Limit,
    };

    getProducts(variables)
  }, [])

  const getProducts = (variables) => {
    Axios.post('/api/product/getProducts', variables)
      .then(response => {
        if (response.data.success) {
          if (variables.loadMore) {
            setProducts([...Products, ...response.data.products])
          } else {
            setProducts(response.data.products)
          }
          setPostSize(response.data.postSize)
        } else {
          alert('Failed to fectch product datas')
        }
      })
  }
  //When clicking Load More button it loads more produts in Landing Page
  const onLoadMore = () => {
    let skip = Skip + Limit;

    const variables = {
      skip: skip,
      limit: Limit,
      loadMore: true
    };

    getProducts(variables);
    setSkip(skip)
  };

  const renderCards = Products.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={24}>
        <Card hoverable={true} cover={<ImageSlider images={product.images} />}>
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });

  const showFilteredResults = (filters) => {
    const variables = {
      skip: 0,
      limit: Limit,
      filters: filters
    }

    getProducts(variables)
    setSkip(0)

  }

  const handleFilters = (filters, category) => {
    console.log(filters)

    const newFilters = { ...Filters }
    newFilters[category] = filters

    if (category === " price") {

    }

    showFilteredResults(newFilters)
    setFilters(newFilters)

  }
  //template for landing Page
  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>
          Let's Travel Anywhere <Icon type="rocket" />
        </h2>
      </div>
      {/* Filter */}
      <Checkbox
        handleFilters={filters => handleFilters(filters, "continents")}
      />

      {/*Search */}

      {Products.length === 0 ?
        <div
          style={{
            display: "flex",
            height: "300px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>No post yet ...!</h2>
        </div> :

        <div>
          {/*Creating Row for display In Responsive */}
          <Row gutter={(16, 16)}>{renderCards}</Row>
        </div>
      }
      <br></br>

      {
        PostSize >= Limit &&
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={onLoadMore}>Load More</button>
        </div>
      }


    </div >
  );
}

export default LandingPage;
