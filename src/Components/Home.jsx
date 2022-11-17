import Navbar from "./Navbar";
import Product from "./Product";
import FeedbackContext from "../Context/FeedbackContext";
import { Container, Row, Col, Input, Label } from "reactstrap";
import { useContext, useEffect, useState } from "react";
import Slider from "@mui/material/Slider";

function Home() {
  const { data, price, setPrice, size, setSize } = useContext(FeedbackContext);
  const [productData, setProductData] = useState([]);
  const [tmpData, setTmpData] = useState([]);

  useEffect(() => {
    setProductData(data);
  }, [data]);

  useEffect(() => {
    let temporayData;
    size === "" || null
      ? (temporayData = productData.filter((item) => item.price <= price))
      : (temporayData = productData.filter(
          (item) => item.price <= price && item.size === size
        ));
    setTmpData(temporayData);
    // console.log("im running for useSize");
  }, [size, price,productData]);

  const marks = [
    {
      value: 110,
      label: "$110",
    },
    {
      value: 200,
      label: "$200",
    },
    {
      value: 320,
      label: "$320",
    },
  ];
  return (
    <>
      <Navbar />
      <Container>
        {/* <Grid container spacing={2}> */}
        <Row>
          <Col sm="12" lg="2">
            <div
              style={{
                marginTop: "50px",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            >
              <h3>Filters:</h3>
              <Label
                for="priceRange"
                style={{
                  marginTop: "20px",
                }}
              >
                <span style={{ marginRight: "5px" }}>Max Price: </span>${price}
              </Label>
              <Slider
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                onChange={(e, v) => {
                  setPrice(v);
                }}
                step={10}
                max={320}
                min={110}
                marks={marks}
                defaultValue={320}
              />

              <Label for="size" style={{ marginTop: "30px" }}>
                Size:
              </Label>
              <Input
                type="select"
                name="select"
                id="size"
                onChange={(e) => {
                  setSize(e.target.value);
                }}
              >
                <option value="">All Sizes</option>
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
                <option value="XL">XL</option>
              </Input>
            </div>
          </Col>
          <Col sm="12" lg="10">
            <Row>
              {tmpData.length === 0  && tmpData.price === null 
                ? productData &&
                  productData.map((pro) => {
                    return (
                      <Col xs="12" sm="6" md="4" key={pro.id}>
                        <Product product={pro} />
                      </Col>
                    );
                  })
                : tmpData &&
                  tmpData.map((pro) => {
                    return (
                      <Col xs="12" sm="6" md="4" key={pro.id}>
                        <Product product={pro} />
                      </Col>
                    );
                  })}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
