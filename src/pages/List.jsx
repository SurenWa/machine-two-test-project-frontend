import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import Datatable from "../components/DataTable"

const List = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <Datatable />
            </div>
        </div>
    )
}

export default List