const AWS = require("aws-sdk");
const s3 = new AWS.S3();

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { vendor, date, amount, photo } = body;

    const [year, month] = date.split("-");

    const fileName = `${vendor} - ${new Date().toISOString()}.png`;
    const folderKey = `${year}/${month}/`;
    const fileKey = `${folderKey}${fileName}`;

    const imageBuffer = Buffer.from(photo.replace(/^data:image\/\w+;base64,/, ""), "base64");

    await s3
      .putObject({
        Bucket: "your-bucket-name",
        Key: fileKey,
        Body: imageBuffer,
        ContentEncoding: "base64",
        ContentType: "image/png",
      })
      .promise();

    // Simulate returning updated folder structure
    const updatedTree = {
      [year]: {
        [month]: [`${vendor} - Order #${Math.floor(Math.random() * 1000)}.pdf`],
      },
    };

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, updatedTree }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: error.message }),
    };
  }
};
