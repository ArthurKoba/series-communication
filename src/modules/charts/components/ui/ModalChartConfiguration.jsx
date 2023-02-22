import React from "react";
import {Button, Container, Modal} from "react-bootstrap";
import ChartItemConfiguration from "./ChartItemConfiguration";

export const ModalChartConfiguration = ({chart, show, handleClose}) => {

    return (
        <Modal centered={true} show={show} onHide={handleClose} size="lg">
            <Modal.Body>
                <ChartItemConfiguration chart={chart}/>



            </Modal.Body>
            <Modal.Footer >
                <Container className="row justify-content-center">
                    <Button variant="secondary" size="sm" onClick={() => handleClose()}>Close</Button>
                </Container>
            </Modal.Footer>
        </Modal>
    );
};