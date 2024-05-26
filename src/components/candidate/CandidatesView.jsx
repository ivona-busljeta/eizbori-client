import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import CandidateService from "../../services/CandidateService.jsx";

export const CandidatesView = ({id}) => {
    const [candidates, setCandidates] = useState([]);

    const getCandidates = () => {
        CandidateService.getElectionCandidates(id)
            .then((response) => {
                setCandidates(response.data)
            })
            .catch(error => console.log(error));
    };
    useEffect(getCandidates, [id]);

    return (
        <table className="table table-responsive-sm">
            <thead>
            <tr>
                <th scope="col" className="bg-primary text-bg-primary text-center">OIB</th>
                <th scope="col" className="bg-primary text-bg-primary text-center">Ime</th>
                <th scope="col" className="bg-primary text-bg-primary text-center">Prezime</th>
                <th scope="col" className="bg-primary text-bg-primary text-center">Datum rođenja</th>
                <th scope="col" className="bg-primary text-bg-primary text-center">Stranka</th>
                <th scope="col" className="bg-primary text-bg-primary text-center">Datum kandidiranja</th>
            </tr>
            </thead>
            <tbody>
            {candidates.map((candidate) => (
                <tr key={candidate.id}>
                    <td className="text-center">{candidate.person.pid}</td>
                    <td className="text-center">{candidate.person.firstName}</td>
                    <td className="text-center">{candidate.person.lastName}</td>
                    <td className="text-center">{candidate.person.dob}</td>
                    <td className="text-center">{candidate.party?.name}</td>
                    <td className="text-center">{candidate.applied}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

CandidatesView.propTypes = {
    id: PropTypes.number.isRequired
};