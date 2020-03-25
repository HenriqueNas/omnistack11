const conn = require('../database/conn')

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        console.log(id);
        
        if (id == null){
            return response.status(400).json( {
                error : 'INVALID_SESSION',
                message : 'Invalid ID'
            });
        }

        const ong = await conn('ongs')
                            .where('id', id)
                            .select('name')
                            .first();
        
        if(!ong) {
            return response.status(400).json( {
                error : 'INVALID_SESSION',
                message : 'No ONG found with this ID.'
            });    
        }
        
        return response.json(ong);
    },
    
}