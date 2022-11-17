import React from 'react'
import { useContext } from 'react';
import FeedbackContext from "../Context/FeedbackContext";
import {
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardText,
    Button,
  } from "reactstrap";
  

function Product({product}) {
  const { cart,setCart } = useContext(FeedbackContext);
  return (
    <div>
      <Card
        style={{
          height: "30%",
          margin: "10px",
          cursor:'pointer'
        }}
      >
        <CardImg src={product.image} alt="Product" className="card-img" />
        <CardBody>
          <CardTitle>{product.name}</CardTitle>
          <CardText>
            Size: <strong>{product.size}</strong> |{" "}
            <span style={{ marginLeft: "2px" }}>Price: </span>
            <strong>{product.price}</strong>
          </CardText>
           <Button  color="primary" onClick={()=>{setCart([...cart,product])}}>
            Add To Cart
          </Button>
        </CardBody>
      </Card>
    </div>
  )
}

export default Product