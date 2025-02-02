import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import style from './MessagesPage.module.css';
import axios from "axios";


export default function MessagesPage() {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([])
    const { id } = useParams();
    function fetchUsers() {
        axios.get(`http://localhost:3000/api/boolbnb/get-users/${id}`)
            .then(res => {
                console.log(res.data)
                setUsers(res.data)
            })
            .catch(err => console.error(err))
    }
    useEffect(() => {
        fetchUsers();
    }, [id]);
    //prova
    const users1 = [
        { id: 1, name: "Marco Esposito" },
        { id: 2, name: "Sofia Ferrari" },
        { id: 3, name: "Elisa Ricci" },
        { id: 4, name: "Lorenzo Conti" }
    ];

    return (
        <div className="container p-4">
            {/* Header */}
            <header className={`d-flex justify-content-between align-items-center ${style.bgBlue} p-3 shadow rounded`}>
                <div className="fs-4 fw-bold text-white">📩 Inbox</div>

                <form className="d-flex w-50">
                    <input
                        type="search"
                        placeholder="Cerca messagi..."
                        className="form-control me-2"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="btn btn-primary text-white">Cerca</button>
                </form>


                <div className="fs-4 fw-bold text-white">🏡</div>
            </header>

            {/* Main Content */}
            <div className="row mt-4">
                {/* lista utenti */}
                <div className="col-md-4">
                    <div className="card shadow-sm rounded">
                        <div className={`card-header fw-bold ${style.bgSoftBlue} text-white`}>Utenti</div>
                        <ul className="list-group list-group-flush">
                            {users.length > 0 && users.map((user) => (
                                <li key={user.email} className={`list-group-item py-3 ${style.user}`} role="button">
                                    {user.first_name} {user.last_name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Messagi */}
                <div className="col-md-8">
                    <div className="card shadow-sm rounded">
                        <div className={`card-header fw-bold ${style.bgSoftBlue} text-white`}>Chat</div>
                        <div className="card-body d-flex flex-column" style={{ height: "400px", overflowY: "auto" }}>
                            <div className="text-muted text-center">Click nel utente per vedere i messagi</div>
                        </div>
                        <div className="card-footer">
                            <form className="d-flex">
                                <input type="text" placeholder="Scrive un messagio..." className="form-control me-2" />
                                <button className="btn btn-primary">Send</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
