import React, {useEffect, useState} from "react";
import {getData} from "../axios/axios";
import DeAuditGrid from "./DeAuditGrid";
import {Button} from "@material-ui/core";
// import Panel from "./Panel";


function Main() {
    const [logs, setLogs] = useState([])
    const [onLoading, setOnLoading] = useState(true)

    // useEffect(async()=>{
    //     await getLogs()
    //
    // },[])

    async function getLogs() {
        setOnLoading(true)
        getData()
            .then((res) => res.json())
            .then((data) => {
                setLogs(data)
            })

        setOnLoading(false)

    }

    return (
        <div>
            <div style={{display:"flex"}}>
            <Button style={{margin:"auto"}} onClick={()=>getLogs()}>
                Fetch Logs
            </Button>
            </div>
            {/*<Panel*/}

            {/*/>*/}
            <DeAuditGrid
                onLoading={onLoading}
                handleSetLoading={(bl)=>setOnLoading(bl)}
                logs={logs}
            />


        </div>
    );
}

export default Main;
