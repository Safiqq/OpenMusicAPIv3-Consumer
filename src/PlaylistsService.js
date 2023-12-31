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
        FROM playlistsongs
        JOIN songs
        ON playlistsongs.song_id = songs.id 
        WHERE playlistsongs.playlist_id = $1`,
      values: [playlistId],
    };

    const result = await this.pool.query(query);
    return result.rows;
  }
}

module.exports = PlaylistsService;
