const convertTime = (timestamp) => {
    if(!timestamp){
        return "";
    }
    let d = new Date(timestamp);
    return d.getDate() + "/" + d.getMonth() + 1 + "/" + d.getFullYear();
}

export{
    convertTime
}