const Annotations = require('../models/AnnotationData');

module.exports = {

    async updade (req,res) {
        const { id } = req.params;
        const { notes } = req.body;
        const { title } = req.body;

        const annotation = await Annotations.findOne({_id : id});

        if (notes)
        {
            annotation.notes = notes;
            await annotation.save();
            
        }
        
        if (title)
        {
            annotation.title = title;
            await annotation.save();
            
        }
        return res.json(annotation);

    }





}