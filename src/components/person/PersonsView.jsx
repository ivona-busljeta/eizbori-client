import {useEffect, useState} from "react";
import PersonService from "../../services/PersonService.jsx";
import {SearchBar} from "../SearchBar.jsx";
import {CreatePersonForm} from "./CreatePersonForm.jsx";
import {UpdatePersonForm} from "./UpdatePersonForm.jsx";
import {DeleteModal} from "../DeleteModal.jsx";
import {NavBar} from "../NavBar.jsx";

export const PersonsView = () => {
    const [persons, setPersons] = useState([]);

    const [page, setPage] = useState(0);
    const [count, setCount] = useState(0);
    const [search, setSearch] = useState({column: "firstName", term: ""});

    const getPage = (page) => {
        PersonService.getPage({page: page, field: search.column, term: search.term})
            .then((response) => {
                setPersons(response.data.items);
                setPage(response.data.currentPage);
                setCount(response.data.totalPages);
            })
            .catch(error => console.log(error));
    };
    useEffect(getPage, [search]);

    const getPageContainingPerson = (id) => {
        PersonService.getPageContainingPerson(id)
            .then((response) => {
                setPersons(response.data.items);
                setPage(response.data.currentPage);
                setCount(response.data.totalPages);
            })
            .catch(error => console.log(error));
    };

    const deletePerson = (id) => {
        PersonService.deletePerson(id)
            .then(() => {
                if (persons.length === 1) {
                    getPage(0);
                } else {
                    getPage(page);
                }
            })
            .catch(error => console.log(error));
    };
    
    const handleSearchChange = (event) => {
        const {id, value} = event.target;
        setSearch({...search, [id]: value});
    };

    return (
        <>
            <NavBar/>
            <div className="m-3 d-flex flex-row justify-content-between align-items-center">
                <div>
                    <SearchBar search={search} handleSearchChange={handleSearchChange}/>
                </div>
                <div>
                    <CreatePersonForm getPageContainingPerson={getPageContainingPerson}/>
                </div>
            </div>
            <table className="table table-responsive">
                <thead>
                    <tr>
                        <th scope="col" className="bg-primary text-bg-primary text-center">OIB</th>
                        <th scope="col" className="bg-primary text-bg-primary text-center">Ime</th>
                        <th scope="col" className="bg-primary text-bg-primary text-center">Prezime</th>
                        <th scope="col" className="bg-primary text-bg-primary text-center">Datum rođenja</th>
                        <th scope="col" className="bg-primary text-bg-primary text-center">Adresa</th>
                        <th scope="col" className="bg-primary text-bg-primary text-center">Grad</th>
                        <th scope="col" className="bg-primary text-bg-primary text-center">Nacionalnost</th>
                        <th scope="col" className="bg-primary text-bg-primary text-center">Spol</th>
                        <th scope="col" className="bg-primary text-bg-primary text-center"></th>
                        <th scope="col" className="bg-primary text-bg-primary text-center"></th>
                    </tr>
                </thead>
                <tbody>
                {persons.map((person) => (
                    <tr key={person.id}>
                        <td className="text-center">{person.pid}</td>
                        <td className="text-center">{person.firstName}</td>
                        <td className="text-center">{person.lastName}</td>
                        <td className="text-center">{person.dob}</td>
                        <td className="text-center">{person.address.split(", ")[0]}</td>
                        <td className="text-center">{person.address.split(", ")[1]}</td>
                        <td className="text-center">{person.nationality}</td>
                        <td className="text-center">{person.sex}</td>
                        <td className="text-center"><UpdatePersonForm initialPersonState={person}/></td>
                        <td className="text-center"><DeleteModal tbdObject={person.pid} deletionHandler={() => deletePerson(person.id)}/></td>
                    </tr>
                ))}
                </tbody>
            </table>
            <nav>
                <ul className="pagination justify-content-end">
                    {page > 0 &&
                        <li className="page-item">
                            <a className="page-link" onClick={() => getPage(page - 1)}>Prethodna</a>
                        </li>
                    }
                    {[...Array(count)].map((_, i) => (
                        <li key={i} className={`page-item ${page === i ? "active" : ""}`}>
                            <a className="page-link" onClick={() => getPage(i)}>{i + 1}</a>
                        </li>
                    ))}
                    {page < count - 1 &&
                        <li className="page-item">
                            <a className="page-link" onClick={() => getPage(page + 1)}>Sljedeća</a>
                        </li>
                    }
                </ul>
            </nav>
        </>
    );
};