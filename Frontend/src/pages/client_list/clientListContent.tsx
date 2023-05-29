import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ClientListContent = () => {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);const [currentPage,setCurrentPage]=useState(1);
    const [perPage,setPerPage]=useState(5);

    const [error, setError] = useState(null);
    // const [filter, setFilter] = useState("");
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    const token = localStorage.getItem('token');

    // useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         const response = await axios.get("http://127.0.0.1:8000/api/customers", {
    //           headers: {
    //             Authorization: `Bearer ${token}`,
    //           },
    //         }); n
    //         setData(response.data);
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     };
    
    //     fetchData();
    //   }, [token]);
      
    //   console.log(data)

    const [filter,setFilter]=useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
     
    const handleFilterChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const filterValue = event.target.value;
      setFilter(filterValue);
    
      try {
        const response = await axios.get(
         `http://127.0.0.1:8000/api/customersWithName?searchuser=${filterValue}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },

          }
        );
        setSearchResults(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/customers", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setData(response.data);
          setIsLoading(false);
        } catch (error:any) {
          setError(error);
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, [token]);
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }

    let totalItems = data.data.length;
    if(searchResults.length>0){
      totalItems = searchResults.length
    }
    const totalPages = Math.ceil(totalItems / perPage);
    const indexOfLastItem = currentPage * perPage;
    const indexOfFirstItem = indexOfLastItem - perPage;
    const currentItems = data.data.slice(indexOfFirstItem, indexOfLastItem);
    const currentSearchItems= searchResults?.slice(indexOfFirstItem, indexOfLastItem);


  
    return (
        <>
            <div style={{ width: '100%' }}>
                <div className="table-wrap">
                    <div className="client-title">
                        <div>
                           
                            <input
                                type="text"
                                placeholder="Search by name..."
                                value={filter}
                                onChange={handleFilterChange}
                            />

                        </div>
                        <abbr title="ADD NEW CUSTOMER">
                            <div className="addnewcustomer">
                                    <button className="addcusbtn">
                                        <Link to="/client-create">
                                            <span className="material-symbols-outlined">add</span>
                                        </Link>
                                    </button>
                            </div>     
                        </abbr> 
                    </div>

                    <table className='pj-table'>
                
                      <thead>
                          <tr className="table-header">
                              <th>No</th>
                              <th className="client-name">Name</th> 
                              <th>Contact Mail</th>
                              <th>Contact Phone</th>
                              <th>Contact Person</th>
                              <th>Position</th>
                              <th>Actions</th>
                          </tr>
                      </thead>
                      <tbody>
                      {(filter && currentSearchItems.length > 0 ? currentSearchItems: currentItems).map((item: any, index: number) => {
                        const rowNumber = (currentPage - 1) * perPage + index + 1;
                      return (
                        <tr key={item.id}>
                          <td>{rowNumber}</td>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.phone}</td>
                          <td>{item.contact_person}</td>
                          <td className="td-category">{item.position}</td>
                          <td>
                            <Link to={`/client_edit/${item.id}`}>
                                <i className="fa-solid fa-pen-to-square update"></i>
                            </Link>
                            <Link to={`/client_delete/${item.id}`}>
                              <i className="fa-solid fa-trash delete"></i>
                            </Link>
                            <Link to={`/client-project-lists?id=${item.id}`}>
                              <i className="fa-solid fa-angles-right more"></i>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                      </tbody>
                    </table>  
                    <div className="pagination">
                      <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                        &lt;&lt;
                      </button>
                      <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                        &gt;&gt;
                      </button>
                      
                    </div>




                </div>
            </div> 
        </>
    );
}

export default ClientListContent;