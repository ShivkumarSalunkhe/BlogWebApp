//// API_NOTIFICATION_MESSEGES

export const API_NOTIFICATION_MESSAGES={
    loading:{
        title:'Loading..',
        message:'Data is being loaded, please wait'
    },
    success:{
        title:'Success',
        message:"Data successfully loaded"
    },
    responseFailure:{
        title:'Error',
        message:'An error occured while fetching response from the server. please try agian'
    },
    requestFailure:{
        title:'Error',
        message:'An error occured while parsing request data.'
    },
    networkError:{
        title:'Error',
        message:'Unable to connect wtih server. please check internet connection'
    }
}

//// API SERVICE CALL
//// sample request
/// NEED SERVICE CALL :{URLS:'/' method:'POST/GET/PUT/DELETE' params:true/false, query:true/false}
export const SERVICE_URLS ={
    userSignup:{url:'/signup', method:'POST'}
}