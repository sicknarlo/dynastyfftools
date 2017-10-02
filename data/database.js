import pmongo from 'promised-mongo';

const db = pmongo('dynastyfftools', ['players']);

export function getPlayer(_id) {
  return db.players.findOne({ _id: pmongo.ObjectId(_id) });
}

export function getPlayers() {
  return db.players.find({});
}

export function createPlayer(player) {
  if (!player) {
	return new Promise((resolve, reject) => {
	  reject(`"player" cannot be empty`);
	});
  }

  return db.players.insert({ player, createdAt: new Date() });
}

export function removePlayer(_id) {
  return db.players.remove({ _id: pmongo.ObjectId(_id) })
				 .then(() => {
					return { _id: _id };
				 });
}

export function updatePlayer(_id, player) {
  let playerItem = {
	player
  };

  if (!_id) return new Promise((resolve, reject) => {
	reject(`"_id" required to update player\n`);
  });

  if (!player) delete playerItem.player;

  return db.players.findAndModify({
			new: true, // return the newly modified document
			query: { _id: pmongo.ObjectId(_id) },
			update: { $set: playerItem } }).then(({ value }) => value);
}