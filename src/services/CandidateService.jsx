import http from "../http-common.js";


const getElectionCandidates = (id) => http.get(`/candidate/all/${id}`);

const createCandidate = (data) => http.post("/candidate", data);

const deleteCandidate = (id) => http.delete(`/candidate/${id}`);


const CandidateService = {
    getElectionCandidates,
    createCandidate,
    deleteCandidate
};

export default CandidateService;