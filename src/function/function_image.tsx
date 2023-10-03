//Check image URL 404
export function imageExist(url: string) {
  var img = new Image();
  img.src = url;
  return img.height !== 0;
}
