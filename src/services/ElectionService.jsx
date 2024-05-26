import http from "../http-common.js";


const getElections = () => http.get("/election/all");

const getElection = (id) => http.get(`/election/${id}`);

const createElection = (data) => http.post("/election", data);

const updateElection = (data) => http.put("/election", data);

const deleteElection = (id) => http.delete(`/election/${id}`);


const ElectionService = {
    getElections,
    getElection,
    createElection,
    updateElection,
    deleteElection
};

export default ElectionService;