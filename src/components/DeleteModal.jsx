import PropTypes from "prop-types";
import {useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const DeleteModal = ({tbdObject, deletionHandler}) => {
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = (event) => {
        setShowModal(false);
        if (event.target.id === "delete") {
            deletionHandler();
        }
    }

    return (
        <>
            <Button variant="danger" onClick={handleShowModal} className="shadow-none">Izbriši</Button>
            <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Izbriši stavku {tbdObject}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Želite li nastaviti?</Modal.Body>
                <Modal.Footer>
                    <Button id="cancel" variant="secondary" onClick={handleCloseModal} className="shadow-none">Odustani</Button>
                    <Button id="delete" variant="danger" onClick={handleCloseModal} className="shadow-none">Nastavi</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

DeleteModal.propTypes = {
    tbdObject: PropTypes.any,
    deletionHandler: PropTypes.func
};