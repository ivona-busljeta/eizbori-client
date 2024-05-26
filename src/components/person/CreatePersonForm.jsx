import {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PersonService from "../../services/PersonService.jsx";
import PropTypes from "prop-types";

export const CreatePersonForm = ({getPageContainingPerson}) => {
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const initialPersonState = {
        firstName: "",
        lastName: "",
        dob: "",
        address: "",
        pid: "",
        nationality: "",
        sex: ""
    };
    const [person, setPerson] = useState(initialPersonState);

    const createPerson = () => {
        PersonService.createPerson(person)
            .then((response) => {
                setShowModal(false);
                setPerson(initialPersonState);
                getPageContainingPerson(response.data.id);
            })
            .catch(error => console.log(error));
    };

    const initialErrorState = {
        firstName: "Obavezno polje",
        lastName: "Obavezno polje",
        dob: "Obavezno polje",
        address: "Obavezno polje",
        pid: "Obavezno polje",
        nationality: "Obavezno polje",
        sex: "Obavezno polje"
    };
    const [errors, setErrors] = useState(initialErrorState);
    const [noChanges, setNoChanges] = useState(true);
    const [formValid, setFormValid] = useState(false);

    const validateForm = () => {
        if (noChanges) {
            setNoChanges(!noChanges);
        }
        setFormValid(!(noChanges || errors.firstName || errors.lastName || errors.dob
            || errors.address || errors.pid || errors.nationality || errors.sex));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(validateForm, [errors]);

    const validateField = (fieldName, value) => {
        let {firstName, lastName, dob, address, pid, nationality, sex} = errors;

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

            case "dob":
                dob = !value ? "Obavezno polje" : "";
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

            case "pid":
                if (!value) {
                    pid = "Obavezno polje";
                } else {
                    const regexp = new RegExp("^[1-9][0-9]{10}$");
                    pid = !regexp.test(value) ? "Neispravan OIB" : "";
                }
                break;

            case "nationality":
                if (!value) {
                    nationality = "Obavezno polje";
                } else {
                    const regexp = new RegExp("^[A-ZČĆĐŠŽ]+$", "i");
                    nationality = value.length > 200
                        ? "Unos ne smije biti dulji od 200 znakova"
                        : !regexp.test(value) ? "Neispravan unos" : "";
                }
                break;

            case "sex":
                sex = !value ? "Obavezno polje" : "";
                break;

            default:
                break;
        }

        setErrors({
            firstName: firstName,
            lastName: lastName,
            dob: dob,
            address: address,
            pid: pid,
            nationality: nationality,
            sex: sex
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
            <Button variant="primary" className="shadow-none" onClick={handleShowModal}>Dodaj birača</Button>
            <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Novi birač</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row">
                            <div className="col form-group">
                                <label htmlFor="firstName">Ime</label>
                                <input id="firstName" name="firstName" type="text" value={person.firstName}
                                       onChange={handleInputChange} className={`form-control ${errorClass("firstName")}`}/>
                                <small className="text-danger">{errors.firstName}</small>
                            </div>
                            <div className="col form-group">
                                <label htmlFor="lastName">Prezime</label>
                                <input id="lastName" name="lastName" type="text" value={person.lastName}
                                       onChange={handleInputChange} className={`form-control ${errorClass("lastName")}`}/>
                                <small className="text-danger">{errors.lastName}</small>
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
                                <select id="sex" name="sex" value={person.sex}
                                        onChange={handleInputChange} className={`form-control ${errorClass("sex")}`}>
                                    <option value="" hidden={true}>M/Ž</option>
                                    <option value="MALE">M</option>
                                    <option value="FEMALE">Ž</option>
                                </select>
                                <small className="text-danger">{errors.sex}</small>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col form-group">
                                <label htmlFor="pid">OIB</label>
                                <input id="pid" name="pid" type="text" value={person.pid} placeholder="XXXXXXXXXXX"
                                       maxLength={11}
                                       onChange={handleInputChange} className={`form-control ${errorClass("pid")}`}/>
                                <small className="text-danger">{errors.pid}</small>
                            </div>
                            <div className="col form-group">
                                <label htmlFor="dob">Datum rođenja</label>
                                <input id="dob" name="dob" type="date" value={person.dob}
                                       onChange={handleInputChange} className={`form-control ${errorClass("dob")}`}/>
                                <small className="text-danger">{errors.dob}</small>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col form-group">
                                <label htmlFor="nationality">Nacionalnost</label>
                                <input id="nationality" name="nationality" type="text" value={person.nationality}
                                       onChange={handleInputChange}
                                       className={`form-control ${errorClass("nationality")}`}/>
                                <small className="text-danger">{errors.nationality}</small>
                            </div>
                        </div>
                    </form>
                    <div className="d-flex justify-content-center mt-3">
                        <button className="btn btn-primary shadow-none" disabled={!formValid}
                                onClick={createPerson}>Spremi
                        </button>
                        <button className="btn btn-danger shadow-none mx-4" onClick={handleClearForm}>Očisti</button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

CreatePersonForm.propTypes = {
    getPageContainingPerson: PropTypes.func.isRequired
};