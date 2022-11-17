import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Drawer from "@mui/material/Drawer";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Container from "@mui/material/Container";
import FeedbackContext from "../Context/FeedbackContext";
import { useContext, useState, useEffect } from "react";
import Badge from "@mui/material/Badge";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";

function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { cart, setCart } = useContext(FeedbackContext);
  const [cartTotal, setCartTotal] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setIsDrawerOpen(false);
    setCart([]);
  };
  useEffect(() => {
    setCartTotal(cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0));
  }, [cart]);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }
  // increase work
  const increaseQuantity = (id) => {
    let increaseCartValue = cart.map((current) => {
      if (current.id === id) {
        return { ...current, quantity: current.quantity + 1 }

      }
      else {
        return current;
      }

    })
    return setCart(increaseCartValue);
  }

  // decrease work

  const decreaseQuantity = (item) => {
    if (item.quantity === 1) {
      let remove = cart.filter((removeItem) => {
        if (removeItem.id === item.id) {
          return removeItem.id !== item.id
        }
        return removeItem
      }
      )
      setCart(remove)
    }
    else {
      let decreaseCartValue = cart.map((current) => {
        if (current.id === item.id) {
          return { ...current, quantity: current.quantity - 1 }

        }
      return current
      })
      return setCart(decreaseCartValue);
    }
  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: "#343a40" }}>
          <Container>
            <Toolbar>
              <ShoppingCartOutlinedIcon style={{ color: "#fff" }} />
              <Typography
                variant="h5"
                component="div"
                sx={{ flexGrow: 1 }}
                style={{ display: "flex", alignItems: "center", gap: ".6rem" }}
              >
                ReactCart
              </Typography>
              <IconButton onClick={() => setIsDrawerOpen(true)}>
                {cart.length === 0 ? (
                  <ShoppingCartOutlinedIcon style={{ color: "white" }} />
                ) : (
                  <Badge badgeContent={cart.length} color="primary">
                    <ShoppingCartOutlinedIcon style={{ color: "white" }} />
                  </Badge>
                )}
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        style={{ position: "relative" }}
      >
        <Box
          p={2}
          width="auto"
          height="auto"
          textAlign="center"
          role="peresentation"
          style={{ position: "relative" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "0.8rem 0",
            }}
          >
            <IconButton
              onClick={() => setIsDrawerOpen(false)}
              style={{ marginLeft: "1rem" }}
            >
              <ArrowForwardIcon />
            </IconButton>
            <ShoppingCartOutlinedIcon />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              style={{ display: "flex", alignItems: "center", gap: ".6rem" }}
            >
              Your Cart
            </Typography>
          </div>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: ".6rem",
              justifyContent: "center",
            }}
          >
            Your Cart total is : {cartTotal}
          </Typography>
          <Row>
            <Col>
              {cart.length === 0 ? (
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".6rem",
                    justifyContent: "center",
                    margin: "8rem 0",
                  }}
                >
                  Your Cart is empty
                </Typography>
              ) : (
                cart &&
                cart.map((item) => {
                  return (
                    <Card
                      style={{
                        height: "fit-content",
                        width: "fit-content",
                        margin: "2.5rem",
                        cursor: "pointer",
                      }}
                      key={item.id}
                    >
                      <CardImg
                        src={item.image}
                        alt="Product"
                        className="card-img"
                        style={{ height: "100px" }}
                      />
                      <CardBody>
                        <CardTitle>{item.name}</CardTitle>
                        <CardText>
                          Size: <strong>{item.size}</strong> |{" "}
                          <span style={{ marginLeft: "2px" }}>Price: </span>
                          <strong>{item.price}</strong>
                        </CardText>
                        <div
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          Quantity:
                          <IconButton
                            aria-label="delete" onClick={() => decreaseQuantity(item)} >
                            <RemoveIcon />
                          </IconButton>
                          <span>{item.quantity}</span>
                          <IconButton
                            aria-label="Add" onClick={() => increaseQuantity(item.id)}>
                            <AddIcon />
                          </IconButton>
                        </div>
                      </CardBody>
                    </Card>
                  );
                })
              )}
              {cart.length === 0 ? (
                <Button
                  variant="contained"
                  disabled
                  style={{
                    bottom: "0px",
                    position: "absolute",
                    width: "100%",
                    right: "0",
                  }}
                >
                  Complete Check Out
                </Button>
              ) : (
                <Button
                  variant="contained"
                  style={{
                    bottom: "0px",
                    position: "absolute",
                    width: "100%",
                    right: "0",
                  }}
                  onClick={handleOpenModal}>Complete Check Out</Button>
              )}
            </Col>
          </Row>
        </Box>
      </Drawer>
      {/* Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Thanks For Shopping With us Your Total is {cartTotal}
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default Navbar;
