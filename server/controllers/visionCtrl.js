require("dotenv").config();
const { GOOGLE_APPLICATION_CREDENTIALS, PROJECT_ID } = process.env;
const vision = require("@google-cloud/vision");
const {sorting} = require('./filterFns/filterTotal')

module.exports = {
  async getImageData(req, res) {
    

    const client = new vision.ImageAnnotatorClient({
      PROJECT_ID,
      GOOGLE_APPLICATION_CREDENTIALS
    });
    const { image } = req.body;
    const [result] = await client.textDetection(image);
    let total = sorting(result.textAnnotations)
    if(!total) return res.status(400).send('Could not find total. Take another picture or enter manually.')
   else res.status(200).send(total);
  }
};

