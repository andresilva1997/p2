import React, { useEffect,useState } from "react";
import { FormattedMessage } from "react-intl";
import Table from "./table";

const url = "https://gist.githubusercontent.com/josejbocanegra/5dc69cb7feb7945ef58b9c3d84be2635/raw/e2d16f7440d51cae06a9daf37b0b66818dd1fe31/series-en.json";

const TablesList = () => {
    const [ state, setstate] = useState({series:[]});
    useEffect(() => {
        fetch(url)
        .then(x => x.json())
        .then(y => {
            if(!navigator.onLine){
                let i=localStorage.getItem("series");
                if(i !== null)
                {
                    setstate({series:i});
                }
            }else{
                localStorage.setItem("series",JSON.stringify(y.data.results));
                setstate({series:y.data.results});
            }
            })
        .catch(e => console.log(e));
    },[]);


    const produce = () =>{
        if(state.series.length===0){
            return(<h2>Studio is busy!</h2>);
        }else{
            return(
                <div>
                    <table className="table">
        <thead className="thead-dark">
          <tr>
              <th scope="col">#</th>
            <th scope="col"><FormattedMessage id="id"/></th>
            <th scope="col"><FormattedMessage id="name"/></th>
            <th scope="col"><FormattedMessage id="channel"/></th>
            <th scope="col"><FormattedMessage id="season"/></th>
            <th scope="col"><FormattedMessage id="episodes"/></th>
            <th scope="col"><FormattedMessage id="date"/></th>
          </tr>
        </thead>
        <tbody>
        {state.series.map((e, j) => (
            <Table key={j} i={e} />
          ))}
        </tbody>
           </table>     
            </div>
            );
        }
    }

  return (
      <div>{produce()}</div>
    
  );
};

export default TablesList;