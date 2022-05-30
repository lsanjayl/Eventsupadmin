import React from "react"
import {useEffect,useState} from "react"
import { Button,Table,Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import EventModal from "../Forms/Modal";
import EventEdit from "../Forms/Edit";
import EventDataService from "../../services/event.services"
import { useUserAuth } from "../../services/authservice";
import Head from "../Navbar/Navbar"
const Admin=()=>{
        const navigate=useNavigate();
        const [selected,setSelected]=useState(true)
        const [events, setEvents] = useState([]);
        const [choice,setChoice]=useState("");
        const {user}=useUserAuth()
         //=========club name display=============/
        
        const club=user.email.slice(3,-17)

        if(club!=="admin"){
            setChoice(club);
        }
        

        //=============Admin-select================/
        
        const handleAdmin=()=>{
            console.log(choice)
            setChoice(choice)
            setSelected(false);
            getEvents();
        }
    
        //=============list events================/
        useEffect(() => {
          getEvents();
        }, []);
        const getEvents = async () => {
          const data = await EventDataService.getAllEvent(choice);
          setEvents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        //==============Deletehandle==============/
        const deleteHandler = async (id) => {
            await EventDataService.deleteEvent(id,choice);
            getEvents();
          };

    

    return <div>
        {/* Navbar  */}
        <Head/>
        {/* Options for adding / downloadingreport / refreshing the list */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:"100%"}}>
           
           <Button variant="primary"style={{margin:"10px"}} onClick={()=>navigate("/admindownload")}>
           Download report
           </Button>


           <div style={{display:"flex",alignItems:"center"}}>
            {club==="admin"&& <>
            <Form.Select variant="primary" value={choice} onChange={(e)=>setChoice(e.target.value)}style={{width:"150px"}}>
            <option value="">Choose</option>
            <option value="mapps" >Mapps</option>
            <option value="maths">Maths</option>
            <option value="photography">photography</option>
            </Form.Select>

            <Button variant="primary"  style={{margin:"10px"}} onClick={handleAdmin}> Search </Button>
            </>
            }  

            

           <EventModal choice={choice} />
           <Button variant="primary"  style={{margin:"10px",width:"110px"}} onClick={getEvents} >
            Refresh List
            </Button>

           
           
           </div>
        </div>
        

       

    
        

    {/* MainTable */}

    <div style={{padding:"10px"}}>
    <Table striped bordered hover variant="light">
        <thead>
          <tr>
          <th>Serial</th> 
          <th>Activity Details</th> 
          <th>Participant Details</th> 
          <th>More info</th> 
          <th>Attachements</th> 
          <th>Edit</th> 
          </tr>
        </thead>
        <tbody>
            {events.map((doc,index)=>{
                return(
            <tr key={doc.id}>
                <td>
                    {index+1}
                </td>
            <td>
                <td>Title:{doc.title}</td>
                <br></br>
                <td>Theme:{doc.theme}</td>
                <br></br>
                <td>Duration:{doc.duration}</td>
            </td>
            <td>
            <td>No.of.students participated:{doc.noofstud}</td>
                <br></br>
                <td>No.of.faculties participated:{doc.nooffaculty}</td>
                <br></br>
                <td>URL:{doc.url}</td>
                
            </td>
            <td>
                
                
                <td>Remarks:{doc.remarks}</td>
                <br></br>
                <td>Venue:{doc.venue}</td>
                <br></br>
                <td>Date:{doc.date}</td>
            </td>
            <td>
                <label>Uploaded files</label>
                <br></br>
                <br></br>
                <a href={doc.report}target="_blank"style={{textDecoration:"none",color:"white",background:"#0d6efd",borderRadius:"4px",margin:"10px",padding:"5px 7px"}}>Report</a>
                <br></br>
                <br></br>
                <a href={doc.image} target="_blank" style={{textDecoration:"none",color:"white",background:"#0d6efd",borderRadius:"4px",margin:"10px",padding:"5px 7px"}}>Images</a>
            </td>
            <td>
                
                <EventEdit id={doc.id} choice={club}/>
                <br></br>
                <Button onClick={(e) => deleteHandler(doc.id)}  variant="outline-danger"style={{margin:"10px"}}>Delete</Button>
            </td>
            </tr>
            
                )
             })}
            
        </tbody>
    </Table>
    {selected&&
                <div style={{width:"100%",display:"flex",justifyContent:"space-around",backgroundColor:"#f8f9fa",color:"black"}}>
                    <h3>Select a club </h3>
                    </div>
            }
    </div>
    </div>
}


export default Admin  

