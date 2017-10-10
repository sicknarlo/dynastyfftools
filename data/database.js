import pmongo from 'promised-mongo';
import NodeCache from 'node-cache';
import { convertFromEpoch } from '../src/utilities';

const cache = new NodeCache();

const db = pmongo('dynastyfftools', ['players', 'ecr']);

export function getECRForPlayer({ playerId }) {
  if (!playerId) {
    return new Promise((resolve, reject) => {
      reject(new Error('playerId cannot be empty'));
    });
  }
  return db.ecr.find({ playerId });
}

export function createECR(ecr) {
  if (!ecr) {
    return new Promise((resolve, reject) => {
      reject(new Error('ecr cannot be empty'));
    });
  }
  return db.ecr.insert(ecr);
}

export function getPlayer({ _id = null, name = null }) {
  if (!_id && !name) {
    return new Promise((resolve, reject) => {
      reject(new Error('must provide a player _id or name'));
    });
  }
  return new Promise((resolve, reject) => {
    if (name) {
      db.players.findOne({ name }).then((r) => {
        cache.set(r._id.str, r);
        resolve(r);
      });
    }
    let player = cache.get(_id);
    console.time('player');
    if (player) {
      console.log('from cache');
      console.timeEnd('player');
      resolve(player);
    } else {
      db.players.findOne({ _id: pmongo.ObjectId(_id) }).then((r) => {
        console.log('from db');
        console.timeEnd('player');
        player = r;
        cache.set(r._id.toString(), r);
        resolve(player);
      });
    }
  });
}

export function getPlayers() {
  return new Promise((resolve, reject) => {
    let players = cache.get('players');
    console.time('players');
    if (players) {
      console.log('from cache');
      console.timeEnd('players');
      resolve(players);
    } else {
      // temporary until data is cleaned up
      db.players.find({ birthdate: { $ne: '' } }).then((r) => {
        console.log('from db');
        console.timeEnd('players');
        players = r;
        cache.set('players', players);
        resolve(players);
      });
    }
  });
}

export function createPlayer(player) {
  if (!player) {
    return new Promise((resolve, reject) => {
      reject(new Error('player cannot be empty'));
    });
  }
  return db.players.insert({
    ...player,
    createdAt: convertFromEpoch(new Date()),
    updatedAt: convertFromEpoch(new Date()),
  });
}

export function removePlayer(_id) {
  return db.players.remove({ _id: pmongo.ObjectId(_id) }).then(() => ({ _id }));
}

export function updatePlayer(data) {
  const { _id, ...playerData } = data;

  playerData.updatedAt = convertFromEpoch(new Date());

  if (!_id) {
    return new Promise((resolve, reject) => {
      reject(new Error('_id required to update player\n'));
    });
  }

  return db.players
    .findAndModify({
      new: true, // return the newly modified document
      query: { _id: pmongo.ObjectId(_id) },
      update: { $set: playerData },
    })
    .then(({ value }) => value);
}
