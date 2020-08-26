import { NowRequest, NowResponse } from "@vercel/node";
import * as AWS from "aws-sdk";

export default function (req: NowRequest, res: NowResponse) {
  const { name = "World" } = req.query;

  var s3 = new AWS.S3();
  // s3.abortMultipartUpload(params, function (err, data) {
  //   if (err) console.log(err, err.stack);
  //   // an error occurred
  //   else console.log(data); // successful response
  // });

  res.send(`Hello ${name}!`);
}
