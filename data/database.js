import pmongo from 'promised-mongo';
import { convertFromEpoch } from '../src/utilities';

const db = pmongo('dynastyfftools', ['players']);

export function getPlayer({ _id = null, name= null }) {
  // Fetch player by _id if id
  if (_id) return db.players.findOne({ _id: pmongo.ObjectId(_id) });
  // Fetch player by name if name
  if (name) return db.players.findOne({ name });
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

  return db.players.insert({ ...player, createdAt: convertFromEpoch(new Date()), updatedAt: convertFromEpoch(new Date()) });
}

export function removePlayer(_id) {
  return db.players.remove({ _id: pmongo.ObjectId(_id) })
				 .then(() => {
					  return { _id: _id };
				 });
}

export function updatePlayer(data) {
  let { _id, ...playerData } = data;

  playerData.updatedAt = convertFromEpoch(new Date());

  if (!_id) return new Promise((resolve, reject) => {
	  reject(`"_id" required to update player\n`);
  });

  return db.players.findAndModify({
			new: true, // return the newly modified document
			query: { _id: pmongo.ObjectId(_id) },
			update: { $set: playerData } }).then(({ value }) => value);
}