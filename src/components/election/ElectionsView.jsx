import {NavBar} from "../NavBar.jsx";
import {useEffect, useState} from "react";
import ElectionService from "../../services/ElectionService.jsx";
import {CandidatesView} from "../candidate/CandidatesView.jsx";

export const ElectionsView = () => {
    const [elections, setElections] = useState([]);
    const [current, setCurrent] = useState(undefined);
    const [currentIdx, setCurrentIdx] = useState(-1);

    const getElections = () => {
        ElectionService.getElections()
            .then((response) => {
                setElections(response.data);
                setCurrent(response.data[0]);
                setCurrentIdx(0);
            })
            .catch(error => console.log(error));
    };
    useEffect(getElections, []);

    const changeCurrent = (idx) => {
        setCurrent(elections[idx]);
        setCurrentIdx(idx);
    };

    return (
        <>
            <NavBar/>
            <nav className="m-4">
                <ul className="pagination justify-content-start">
                    {currentIdx > 0 &&
                        <li className="page-item">
                            <a className="page-link" onClick={() => changeCurrent(currentIdx - 1)}>Prethodni</a>
                        </li>
                    }
                    {[...Array(elections.length)].map((_, i) => (
                        <li key={i} className={`page-item ${currentIdx === i ? "active" : ""}`}>
                            <a className="page-link" onClick={() => changeCurrent(i)}>{i + 1}</a>
                        </li>
                    ))}
                    {currentIdx < elections.length - 1 &&
                        <li className="page-item">
                            <a className="page-link" onClick={() => changeCurrent(currentIdx + 1)}>Sljedeći</a>
                        </li>
                    }
                </ul>
            </nav>
            <form className="m-2">
                <h3>Izbori {current?.year}</h3>
                <div className="row mt-2">
                    <div className="col-3 form-group">
                        <label htmlFor="type">Vrsta izbora</label>
                        <input id="type" name="type" type="text" value={current?.type.name} disabled={true}
                               className="form-control"/>
                    </div>
                    <div className="col-3 form-group">
                        <label htmlFor="eventDate">Datum održavanja</label>
                        <input id="eventDate" name="eventDate" type="date" value={current?.eventDate} disabled={true}
                               className="form-control"/>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-3 form-group">
                        <label htmlFor="status">Status</label>
                        <input id="status" name="status" type="text" value={current?.status} disabled={true}
                               className="form-control"/>
                    </div>
                    <div className="col-3 form-group">
                        <label htmlFor="deadline">Rok za kandidaturu</label>
                        <input id="deadline" name="deadline" type="date" value={current?.deadline} disabled={true}
                               className="form-control"/>
                    </div>
                </div>
            </form>
            <div className="mt-5"><CandidatesView id={current?.id}/></div>

        </>
    );
};