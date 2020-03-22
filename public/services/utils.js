const Utils = {
   /************************************************
    * This will parse a url and break it into usable vars
    ************************************************/
   parseRequestURL: () => {
     let url = location.hash.slice(2).toLowerCase() || "/";
     let textURL = url.split("/");
     let request = {
       resource: null,
       id: null,
       verb: null
     };
     request.resource = textURL[0];
     request.id = textURL[1];
     request.verb = textURL[2];
 
     return request;
   },
 
   // sleep implementation
   sleep: ms => {
     return new Promise(resolve => setTimeout(resolve, ms));
   }
 };
 
 export default Utils;
