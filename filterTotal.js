import test from "./test.json";


// this gets the total from the json file of the results
export let total = _ =>
  test.responses[0].textAnnotations[0].description
    .split("")
    .filter(el => el != "$")
    .join("")
    .split("\n")
    .filter(el => +el > 0)
    .sort((a, b) => b - a)[0];


//this function gets the base64 format from a url string
    export function toDataURL(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
          var reader = new FileReader();
          reader.onloadend = function() {
            callback(reader.result);
          }
          reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
      }
      
      toDataURL(URL, function(dataUrl) {
        console.log('DATA',dataUrl.split(',')[1])
      })
