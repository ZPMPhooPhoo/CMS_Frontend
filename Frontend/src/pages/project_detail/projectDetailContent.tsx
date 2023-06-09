import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { ProjectCard } from "./projectCard"
import { useLocation } from "react-router-dom";
import axios from "axios";
interface Pjdata {
    [x: string]: any;
    id: number,
    title: string
}

interface pj_pass_data {
    category: string,
    status: string,
    description: string,
    developer_names: []
}

export const ProjectDetailContent: React.FC<pj_pass_data> = ({ }) => {
    const [showQuotationModal, setShowQuotationModal] = useState<boolean>(false);
    const [isQuotationsEmpty, setIsQuotationsEmpty] = useState<boolean>(false);
    const [QuotationData, setQuotationData] = useState<any[]>([]);
    const [expandedIndex, setExpandedIndex] = useState(-1);
    const [error, setError] = useState<string | undefined>();
    const [errMsg, setErrMsg] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [pjdata, setPjdata] = useState<Pjdata>();
    const [devData, setDevData] = useState<[]>([]);
    const token = localStorage.getItem("token");
    const location = useLocation();
    const searchID = new URLSearchParams(location.search);
    const id = searchID.get("id");
    const projectID = searchID.get("projectID");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/projects/${projectID}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const newResponse = await axios.get(
                    `http://127.0.0.1:8000/api/developerproject/${projectID}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const quotationResponse = await axios.get(`
                    http://127.0.0.1:8000/api/quotations/${projectID}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                if (quotationResponse.data.data.length === 0) {
                    setIsQuotationsEmpty(true);
                } else {
                    setQuotationData(quotationResponse.data.data);
                }
                setPjdata(response.data.data)
                setDevData(newResponse.data.data)
                setIsLoading(false);
            } catch (error: any) {
                if (error.response && error.response.data && error.response.data.message) {
                    const apiErrorMessage = error.response.data.message;
                    setErrMsg(apiErrorMessage);
                  } else {
                    setErrMsg('An error has occurred during the API request.');
                  }
                setError(error.message);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id, token]);

    if (isLoading) {
        return <div className="l-width"><p className="loading"></p></div>
    }

    if (error) {
        return <div>We are having trouble when fetching data. Please try again later.</div>;
    }
    QuotationData.map((item: any) => {
        
    })
    const handleModalClose = () => {
        setShowQuotationModal(false);
    };

    const handleModalOpen = () => {
        setShowQuotationModal(true);
    };


    const toggleAccordion = (index: number) => {
        if (index === expandedIndex) {
            setExpandedIndex(-1);
        } else {
            setExpandedIndex(index);
        }
    };
    let Cusname = "";
    devData.map((cus: any) => {
        if (cus.role_id == 5) {
            Cusname = cus.name;
        }
    });
      
    const category = pjdata?.category.category;
    const status = pjdata?.status;
    const description = pjdata?.description;

    const handleDownload = (url: string, filename: string) => {
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const blobUrl = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = blobUrl;
                link.download = filename;
                link.click();
                URL.revokeObjectURL(blobUrl);
            })
            .catch(error => {
                
            });
    };

    // const devName = devData.filter((item: any) => { item.id == 4 }).map((item: any) => { item.name });
    // console.log(devData.filter((item: any) => { item.id == 4 }))

    return (

        <>


            <div className="mainclientls" >
                <div className="clils">
                    <div className="maincliproli">
                        <div className="Addproject">
                            <div className="pro_listincliinfo">
                                <Link to={`/client-project-lists?id=${id}`}><i className="fa-solid fa-chevron-left"></i></Link>
                                <span className="material-symbols-outlined">
                                    person
                                </span>
                                <p>{Cusname} / &nbsp; </p>
                                <p>{pjdata && pjdata.title}</p>
                            </div>
                        </div>
                        <div className="procard">

                            <div className="leftcard_pro">
                                <ProjectCard category={category} status={status} description={description} />
                                {/* <ProjectCard />      */}
                                <div className="assigned-dev">
                                    <h3>ASSIGNED DEVELOPERS FOR THIS PROJECT</h3>
                                    <ul>
                                        <li>YYK</li>
                                        <li>YYK</li>
                                        <li>YYK</li>
                                        <li>YYK</li>
                                        <li>YYK</li>
                                        <li>YYK</li>
                                        <li>YYK</li>
                                        <li>YYK</li>
                                        <li>YYK</li>
                                        <li>YYK</li>
                                        <li>YYK</li>
                                        <li>YYK</li>
                                        <li>YYK</li>
                                        <li>YYK</li>
                                        <li>YYK</li>
                                    </ul>

                                </div>
                                <div className="modal-btn">
                                    <button onClick={handleModalOpen}>Quotations </button>
                                    <button onClick={handleModalOpen}>Contracts </button>
                                </div>
                            </div>
                            <div className="right_card_category">
                                <div className="category_list">
                                    <h1>Report</h1>
                                    <h2>Number Of Quotations:  <span>6</span> </h2>
                                    <h2>Number Of Contracts:  <span>2</span> </h2>
                                    <h2>Successful rate</h2>
                                    <div className="success-rate">
                                        <p>60%</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>



            </div>
            {showQuotationModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-content">
                            {/* <div className="accordion">
                                <h1>Quotations Of Project Name</h1>
                                <div className="accordion-item">
                                    <div className="accordion-header" onClick={() => toggleAccordion(0)}>
                                        <h3>Quotation_1</h3>
                                        <span className={expandedIndex === 0 ? "accordion-icon expanded" : "accordion-icon"}>
                                            {expandedIndex === 0 ? "\u25BC" : "\u25B6"}
                                        </span>
                                    </div>
                                    {expandedIndex === 0 && (
                                        <div className="accordion-content">
                                            <p>Quotation Description 1 Quotation Description 1 Quotation Description 1 Quotation Description 1 Quotation Description 1 Quotation Description 1 Quotation Description 1 Quotation Description 1</p>
                                            jm                     <div>
                                                <a href="#"><i className="fa-solid fa-pen-to-square update"></i></a>
                                                <a href="#"><i className="fa-solid fa-trash delete"></i></a>
                                                <a href="#"><i className="fa-solid fa-file-arrow-down download"></i></a>
                                            </div>
                                        </div>

                                    )}
                                </div>
                                <div className="accordion-item">
                                    <div className="accordion-header" onClick={() => toggleAccordion(1)}>
                                        <h3>Quotation_2</h3>
                                        <span className={expandedIndex === 1 ? "accordion-icon expanded" : "accordion-icon"}>
                                            {expandedIndex === 1 ? "\u25BC" : "\u25B6"}
                                        </span>
                                    </div>
                                    {expandedIndex === 1 && (
                                        <div className="accordion-content">
                                            <p>Quotation Description 1 Quotation Description 1 Quotation Description 1 Quotation Description 1 Quotation Description 1 Quotation Description 1 Quotation Description 1 Quotation Description 1</p>
                                            <div>
                                                <a href="#"><i className="fa-solid fa-pen-to-square update"></i></a>
                                                <a href="#"><i className="fa-solid fa-trash delete"></i></a>
                                                <a href="#"><i className="fa-solid fa-file-arrow-down download"></i></a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="accordion-item">
                                    <div className="accordion-header" onClick={() => toggleAccordion(2)}>
                                        <h3>Quotation_3</h3>
                                        <span className={expandedIndex === 2 ? "accordion-icon expanded" : "accordion-icon"}>
                                            {expandedIndex === 2 ? "\u25BC" : "\u25B6"}
                                        </span>
                                    </div>
                                    {expandedIndex === 2 && (
                                        <div className="accordion-content">
                                            <p>Quotation Description 1 Quotation Description 1 Quotation Description 1 Quotation Description 1 Quotation Description 1 Quotation Description 1 Quotation Description 1 Quotation Description 1</p>
                                            <div>
                                                <a href="#"><i className="fa-solid fa-pen-to-square update"></i></a>
                                                <a href="#"><i className="fa-solid fa-trash delete"></i></a>
                                                <a href="#"><i className="fa-solid fa-file-arrow-down download"></i></a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div> */}
                            {isQuotationsEmpty ? (
                                <div>No quotations are added for this project.</div>
                            ) : (
                                <div className="accordion">
                                    {QuotationData.map((quotation: any, index: number) => (
                                        <div className="accordion-item" key={index}>
                                            <div className="accordion-header" onClick={() => toggleAccordion(index)}>
                                                <h3> Quotation_{index + 1} </h3>
                                                <span className={expandedIndex === index ? "accordion-icon expanded" : "accordion-icon"}>
                                                    {expandedIndex === index ? "\u25BC" : "\u25B6"}
                                                </span>
                                            </div>
                                            {expandedIndex === index && (
                                                <div className="accordion-content">
                                                    <p>{quotation.description}</p>
                                                    <div>
                                                        <Link to={`/quotation-edit?quotation_id=${quotation.id}&project_id=${projectID}&customerID=${id}`}><i className="fa-solid fa-pen-to-square update"></i></Link>
                                                        {/* <a href="#"><i className="fa-solid fa-trash delete"></i></a> */}
                                                        {quotation.quotation_url &&
                                                            <button style={{ background: 'none', border: '0', cursor: 'pointer' }} onClick={() => handleDownload(quotation.quotation_url!, quotation.quotation)} ><i className="fa-solid fa-file-arrow-down download"></i></button>
                                                        }

                                                        {/* <a href={quotation.quotation_url} download={quotation.quotation_url}>Download</a> */}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}






                            <div className="btn-gp">
                                <button onClick={handleModalClose}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}




        </>
    )
}
