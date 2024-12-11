const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({ 
  cloud_name: 'de9enzvyy', 
  api_key: '274994381832458', 
  api_secret: 'kG-6xtRc4AjR4PoL23AkuwOpdIE' // Click 'View API Keys' above to copy your API secret
});
const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };
