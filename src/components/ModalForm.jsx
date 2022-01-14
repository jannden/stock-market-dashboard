import React from "react";
import { useSelector, useDispatch } from "react-redux";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

// Modal
import Modal from "react-modal";

// Firestore
import { saveFirestore } from "../firebase";

import { setUser } from "../actions/userActions";

// Modal settings
import modalStyles from "../../data/modalStyles";

Modal.setAppElement("#app");

export const roundTwoDecimals = (value) =>
  Math.round(Number(value) * 100) / 100;

// Component
const ModalForm = function ModalForm({ modalAction, setModalAction }) {
  const currentUser = useSelector((state) => state.currentUser);
  const stockDataFromRedux = useSelector((state) => state.stockData);
  const dispatch = useDispatch();
  const { modalOpened, activeStock } = modalAction;
  const [formData, setFormData] = React.useState({
    numberOfStocks: 0,
    finalAmount: 0,
    wallet: 1000,
    units: 0,
    unitPrice: 0,
  });

  React.useEffect(() => {
    setFormData({
      numberOfStocks: 0,
      finalAmount: 0,
      wallet: currentUser.firestore?.wallet || 1000,
      units: currentUser.firestore?.stockUnits?.[activeStock] || 0,
      unitPrice: stockDataFromRedux?.[activeStock]?.seriesCandle[0]?.data[0]
        ?.y[3]
        ? Math.round(
            Number(
              stockDataFromRedux[activeStock].seriesCandle[0].data[0].y[3]
            ) * 100
          ) / 100
        : 0,
    });
  }, [activeStock, currentUser.firestore, stockDataFromRedux]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      numberOfStocks: e.target.value,
      finalAmount: roundTwoDecimals(
        formData.unitPrice * Number(e.target.value)
      ),
    });
  };

  const handleAction = (type) => {
    const prevUnits = formData.units || 0;
    const newWallet =
      type === "buy"
        ? roundTwoDecimals(formData.wallet - Number(formData.finalAmount))
        : roundTwoDecimals(formData.wallet + Number(formData.finalAmount));
    const newNumberOfStocks =
      type === "buy"
        ? prevUnits + Number(formData.numberOfStocks)
        : prevUnits - Number(formData.numberOfStocks);
    const dataForFirestore = {
      wallet: newWallet,
      stockUnits: {
        ...currentUser.firestore.stockUnits,
        [activeStock]: Math.round(newNumberOfStocks),
      },
    };
    saveFirestore(dataForFirestore).then(() => {
      const data = {
        ...currentUser,
        firestore: dataForFirestore,
      };
      dispatch(setUser(data));
    });
  };
  return (
    <Modal isOpen={modalOpened} style={modalStyles}>
      <Container>
        <Row className="justify-content-md-center">
          <Col className="mx-auto mb-4">
            <Form>
              <h2 className="text-center mb-3">{activeStock}</h2>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Current price per unit</Form.Label>
                    <InputGroup>
                      <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                      <Form.Control
                        placeholder="Disabled input"
                        value={formData.unitPrice}
                        disabled
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>In your portfolio</Form.Label>
                    <Form.Control
                      placeholder="Disabled input"
                      value={formData.units}
                      disabled
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Quantity to buy/sell</Form.Label>
                <Form.Control
                  value={formData.numberOfStocks}
                  onChange={handleChange}
                  name="numberOfStocks"
                  type="number"
                />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Your current cash</Form.Label>
                    <InputGroup>
                      <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                      <Form.Control value={formData.wallet} disabled />
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Expected change</Form.Label>
                    <InputGroup>
                      <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                      <Form.Control value={formData.finalAmount} disabled />
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button
                    onClick={() =>
                      setModalAction({
                        modalOpened: false,
                        activeStock: null,
                      })
                    }
                    variant="secondary"
                    className="col-12"
                  >
                    Cancel
                  </Button>
                </Col>
                <Col>
                  <Button
                    disabled={
                      formData.numberOfStocks < 1 ||
                      formData.finalAmount > formData.wallet
                    }
                    onClick={() => handleAction("buy")}
                    variant="success"
                    className="col-12"
                    type="button"
                  >
                    Buy
                  </Button>
                </Col>
                <Col>
                  <Button
                    disabled={
                      formData.numberOfStocks < 1 ||
                      formData.numberOfStocks > formData.units
                    }
                    onClick={() => handleAction("sell")}
                    variant="danger"
                    className="col-12"
                    type="button"
                  >
                    Sell
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </Modal>
  );
};
export default ModalForm;
