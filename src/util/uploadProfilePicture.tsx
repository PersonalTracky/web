import AWS from "aws-sdk";

export async function uploadProfilePicture(values: { username: string; file: any; }) {
  let profilePictureUrl: string;
  if (values.file) {
    const extension = values.file.name.split(".").pop();
    const s3 = new AWS.S3({
      accessKeyId: process.env.NEXT_PUBLIC_REACT_APP_ACCESS_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_REACT_APP_ACCESS_KEY,
      region: process.env.NEXT_PUBLIC_REACT_APP_REGION,
    });
    const params = {
      Bucket: process.env.NEXT_PUBLIC_REACT_APP_BUCKET_NAME,
      Key: "profile_pictures/pp_" + values.username + "." + extension,
      Body: values.file,
    };
    const upload = (parameters: AWS.S3.PutObjectRequest) => {
      return new Promise<string>((resolve, reject) => {
        s3.upload(parameters, function (err, data) {
          if (err) {
            reject(err);
          }
          resolve(data.Location);
        });
      });
    };
    profilePictureUrl = await upload(params);
  } else {
    profilePictureUrl = process.env.NEXT_PUBLIC_DEFAULT_IMAGE_URL;
  }
  return profilePictureUrl;
}
