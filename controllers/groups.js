

function create(req,res){
    const db = req.app.get('db');
    const {name, user_id} = req.body

    db.groups
    .insert(
      {
        name,
        user_id
      }
    )
    .then(data=>{
        res.status(201).json(data)
    })
}

function fetch(req,res){
  const db = req.app.get('db');

  db
  .query(
    'SELECT * FROM groups WHERE user_id = ${id}',
    {
      id:req.query.id
    }
  )
  .then(data=>{
    res.status(200).json(data)
  })
}

function assign(req,res){
  const db = req.app.get('db');
  const {contact} = req.body;
  const group_id = req.query.group_id
  // console.log(group_id);
  var temp_res = [];
  contact.map(contact_id=>{
    // console.log(contact_id)
    db.group_list
    .insert(
      {
        contact_id,
        group_id
      }
    )
    .then(data=>{
      temp_res.push(data)
      res.status(201).json(temp_res);
    })
  })
}

function deleteGroup(req,res){
  const db = req.app.get('db');

  db
    .query(
      'DELETE FROM groups WHERE id=${id}',
      {
        id:req.query.id
      }
    )
    .then(data=>{
      res.status(200).json({message:"Deleted"})
    })
}



module.exports = {
    create,
    fetch,
    assign,
    deleteGroup
};