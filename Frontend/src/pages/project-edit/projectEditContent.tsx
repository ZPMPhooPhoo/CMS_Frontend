import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { Input } from "../../components/input.component";
import { Checkbox } from "../../components/checkbox";
import { Button } from "../../components/button.component";
import Category from "../category_list/categoryList";

interface Category {
  id: number;
  category: string;
}
interface User {
  id: number;
  name: string;
  isChecked: boolean;
}

export const ProjectEditContent: React.FC = () => {
  const [errors, setErrors] = useState<any>({});
  const [title ,setTitle] =useState<string>("");
  const [description ,setDescription] =useState<string>("");
  const status_options = ['Complete' , 'Progress' , 'Cancel'];
  const [status,setStatus] =useState<any>();
  const [isChecked ,setIsChecked] =useState<boolean>(false);
  const [maintenance_active, setMaintenance] = useState<boolean>(false);
  const [category_id, setCategory] = useState<number | undefined>(undefined);
  const [categoryValue,setCategoryValue] = useState<string | undefined>('');
  const [categories_options, setCategoriesOptions] = useState<Category[]>([]);
  const [users_option, setUserOption] = useState<User[]>([]);
   
  // const [users, setUsers] = useState<number[]>([]);
  const [assignedDev, setAssignedDev] = useState<User[]>([]);
  const token =localStorage.getItem("token");
  const [devCheck ,setDevCheck] =useState<boolean>();
  // const [developers,setDevelopers] =useState<User[]>([]);
  //const [categories ,setCategories] = useState<Category[]>([]);
  // const [prjCate,setPrjCate] =useState<any>();
  // const [projectData ,setProjectData] =useState<any>();
  // const [maintenanceValue,setMaintenanceValue] = useState<boolean>(false);
  // const [category, setCategory] = useState<number | undefined>(undefined);
  // const [devPrj ,setDevPrj]  =useState<any>();
  const location = useLocation();
  const searchID = new URLSearchParams(location.search);
  const projectID = searchID.get("projectID");
  const userID = searchID.get("id");

  //const category_value;
    //  const {id} = useParams();
    //  const [error,setErrors]=useState<any>();
    //  const idprj = {id};
           let num_id = 0;
          if(userID != null){
            num_id = parseInt(userID);
          }else{
            num_id = 0;
         }
     const [users, setUsers] = useState<number[]>([num_id]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const [projectResponse,categoriesResponse] = await Promise.all([
  //         axios.get(`http://127.0.0.1:8000/api/projects/${id}`, {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }),
  //         axios.get("http://127.0.0.1:8000/api/categories", {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }),
  //       ]);

  //       const projects = (projectResponse.data.data);
  //       console.log([projectResponse, categoriesResponse])
  //       console.log(projectResponse.data.data);
  //       const categorydata = categoriesResponse.data.data;
  //       const mappedOptions: Categories[] = categorydata.map((item: any) => ({
  //         id: item.id,
  //         category: item.category,
  //       }));

  //       setTitle(projects.title);
  //       // console.log(projects.title);
  //       setDescription(projects.description);
  //       setStatus(projects.status);
  //       setCategories(mappedOptions);
  //       // setMaintainprj(projects.maintenance_active);
  //       setIsChecked(projects.maintenance_active ==1 ? true: false);
       

  //       const prjCategory = mappedOptions.find((option) => option.id == projects.category_id);
  //       if (prjCategory) {
  //         setPrjCate(prjCategory.category);
  //       }      } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, [id, token]);

  // console.log(isChecked);
  // console.log(prjCate);
  // console.log(maintainprj);
  

  // useEffect(() => {
  //   const fetchDevelopersData = async () => {
  //       try {
  //         const [developerresponse ,devprjresponse] = await Promise.all([
  //           axios.get(`http://127.0.0.1:8000/api/developers`, {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //             },
  //           }),
  //           axios.get(`http://127.0.0.1:8000/api/developerproject/${id}`, {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //             },
  //           }),
  //         ]);
  //         setDevelopers(developerresponse.data.data);
  //         setDevPrj(devprjresponse.data.data);
  //         const mappedDev: Developer[] = developerresponse.data.data.map((item: any) => ({
  //           id: item.id,
  //           name: item.name,
  //         }));
  //         console.log(mappedDev);
  //         const mappedDevwithprj: Developer[] = devprjresponse.data.data.map((item: any) => ({
  //                     id: item.role_id,
  //                     name: item.name,
  //                   }));
  //                   console.log(mappedDevwithprj);

  //                   // const devWithPrj = mappedDevwithprj.filter((item: any) =>
  //                   // mappedDev.some((data: any) => data.name === item.name)
  //                 // );
                  
                  
                  
  //         // console.log(devWithPrj);

  //       } catch (error: any) {
  //         console.log(error.message + " Error");
  //       }
  //     };
  //     fetchDevelopersData();
  // }, [token]);

          useEffect(()=>{
            const fetchData = async()=> {
              const projectResponse = await axios.get(`http://127.0.0.1:8000/api/projects/${projectID}`,{
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
              );
              const categoriesResponse = await axios.get(`http://127.0.0.1:8000/api/categories` , {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
              );
              const developersResponse = await axios.get("http://127.0.0.1:8000/api/developers", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
              );
              const assignedDevResponse = await axios.get(`http://127.0.0.1:8000/api/developerproject/${projectID}`,{
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
              );
              setUserOption(developersResponse.data.data);
              const mappedOptions: Category[] = categoriesResponse.data.data.map((item: any) => ({
                id: item.id,
                category: item.category,
              }));
              setCategoriesOptions(mappedOptions);
              //setCategory();
              setTitle(projectResponse.data.data.title);
              setDescription(projectResponse.data.data.description);
              setStatus(projectResponse.data.data.status);
              setCategoryValue(projectResponse.data.data.category.category);
              setCategory(projectResponse.data.data.category.id);
              setMaintenance(projectResponse.data.data.maintenance_active);
              setAssignedDev(assignedDevResponse.data.data);
              // setUsers(assignedDev.filter((asDev:any)=>asDev.role_id !== '5').map((dev:any)=>Number(dev.id)));
              
            }
            fetchData();
          }, [token]);

          // const upTitle = projectData;
          // console.log(upTitle)


  // const handleDevChange = (userId: number , developerTick: boolean) => {
  //   const is_devchecked = users.includes(userId);
  //   setDevCheck(!developerTick);
  
  //   if (is_devchecked) {
  //     // User is already in the array, remove it
  //     const updatedUsers = users.filter((user) => user !== userId);
  //     setUsers(updatedUsers);
  //   } else {
  //     // User is not in the array, add it
  //     const updatedUsers = [...users, userId];
  //     setUsers(updatedUsers);
  //   }
  // };

  const devID = assignedDev.filter((asDev:any)=>asDev.role_id !== '5').map((dev:any)=>Number(dev.id));
  console.log(devID)
  // const updatedID = [...users, ...devID];
  useEffect(() => {
    const devIDs = assignedDev
      .filter((asDev: any) => asDev.role_id !== '5')
      .map((dev: any) => Number(dev.id));
    setUsers((prevUsers) => [...prevUsers, ...devIDs]);
  }, [assignedDev]);
  
  console.log(users);

  const handleDevChange = (userId: number ) => {
    const is_devchecked = users.includes(userId);
  
    if (is_devchecked) {
      // User is already in the array, remove it
      const updatedUsers = users.filter((user) => user !== userId);
      setUsers(updatedUsers);
    } else {
      // User is not in the array, add it
      const updatedUsers = [...users, userId];
      setUsers(updatedUsers);
    }
  };
  

  const handleProjectUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        //setErrors({});

        // Perform validation
        let validationErrors: any = {};
        if (title.trim() === "") {
          validationErrors.title = "Title is required *";
        }
        if (description.trim() === "") {
          validationErrors.description = "Description is required *";
        }
        if (!status) {
          validationErrors.status = "Status is required *";
        }
        if(!category_id){
          validationErrors.category = "Category is required *";
        }
        
        
        if (Object.keys(validationErrors).length > 0) {
          //setErrors(validationErrors);
          return;
        }

        axios.patch(`http://127.0.0.1:8000/api/projects/${projectID}`, {
          title,
          description,
          status,
          category_id,
          maintenance_active,
          users,
          num_id
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          navigate(`/client-project-lists?id=${userID}`);
        })
          .catch((error) => {
            if (error.response && error.response.data && error.response.data.message) {
              const apiErrorMessage = error.response.data.message;
              //setErrMsg(apiErrorMessage);
            } else {
              //setErrMsg('An error has occurred during the API request.');
            }
          })
  };
  

  return (
    <>
      <div className="register add-middle">
        <div className="main_client_create">
          <h1>ADD A PROJECT</h1>
          <div className="form-wrap">
            <form onSubmit={handleProjectUpdate} >
             <div className="box">
             <div className="left">
              <div className="client_phoneNO">
                <div className="client_phone_parent">
                  <Input
                    onChange={(e) =>setTitle(e.target.value)}
                    name="title"
                    type="text"
                    value={title}
                    placeholder="Enter Title"
                  />
                  <p className="error-message">{errors.title && errors.title }</p>
                </div>
              </div>
              <div className="client_phoneNO">
                <div className="client_phone_parent">
                  <Input
                    onChange={(e) =>setDescription(e.target.value)}
                    name="description"
                    type="text"
                    value={description}
                    placeholder="Enter Description" 
                  />
                   <p className="error-message">{errors.description && errors.description }</p>
                </div>
              </div>
              <div className="client_phoneNO">
                <div className="client_phone_parent">
                  <select name="status" id="" className="selectbox"
                  onChange={(event)=>{
                    setStatus(status_options[event.target.selectedIndex-1]);
                  }}
                  value={status}
                  >
                    <option value="__default"> Choose Status</option>
                    {status_options.map((option, index) => (
                      <option key={index} value={option} >
                        {option}
                      </option>
                    ))}
                  </select>
                  <p className="error-message">{errors.status && errors.status }</p>
                </div>
              </div>
              <div className="client_phoneNO">
                <div className="client_phone_parent">
                <select name="catogory_id" id="" className="selectbox"
                        onChange={(event) => {
                          if (categories_options[event.target.selectedIndex - 1]) {
                            setCategory(categories_options[event.target.selectedIndex - 1].id);
                            setCategoryValue(categories_options[event.target.selectedIndex - 1].category);
                          } else {
                            setCategory(undefined);
                            setCategoryValue(undefined)
                          }
                        }}
                        value= {categoryValue}
                      >
                        <option value="__default">Choose Category</option>
                        {categories_options.map((option, index) => (
                          <option key={index} value={option.category}>
                            {option.category}
                          </option>
                        ))}
                      </select>
                   <p className="error-message">{errors.category && errors.category }</p>
                </div>
               
              </div>
              <div className="client_phoneNO">
                <div className="client_phone_parent">
                <Checkbox
                  checked={maintenance_active}
                  label="Under Maintenance?"
                  className="maintenence"
                  name="maintenance_active"
                  onChange={(checked: boolean) => {
                    setIsChecked(!isChecked);
                    setMaintenance(isChecked);
                    }}
                />
                </div>
              </div>
              </div>
              <div className="right">
              <div className="client_phoneNO">
                <div className="client_phone_parent"  style={{ height: "100px", overflowY: "scroll"  , display: 'flex', alignItems: 'center' , flexDirection: 'row'}}>
                <label> Please select assigned developers. </label>
                {
                  users_option.map((item: any) => {
                    return (
                      <div key={item.id} style={{ padding: "15px" }}>
                        <input type="checkbox" name="users" id={item.name} onChange={() => handleDevChange(item.id)} checked = {users.includes(item.id)} />
                        <label htmlFor={item.name}>{item.name}</label>
                      </div>
                    )
                  })
                }
                </div>
              </div>
              </div>
             </div>
              <div className="allbtn">
                  <Button type="submit" className="button" text="ADD" />
                  {/* <Link to={`/client-project-lists?id=${id}`}>
                    <Button type="button" className="button" text="BACK" />
                  </Link> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )};
