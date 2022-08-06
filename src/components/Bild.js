import React, { useContext } from "react";

function Bild() {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control
          type="Number"
          placeholder="Total"
          name="Total"
          value={finalPrice.toFixed(2)}
          className="mt-0"
          onChange={handleTotalChange}
          autoFocus
        />
      </Form.Group>
      <Modal.Footer>
        <Button
          variant="info text-white col-6 mx-auto"
          type="submit"
          onClick={handleClose}
        >
          Close Table
        </Button>
      </Modal.Footer>
    </Form>
  );
}

export default Bild;
