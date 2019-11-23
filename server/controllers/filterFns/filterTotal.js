// this gets the total from the json file of the results
module.exports = {
  sorting(dta) {
    const abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(
      ""
    );
    const getVertices = () => {
      for (let obj of dta) {
        if (obj["description"].toLowerCase() === "total" ) {
          return (vertices = obj["boundingPoly"]["vertices"].map(el => el.y));
        }
      }
    };
    var vertices = getVertices();
    // console.log({ vertices });

    for (let i = 0; i < dta.length; i++) {
      let variable = `compare${i}`;
      variable = dta[i]["boundingPoly"]["vertices"].map(el => el.y);
      // console.log(dta[i].description, { variable });
      let vCheck = () => {
        for (let j = 0; j < 3; j++) {
          return vertices[j] <= variable[j] + 5 && vertices[j] >= variable[j] - 5;
        }
      };
      let letterCheck = str => str.split("").some(el => abc.includes(el));

      if (
        vCheck() &&
        dta[i]["description"].toLowerCase() &&
        !letterCheck(dta[i]["description"])
      ) {
        return dta[i].description;
      }
    }
  }

  //this function gets the base64 format from a url string
  //  toDataURL(url, callback) {
  //    var xhr = new XMLHttpRequest();
  //   xhr.onload = function() {
  //     var reader = new FileReader();
  //     reader.onloadend = function() {
  //       callback(reader.result);
  //     };
  //     reader.readAsDataURL(xhr.response);
  //   };
  //   xhr.open("GET", url);
  //   xhr.responseType = "blob";
  //   xhr.send();
  // },

  // toDataURL(URL, function(dataUrl) {
  //   console.log("DATA", dataUrl.split(",")[1]);
  // });
};
