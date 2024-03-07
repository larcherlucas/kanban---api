import { Card } from "../models/associations.js";


async function getAllCards(req, res) {
  try {
    // 1. je récupère toutes les cartes depuis la BDD
    const cards = await Card.findAll({
      order: [
        ['position', 'ASC'],
        ['created_at', 'DESC'],
      ],
    });
  
    // 2. je renvoie les listes au client au format JSON
    res.json(cards);
  } catch (error) {
    console.error(error);
  
    // 3. en cas d'erreur, je retourne une 500
    res.status(500).json({
      error: "❌ Unexpected server error. Please try again later."
    });
  }
}
  
async function getOneCard(req, res) {
  try {
    // 1. je récupère l'ID de la carte à retourner dans les paramètres
    const cardId = parseInt(req.params.id, 10);
  
    // si ce n'est pas un number → erreur 400 `BAD REQUEST`
    if (isNaN(cardId)) {  
      return res.status(400).json({
        error: "❌ Card ID must be a valid integer.",
      });
    }
  
    // 2. je récupère la carte depuis ma BDD
    const card = await Card.findByPk(cardId);
  
    // si elle n'y est pas → erreur 404 `NOT FOUND`
    if (!card) {
      return res.status(404).json({
        error: "❌ Card not found. Please verify the provided ID.",
      });
    }
  
    // 3. je renvoie la liste au client au format JSON
    res.json(card);
  } catch (error) {
    console.error(error);
  
    // 4. en cas d'erreur, je retourne une 500
    res.status(500).json({
      error: "❌ Unexpected server error. Please try again later."
    });
  }
}
  
async function insertCard(req, res) {
  console.log("🔄 Création de la card en cours…");
  try {  
    // 1. je récupère le corps de la requête
    const { content, position, color } = req.body;
  
    // 2. je valide mes données
      
    // 2.1. SI le `content` est `undefined` ou falsy
    // OU si ce n'est pas un string
    // → error 400 `BAD REQUEST`
    if (!content || typeof content !== 'string') {
      const error = content
        ? "❌ Invalid type: 'content' must be a string."
        : "❌ Missing body parameter: 'content'.";
  
      return res.status(400).json({ error });
    }
  
    // 2.2 SI la `position` (optionnelle) est fournie,
    // ALORS je vérifie que c'est un nombre valide
    //   - un entier
    //   - supérieur ou égal à 1
    if (position && (!Number.isInteger(position) || position < 1)) {
      return res.status(400).json({
        error: "❌ Invalid type: 'position' should be an integer greater then 0."
      });
    }
  
    // 2.2 SI la `couleur` est fournie,
    // ALORS je vérifie que c'est un nombre héxadécimal valide

    if (color && !/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)) {
      return res.status(400).json({
        error: "❌ Invalid type: 'color' should be a hexadecimal."
      });
    }
    // 3. je crée la carte en BDD
    const createdCard = await Card.create({
      content,
      position: Number(position) || 1, 
      color,
    });
    console.log("✅ Card créée avec succès!");
    // 4. je retourne ma card créée avec un code 201 `CREATED`
    res.status(201).json(createdCard);
  } catch (error) {
    console.error(error);
  
    res.status(500).json({
      error: "❌ Unexpected server error. Please try again later."
    });
  }
}
  
async function removeCard(req, res) {
  // 1. je récupère l'ID de la liste à supprimer dans les paramètres
  const cardId = parseInt(req.params.id, 10);
  
  // si ce n'est pas un nombre → erreur 400 `BAD REQUEST`
  if (isNaN(cardId)) {
    return res.status(400).json({
      error: '❌ Card ID should be a valid integer',
    });
  }
  
  // 2. je récupère la card dans la BDD
  const card = await Card.findByPk(cardId);
  
  // si elle n'y est pas → erreur 404 `NOT FOUND`
  if (!card) {
    return res.status(404).json({
      error: '❌ Card not found. Please verify the provided ID.',
    });
  }
  
  // 3. je supprimer la Card de la BDD
  await card.destroy();
  
  // 4. je termine la requête (pas de corps) → 204 `NO CONTENT`
  res.status(204).end();
}
async function editCard(req, res){
  console.log("🔄 Modification de la card  en cours…");
  try {
    // je récupère l'id de la card
    const cardId = parseInt(req.params.id);
  
    //je récupère l'id en BDD
    const card = await Card.findByPk(cardId);
    if(!card){
      res.status(404).json({error:"❌ Card not found. Please verify the provided ID."});
      return;
    }    
    const { content, position, color } = req.body;
  
    if (!content.trim() || typeof content !== 'string') {
      const error = content.trim()
        ? "❌ Invalid type: 'content' must be a string."
        : "❌ Missing body parameter: 'content'.";
    
      return res.status(400).json({ error });
    }
    
    if (position && (!Number.isInteger(position) || position < 1)) {
      return res.status(400).json({
        error: "❌ Invalid type: 'position' should be an integer greater then 0."
      });
    }
      
    if (color && !/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)) {
      return res.status(400).json({
        error: "❌ Invalid type: 'color' should be a hexadecimal."
      });
    }
  
    // je récupère l'id et dit ce qu'il faut modifier
    await Card.update({
      content: req.body.content.trim(), // Mettre à jour le content avec la nouvelle valeur
      position: req.body.position, // Mettre à jour la position avec la nouvelle valeur
      color: req.body.color // Mettre à jour la couleur avec la nouvelle valeur
    }, {
      where: { id: cardId } // Clause where pour spécifier quelle carte mettre à jour
    });
  
    console.log("✅ Card modifiée avec succès!");
    console.log("Détails de la Card modifé :", card.toJSON());
  
    // je formate l'affichage
    const formattedCard = ({
      content,
      position,
      color
    });
  
    // 3. je renvoie les cards au client au format JSON
    res.status(201).json(formattedCard);
  } catch (error) {
    console.error(error);
        
    // 3. en cas d'erreur, je retourne une 500
    res.status(500).json({
      error: "Unexpected server error. Please try again later."
    });
  }
}

async function getCardsByListId(req, res){
  try {
    // récupére l'id de la liste dans les paramètres
    const listId = parseInt(req.params.id);
    // récupère toutes les card en BDD où la listId correspondante à l'id de la liste
    const cards = await Card.findAll({
      where: listId, 
      include: [
        {
          as: 'tags',
          through: { attributes: [] } 
        }
      ],
      order: [
        ['position', 'ASC']
        // ['created_at', 'DESC'],
      ],
    });
    res.json(cards);

  } catch (error) {
    console.error(error);
        
    // 3. en cas d'erreur, je retourne une 500
    res.status(500).json({
      error: "Unexpected server error. Please try again later."
    });
  }
}
  
export {
  getAllCards, 
  getOneCard,
  insertCard,
  removeCard,
  editCard,
  getCardsByListId
};
  