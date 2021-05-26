import React, { useEffect,useState } from "react";
import { FormattedMessage } from "react-intl";
import { FormattedDate, FormattedNumber, FormattedPlural } from "react-intl";
import CardDetail from "./cardDetail";


const TablesList = () => {
    const url = "https://gist.githubusercontent.com/josejbocanegra/5dc69cb7feb7945ef58b9c3d84be2635/raw/e2d16f7440d51cae06a9daf37b0b66818dd1fe31/series-en.json";

    const [ state, setstate] = useState({series:[]});
    const [selected, setSelected] = useState();
    useEffect(() => {
        fetch(url)
        .then(ans => ans.json())
        .then(ans => {
            console.log(ans);
            if(!navigator.onLine){
                let i=localStorage.getItem("series");
                if(i !== null)
                {
                    setstate({... state,series:i});
                }
            }else{
                setstate({... state, series:ans});
                localStorage.setItem("series",ans);
            }
            })
        .catch(e => console.log(e));
    },[]);


    const createCard=()=>{
        if(selected)
        {
            return(
                    <CardDetail info={selected}/>
            );
        }
    };

    const switcharoo=(e)=>{
        let change = new Promise((resolve,reject)=>{
            setSelected(null);
            resolve(e);
        });
        change.then(ans=>setSelected(ans));
    }

    const produce = () =>{
        if(state.series.length===0){
            return(<h2>Studio is busy!</h2>);
        }else{
            return(
                <div class="container-fluid">
                <div class="row">
                  <div class="col-8">
                    <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col"><FormattedMessage id="id"/></th>
            <th scope="col"><FormattedMessage id="name"/></th>
            <th scope="col"><FormattedMessage id="channel"/></th>
            <th scope="col"><FormattedMessage id="season"/></th>
            <th scope="col"><FormattedMessage id="episodes"/></th>
            <th scope="col"><FormattedMessage id="date"/></th>
          </tr>
        </thead>
        <tbody>
        {state.series.map((e) => (
            <tr onClick={() => (!selected || selected.id!==e.id) ? switcharoo(e):setSelected(null)}>
            <th scope="row">{e.id}</th>
            <td>{e.name}</td>
            <td>{e.channel}</td>
            <td>{e.seasons}</td>
            <td>{e.episodes}</td>
            <td><FormattedDate value={new Date(e.release.split("/")[2],e.release.split("/")[1],e.release.split("/")[0])} month="numeric" month="long" day="numeric" weekday="long" year="numeric"/></td>
            {/* <td><FormattedNumber value={props.views}/> </td> */}
          </tr>
          ))}
        </tbody>
           </table>     
           </div>
        <div class ="col-4">
          {createCard()}
        </div>
      </div>
    </div>
            );
        }
    }

  return (
      <div>{produce()}</div>
    
  );
};

export default TablesList;