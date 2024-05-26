import {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PersonService from "../../services/PersonService.jsx";
import PropTypes from "prop-types";

export const UpdatePersonForm = ({initialPersonState}) => {
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const [person, setPerson] = useState(initialPersonState);

    const updatePerson = () => {
        PersonService.updatePerson(person)
            .then(() => {
                setShowModal(false);
            })
            .catch(error => console.log(error));
    };

    const initialErrorState = {
        firstName: "",
        lastName: "",
        address: ""
    };
    const [errors, setErrors] = useState(initialErrorState);
    const [noChanges, setNoChanges] = useState(true);
    const [formValid, setFormValid] = useState(false);

    const validateForm = () => {
        if (noChanges) {
            setNoChanges(!noChanges);
        }
        setFormValid(!(noChanges || errors.firstName || errors.lastName || errors.address));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(validateForm, [errors]);

    const validateField = (fieldName, value) => {
        let {firstName, lastName, address} = errors;

        switch (fieldName) {
            case "firstName":
                if (!value) {
                    firstName = "Obavezno polje";
                } else {
                    const regexp = new RegExp("^[A-ZČĆĐŠŽ -]+$", "i");
                    firstName = value.length > 200
                        ? "Unos ne smije biti dulji od 200 znakova"
                        : !regexp.test(value) ? "Neispravan unos" : "";
                }
                break;

            case "lastName":
                if (!value) {
                    lastName = "Obavezno polje";
                } else {
                    const regexp = new RegExp("^[A-ZČĆĐŠŽ -]+$", "i");
                    lastName = value.length > 200
                        ? "Unos ne smije biti dulji od 200 znakova"
                        : !regexp.test(value) ? "Neispravan unos" : "";
                }
                break;

            case "address":
                if (!value) {
                    address = "Obavezno polje";
                } else {
                    const regexp = new RegExp("^[A-ZČĆĐŠŽ0-9\\s.-]+,\\s*\\d{5}\\s+[A-ZČĆĐŠŽ0-9\\s-]+$", "i");
                    address = value.length > 200
                        ? "Unos ne smije biti dulji od 200 znakova"
                        : !regexp.test(value) ? "Potrebno je unijeti punu adresu" : "";
                }
                break;

            default:
                break;
        }

        setErrors({
            firstName: firstName,
            lastName: lastName,
            address: address
        });
    };

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        validateField(name, value);
        setPerson({...person, [name]: value});
    };

    const handleClearForm = () => {
        setNoChanges(!noChanges);
        setErrors(initialErrorState);
        setPerson(initialPersonState);
    };

    const errorClass = (fieldName) => {
        return (
            errors[fieldName] ? "is-invalid" : ""
        );
    };

    return (
        <>
            <Button variant="primary" className="shadow-none" onClick={handleShowModal}>Uredi</Button>
            <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Uredi podatke</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row">
                            <div className="col form-group">
                                <label htmlFor="firstName">Ime</label>
                                <input id="firstName" name="firstName" type="text" value={person.firstName}
                                       onChange={handleInputChange} className={`form-control ${errorClass("firstName")}`}/>
                                <small className="text-danger">{errors.address}</small>
                            </div>
                            <div className="col form-group">
                                <label htmlFor="lastName">Prezime</label>
                                <input id="lastName" name="lastName" type="text" value={person.lastName}
                                       onChange={handleInputChange} className={`form-control ${errorClass("lastName")}`}/>
                                <small className="text-danger">{errors.address}</small>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-9 form-group">
                                <label htmlFor="address">Adresa</label>
                                <input id="address" name="address" type="text" value={person.address}
                                       placeholder="Ulica i ulični broj, poštanski broj i grad"
                                       onChange={handleInputChange} className={`form-control ${errorClass("address")}`}/>
                                <small className="text-danger">{errors.address}</small>
                            </div>
                            <div className="col form-group">
                                <label htmlFor="sex">Spol</label>
                                <input id="sex" name="sex" type="text" value={person.sex} disabled={true} className="form-control"/>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col form-group">
                                <label htmlFor="pid">OIB</label>
                                <input id="pid" name="pid" type="text" value={person.pid} disabled={true} className="form-control"/>
                            </div>
                            <div className="col form-group">
                                <label htmlFor="dob">Datum rođenja</label>
                                <input id="dob" name="dob" type="text" value={person.dob} disabled={true} className="form-control"/>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col form-group">
                                <label htmlFor="nationality">Nacionalnost</label>
                                <input id="nationality" name="nationality" type="text" value={person.nationality}
                                       disabled={true} className="form-control"/>
                            </div>
                        </div>
                    </form>
                    <div className="d-flex justify-content-center mt-3">
                        <button className="btn btn-primary shadow-none" disabled={!formValid} onClick={updatePerson}>Spremi</button>
                        <button className="btn btn-danger shadow-none mx-4" onClick={handleClearForm}>Očisti</button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

UpdatePersonForm.propTypes = {
    initialPersonState: PropTypes.shape({
        id: PropTypes.number,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        dob: PropTypes.string,
        address: PropTypes.string,
        pid: PropTypes.string,
        nationality: PropTypes.string,
        sex: PropTypes.string
    }).isRequired
};