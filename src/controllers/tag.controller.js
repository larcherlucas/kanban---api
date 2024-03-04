import { Tag, Card } from "../models/associations.js";


async function getAllTags(req, res){
  try {
    // je récupère tous les tags depuis la BDD
    const tags = await Tag.findAll({
      // j'ordonne l'affichage 
      order: [
        ['name', 'ASC']
      ]
    });
    // je renvoi les tags au client au format JSON
    res.json(tags);
  } catch (error) {
    console.error(error);
      
    // 3. en cas d'erreur, je retourne une 500
    res.status(500).json({
      error: "❌ Unexpected server error. Please try again later."
    });
  }
}

async function insertTag(req, res){
  console.log("🔄 Création d'un tag en cours…");
  try {
    // je veux récupérer le corps de la requête
    const { name, color } = req.body;
    // 2. je valide mes données
      
    // 2.1. SI le `name` est `undefined` ou falsy
    // OU si ce n'est pas un string
    // → error 400 `BAD REQUEST`
    if(!name || typeof name !== 'string'){
      // je crée une boite error 
      const error = name
        ? "❌ Invalid type: 'name' must be a string."
        : "❌ Missing body parameter: 'name'.";
      return res.status(400).json({ error });
    }

    // 2.2 SI la `couleur` est fournie,
    // ALORS je vérifie que c'est un nombre héxadécimal valide

    if (color && !/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)) {
      return res.status(400).json({
        error: "❌ Invalid type: 'color' should be a hexadecimal."
      });
    }
    // 3. je crée le tag en BDD
    const createdTag = await Tag.create({
      name,
      color,
    });
    console.log("✅ Tag créée avec succès!");
    // 4. je retourne mon tag créée avec un code 201 `CREATED`
    res.status(201).json(createdTag);
  } catch (error) {
    console.error(error);
  
    res.status(500).json({
      error: "❌ Unexpected server error. Please try again later."
    });
  }
}

async function editTag(req, res){
  console.log("🔄 Modification du Tag en cours…");
  try {
    // je récupère l'id de la tag
    const tagId = parseInt(req.params.id);
    
    //je récupère l'id en BDD
    const tag = await Tag.findByPk(tagId);
    if(!tag){
      res.status(404).json({error:"❌ Tag not found. Please verify the provided ID."});
      return;
    }    
    const { name, color } = req.body;
    
    if(!name || typeof name !== 'string'){
      // je crée une boite error 
      const error = name
        ? "❌ Invalid type: 'name' must be a string."
        : "❌ Missing body parameter: 'name'.";
      return res.status(400).json({ error });
    }
  
    // 2.2 SI la `couleur` est fournie,
    // ALORS je vérifie que c'est un nombre héxadécimal valide
  
    if (color && !/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)) {
      return res.status(400).json({
        error: "❌ Invalid type: 'color' should be a hexadecimal."
      });
    }
    
    // je récupère l'id et dit ce qu'il faut modifier
    await Tag.update({
      name: req.body.name.trim(), // Mettre à jour le nom avec la nouvelle valeur
      color: req.body.color // Mettre à jour la couleur avec la nouvelle valeur
    }, {
      where: { id: tagId } // Clause where pour spécifier quelle tag mettre à jour
    });
    
    console.log("✅ Tag modifiée avec succès!");
    console.log("Détails de la Tag modifé :", tag.toJSON());
    
    // je formate l'affichage
    const formattedTag = ({
      name,
      color
    });
    
    // 3. je renvoie les tags au client au format JSON
    res.status(201).json(formattedTag);
  } catch (error) {
    console.error(error);
          
    // 3. en cas d'erreur, je retourne une 500
    res.status(500).json({
      error: "Unexpected server error. Please try again later."
    });
  }
}

async function removeTag(req, res){
  // 1. je récupère l'ID du tag à supprimer dans les paramètres
  const tagId = parseInt(req.params.id, 10);
  
  // si ce n'est pas un nombre → erreur 400 `BAD REQUEST`
  if (isNaN(tagId)) {
    return res.status(400).json({
      error: '❌ Tag ID should be a valid integer',
    });
  }
  
  // 2. je récupère le tag dans la BDD
  const tag = await Tag.findByPk(tagId);
  
  // s'il n'y est pas → erreur 404 `NOT FOUND`
  if (!tag) {
    return res.status(404).json({
      error: '❌ Tag not found. Please verify the provided ID.',
    });
  }
  
  // 3. je supprimer le Tag de la BDD
  await tag.destroy();
  
  // 4. je termine la requête (pas de corps) → 204 `NO CONTENT`
  res.status(204).end();
}

async function addTagToCard(req, res){
  try {
    // 1. je recupere l'id de la carte
    const cardId = parseInt(req.params.id, 10);
    // 2. je recupere l'id du tag
    const tagId = parseInt(req.params.tag_id, 10);
    // 3. je verifie que le tag existe bien
    const tag = await Tag.findByPk(tagId);
    if (!tag) {
      return res.status(404).json({
        error: "❌ Tag not found. Please verify the provided ID."
      });
    }
    // 4. je verifie que la carte existe bien
    const card = await Card.findByPk(cardId);
    if (!card) {
      return res.status(404).json({
        error: "❌ Card not found. Please verify the provided ID."
      });
    }
    // 5. je rajoute le tag à la carte
    await card.addTag(tagId);
    // 6. je renvoie la carte au client
    res.status(201).json(card);
    // 7. je termine la requête
    res.end();        
  } catch (error) {
    console.error(error);
    // 8. en cas d'erreur, je retourne une 500
    res.status(500).json({
      error: "Unexpected server error. Please try again later."
    });
  }
}

async function removeTagFromCard(req, res){
  try {
    // je récupère l'id de la card
    const cardId = parseInt(req.params.id, 10);
    // je récupère l'id du tag
    const tagId = parseInt(req.params.tag_id, 10);
    // je verifie que le tag existe bien
    if (!tagId) {
      return res.status(404).json({
        error: "❌ Tag not found. Please verify the provided ID."
      });
    }
    // je verifie que la card existe bien
    if (!cardId){
      return res.status(404).json({
        error: "❌ Card not found. Please verify the provided ID."
      });
    }
    // je supprime le tag de la card
    await cardId.removeTag(tagId);
    // je renvoie la card au client
    res.status(201).json(cardId);
  } catch (error) {
    console.error(error);
    // 8. en cas d'erreur, je retourne une 500
    res.status(500).json({
      error: "Unexpected server error. Please try again later."
    });
  }
}

async function getOneTag(req, res) {
  try {
    // 1. je récupère l'ID du tag à retourner dans les paramètres
    const tagId = parseInt(req.params.id, 10);
    
    // si ce n'est pas un number → erreur 400 `BAD REQUEST`
    if (isNaN(tagId)) {  
      return res.status(400).json({
        error: "❌ Tag ID must be a valid integer.",
      });
    }
    
    // 2. je récupère le Tag depuis ma BDD
    const tag = await Tag.findByPk(tagId);
    
    // s'il' n'y est pas → erreur 404 `NOT FOUND`
    if (!tag) {
      return res.status(404).json({
        error: "❌ Tag not found. Please verify the provided ID.",
      });
    }
    
    // 3. je renvoie le tag au client au format JSON
    res.json(tag);
  } catch (error) {
    console.error(error);
    
    // 4. en cas d'erreur, je retourne une 500
    res.status(500).json({
      error: "❌ Unexpected server error. Please try again later."
    });
  }
}
export {
  getAllTags, 
  insertTag,
  editTag,
  removeTag,
  addTagToCard,
  removeTagFromCard,
  getOneTag
};