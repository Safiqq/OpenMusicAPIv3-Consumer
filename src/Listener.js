class Listener {
  constructor(playlistsService, mailSender) {
    this.playlistsService = playlistsService;
    this.mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());
      const playlist = await this.playlistsService.getPlaylistById(playlistId);
      const songs = await this.playlistsService.getPlaylistSong(playlistId);
      playlist.songs = songs;
      await this.mailSender.sendEmail(targetEmail, JSON.stringify({ playlist }));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}

module.exports = Listener;
