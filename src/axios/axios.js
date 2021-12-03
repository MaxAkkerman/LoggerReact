export async function getData(){
    return await fetch(`https://logs.trade.defispace.com:9000/getLogs`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        // body: JSON.stringify(data)
    })

}
