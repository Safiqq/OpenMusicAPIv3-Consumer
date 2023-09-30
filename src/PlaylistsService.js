const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this.pool = new Pool();
  }

  async getPlaylistById(playlistId) {
    const query = {
      text: `SELECT id, name 
      FROM playlists
      WHERE id = $1`,
      values: [playlistId],
    };

    const result = await this.pool.query(query);
    return result.rows[0];
  }

  async getPlaylistSong(playlistId) {
    const query = {
      text: `SELECT songs.id, 
      songs.title, 
      songs.performer 
        FROM playlist_songs
        JOIN songs
        ON playlist_songs.song_id = songs.id 
        WHERE playlist_songs.playlist_id = $1`,
      values: [playlistId],
    };

    const result = await this.pool.query(query);
    return result.rows;
  }
}

module.exports = PlaylistsService;
