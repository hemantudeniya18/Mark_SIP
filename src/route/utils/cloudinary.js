const cloudinary = require('cloudinary').v2

cloudinary.config({ 
        cloud_name: 'de0ambazr', 
        api_key: '746739911161785', 
        api_secret: 'exYznNwDN8KVo3coAONxQ7qYwGE',
        secure: true
      });

      
      module.exports = cloudinary