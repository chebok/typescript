enum ImageFormat {
  Png = 'png',
  Jpeg = 'jpeg',
}

interface IResolution {
  width: number;
  height: number;

}

interface IImageConversion extends IResolution {
  format: ImageFormat;
}

class ImageBuilder {
  private formats: ImageFormat[] = [];
  private resolutions: IResolution[] = [];

  addResolution(width: number, height: number) {
    this.resolutions.push({ width, height });
    return this;
  }

  addJpeg() {
    if (!this.formats.includes(ImageFormat.Jpeg)) this.formats.push(ImageFormat.Jpeg); 
    return this;
  }

  addPng() {
    if (!this.formats.includes(ImageFormat.Png)) this.formats.push(ImageFormat.Png); 
    return this;
  }

  build(): IImageConversion[] {
    const result: IImageConversion[] = [];
    this.resolutions.forEach((res) => {
      this.formats.forEach((f) => {
        result.push({
          format: f,
          width: res.width,
          height: res.height,
        });
      });
    });
    return result;
  }
}

console.log(new ImageBuilder()
  .addJpeg()
  .addPng()
  .addResolution(100, 50)
  .addResolution(200, 100)
  .build()
);
