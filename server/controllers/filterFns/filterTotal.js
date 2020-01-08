
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
    for (let i = 0; i < dta.length; i++) {
      let variable = `compare${i}`;
      variable = dta[i]["boundingPoly"]["vertices"].map(el => el.y);
      let vCheck = () => { 
        if(vertices && vertices.length>0){
        for (let j = 0; j < 3; j++) {
          return vertices[j] <= variable[j] + 5 && vertices[j] >= variable[j] - 5;
        }}else{
          return 'cannot read receipt properly'
        }
      };
      let letterCheck = str => str.split("").some(el => abc.includes(el));
      if (
        vCheck() && vCheck() !== 'cannot read receipt properly' &&
        dta[i]["description"].toLowerCase() 
        &&
        !letterCheck(dta[i]["description"])
         && 
        dta[i]["description"].includes('.')
      ) {
        console.log(dta[i].description)
        return dta[i].description;
      }
    }
  }
};
