const Annotations = require('../models/AnnotationData');

module.exports = {


  async  read(req,res) // async e await são usados para procura em bancos de dados assincronos, a fim de não quebrar a aplicação
    {
        const annotatitonList = await Annotations.find(); // procura todas as informações que estão no banco
        return res.json(annotatitonList);

    },

   async create(req,res) {
        console.log(req.body);
        const {title, notes, priority} = req.body;

        if(!notes || !title)
        {
            return res.status(400).json({error : "Necessario um titulo/anotação"});
        }
        const annotationCreated =  await Annotations.create(
            {
                title,
                notes,
                priority
            }
        );
        return res.json(annotationCreated);
    },
   async delete(req,res) {
        const { id } = req.params;
        const annotationDeleted = await Annotations.findOneAndDelete({_id : id});

        if(annotationDeleted)
        {
            return res.json(annotationDeleted);
        }
        // não ta funcionando esse return, darei prosseguimento 
        return res.status(404).json({error: 'não foi encontrado o registro para deletar'});
    }

}