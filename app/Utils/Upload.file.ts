import cloudinary from 'cloudinary'
// import cloudinary from '@ioc:Adonis/Addons/'
import fs from 'fs'
// import { resolve } from 'path'

export default class uploadFile {

  private static getFilePath(file: any): string {
    return `` + fs.createReadStream(file.tmpPath!).path
  }


  // private static getFilePath(files: any[]): string[] {
  //   let fileArray: string[] = []

  //   files.forEach((v) => {
  //     fileArray.push(`${fs.createReadStream(v.tmpPath!).path}`)
  //   })

  //   return fileArray
  // }

  public static async single(file: any) {


    cloudinary.v2.config({
      cloud_name: 'dev-maurice',
      api_key: '238948438153958',
      api_secret: 'rgWCxdByFg2fkMsW9pr_zbY_K5s',
    })
    // await cloudinary.upload(this.getFilePath(file))
    return await cloudinary.v2.uploader.upload(this.getFilePath(file))
  }
  public static async uploads(files: any[]) {


    cloudinary.v2.config({
      cloud_name: 'dev-maurice',
      api_key: '238948438153958',
      api_secret: 'rgWCxdByFg2fkMsW9pr_zbY_K5s',
    })


    let file: string
    let multiImage = files.map(async (img) => {
      file = `${fs.createReadStream(img.tmpPath!).path}`
      await new Promise(async () => {
        cloudinary.v2.uploader.upload(file)
      })
    })

    // let fileArray: any[] = []
    let imageResponse = await Promise.all(multiImage);


    // const imagesUrl = imageResponse.map((image) => {
    //   fileArray.push(image)
    //   //   const url = image;
    //   // return { url };
    // });

    // let rslt: cloudinary.UploadApiResponse;

    // files.forEach(async (v) => {

    //   // fileArray.push(file)
    //   const t = 

    //   // rslt = )
    // })
    return imageResponse
  }
}
