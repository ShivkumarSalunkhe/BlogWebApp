import axios from 'axios';
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config.js';
import { getAccessToken } from '../utils/common-utils.js';

const API_URL='http://localhost:8000';
///common api interceptors
const axiosInstance = axios.create({
    baseURL:API_URL,
    timeout:10000,
    headers:{
        "connect-type":"application/json"
    }
})

axiosInstance.interceptors.request.use(
    function (config){
        return config;
    },
    function(error){
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    function(response){
        return processResponse(response);
    },
    function (error){
        return Promise.reject(processError(error));
    }
)
/////////////////////////////////

// if success=> return{isSuccess:true, data:object}
// if fail => return {isFailure:true, status :string, msg:string, code:int}
///////////////////////
const processResponse=(response)=>{
    if(response?.status === 200){
        return {isSuccess:true, data:response.data}
    }else{
        return {
            isFailure:true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code

        }
    }
}


const processError=(error)=>{
    if(error.response){
        console.log("ERROR IN RESPONSE: ", error.toJSON());
        return{
            isError:true,
            msg:API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.ststus
        }
    }else if(error.response){
        console.log("ERROR IN REQUEST: ", error.toJSON());
        return{
            isError:true,
            msg:API_NOTIFICATION_MESSAGES.responseFailure,
            code:""
        }
    }else{
        console.log("ERROR IN NETWORK: ", error.toJSON());
        return{
            isError:true,
            msg:API_NOTIFICATION_MESSAGES.responseFailure,
            code:""
        }
    }
}

const API ={};

for(const [key,value] of Object.entries(SERVICE_URLS)){
    API[key] = (body, showUploadProgress, showDownloadProgress)=>
        axiosInstance({
            method: value.method,
            url:value.url,
            data:body,
            responseType: value.responseType,
            headers:{
                authorization: getAccessToken()
            },
            onUploadProgress: function(processEvent){
                if(showUploadProgress){
                    let percentageCompleted= Math.round((processEvent.loaded * 100)/processEvent.total)
                    showUploadProgress(percentageCompleted);
                }
            },
            showDownloadProgress: function(processEvent){
                if(showDownloadProgress){
                    let percentageCompleted= Math.round((processEvent.loaded * 100)/processEvent.total)
                    showDownloadProgress(percentageCompleted);
                }
            }

        })
    }

export {API};