function getUploadFileExt(name) {
  let ext = name.split('.');
  return ext[ext.length - 1];
}

function getUploadFileName(ext){
  return Date.now() + '.' + ext
}


module.exports = {
  getUploadFileExt,
  getUploadFileName
}