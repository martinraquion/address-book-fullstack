

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
  const {contact_id, group_id} = req.body;
    db.group_members
    .insert(
      {
        contact_id,
        group_id
      }
    )
    .then(data=>{
      res.status(201).json(data);
    })

}

function deleteGroup(req,res){
  const db = req.app.get('db');

  db
    .query(
      'DELETE FROM group_members WHERE group_id=${id}',
      {
        id:req.query.id
      }
    )
    .then(
      db.query('DELETE FROM groups WHERE id=${id}',{
        id: req.query.id
      }).then(data=>{
        res.status(200).json(data)
      })
    ).then(data=>{
      res.status(200).json(data)
    })
}

function viewMembers(req,res){
  const db = req.app.get('db')
  db
  .query(
    'SELECT contact. * from contact,groups,group_members WHERE  contact.id = group_members.contact_id AND groups.id = group_members.group_id AND groups.id = ${id}',
    {
      id:req.query.id
    }
  )
  .then(data=>{
    res.status(200).json(data)
  })
}

function deleteMember(req,res){
  const db = req.app.get('db')
  db.query(
    "delete from group_members where contact_id=${id}",
    { id: req.query.id}
  )
    .then(data => {
      res.status(200).json(data);
    })
}


function availableGroups(req,res){
  const db = req.app.get('db')
  db.query('SELECT groups.* FROM groups WHERE user_id=${user_id} AND id NOT IN(SELECT group_id from group_members WHERE contact_id=${id})',
  {
    id:req.query.id,
    user_id:req.query.user_id
  }).then(data=>{
    res.status(200).json(data)
  })
}



module.exports = {
    create,
    fetch,
    assign,
    deleteGroup,
    viewMembers,
    availableGroups,
    deleteMember
};