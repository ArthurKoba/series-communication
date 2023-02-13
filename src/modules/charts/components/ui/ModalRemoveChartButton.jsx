import React from 'react';
import {Button, Modal} from "react-bootstrap";

const ModalRemoveChartButton = ({show, handleClose, handleConfirm}) => {

    const confirm = () => {
        handleClose()
        handleConfirm()
    }

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Body>Are you sure you want to delete the graph?</Modal.Body>
            <Modal.Footer>
                <Button variant="success" size="sm" onClick={() => handleClose()}>
                    Close
                </Button>
                <Button variant="danger" size="sm" onClick={confirm}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalRemoveChartButton;