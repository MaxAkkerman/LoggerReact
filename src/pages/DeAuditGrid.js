import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import {
    CircularProgress,
    // Container,
    Grid,
} from "@material-ui/core";
import {useEffect, useState} from "react";
import getPanel from "./Panel";
import Panel from "./Panel";
// import {cutAddress, getItem} from "../Items/items";
// const collections = ["disconnect", "login", "addLiquidity", "swap", "sendTransaction", "connectRoot", "sendTokens", "removeLiquidity"]

export function cutAddress(address) {
    let spliced = address.slice(0, 7);
    let splicedpart2 = address.slice(59);
    return spliced + "..." + splicedpart2;
}

function getDataCur(unixTime) {
    return new Date(unixTime * 1000).toISOString().slice(0, 19).replace('T', ' ')
}

function fixNum(num, dec) {
    return (+num / dec).toFixed(4)
}

//
// function getList(arr) {
//     let list = [];
//     list.push(getPanel())
//     for (let val of arr) {
//         // if (val.name === "addLiquidity") {
//         list.push(getItem(val))
//         // }else if(val.name === "login"){
//         //
//         // }else if(val.name === "disconnect"){
//         //
//         // }else if(val.name === "swap"){
//         //
//         // }else if(val.name === "sendTransaction"){
//         //
//         // }else if(val.name === "connectRoot"){
//         //
//         // }else if(val.name === "sendTokens"){
//         //
//         // }else if(val.name === "removeLiquidity"){
//         //
//         // }else{
//         //     console.log("no such collection check server")
//         // }
//     }
//
//     return list
// }

function DeAuditGrid(props) {

    const [logsEl, setLogsEl] = useState([])
    const [filtered, setFiltered] = useState(false)

    useEffect(() => {
        // const logsCopy = JSON.parse(JSON.stringify(props.logs))
        // const withPanel = logsCopy.push(getPanel())
        setLogsEl(props.logs)
    }, [])

    useEffect(() => {
        // const logsCopy = JSON.parse(JSON.stringify(props.logs))
        // const withPanel = logsCopy.push(getPanel())
        setLogsEl(props.logs)
    }, [props])

    function handleFilter(e) {
        console.log("e.target.id", e.target.id)
        const logsCopy = JSON.parse(JSON.stringify(props.logs))

        if (filtered) {
            setLogsEl(props.logs)
            setFiltered(false)
        } else {
            const filtered = logsCopy.filter(item => item.clientAddress === e.target.id)
            setLogsEl(filtered)
            setFiltered(true)
        }

    }

    return (

        <div className="listContainer" onClick={()=>console.log("logsEl",logsEl)}>
            {props.onLoading ?
                <CircularProgress/>
                :
                <Grid className="gridContainer">
                    <Panel/>
                    {logsEl.sort((a,b)=> a.created_at - b.created_at).map(it => {

                        return <>
                            <Typography key={it.id} variant="subtitle2" style={{marginTop: "20px",color: "cadetblue"}}
                                        className="userAddress" onClick={(e) => handleFilter(e)}
                                        id={it.clientAddress}
                                        color="text.secondary">{it.clientAddress ? cutAddress(it.clientAddress) : ""}</Typography>
                            <Typography variant="subtitle2" style={{marginTop: "20px"}}
                                        color="text.secondary">{it.name ? it.name : ""}</Typography>
                            <Typography variant="subtitle2" style={{marginTop: "20px"}}
                                        color="text.secondary">{it.name === "connectRoot" ? it.tokenSymbol : ""}</Typography>
                            <Typography variant="subtitle2" style={{marginTop: "20px"}}
                                        color="text.secondary">{it.name === "sendTokens" ? `${fixNum(it.amount, it.decimals)} ${it.tokenSymbol}` : (it.name === "sendTransaction" ? `${fixNum(it.amount, 1000000000)} EVER` : "")}</Typography>
                            <Typography variant="subtitle2" style={{marginTop: "20px"}}
                                        color="text.secondary">{it.amountAswap ? `${fixNum(it.amountAswap, it.decimalsA)} ${it.swapAsymbol} -> ${fixNum(it.amountBswap, it.decimalsB)} ${it.swapBsymbol}` : ""}</Typography>
                            {/*<Typography variant="subtitle2" style={{marginTop: "20px"}}*/}
                            {/*            color="text.secondary">{it.amountBswap ? fixNum(it.amountBswap) : ""} {it.swapBsymbol ? it.swapBsymbol : ""}</Typography>*/}

                            <Typography variant="subtitle2" style={{marginTop: "20px"}}
                                        color="text.secondary">{it.provideA ? `${fixNum(it.provideA, it.decimalsA)} ${it.tokenAsymbolP} <> ${fixNum(it.provideB, it.decimalsA)} ${it.tokenBsymbolP} -> ${fixNum(it.gotAB, 1000000000)} LPs` : ""}</Typography>
                            {/*<Typography variant="subtitle2" style={{marginTop: "20px"}}*/}
                            {/*            color="text.secondary">{it.provideB ? fixNum(it.provideB) : ""} {it.tokenBsymbolP ? it.tokenBsymbolP : ""}</Typography>*/}
                            {/*<Typography variant="subtitle2" style={{marginTop: "20px"}}*/}
                            {/*            color="text.secondary">{it.gotAB ? fixNum(it.gotAB) : ""} {it.gotAB ? `LP-${it.tokenAsymbolP}-${it.tokenBsymbolP}` : ""}</Typography>*/}

                            <Typography variant="subtitle2" style={{marginTop: "20px"}}
                                        color="text.secondary">{it.burnAB ? `${fixNum(it.burnAB, 1000000000)} LPs -> ${fixNum(it.returnA,it.decimalsA)} ${it.tokenAsymbolR} -> ${fixNum(it.returnB, it.decimalsB)} ${it.tokenBsymbolR}` : ""}</Typography>

                            {/*<Typography variant="subtitle2" style={{marginTop: "20px"}}*/}
                            {/*            color="text.secondary">`${it.burnAB} ? fixNum(it.burnAB) ${it.tokenABnameR} ${it.tokenABnameR}`</Typography>*/}
                            {/*<Typography variant="subtitle2" style={{marginTop: "20px"}}*/}
                            {/*            color="text.secondary">{it.returnA ? fixNum(it.returnA) : ""} {it.tokenAsymbolR ? it.tokenAsymbolR : ""}</Typography>*/}
                            {/*<Typography variant="subtitle2" style={{marginTop: "20px"}}*/}
                            {/*            color="text.secondary">{it.returnB ? fixNum(it.returnB) : ""} {it.tokenBsymbolR ? it.tokenBsymbolR : ""}</Typography>*/}

                            <Typography variant="subtitle2" style={{marginTop: "20px"}}
                                        color="text.secondary">{(it.tonLiveID && it.tonLiveID.length>20) ? cutAddress(it.tonLiveID) : ""}</Typography>

                            <Typography variant="subtitle2" style={{marginTop: "20px"}}
                                        color="text.secondary">{getDataCur(it.created_at)}</Typography>
                        </>

                    })}
                </Grid>


            }

        </div>

    );
}

export default DeAuditGrid;
