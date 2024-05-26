import http from "../http-common.js";


const getPersons = () => http.get("/person/all");

const getPage = (params) => http.get("/person/page", {params: params});

const getPageContainingPerson = (id, params = {}) => http.get(`/person/page/containing/${id}`, {params: params});

const getPerson = (id) => http.get(`/person/${id}`);

const createPerson = (data) => http.post("/person", data);

const updatePerson = (data) => http.put("/person", data);

const deletePerson = (id) => http.delete(`/person/${id}`);


const PersonService = {
    getPersons,
    getPage,
    getPageContainingPerson,
    getPerson,
    createPerson,
    updatePerson,
    deletePerson
};

export default PersonService;