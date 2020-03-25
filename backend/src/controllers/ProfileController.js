const conn = require('../database/conn')

module.exports = {
    async index(request, response) {
        const ong_id = request.headers.auth;
        
        if (ong_id == null){
            return response.status(400).json( {
                error : 'INVALID_SESSION',
                message : 'Invalid ID'
            });
        }

        const incidents = await conn('incidents')
                            .where('ong_id', ong_id)
                            .select('*');
                                  
        return response.json(incidents);
    }
};