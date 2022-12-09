import cloudinary from 'cloudinary'
import fs from 'fs'

export default class uploadFile {
  private static getFilePath(file: any): string {
    return `` + fs.createReadStream(file.tmpPath!).path
  }

  public static async uploads(file: any) {
    const config = {
      cloud_name: 'dev-maurice',
      api_key: '238948438153958',
      api_secret: 'rgWCxdByFg2fkMsW9pr_zbY_K5s',
    }
    return await cloudinary.v2.uploader.upload(this.getFilePath(file), config)
  }
}
