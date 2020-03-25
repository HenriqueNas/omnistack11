const conn = require('../database/conn')

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;
        
        const [count] = await conn('incidents').count();
        
        const incidents = await conn('incidents')
                                  .join('ongs', 'ongs.id', '=', 'incidents.ong_id')  
                                  .limit(5)
                                  .offset((page - 1) * 5)
                                  .select([
                                      'incidents.*',
                                      'ongs.name',
                                      'ongs.email',
                                      'ongs.whatsapp',
                                      'ongs.city',
                                      'ongs.uf'
                                    ]);
        
        response.headers('X-Total-Count', count['count(*)']);
        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.auth;

        const [id] =  await conn('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });

    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.auth;

        try {
            incident = await conn('incidents')
                                .where('id', id)
                                .select('ong_id')
                                .first();

        } catch (error) {
            return response.status(404).json({
                error : 'INCIDENT_NOT_FOUND', 
                message: 'id=' + id + '.'
            });            
        }

        if (incident.ong_id != ong_id){
            return response.status(401).json( {
                error : 'NOT_AUTHORIZED',
                message : 'Permission Denied.'
            });
        }

        await conn('incidents')
                .where('id', id)
                .delete();

        return response.status(204).send();

    },
};